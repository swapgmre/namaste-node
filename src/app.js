const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {

  // Validation of data
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password and save user to DB
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User Model
    const user = new User({
      firstName, lastName, emailId, password: passwordHash,
    });


    await user.save();
    res.send("User Added Successfully!!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {

      const token = await user.getJWT();

      const isPasswordValid = await user.validatePassword();

      res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) });
      res.send("Login Successfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
})

app.get("/profile", userAuth, async (req, res) => {

  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  };
});


app.post("/sendConnectionRequest", userAuth, async (req, res) => {

  const user = req.user;

  //Sending a connection request 
  console.log("Sending a connection request");

  res.send(`${user.firstName} is sending a connection request`)

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


