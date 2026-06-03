const mongoose = require('mongoose');
const { config } = require('dotenv');

config(); // טוען את המשתנים מקובץ .env

function connect() {
  // בדיקה שהמשתנה בכלל קיים לפני שמנסים להתחבר
  if (!process.env.MONGO_URL) {
      console.error("❌ Error: MONGO_URL is missing from .env file");
      return;
  }

  mongoose
    .connect(process.env.MONGO_URL, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    })
    .then(async () => {
      console.log("✅ Connected to MongoDB");
      console.log("📦 Database Name:", mongoose.connection.name);

      // מחיקת אינדקס ישן username_1 שגורם לבעיה בהרשמה
      try {
        const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (collections.length > 0) {
          const indexes = await mongoose.connection.db.collection('users').indexes();
          const staleIndex = indexes.find(idx => idx.name === 'username_1');
          if (staleIndex) {
            await mongoose.connection.db.collection('users').dropIndex('username_1');
            console.log("🧹 Dropped stale username_1 index from users collection");
          }
        }
      } catch (err) {
        // האינדקס לא קיים או כבר נמחק - בסדר
      }
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}

module.exports = { connect };