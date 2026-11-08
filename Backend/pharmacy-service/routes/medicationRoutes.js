
const express = require("express");
const router = express.Router();

const controller = require("../controllers/medicationController");

router.get("/", controller.getAllMedications);
router.get("/:id", controller.getMedicationById);
router.post("/", controller.createMedication);
router.put("/:id", controller.updateMedication);
router.delete("/:id", controller.deleteMedication);

module.exports = router;
