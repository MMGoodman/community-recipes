const { query } = require('../db');

// השדות שמוחזרים ללקוח, בשמות שהלקוח מכיר
const RECIPE_FIELDS = `
    id AS "_id", owner_id AS owner, name, servings, type, time, level, views,
    product, directions, image, tags, is_active AS "isActive", created_at AS "createdAt"`;

// שדות שמותר לחפש לפיהם בנתיב /find/by
const FIND_BY = {
    tags: '$1 = ANY(tags)',
    owner: 'owner_id = $1',
    type: 'type = $1',
    level: 'level = $1',
};

async function create(data) {
    const result = await query(
        `INSERT INTO recipes (owner_id, name, servings, type, time, level, product, directions, image, tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING ${RECIPE_FIELDS}`,
        [data.owner, data.name, data.servings, data.type, data.time, data.level,
        data.product, data.directions, data.image, data.tags || []]
    );
    return result.rows[0];
}

async function readAll(isActive) {
    const result = await query(
        `SELECT ${RECIPE_FIELDS} FROM recipes WHERE is_active = $1 ORDER BY created_at`,
        [isActive]
    );
    return result.rows;
}

async function readById(id) {
    const result = await query(`SELECT ${RECIPE_FIELDS} FROM recipes WHERE id = $1`, [id]);
    return result.rows[0];
}

async function readByName(name) {
    const result = await query(`SELECT ${RECIPE_FIELDS} FROM recipes WHERE name = $1 LIMIT 1`, [name]);
    return result.rows[0];
}

async function readAllBy(field, filter) {
    const condition = FIND_BY[field];
    if (!condition) throw new Error(`אי אפשר לחפש לפי השדה ${field}`);
    // רק מתכונים שאושרו ע"י מנהל
    const result = await query(
        `SELECT ${RECIPE_FIELDS} FROM recipes WHERE is_active = true AND ${condition} ORDER BY created_at`,
        [filter]
    );
    return result.rows;
}

// חיפוש מתכונים ששמם מתחיל בטקסט שהוקלד
async function search(filter) {
    const result = await query(
        `SELECT ${RECIPE_FIELDS} FROM recipes WHERE is_active = true AND starts_with(name, $1) ORDER BY name`,
        [filter]
    );
    return result.rows;
}

async function upDateViews(id) {
    const result = await query(`UPDATE recipes SET views = views + 1 WHERE id = $1`, [id]);
    return { modifiedCount: result.rowCount };
}

// כל התגים של המתכונים המאושרים, בלי כפילויות ובסדר אלפביתי
async function allTags() {
    const result = await query(
        `SELECT DISTINCT unnest(tags) AS tag FROM recipes WHERE is_active = true ORDER BY tag`
    );
    return result.rows.map(row => row.tag);
}

async function updateRecipe(recipeId, data) {
    const result = await query(
        `UPDATE recipes
         SET name = $2, servings = $3, type = $4, time = $5, level = $6,
             product = $7, directions = $8, tags = $9, image = COALESCE($10, image), is_active = $11
         WHERE id = $1
         RETURNING ${RECIPE_FIELDS}`,
        [recipeId, data.name, data.servings, data.type, data.time, data.level,
            data.product, data.directions, data.tags, data.image || null, data.isActive]
    );
    return result.rows[0];
}

async function deleteRecipe(recipeId) {
    const result = await query(`DELETE FROM recipes WHERE id = $1`, [recipeId]);
    return { deletedCount: result.rowCount };
}

module.exports = {
    create,
    readAll,
    readById,
    readByName,
    readAllBy,
    search,
    upDateViews,
    allTags,
    updateRecipe,
    deleteRecipe
}
