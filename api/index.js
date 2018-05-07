const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
const staticPath = path.join(__dirname, "../dist");
app.use(express.static(staticPath));

//DB setup
const mongoose = require("mongoose");
const db =
  "mongodb://admin:7HDO94TwHk1fUjHq@cluster0-shard-00-00-3sglf.mongodb.net:27017,cluster0-shard-00-01-3sglf.mongodb.net:27017,cluster0-shard-00-02-3sglf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
//const db = "mongodb://db/app";
mongoose.connect(db);

app.use("/api", require("./endpoints"));

module.exports = app;
