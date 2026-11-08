
const express = require("express");
const router = express.Router();

const controller = require("../controllers/medicamentController");

router.get("/", controller.getAllMedicaments);
router.get("/:id", controller.getMedicamentById);
router.post("/", controller.createMedicament);
router.put("/:id", controller.updateMedicament);
router.delete("/:id", controller.deleteMedicament);

module.exports = router;
