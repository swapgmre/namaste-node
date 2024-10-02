const express = require("express");

const app = express();


app.use("/user", [(req, res, next) => {
  console.log("Handling the route user 1!!");
  next();
},
(req, res, next) => {
  console.log("Handling the route user 2!!");
  next();
}],
  (req, res, next) => {
    console.log("Handling the route user 3!!");
    next()
  },
  (req, res) => {
    console.log("Handling the route user 4!!");
    res.send("Response 4 !!");
  }
);


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
