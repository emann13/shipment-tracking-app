import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import useTrackingStore from "../../store/TrackingStore.js"; 

function OrderDetails() {
  const trackingData = useTrackingStore((state) => state.trackingData);
  const loading = useTrackingStore((state) => state.loading);
  const fetchTrackingDetails = useTrackingStore((state) => state.fetchTrackingDetails);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackingData) {
      fetchTrackingDetails("69171493")
        .catch((err) => {
          setError(err.error || "An error occurred while fetching tracking details.");
        });
    }
  }, [trackingData, fetchTrackingDetails]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (loading || !trackingData) {
    return <div className="loading-message">Loading tracking details...</div>;
  }

  const stages = ["Picked up", "Processing", "Out for Delivery", "Delivered"];
  const currentStateIndex = stages.map((stage) =>stage.toLowerCase()).indexOf(trackingData?.currentState?.toLowerCase());

  let groupedTrackingDetails = [];
  if (trackingData?.events) {
    groupedTrackingDetails = trackingData["events"]
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.code - b.code;
        }
        return new Date(a.date) - new Date(b.date);
      })
      // Group events by date
      .reduce((acc, event) => {
        const existingDay = acc.find((item) => item.date === event.date);

        if (existingDay) {
          existingDay.events.push(event);
        } else {
          acc.push({ date: event.date, events: [event] , formattedDate: event.formattedDate          });
        }

        return acc;
      }, [])
      .map((day, index, array) => {
        const filteredEvents = day.events.filter((event, i, arr) => {
          const containsException = /exception/i.test(event.state);

          const isDuplicate = arr.findIndex(
            (e) => e.code === event.code && e.state === event.state
          ) !== i;

          const nextDaysEvents = array
            .slice(index + 1)
            .flatMap((nextDay) => nextDay.events);

          const isCodeValid =
            !nextDaysEvents.some((nextEvent) => event.code >= nextEvent.code);

          return !containsException && !isDuplicate && isCodeValid;
        });

        const sortedEvents = filteredEvents.sort((a, b) => a.code - b.code);

        return { ...day, events: sortedEvents };
      });
  }

  return (
    <div className="order-details-container">
      <div className="order-progress-wrapper">
        {/* Order Info */}
        <div className="order-info">
          <p className="order-number">ORDER #{trackingData?.trackingNumber}</p>
          <h2 className="order-arrival">
  {trackingData?.currentState?.toLowerCase() === "delivered" 
    ? "Arrived " 
    : "Arriving by "} 
  <span className="highlight">
    {trackingData?.currentState?.toLowerCase() === "delivered" 
      ? trackingData.currentStateDate.formattedDate 
      : new Date(trackingData?.scheduleDate?.date) <= new Date() ? "Today" : trackingData.promisedDate.formattedDate }
  </span>
</h2>
<p className="order-description">
  Your order {trackingData?.currentState?.toLowerCase() === "delivered" ? "has arrived"
   : `is expected to arrive ${trackingData?.expectedInDays === 0 ? "today" : `within ${trackingData?.expectedInDays} - ${trackingData?.expectedInDays + 1} working days`}`}.
</p>



        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            {stages.map((stage, index) => (
              <div key={index} className="progress-step">
                <div
                  className={`progress-circle ${
                    index <= currentStateIndex ? "completed" : ""
                  }`}
                ></div>
                <p className="progress-title">{stage}</p>
                {index === currentStateIndex && (
                  <p className="progress-date">{trackingData?.currentStateDate?.formattedDate}</p>
                )}
                {index < stages.length - 1 && <div className="progress-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Details */}
      <div className="tracking-details">
        <h4 className="tracking-title">Tracking details</h4>
        {groupedTrackingDetails.map((day, index) => {
          const lineHeight = `${day.events.length * 54 + 40}px`; // Calculate height based on the number of events
          {return ( day.events.length>0&& 
            <div key={index} className="tracking-day">
              <div className="tracking-header">
                <div className="tracking-circle"></div>
                <p className="tracking-date">{day.formattedDate}</p>
                {index < groupedTrackingDetails.length - 1 && (
                  <div className="tracking-line" style={{ height: lineHeight }}></div>
                )}
              </div>
              <div className="tracking-events">
                {day.events.map((event, i) => (
                  <div key={i} className="tracking-event-container">
                    <div className="tracking-event">{event.state}</div>
                    <div className="event-date">{event.time}</div>

                  </div>
                ))}
              </div>
            </div>
          );
        }})}
      </div>
    </div>
  );
}

export default OrderDetails;
