const cloudinary = require("cloudinary").v2;
const {config} = require("dotenv");

 
config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

function uploadImage(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        resolve(result.secure_url);
      } else {
        console.log(error.message + " failed to upload");
        reject({ message: error.message });
      }
    });
  });
};

module.exports = {
  uploadImage
  //,
  // uploadMultipleImages: (images) => {
  //   return new Promise((resolve, reject) => {
  //     const uploads = images.map((base) => uploadImage(base));
  //     Promise.all(uploads)
  //       .then((values) => resolve(values))
  //       .catch((err) => reject(err));
  //   });
  // },
};
