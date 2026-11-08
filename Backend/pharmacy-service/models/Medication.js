
const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  reference: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dosage: String,
  unit: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

module.exports = mongoose.model("Medication", medicationSchema);
