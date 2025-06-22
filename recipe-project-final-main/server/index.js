const express = require('express');
const app = express();
require('./db').connect()
const { userRouter } = require('./user/user.router');
const { recipeRouter } = require('./recipe/recipe.router');
const { uplaodRouter } = require('./uploadPhoto/uplaod.router')
const cors = require('cors');

app.use(cors());


app.use(express.json({ limit: "250mb" }));
// app.use(express.urlencoded({ limit: "250mb" }));
app.use((req, res, next) => {
  console.log("use");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});



app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/uplaod', uplaodRouter);

app.listen(8000, () =>
  console.log("the port is listening on 8000"));