import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const Map = ({ onLocationChange, onAddressSelect }) => {
  const [position, setPosition] = useState({ lat: 19.076, lng: 72.8777 });
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placesService, setPlacesService] = useState(null);
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDCiZja_eHzHOlrAvl2Maiyo3f9cq63DJA",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      setPlacesService(service);
    }
  }, [isLoaded]);

  const handleMarkerDrag = (e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPosition(newPos);
    onLocationChange(newPos);
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
        setDeliveryMessage(
          "Your order will be delivered here. Move pin to your exact location."
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePlaceSelect = (place) => {
    const newPos = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setPosition(newPos);
    onLocationChange(newPos);
    setSearchInput(place.formatted_address);
    setSuggestions([]);
    onAddressSelect(place.formatted_address);
    setDeliveryMessage(
      "Your order will be delivered here. Move pin to your exact location."
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (placesService) {
      const request = {
        query: query,
        fields: ["formatted_address", "geometry"],
      };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(results);
        } else {
          setSuggestions([]);
        }
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <Autocomplete>
        <input
          type="text"
          placeholder="Search for an address"
          value={searchInput}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </Autocomplete>
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handlePlaceSelect(suggestion)}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "5px",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              {suggestion.formatted_address}
            </li>
          ))}
        </ul>
      )}
      <GoogleMap
        center={position}
        zoom={14}
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        onClick={(e) => {
          const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setPosition(newPos);
          onLocationChange(newPos);
          setSearchInput(""); // Clear search input when clicking on the map
        }}
      >
        <Marker position={position} draggable onDragEnd={handleMarkerDrag} />
        {deliveryMessage && (
          <Marker
            position={position}
            label={{
              text: deliveryMessage,
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              fontFamily: "Arial",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Classic red marker
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
    </div>
  );
};

export default Map;
