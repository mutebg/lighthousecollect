const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");
const lighthouse = require("../core/lighthouse");
const utils = require("../core/utils");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
const staticPath = path.join(__dirname, "../dist");
app.use(express.static(staticPath));

//DB setup
const mongoose = require("mongoose");
const db =
  "mongodb://admin:7HDO94TwHk1fUjHq@cluster0-shard-00-00-3sglf.mongodb.net:27017,cluster0-shard-00-01-3sglf.mongodb.net:27017,cluster0-shard-00-02-3sglf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
//const db = "mongodb://db/app"
mongoose.connect(db);

const report = require("./model");

app.post("/do", (req, res) => {
  const config = req.body;
  config.urls = utils.prepareUrls(config);
  // res.json(config);
  // return;
  //is global object so anyone can access the config trought files
  globalConfig = config;

  //run lighthouse
  lighthouse
    .run(config)
    .then(rawData => {
      const created = rawData.map(rawDataItem => {
        rawDataItem.project = config.project;
        rawDataItem.task = config.task;
        return report.create(rawData);
      });
      return Promise.all(created).then(
        res.send({
          ok: true
        })
      );
    })
    .catch(console.log);
});

app.get("/api/project", (req, res) => {
  return report.getProjects().then(data => res.json(data));
});

app.get("/api/list/", (req, res) => {
  const extraFilters = ["project", "url", "task", "dateFrom", "dateTo"];
  const filter = extraFilters.reduce((prev, next) => {
    if (req.query[next]) {
      prev[next] = req.query[next];
    }
    return prev;
  }, {});
  return report.getList(filter).then(data => res.json(data));
});

app.get("/api/view/:id", (req, res) => {
  return report.getById(req.params.id).then(data => res.json(data));
});

module.exports = app;
