import { create } from 'zustand';
import fetchShipmentDetails from '../APIs/TrackingAPIs.js'; 
import { toast } from 'react-toastify';

const useTrackingStore = create((set) => ({
  trackingData: null,
  loading: false,
  error: null,

  fetchTrackingDetails: async (trackingNumber) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchShipmentDetails(trackingNumber);
      if (data.error) {
        throw new Error(data.error);
      }
      set({ trackingData: data, loading: false });
    } catch (e) {
      
if (e.code ==="ERR_NETWORK"){
  set({error:"Connection Error", loading: false,trackingData: null,})}
      set({ trackingData: null, error: e.message, loading: false });
      toast.error(e.message || 'An unexpected error occurred!');
    }
  },
}));

export default useTrackingStore;
