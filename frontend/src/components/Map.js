import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import axios from "axios";

const Map = ({ onLocationChange, onAddressSelect }) => {
  const [position, setPosition] = useState({ lat: 19.076, lng: 72.8777 });
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDCiZja_eHzHOlrAvl2Maiyo3f9cq63DJA",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) {
      // Initialize any services if needed
    }
  }, [isLoaded]);

  const handleMarkerDrag = (e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPosition(newPos);
    onLocationChange(newPos);
    getAddress(newPos); // Get address when marker is dragged
  };

  const handleMapClick = (e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPosition(newPos);
    onLocationChange(newPos);
    getAddress(newPos); // Get address when map is clicked
  };

  const getAddress = async (newPos) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newPos }, (results, status) => {
      if (status === "OK" && results[0]) {
        setDeliveryMessage(results[0].formatted_address);
        onAddressSelect(results[0].formatted_address); // Pass the address to the parent
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(newPos);
        onLocationChange(newPos);
        getAddress(newPos); // Get address for current location
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <GoogleMap
        center={position}
        zoom={14}
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        onClick={handleMapClick}
      >
        <Marker position={position} draggable onDragEnd={handleMarkerDrag} />
        {deliveryMessage && (
          <Marker
            position={position}
            label={{
              text: deliveryMessage,
              color: "red",
              fontWeight: "bold",
              fontSize: "10px",
              fontFamily: "Arial",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
      <button
        onClick={locateMe}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Locate Me
      </button>
      <Link to="/addresses">
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Go to Address List
        </button>
      </Link>
      <Link to="/search">
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Search Manually
        </button>
      </Link>
    </div>
  );
};

export default Map;
