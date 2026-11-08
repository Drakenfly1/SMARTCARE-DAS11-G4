
const express = require("express");
const router = express.Router();

const controller = require("../controllers/stockController");

router.post("/", controller.createStock);
router.get("/", controller.getAllStocks);
router.get("/alerts", controller.getLowStocks);
router.get("/:id", controller.getStockById);

module.exports = router;
