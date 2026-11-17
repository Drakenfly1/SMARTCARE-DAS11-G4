
const express = require("express");
const router = express.Router();

const controller = require("../controllers/stockController");
const stockAvailabilityController = require("../controllers/stockAvailabilityController");
const stockReferenceController = require("../controllers/stockReferenceController");

router.post("/", controller.createStock);
router.get("/", controller.getAllStocks);
router.get("/alerts", controller.getLowStocks);
router.get("/:id", controller.getStockById);
router.post("/check-availability", stockAvailabilityController.checkAvailability);
router.post("/check-by-references", stockReferenceController.checkByReferences);

module.exports = router;
