import axios from 'axios';

const fetchShipmentDetails = async (trackingNumber) => {
  console.log("Fetching shipment details...");
  const apiUrl = `https://tracking.bosta.co/shipments/track/${trackingNumber}`;
  const headers = {
    'x-requested-by': 'Bosta',
  };
// samples: 36406704, 69171493, 7234258, 9442984, 1094442

  const splitDateTime = (dateInput, isEvent = false) => {
    if (!dateInput) return { formattedDate: 'N/A', date: 'N/A', time: 'N/A' };
    const dateObj = new Date(dateInput);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Converted to 12-hour format
    const time = `${hours}:${minutes} ${ampm}`;

    if (isEvent) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      return { formattedDate, date: dateObj.toISOString().split('T')[0], time };
    }

    // EX : "SUN OCT. 13"
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options).toUpperCase();

    return { formattedDate, date: dateObj.toISOString().split('T')[0], time };
  };

  const calculateWorkingDays = (date, deliveryCountryCode) => {
    const today = new Date();
    const deliveryDate = new Date(date);
    let workingDays = 0;

    const offDays = getOffDays(deliveryCountryCode);

    while (today < deliveryDate) {
      today.setDate(today.getDate() + 1);
      if (!offDays.includes(today.getDay())) { // CALC off days
        workingDays++;
      }
    }
    return workingDays;
  };

  // based on country
  const getOffDays = (deliveryCountryCode) => {
    switch (deliveryCountryCode) {
      case 'EG': return [5, 6]; // Friday and Saturday
      case 'SA': return [4, 5]; // Thur and Friday
      default: return [5, 0]; // Saturday and Sun
    }
  };

  try {
    const response = await axios.get(apiUrl, { headers });
    const data = response.data;

    const finalData = {
      trackingNumber: data.TrackingNumber || trackingNumber,
      type: data.Type || 'N/A',
      scheduleDate: splitDateTime(data.ScheduleDate),
      promisedDate: splitDateTime(data.PromisedDate),
      currentState: data.CurrentStatus?.state.toLowerCase() || 'N/A',
      currentStateDate: splitDateTime(data.CurrentStatus?.timestamp),
      events: [],
      expectedInDays: 0, 
    };

    if (data.PromisedDate) {
      finalData.expectedInDays = calculateWorkingDays(data.PromisedDate, data.DeliveryCountryCode);
    }

    if (data.TransitEvents?.length) {
      finalData.events = data.TransitEvents.map((event) => ({
        state: event.state?.toLowerCase() || 'N/A',
        code: event.code || 0,
        ...splitDateTime(event.timestamp, true), 
      }));
    } else {
      if (data.collectedFromBusiness) {
        const dateC = splitDateTime(data.collectedFromBusiness);
        finalData.events.push({
          state: 'Order was Picked Up',
          code: 0,
          ...dateC, 
        });
      }
      if (data.CurrentStatus?.state?.toLowerCase() === 'delivered') {
        const dateD = splitDateTime(data.CurrentStatus.timestamp);
        finalData.events.push({
          state: 'Order Delivered',
          code: 1,
          ...dateD, 
        });
      }
    }

    console.log("final data", finalData);
    return finalData;

  } catch (error) {
    console.error('Error fetching shipment details:', error);

    if (error.response?.status === 404) {
      return { error: 'No order found with the provided tracking number!', status: error.response?.status };
    }

    return { error: 'Error occurred while fetching your shipment details!', status: error.response?.status };
  }
};

export default fetchShipmentDetails;
