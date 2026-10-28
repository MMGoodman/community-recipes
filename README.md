# המתכון קהילתי

פרויקט גמר הנדסאי תוכנה (מה"ט). אתר לשיתוף מתכונים כשרים: משתמשים רשומים מעלים מתכונים, מנהל מאשר אותם, ויש מועדפים, חיפוש ותגיות.

- **צד לקוח:** React + Vite (`recipe-project-final-main/client`)
- **צד שרת:** Node.js + Express (`recipe-project-final-main/server`)
- **מסד נתונים:** PostgreSQL ב-Supabase
- **תמונות:** Cloudinary

## הרצה מקומית

1. בתיקייה `server` יוצרים קובץ `.env` לפי `.env.example`.
2. מתקינים ומקימים את מסד הנתונים (יוצר טבלאות ומכניס מתכוני בסיס):
   ```
   cd recipe-project-final-main/server
   npm install
   npm run setup-db
   npm run dev
   ```
3. בחלון נוסף:
   ```
   cd recipe-project-final-main/client
   npm install
   npm run dev
   ```
4. האתר עולה בכתובת http://localhost:5173

## העלאה ל-Vercel

מייבאים את הריפו ב-Vercel (ההגדרות כבר ב-`vercel.json`) ומוסיפים משתני סביבה:
`DATABASE_URL`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`.

Vercel פונה לאתר פעם ביום כדי שמסד הנתונים החינמי ב-Supabase לא יושהה.

## מנהל מערכת

המשתמש הראשון שנרשם לאתר הופך אוטומטית למנהל. משם אפשר לקבוע תפקידים (מנהל / עורך / משתמש) במסך ניהול המשתמשים באתר.

## אם מסד הנתונים נמחק

פותחים פרויקט חדש ב-Supabase, מעדכנים את `DATABASE_URL` ומריצים `npm run setup-db`.
