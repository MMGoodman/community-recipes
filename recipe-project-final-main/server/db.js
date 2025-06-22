const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

function connect() {
    try {
        console.log("MONGO_URL =", process.env.MONGO_URL); // ✅ בדיקה לפני

        mongoose.connect(process.env.MONGO_URL)
            .then(res => console.log("connecting"));
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };
