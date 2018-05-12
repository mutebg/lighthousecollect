const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
const staticPath = path.join(__dirname, "../build");
app.use(express.static(staticPath));

//DB setup
const mongoose = require("mongoose");
const db = process.env.MONGODB;
//const db = "mongodb://db/app";
mongoose.connect(db);

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname + "/../build/")
  });
});

app.use("/api", require("./endpoints"));

module.exports = app;
