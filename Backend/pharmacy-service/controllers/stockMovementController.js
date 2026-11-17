
const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");

// Enregistrer une entrée ou une sortie de stock
exports.createMovement = async (req, res) => {
    const { stockId, type, quantity, reason } = req.body;

    // Vérifier l'identifiant
    if (!mongoose.isValidObjectId(stockId)) {
        return res.status(400).json({
            message: "Identifiant de stock invalide"
        });
    }

    // Vérifier le type de mouvement
    if (!["IN", "OUT"].includes(type)) {
        return res.status(400).json({
            message: "Type invalide : IN ou OUT attendu"
        });
    }

    // Vérifier la quantité
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
            message: "La quantité doit être un entier positif"
        });
    }

    // Vérifier la raison
    if (typeof reason !== "string" || !reason.trim()) {
        return res.status(400).json({
            message: "La raison est obligatoire"
        });
    }

    try {
        const difference = type === "IN"
            ? quantity
            : -quantity;

        const filter = { _id: stockId };

        // Empêcher une sortie si le stock est insuffisant
        if (type === "OUT") {
            filter.quantity = { $gte: quantity };
        }

        // Mettre à jour le stock sans transaction
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
            const exists = await Stock.exists({
                _id: stockId
            });

            return res.status(exists ? 409 : 404).json({
                message: exists
                    ? "Stock insuffisant"
                    : "Stock introuvable"
            });
        }

        // Enregistrer l'historique du mouvement
        let movement;

        try {
            movement = await StockMovement.create({
                stockId,
                type,
                quantity,
                reason: reason.trim()
            });
        } catch (historyError) {
            console.error(
                "Échec enregistrement historique :",
                historyError.message
            );

            return res.status(500).json({
                message: "Stock modifié, mais historique non enregistré. Vérification manuelle nécessaire.",
                stockId: stock._id,
                quantityAfterUpdate: stock.quantity
            });
        }

        return res.status(201).json({
            message: "Mouvement enregistré avec succès",
            stock,
            movement
        });

    } catch (error) {
        console.error("Erreur mouvement :", error.message);

        return res.status(500).json({
            message: "Erreur lors de l'enregistrement du mouvement"
        });
    }
};

// Afficher l'historique des mouvements
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

        return res.status(200).json(movements);

    } catch (error) {
        console.error("Erreur historique :", error.message);

        return res.status(500).json({
            message: "Erreur lors de la récupération des mouvements"
        });
    }
};
