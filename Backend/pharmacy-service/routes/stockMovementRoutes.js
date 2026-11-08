
const express = require("express");
const router = express.Router();

const controller = require("../controllers/stockMovementController");

router.post("/", controller.createMovement);
router.get("/", controller.getAllMovements);

module.exports = router;
