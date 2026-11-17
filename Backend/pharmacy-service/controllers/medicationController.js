
const mongoose = require("mongoose");
const Medication = require("../models/Medication");
const Category = require("../models/Category");
const MedicationForLookup = require("../models/Medication");

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

// Rechercher les médicaments par leurs références
exports.resolveReferences = async (req, res) => {
  try {
    const { references } = req.body || {};

    if (
      !Array.isArray(references) ||
      references.length === 0 ||
      references.some(
        (ref) => typeof ref !== "string" || !ref.trim()
      )
    ) {
      return res.status(400).json({
        message: "Une liste de références valides est obligatoire"
      });
    }

    const normalizedReferences = [
      ...new Set(references.map((ref) => ref.trim()))
    ];

    const medications = await MedicationForLookup.find({
      reference: { $in: normalizedReferences }
    }).select("_id name reference");

    const results = normalizedReferences.map((reference) => {
      const matches = medications.filter(
        (medication) => medication.reference === reference
      );

      return {
        reference,
        found: matches.length === 1,
        ambiguous: matches.length > 1,
        medication: matches.length === 1
          ? matches[0]
          : null
      };
    });

    return res.status(200).json({
      allFound: results.every((item) => item.found),
      items: results
    });

  } catch (error) {
    console.error("Erreur correspondance :", error.message);

    return res.status(500).json({
      message: "Erreur lors de la recherche des références"
    });
  }
};

