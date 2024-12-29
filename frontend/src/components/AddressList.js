import React from "react";

const AddressList = ({ addresses, deleteAddress }) => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Address List
      </h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {addresses.map((address) => (
          <li
            key={address._id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {address.flatNumber}, {address.area} - {address.category}
            <button
              onClick={() => deleteAddress(address._id)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
