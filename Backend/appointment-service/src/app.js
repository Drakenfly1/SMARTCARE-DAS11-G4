const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  const dbUp = mongoose.connection.readyState === 1;
  res.status(dbUp ? 200 : 503).json({
    status: dbUp ? 'UP' : 'DOWN',
    service: 'appointment-service',
    database: dbUp ? 'connected' : 'disconnected',
  });
});

module.exports = app;