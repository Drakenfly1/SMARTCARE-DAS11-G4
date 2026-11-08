
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  medicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medication",
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minimumQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Stock", stockSchema);
