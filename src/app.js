const express = require("express");

const app = express();

// this will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Swapnil", lastName: "Gamre" });
});

app.post("/user", (req, res) => {
  //Savin data to DB
  res.send("Data successfully saved to the Database");
});

app.delete("/user", (req, res) => {
  res.send("User successfully deleted");
})

//this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the Server!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
