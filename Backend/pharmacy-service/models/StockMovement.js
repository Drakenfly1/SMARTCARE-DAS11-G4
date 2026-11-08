
const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true
  },
  type: {
    type: String,
    enum: ["IN", "OUT"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  movementDate: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model(
  "StockMovement",
  stockMovementSchema
);
