const express = require('express');
const path = require('path');
const app = express();
const { userRouter } = require('./user/user.router');
const { recipeRouter } = require('./recipe/recipe.router');
const { uplaodRouter } = require('./uploadPhoto/uplaod.router')
const cors = require('cors');

app.use(cors());

app.use(express.json({ limit: "250mb" }));
app.use((req, res, next) => {
  console.log("use");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/uplaod', uplaodRouter);

// serve React client in production
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// ב-Vercel הקובץ נטען כפונקציה (api/index.js) ולא מאזין לפורט
module.exports = app;

const PORT = process.env.PORT || 8000;
if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`the port is listening on ${PORT}`));
}
