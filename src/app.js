const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Swapnil",
    lastName: "Gamre",
    emailId: "swapnil@gmail.com",
    password: "Jnndnn123",
  });

  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});




connectDB()
  .then(() => {
    console.log("Database connection established...")
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  }).catch(err => {
    console.error("Database cannot be connected")
  });


