import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import logoEN from './assets/bosta-logoEN.png';
import pin from './assets/Pin.png';
import LoadingScreen from './components/LoadingScreen/LoadingScreen'; 
import i18n from './i18n';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import useTrackingStore from './store/TrackingStore'; 

function App() {
  const progressData = [
    { title: "Picked Up", date: "Saturday Nov 10", completed: true },
    { title: "Processing", completed: true },
    { title: "Out for Delivery", completed: true },
    { title: "Delivered", completed: false },
  ];
  
  const trackingData = [
    {
      date: "Monday, February 18, 2021",
      events: [
        "The order has been created. When the merchant is ready, we will receive the shipment.",
        "The order has been received at a warehouse in Bosta and is being prepared.",
      ],
    },
    {
      date: "Sunday, February 16, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },
    {
      date: "Sunday, February 17, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 17, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 16, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 17, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been what postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 19, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 19, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 19, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 19, 2021",
      events: [
        "The order is beingg delivered.",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 17, 2021",
      events: [
        "The order is being delivered.",
        "The delivery of the order had been postponed because we were unable to contact you by phone.",
      ],
    },{
      date: "Sunday, February 17, 2021",
      events: [
        "The order is being delivered.we",
        "The delivery of the order has been postponed because we were unable to contact you by phone.",
      ],
    },
  ];
  const { loading } = useTrackingStore();  

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = () => {
    console.log("Search initiated for tracking number");
  };

  return (
    <div className="app">
            <I18nextProvider i18n={i18n}>

      <Header />
      <div className="app-content">
        <div className="app-pin">
          <img src={pin} alt="Pin Icon" className="pin-icon" />
        </div>
        <div className="app-title">Track Your Order</div>
      </div>
      <div style={{ marginTop: "-75px" }}>
        <div className='search-bar'>
          {isLargeScreen && <SearchBar />}
        </div>
        <OrderDetails />
      </div>
      </I18nextProvider>

      <ToastContainer toastclassName="custom-toast" />

      {/* {loading && <LoadingScreen />} */}
    </div>
  );
}

export default App;
