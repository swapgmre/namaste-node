const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://swapgmre:0iMzTbVymupjUjiz@namastenode.ktish.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

