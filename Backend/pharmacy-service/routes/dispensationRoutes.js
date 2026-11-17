
const express = require("express");
const router = express.Router();

const controller = require("../controllers/dispensationController");

// Consulter les délivrances
router.get("/", controller.getAllDispensations);

// Consulter une délivrance par ID
router.get("/:id", controller.getDispensationById);

// Créer une demande de délivrance
router.post("/", controller.createDispensation);

// Annuler une demande en attente
router.patch("/:id/cancel", controller.cancelDispensation);

// Préparer la confirmation d'une délivrance
router.patch("/:id/confirm", controller.confirmDispensation);

module.exports = router;
