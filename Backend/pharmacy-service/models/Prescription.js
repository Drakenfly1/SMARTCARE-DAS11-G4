
const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  prescriptionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
    default: "ACTIVE"
  }
});

module.exports = mongoose.model(
  "Prescription",
  prescriptionSchema
);
