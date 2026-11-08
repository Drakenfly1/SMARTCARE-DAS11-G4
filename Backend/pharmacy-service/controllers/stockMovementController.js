
const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");

// entrée ou sortie de stock
exports.createMovement = async (req, res) => {
  try {
    const { stockId, type, quantity, reason } = req.body;
    
    if (!mongoose.isValidObjectId(stockId)) {
      return res.status(400).json({
        message: "Identifiant du stock invalide"
      });
    }

    if (!["IN", "OUT"].includes(type)) {
      return res.status(400).json({
        message: "Le type doit être IN ou OUT"
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "La quantité doit être un entier positif"
      });
    }

    if (typeof reason !== "string" || !reason.trim()) {
      return res.status(400).json({
        message: "La raison est obligatoire"
      });
    }

    const difference = type === "IN" ? quantity : -quantity;

    const filter = { _id: stockId };

    if (type === "OUT") {
      filter.quantity = { $gte: quantity };
    }

    const stock = await Stock.findOneAndUpdate(
      filter,
      {
        $inc: { quantity: difference },
        $set: { lastUpdated: new Date() }
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!stock) {
      const exists = await Stock.exists({ _id: stockId });

      return res.status(exists ? 409 : 404).json({
        message: exists
          ? "Stock insuffisant pour cette sortie"
          : "Stock introuvable"
      });
    }

    // Enregistrer l'historique
    const movement = await StockMovement.create({
      stockId,
      type,
      quantity,
      reason: reason.trim()
    });

    res.status(201).json({
      message: "Mouvement enregistré",
      movement,
      stock
    });

  } catch (error) {
    console.error("Erreur mouvement :", error);

    res.status(500).json({
      message: "Erreur lors du mouvement de stock"
    });
  }
};

// historique des mouvements
exports.getAllMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find()
      .populate({
        path: "stockId",
        populate: {
          path: "medicationId",
          select: "name reference"
        }
      })
      .sort({ movementDate: -1 });

    res.status(200).json(movements);

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des mouvements"
    });
  }
};
