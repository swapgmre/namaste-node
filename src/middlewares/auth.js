const jwt = require("jsonwebtoken");
const User = require("../models/user")


const userAuth = async (req, res, next) => {
  // Read the token from the request cookies
  try {

    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      throw new Error("Token is not valid!!!!");
    }

    // Validate the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$223");

    const { _id } = decodedObj; //getting data/user from the object

    // If id is present I will Find the user from the User Model

    const user = await User.findById(_id);
    // if user is not present
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next(); //next is called to move to the request handler
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`)
  }

};

module.exports = {
  userAuth,
}