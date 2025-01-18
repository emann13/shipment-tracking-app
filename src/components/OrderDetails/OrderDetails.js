import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./OrderDetails.css";
import useTrackingStore from "../../store/TrackingStore.js"; 
import LoadingScreen from "../LoadingScreen/LoadingScreen.js";
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

function OrderDetails() {
  const { t } = useTranslation();
  const trackingData = useTrackingStore((state) => state.trackingData);
  const loading = useTrackingStore((state) => state.loading);
  const error = useTrackingStore((state) => state.error);

  const fetchTrackingDetails = useTrackingStore((state) => state.fetchTrackingDetails);
  const [error3, setError] = useState(null);

  useEffect(() => {
    if (!trackingData) {
      // fetchTrackingDetails("69171493")
      //   .catch((err) => { 
      //     setError(err.error || "An error occurred while fetching tracking details.");
      //   });
      // return<div><h2>{t('startTracking')}</h2></div>
    }
  }, [trackingData, fetchTrackingDetails, t]);

  if (error) {
    return (
      <div
        className="error-message"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "50vh" 
        }}
      >
        <h2>{t('startTracking')}</h2>
      </div>
    );
  }
  if (loading || !trackingData) {
    return  <div>
      <LoadingScreen />
    </div>;
  }

  const stages = [t('pickedUp'), t('processing'), t('outForDelivery'), t('delivered')];
  const currentStateIndex = stages.map((stage) => stage.toLowerCase()).indexOf(trackingData?.currentState?.toLowerCase());

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
          acc.push({ date: event.date, events: [event], formattedDate: event.formattedDate });
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
          <p className="order-number">{t('orderNumber')}{trackingData?.trackingNumber}</p>
          <h2 className="order-arrival">
            {trackingData?.currentState?.toLowerCase() === t('delivered').toLowerCase() 
              ? t('arrived') 
              : t('arrivingBy')} 
            <span className="highlight">
              {trackingData?.currentState?.toLowerCase() === t('delivered').toLowerCase() 
                ? trackingData.currentStateDate.formattedDate 
                : new Date(trackingData?.scheduleDate?.date) <= new Date() ? t('today') : trackingData.promisedDate.formattedDate }
            </span>
          </h2>
          <p className="order-description">
            {trackingData?.currentState?.toLowerCase() === t('delivered').toLowerCase() 
              ? t('orderDescriptionDelivered') 
              : t('orderDescriptionNotDelivered', { expectedInDays: trackingData?.expectedInDays, expectedInDaysPlusOne: trackingData?.expectedInDays + 1 })}
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
                >
                  {index <= currentStateIndex && <CheckIcon style={{ color: "white", backgroundColor: "transparent", fontSize: "15px", marginTop: "-10px" }} />}
                </div>
                <p className="progress-title">{stage}</p>
                {index === currentStateIndex && (
                  <p className="progress-date">{trackingData?.currentStateDate?.formattedDate}</p>
                )}
                {index < stages.length - 1 && (
                  <div
                    className={`progress-line ${
                      index <= currentStateIndex ? "" : "dashed"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Details */}
      <div className="tracking-details">
        <h4 className="tracking-title">{t('trackingDetails')}</h4>
        {groupedTrackingDetails.map((day, index) => {
          const lineHeight = `${day.events.length * 72 + 40}px`; 
          // Calculating height based on the number of events
          return (
            day.events.length > 0 && (
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
            )
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetails;