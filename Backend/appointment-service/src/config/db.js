const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI manquant dans le fichier .env');
  await mongoose.connect(uri);
  console.log('MongoDB connecté :', mongoose.connection.name);
}

module.exports = connectDB;