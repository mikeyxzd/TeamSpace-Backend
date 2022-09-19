require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI, 'mongodburi');

exports.database = () => {
  mongoose
    .connect(process.env.MONGODB_URI)      
    .then(() => {
      console.log("Connected to database...");
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
