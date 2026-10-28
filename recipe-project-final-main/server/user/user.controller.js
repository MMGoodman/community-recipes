const { query } = require('../db');

// השדות שמוחזרים ללקוח (בלי הסיסמה)
const USER_FIELDS = `
    id AS "_id", f_name AS "fName", l_name AS "lName", email, admin, editor,
    is_active AS "isActive", created_at AS "createdAt"`;


async function create(data) {
    const result = await query(
        `INSERT INTO users (f_name, l_name, email, password, admin)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING ${USER_FIELDS}`,
        [data.fName, data.lName, data.email, data.password, data.admin || false]
    );
    return result.rows[0];
}

async function readByEmail(email) {
    const result = await query(`SELECT ${USER_FIELDS} FROM users WHERE email = $1`, [email]);
    return result.rows[0];
}

// משתמשים פעילים לפי שם פרטי ושם משפחה (בלי הבדל בין אותיות גדולות לקטנות),
// כולל הסיסמה המוצפנת לבדיקת התחברות
async function readByName(fName, lName) {
    const result = await query(
        `SELECT ${USER_FIELDS}, password FROM users
         WHERE lower(f_name) = lower($1) AND lower(l_name) = lower($2) AND is_active = true`,
        [fName, lName]
    );
    return result.rows;
}

async function readAll() {
    const result = await query(`SELECT ${USER_FIELDS} FROM users ORDER BY id`);
    return result.rows;
}

async function countAdmins() {
    const result = await query(`SELECT count(*)::int AS count FROM users WHERE admin = true`);
    return result.rows[0].count;
}

async function setRole(id, admin, editor) {
    const result = await query(
        `UPDATE users SET admin = $2, editor = $3 WHERE id = $1 RETURNING ${USER_FIELDS}`,
        [id, admin, editor]
    );
    return result.rows[0];
}

// מחיקה "רכה": המשתמש מסומן כלא פעיל
async function del(id) {
    const result = await query(`UPDATE users SET is_active = false WHERE id = $1`, [id]);
    return { modifiedCount: result.rowCount };
}

// שמות המתכונים המועדפים של משתמש
async function readFavorites(userId) {
    const result = await query(
        `SELECT r.name AS recipe
         FROM favorites f
         JOIN recipes r ON r.id = f.recipe_id
         WHERE f.user_id = $1`,
        [userId]
    );
    return result.rows;
}

async function addFavorite(userId, recipeName) {
    const result = await query(
        `INSERT INTO favorites (user_id, recipe_id)
         SELECT $1, id FROM recipes WHERE name = $2
         ON CONFLICT DO NOTHING`,
        [userId, recipeName]
    );
    return result.rowCount;
}

// מחיקת מתכון ממועדפים
async function delFavorite(filter) {
    const result = await query(
        `DELETE FROM favorites
         WHERE user_id = $1 AND recipe_id IN (SELECT id FROM recipes WHERE name = $2)`,
        [filter.userId, filter.recipeName]
    );
    if (result.rowCount === 0) {
        throw new Error('מתכון לא נמצא');
    }
    return result.rowCount;
}

module.exports = {
    create,
    readByEmail,
    readByName,
    readAll,
    countAdmins,
    setRole,
    del,
    readFavorites,
    addFavorite,
    delFavorite
};
