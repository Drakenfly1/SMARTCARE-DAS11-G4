require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3002;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`appointment-service démarré sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('Échec du démarrage :', err.message);
    process.exit(1);
  });