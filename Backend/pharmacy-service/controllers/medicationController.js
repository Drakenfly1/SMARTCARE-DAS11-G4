
const mongoose = require("mongoose");
const Medication = require("../models/Medication");
const Category = require("../models/Category");

// afficher tous les médicaments
exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find()
      .populate("categoryId", "name description");

    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// rechercher un médicament par ID
exports.getMedicationById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    const medication = await Medication.findById(req.params.id)
      .populate("categoryId", "name description");

    if (!medication) {
      return res.status(404).json({
        message: "Médicament introuvable"
      });
    }

    res.status(200).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ajouter un médicament
exports.createMedication = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!mongoose.isValidObjectId(categoryId)) {
      return res.status(400).json({
        message: "Identifiant de catégorie invalide"
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable"
      });
    }

    const medication = await Medication.create(req.body);

    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// modifier un médicament
exports.updateMedication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    if (req.body.categoryId !== undefined) {
      if (!mongoose.isValidObjectId(req.body.categoryId)) {
        return res.status(400).json({
          message: "Identifiant de catégorie invalide"
        });
      }

      const category = await Category.findById(req.body.categoryId);

      if (!category) {
        return res.status(404).json({
          message: "Catégorie introuvable"
        });
      }
    }

    const medication = await Medication.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!medication) {
      return res.status(404).json({
        message: "Médicament introuvable"
      });
    }

    res.status(200).json(medication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// supprimer un médicament
exports.deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    const medication = await Medication.findByIdAndDelete(id);

    if (!medication) {
      return res.status(404).json({
        message: "Médicament introuvable"
      });
    }

    res.status(200).json({
      message: "Médicament supprimé avec succès"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
