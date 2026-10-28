// הקמת מסד הנתונים: יוצר את הטבלאות ומכניס את מתכוני הבסיס (אם הטבלה ריקה)
// הרצה: npm run setup-db
const fs = require('fs');
const path = require('path');
const { pool, query } = require('./db');

async function setup() {
    const schema = fs.readFileSync(path.join(__dirname, 'sql', 'schema.sql'), 'utf8');
    await query(schema);
    console.log("הטבלאות מוכנות");

    const recipesFile = path.join(__dirname, 'sql', 'recipes.json');
    const { rows } = await query(`SELECT count(*)::int AS count FROM recipes`);
    if (rows[0].count > 0) {
        console.log(`יש כבר ${rows[0].count} מתכונים, לא מוסיף מתכוני בסיס`);
        return;
    }

    const recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));
    for (const r of recipes) {
        await query(
            `INSERT INTO recipes (name, servings, type, time, level, views, product, directions, image, tags, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)`,
            [r.name, r.servings, r.type, r.time, r.level, r.views || 0, r.product, r.directions, r.image, r.tags]
        );
    }
    console.log(`נוספו ${recipes.length} מתכונים`);
}

setup()
    .catch(err => {
        console.log("שגיאה בהקמת מסד הנתונים:", err.message);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
