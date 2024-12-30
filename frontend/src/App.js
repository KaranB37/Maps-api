import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddressForm from "./components/AddressForm";
import Map from "./components/Map";
import Modal from "./components/Modal";
import AddressListPage from "./components/AddressListPage";
import SearchPage from "./components/SearchPage";
import axios from "axios";

const App = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleLocationChange = (newLocation) => {
    console.log("New location:", newLocation);
    setCoordinates(newLocation);
  };

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newPos);
          setLocationEnabled(true);
          setShowModal(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const searchManually = () => {
    setShowModal(false);
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const addAddress = async (newAddress) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addresses",
        newAddress
      );
      setAddresses((prev) => [...prev, response.data]);
      alert("Address saved!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`);
      setAddresses((prev) => prev.filter((address) => address._id !== id));
      alert("Address deleted!");
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address.");
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <Router>
      <div>
        <h1>Location Address Flow</h1>
        {showModal && (
          <Modal
            onEnableLocation={enableLocation}
            onSearchManually={searchManually}
          />
        )}
        {locationEnabled && (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Map
                      onLocationChange={handleLocationChange}
                      onAddressSelect={handleAddressSelect}
                      coordinates={coordinates}
                    />
                    <AddressForm
                      coordinates={coordinates}
                      addAddress={addAddress}
                      selectedAddress={selectedAddress}
                    />
                    <Link to="/addresses">
                      <button style={{ marginTop: "20px" }}>
                        View Address List
                      </button>
                    </Link>
                  </>
                }
              />
              <Route
                path="/addresses"
                element={
                  <AddressListPage
                    addresses={addresses}
                    deleteAddress={deleteAddress}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <SearchPage
                    onLocationChange={handleLocationChange}
                    onAddressSelect={handleAddressSelect}
                  />
                }
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
