import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchPage = ({ onLocationChange }) => {
  const [position, setPosition] = useState({ lat: 19.076, lng: 72.8777 });
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placesService, setPlacesService] = useState(null);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [category, setCategory] = useState("Home");
  const [isSaved, setIsSaved] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  const handlePlaceSelect = (place) => {
    const newPos = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setPosition(newPos);
    onLocationChange(newPos);
    setSearchInput(place.formatted_address);
    setSuggestions([]);
    setDeliveryMessage(
      "Your order will be delivered here. Move pin to your exact location."
    );
  };

  const handleSaveAddress = async () => {
    const data = { area: searchInput, category, coordinates: position };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addresses",
        data
      );
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
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
          className="highlight-input"
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </Autocomplete>
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 2, background: "green" }}>
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
      >
        <Marker position={position} />
        {deliveryMessage && (
          <Marker
            position={position}
            label={{
              text: deliveryMessage,
              color: "red",
              fontWeight: "bold",
              fontSize: "14px",
              fontFamily: "Arial",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button
          onClick={handleSaveAddress}
          style={{
            width: "20%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Address
        </button>
      </div>
      {isSaved && <p style={{ color: "green" }}>Address saved successfully!</p>}
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

export default SearchPage;
