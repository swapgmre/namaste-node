const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  // try {
  // Logic of DB call and get user data
  // throw new Error("nfindsmd");
  res.send("User Data Sent");
  // } catch (error) {
  res.status(500).send("Some error contact support team");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your err
    res.status(500).send("Sonmething went wrong")
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
