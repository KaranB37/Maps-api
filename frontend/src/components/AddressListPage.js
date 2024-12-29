import React from "react";
import AddressList from "./AddressList";

const AddressListPage = ({ addresses, deleteAddress }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Address List
      </h2>
      <AddressList addresses={addresses} deleteAddress={deleteAddress} />
    </div>
  );
};

export default AddressListPage;
