const mongoose = require('mongoose');
const { config } = require('dotenv');

config(); // טוען את משתני הסביבה מקובץ .env

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("✅ Connected to MongoDB");
      console.log("📦 Database:", mongoose.connection.name);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
    });
}

module.exports = { connect };
