
const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const Medication = require("../models/Medication");

// créer un stock
exports.createStock = async (req, res) => {
  try {
    const { medicationId, minimumQuantity } = req.body;

    if (!mongoose.isValidObjectId(medicationId)) {
      return res.status(400).json({
        message: "Identifiant du médicament invalide"
      });
    }

    if (
      minimumQuantity !== undefined &&
      (!Number.isInteger(minimumQuantity) || minimumQuantity < 0)
    ) {
      return res.status(400).json({
        message: "Seuil minimum invalide"
      });
    }

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({
        message: "Médicament introuvable"
      });
    }

    const existingStock = await Stock.findOne({ medicationId });

    if (existingStock) {
      return res.status(409).json({
        message: "Un stock existe déjà pour ce médicament"
      });
    }

    const stock = await Stock.create({
      medicationId,
      quantity: 0,
      minimumQuantity: minimumQuantity ?? 10
    });

    res.status(201).json(stock);

  } catch (error) {
    res.status(error.code === 11000 ? 409 : 500).json({
      message: error.code === 11000
        ? "Un stock existe déjà"
        : "Erreur lors de la création du stock"
    });
  }
};

// afficher tous les stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("medicationId", "name reference dosage unit");

    res.status(200).json(stocks);

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des stocks"
    });
  }
};

// afficher un stock par ID
exports.getStockById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    const stock = await Stock.findById(req.params.id)
      .populate("medicationId", "name reference dosage unit");

    if (!stock) {
      return res.status(404).json({
        message: "Stock introuvable"
      });
    }

    res.status(200).json(stock);

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du stock"
    });
  }
};

// stocks faibles ou en rupture
exports.getLowStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({
      $expr: {
        $lte: ["$quantity", "$minimumQuantity"]
      }
    }).populate("medicationId", "name reference");

    res.status(200).json(stocks);

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des alertes"
    });
  }
};
