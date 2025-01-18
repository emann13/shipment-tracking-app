import { create } from 'zustand';
import fetchShipmentDetails from '../APIs/TrackingAPIs.js'; 

const useTrackingStore = create((set) => ({
  trackingData: null,
  loading: false,
  error: null,

  fetchTrackingDetails: async (trackingNumber) => {
    set({ loading: true, error: null });
    try {
     
      const data = await fetchShipmentDetails(trackingNumber);
      console.log("data fetchedd", data)
      set({ trackingData: data, loading: false });
    } catch (e) {
      set({ error: e.error??"Error fetching your tracking data"
        , 

        

        loading: false });
    }
  },
}));

export default useTrackingStore;
