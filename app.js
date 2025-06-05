const express = require("express");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Restaurant API is running");
});

module.exports = app;
