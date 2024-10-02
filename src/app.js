const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from dashboard/home")
});

app.get("/hello", (req, res) => {
  res.send("Hello!! Hello!!")
});

app.get("/myserver", (req, res) => {
  res.send("Hello from the Server!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
