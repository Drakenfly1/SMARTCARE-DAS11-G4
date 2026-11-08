
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue dans Pharmacy Service"
  });
});

app.get("/api/pharmacy/health", (req, res) => {
  res.json({
    service: "pharmacy-service",
    status: "OK"
  });
});

module.exports = app;
