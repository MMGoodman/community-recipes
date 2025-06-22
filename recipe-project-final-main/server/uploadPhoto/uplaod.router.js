const exprees = require('express');
uplaodRouter = exprees.Router(); 
const uploadImage=require('./uploadImage')





uplaodRouter.post("/image", async (req, res) => {
    try {
      console.log("in");
      const url = await uploadImage.uploadImage(req.body.image);
      res.send(url);
    } catch (error) {
      console.log(error.message + "\n" + error);
      res.status(500).send({ error: error.message });
    }
  });
module.exports = { uplaodRouter };