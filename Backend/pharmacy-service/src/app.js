
const express = require("express");

const categoryRoutes = require("../routes/categoryRoutes");
const medicationRoutes = require("../routes/medicationRoutes");
const stockRoutes = require("../routes/stockRoutes");
const stockMovementRoutes = require("../routes/stockMovementRoutes");

const app = express();

app.use(express.json());

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue dans Pharmacy Service - SmartCare"
  });
});

// Vérification du fonctionnement
app.get("/api/pharmacy/health", (req, res) => {
  res.status(200).json({
    service: "pharmacy-service",
    status: "OK"
  });
});

// Routes REST
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

module.exports = app;
