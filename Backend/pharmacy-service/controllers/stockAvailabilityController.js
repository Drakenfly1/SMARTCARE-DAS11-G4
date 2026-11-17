
const mongoose = require("mongoose");
const Stock = require("../models/Stock");

// vérifier la disponibilité de plusieurs médicaments
exports.checkAvailability = async (req, res) => {
  try {
    const { items } = req.body || {};

    // Vérifier que la liste existe
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "La liste des médicaments est obligatoire"
      });
    }

    // Vérifier les identifiants et les quantités
    for (const item of items) {
      if (
        !item ||
        !mongoose.isValidObjectId(item.medicationId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          message: "Médicament ou quantité invalide"
        });
      }
    }

    // Regrouper les quantités si un médicament apparaît
    // plusieurs fois dans la même demande
    const requested = new Map();

    for (const item of items) {
      const medicationId = String(item.medicationId);

      requested.set(
        medicationId,
        (requested.get(medicationId) || 0) + item.quantity
      );
    }

    const medicationIds = [...requested.keys()];

    // Rechercher les stocks concernés
    const stocks = await Stock.find({
      medicationId: { $in: medicationIds }
    });

    const stockMap = new Map(
      stocks.map((stock) => [
        String(stock.medicationId),
        stock
      ])
    );

    // Vérifier chaque quantité demandée
    const results = medicationIds.map((medicationId) => {
      const stock = stockMap.get(medicationId);
      const requestedQuantity = requested.get(medicationId);
      const availableQuantity = stock ? stock.quantity : 0;

      return {
        medicationId,
        requestedQuantity,
        availableQuantity,
        available: availableQuantity >= requestedQuantity
      };
    });

    const allAvailable = results.every(
      (item) => item.available
    );

    return res.status(200).json({
      available: allAvailable,
      items: results
    });

  } catch (error) {
    console.error("Erreur disponibilité :", error.message);

    return res.status(500).json({
      message: "Erreur lors de la vérification des stocks"
    });
  }
};
