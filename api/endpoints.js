const express = require("express");
const router = express.Router();
const report = require("./model");
const _ = require("lodash");
const lighthouse = require("../core/lighthouse");
const utils = require("../core/utils");
const transforms = require("./transforms");

router.post("/do", (req, res) => {
  let config = req.body;
  config.urls = utils.prepareUrls(config);
  config = utils.validateConfig(config);
  //return res.json(config);
  //is global object so anyone can access the config trought files
  globalConfig = config;

  //run lighthouse
  lighthouse
    .run(config)
    .then(rawData => {
      const created = rawData.map(rawDataItem => {
        rawDataItem.project = config.project;
        rawDataItem.task = config.task;
        return report.create(rawDataItem);
      });
      return Promise.all(created).then(data => {
        const shortData = data.map(({ _id, task, url }) => ({
          _id,
          task,
          url
        }));
        res.json(shortData);
      });
    })
    .catch(console.log);
});

router.get("/projects", (req, res) => {
  return report.getProjects().then(data => res.json(data));
});

router.get("/list/", (req, res) => {
  const extraFilters = ["project", "url", "task"];
  const filter = extraFilters.reduce((prev, next) => {
    if (req.query[next]) {
      prev[next] = req.query[next];
    }
    return prev;
  }, {});

  // date filter
  const { dateFrom, dateTo } = req.query;
  const datetimeFrom = dateFrom
    ? new Date(Date.parse(dateFrom + " 00:00:00"))
    : null;
  const datetimeTo = dateTo ? new Date(Date.parse(dateTo + " 23:59:59")) : null;
  if (datetimeFrom && datetimeTo) {
    filter["generatedTime"] = { $gt: datetimeFrom, $lt: datetimeTo };
  } else if (datetimeFrom) {
    filter["generatedTime"] = { $gt: datetimeFrom };
  } else if (datetimeTo) {
    filter["generatedTime"] = { $lt: datetimeTo };
  }

  return report.getList(filter).then(data => {
    const map = {};
    const groupedByTask = data.reduce((prev, current) => {
      let index = map[current.task];
      if (typeof index === "undefined") {
        prev.push({
          task: current.task,
          generatedTime: current.generatedTime,
          urls: []
        });
        index = prev.length - 1;
        map[current.task] = index;
      }

      const short = {
        id: current._id,
        url: current.url,
        data: transforms.overview(current),
        total: Math.round(current.score)
      };

      prev[index].urls.push(short);

      return prev;
    }, []);

    res.json(groupedByTask);
  });
});

router.get("/view/:id/json", (req, res) => {
  return report.getById(req.params.id).then(data => res.json(data));
});
router.get("/view/:id/html", (req, res) => {
  const ReportGenerator = require("../node_modules/lighthouse/lighthouse-core/report/v2/report-generator");
  return report.getById(req.params.id).then(json => {
    const html = new ReportGenerator().generateReportHtml(json);
    res.send(html);
  });
});

module.exports = router;
