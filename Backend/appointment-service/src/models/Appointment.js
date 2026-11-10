const mongoose = require('mongoose');

const STATUTS = ['PLANIFIE', 'CONFIRME', 'ANNULE', 'TERMINE'];

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, index: true }, // référence vers patient-service
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    heureDebut: { type: String, required: true }, // HH:mm
    dureeMinutes: { type: Number, default: 30 },
    motif: { type: String, trim: true },
    statut: { type: String, enum: STATUTS, default: 'PLANIFIE' },
  },
  { timestamps: true }
);

appointmentSchema.index({ doctorId: 1, date: 1, heureDebut: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
module.exports.STATUTS = STATUTS;