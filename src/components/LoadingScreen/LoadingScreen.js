import React, { useEffect } from 'react';
import useTrackingStore from '../../store/TrackingStore'; 
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const { loading } = useTrackingStore((state) => state);

  if (!loading) return null; 

  return (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingScreen;
