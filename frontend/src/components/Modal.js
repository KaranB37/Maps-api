import React from "react";

const Modal = ({ onEnableLocation, onSearchManually }) => (
  <div
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
      alignItems: "center",
    }}
  >
    <h2 style={{ marginBottom: "20px" }}>Location permission is off</h2>
    <p>
      We need your location to find the nearest store & provide you a seamless
      delivery experience.
    </p>
    <button
      onClick={onEnableLocation}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginBottom: "10px",
      }}
    >
      Enable Location
    </button>
    <button
      onClick={onSearchManually}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Search Your Location Manually
    </button>
  </div>
);

export default Modal;
