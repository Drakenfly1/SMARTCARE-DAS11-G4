
const mongoose = require("mongoose");

const dispensationSchema = new mongoose.Schema({
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  pharmacistId: {
    type: String,
    required: true
  },
  dispensationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "CANCELLED"],
    default: "PENDING"
  }
});

module.exports = mongoose.model(
  "Dispensation",
  dispensationSchema
);
