
const Medication = require("../models/Medication");
const Stock = require("../models/Stock");

// Vérifier les stocks à partir des références des médicaments
exports.checkByReferences = async (req, res) => {
  try {
    const { items } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "La liste des médicaments est obligatoire"
      });
    }

    const requested = new Map();

    for (const item of items) {
      if (
        !item ||
        typeof item.reference !== "string" ||
        !item.reference.trim() ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          message: "Référence ou quantité invalide"
        });
      }

      const reference = item.reference.trim();
      const total =
        (requested.get(reference) || 0) + item.quantity;

      if (!Number.isSafeInteger(total)) {
        return res.status(400).json({
          message: "Quantité totale invalide"
        });
      }

      requested.set(reference, total);
    }

    const references = [...requested.keys()];

    const medications = await Medication.find({
      reference: { $in: references }
    });

    const results = [];

    for (const reference of references) {
      const matches = medications.filter(
        (med) => med.reference === reference
      );

      const quantity = requested.get(reference);

      if (matches.length !== 1) {
        results.push({
          reference,
          requestedQuantity: quantity,
          available: false,
          reason: matches.length === 0
            ? "MEDICATION_NOT_FOUND"
            : "AMBIGUOUS_REFERENCE"
        });
        continue;
      }

      const medication = matches[0];

      const stock = await Stock.findOne({
        medicationId: medication._id
      });

      const availableQuantity = stock
        ? stock.quantity
        : 0;

      results.push({
        reference,
        medicationId: medication._id,
        medicationName: medication.name,
        requestedQuantity: quantity,
        availableQuantity,
        available: availableQuantity >= quantity
      });
    }

    return res.status(200).json({
      available: results.every((item) => item.available),
      items: results
    });

  } catch (error) {
    console.error("Erreur vérification références :", error);

    return res.status(500).json({
      message: "Erreur lors de la vérification"
    });
  }
};
