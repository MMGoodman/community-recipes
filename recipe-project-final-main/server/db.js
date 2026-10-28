const { Pool } = require('pg');
const { config } = require('dotenv');

config();

const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '');

// מאגר חיבורים אחד לכל השרת (ב-Supabase דרך ה-Transaction pooler)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Supabase דורש חיבור מוצפן; התעודה שלו לא חתומה ע"י גוף ציבורי ולכן לא מאמתים אותה
    ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on('error', err => console.log("Postgres error:", err.message));

// מריץ שאילתת SQL עם פרמטרים ($1, $2...) ומחזיר את השורות
async function query(sql, params = []) {
    const result = await pool.query(sql, params);
    return result;
}

module.exports = { pool, query };
