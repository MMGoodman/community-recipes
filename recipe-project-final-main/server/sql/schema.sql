-- מבנה הטבלאות של "המתכון קהילתי"

-- משתמשים
create table if not exists users (
    id          integer generated always as identity primary key,
    f_name      text not null,
    l_name      text not null,
    email       text not null unique,
    password    text not null,               -- מוצפנת ב-bcrypt
    admin       boolean not null default false,
    editor      boolean not null default false,
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);

-- מתכונים
create table if not exists recipes (
    id          integer generated always as identity primary key,
    owner_id    integer references users(id) on delete set null,   -- מי העלה את המתכון
    name        text not null,
    servings    integer not null,
    type        text not null,               -- חלבי / בשרי / פרווה
    time        text not null,               -- זמן הכנה בפורמט שעות:דקות
    level       text not null,               -- רמת קושי
    views       integer not null default 0,
    product     text[] not null,             -- רשימת מוצרים
    directions  text[] not null,             -- שלבי הכנה
    image       text not null,               -- כתובת התמונה ב-Cloudinary
    tags        text[] not null default '{}',
    is_active   boolean not null default false,   -- מוצג באתר רק אחרי אישור מנהל
    created_at  timestamptz not null default now()
);

-- מתכונים מועדפים: קשר רבים-לרבים בין משתמשים למתכונים
create table if not exists favorites (
    user_id     integer not null references users(id) on delete cascade,
    recipe_id   integer not null references recipes(id) on delete cascade,
    primary key (user_id, recipe_id)
);
