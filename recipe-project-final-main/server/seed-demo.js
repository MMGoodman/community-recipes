// משתמשי דוגמה להצגת האתר: מנהל, עורך ושני משתמשים, עם מועדפים ומתכונים שמחכים לאישור
// הרצה חוזרת מחזירה את נתוני הדוגמה למצב ההתחלתי ולא נוגעת במשתמשים אחרים
// הרצה: npm run seed-demo
// הסיסמה נשאלת בזמן ההרצה כדי שלא תישמר בקוד (הריפו ציבורי)
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

function askPassword() {
    if (process.env.DEMO_PASSWORD) return Promise.resolve(process.env.DEMO_PASSWORD);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question("Choose a password for the demo users: ", answer => {
        rl.close();
        resolve(answer);
    }));
}

async function seed() {
    const demo = JSON.parse(fs.readFileSync(path.join(__dirname, 'sql', 'demo.json'), 'utf8'));
    const password = (await askPassword()).trim();
    if (password.length < 6) throw new Error("the password must be at least 6 characters");
    const hash = await bcrypt.hash(password, 10);

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const ids = {};
        for (const u of demo.users) {
            const { rows } = await client.query(
                `INSERT INTO users (f_name, l_name, email, password, admin, editor, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6, true)
                 ON CONFLICT (email) DO UPDATE
                 SET f_name = $1, l_name = $2, password = $4, admin = $5, editor = $6, is_active = true
                 RETURNING id`,
                [u.fName, u.lName, u.email, hash, u.admin, u.editor]
            );
            ids[u.email] = rows[0].id;
        }
        const demoIds = Object.values(ids);

        // מנקים מה שנשאר מהרצה קודמת או מחזרה על ההצגה
        const ownedNames = Object.values(demo.owned).flat();
        await client.query(`DELETE FROM favorites WHERE user_id = ANY($1)`, [demoIds]);
        await client.query(`DELETE FROM recipes WHERE owner_id = ANY($1) AND NOT (name = ANY($2))`, [demoIds, ownedNames]);

        // מתכונים קיימים בלי בעלים עוברים למשתמש הדוגמה, כדי שיהיה מה להציג ב"המתכונים שלי"
        for (const [email, names] of Object.entries(demo.owned)) {
            await client.query(
                `UPDATE recipes SET owner_id = $1 WHERE name = ANY($2) AND (owner_id IS NULL OR owner_id = ANY($3))`,
                [ids[email], names, demoIds]
            );
        }

        for (const r of demo.pending) {
            await client.query(
                `INSERT INTO recipes (owner_id, name, servings, type, time, level, product, directions, image, tags, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false)`,
                [ids[r.owner], r.name, r.servings, r.type, r.time, r.level, r.product, r.directions, r.image, r.tags]
            );
        }

        for (const [email, names] of Object.entries(demo.favorites)) {
            await client.query(
                `INSERT INTO favorites (user_id, recipe_id)
                 SELECT $1, id FROM recipes WHERE name = ANY($2) AND is_active
                 ON CONFLICT DO NOTHING`,
                [ids[email], names]
            );
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }

    const host = new URL(process.env.DATABASE_URL).hostname;
    console.log(`Done: ${demo.users.length} demo users and ${demo.pending.length} recipes waiting for approval (database: ${host})`);
}

seed()
    .catch(err => {
        console.log("Failed:", err.message);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
