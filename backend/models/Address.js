const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Home, Office, etc.
  flatNumber: String,
  area: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Address", addressSchema);
