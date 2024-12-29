import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = ({ coordinates, addAddress, selectedAddress }) => {
  const [formData, setFormData] = useState({
    flatNumber: "",
    area: "",
    category: "Home",
  });

  useEffect(() => {
    if (selectedAddress) {
      setFormData((prev) => ({ ...prev, area: selectedAddress })); // Fill area with selected address
    }
  }, [selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, coordinates };
    addAddress(data);
    setFormData({ flatNumber: "", area: "", category: "Home" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Address</h2>
      <input
        type="text"
        name="flatNumber"
        placeholder="House/Flat/Block No."
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="text"
        name="area"
        placeholder="Apartment/Road/Area"
        value={formData.area} // Controlled input
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <select
        name="category"
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Friends & Family">Friends & Family</option>
      </select>
      <button
        type="submit"
        style={{
          width: "100%",
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
    </form>
  );
};

export default AddressForm;
