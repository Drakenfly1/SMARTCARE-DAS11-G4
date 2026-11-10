const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
  {
    jour: {
      type: String,
      enum: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'],
      required: true,
    },
    heureDebut: { type: String, required: true }, // HH:mm
    heureFin: { type: String, required: true },   // HH:mm
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    specialite: { type: String, required: true, index: true },
    availabilities: [availabilitySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);