import React from "react";
import { Link } from "react-router-dom";
import AddressList from "./AddressList";

const AddressListPage = ({ addresses, deleteAddress }) => {
  return (
    <div>
      <Link to="/">
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Back to Map
        </button>
      </Link>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Address List
      </h2>
      <AddressList addresses={addresses} deleteAddress={deleteAddress} />
    </div>
  );
};

export default AddressListPage;
