const express = require("express");
const router = express.Router();
const report = require("./model");
const lighthouse = require("../core/lighthouse");
const utils = require("../core/utils");
const transforms = require("./transforms");
const validator = require("../core/validator");
const request = require("request-promise-native");

const getFilter = req => {
  const extraFilters = ["project", "uri", "task"];
  const remaped = { uri: "url" };
  const filter = extraFilters.reduce((prev, next) => {
    if (req.query[next]) {
      const key = remaped[next] ? remaped[next] : next;
      prev[key] = req.query[next];
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

  return filter;
};

// start a task
router.post("/do", (req, res) => {
  try {
    let config = req.body;

    const isValid = validator.validateConfig(config);
    if (isValid !== true) {
      throw isValid;
    }

    config = utils.prepareConfig(config);

    //is global object so anyone can access the config trought files
    globalConfig = config;

    //run lighthouse
    lighthouse.run(config).then(rawData => {
      const created = rawData.map(rawDataItem => {
        rawDataItem.project = config.project;
        rawDataItem.task = config.task;
        //save url options part of audit
        const options = utils.getUrlOptions(config, rawDataItem.url);
        rawDataItem.options = options;
        const goalErrors = utils.checkGoals(options.goal, rawDataItem);
        rawDataItem.goalErrors = goalErrors;
        rawDataItem.overview = transforms.overview(rawDataItem, options.goal);
        return report.create(rawDataItem);
      });
      return Promise.all(created).then(data => {
        const shortData = data.map(({ _id, task, url, goalErrors }) => ({
          _id,
          task,
          url,
          goalErrors
        }));
        // collect all errors
        const allErrors = shortData.reduce(
          (prev, curr) => [...prev, ...curr.goalErrors],
          []
        );

        utils.sendNotification(config, allErrors);

        //send different status code when do not pass the goal
        const statusCode = allErrors.length > 0 ? 400 : 200;
        res.status(statusCode);
        res.json(shortData);
      });
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// get list of projects
router.get("/projects", async (req, res) => {
  try {
    const data = await report.getProjects();
    return res.json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// get list of tasks
router.get("/list/", async (req, res) => {
  try {
    const filter = getFilter(req);
    const data = await report.getList(filter);
    const map = {};

    // group urls by task
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
        data: current.overview,
        total: Math.round(current.score)
      };

      prev[index].urls.push(short);

      return prev;
    }, []);

    return res.json(groupedByTask);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// generate report in html format
router.get("/view/:id/html", async (req, res) => {
  try {
    const ReportGenerator = require("../node_modules/lighthouse/lighthouse-core/report/v2/report-generator");
    const json = await report.getById(req.params.id);
    const html = new ReportGenerator().generateReportHtml(json);
    return res.send(html);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// get a data for charts
router.get("/chart/", async (req, res) => {
  try {
    const filter = getFilter(req);
    const data = await report.getList(filter);
    return res.json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//retart a task
router.get("/re/", async (req, res) => {
  try {
    const extraFilters = ["_id", "project", "task"];
    const filter = extraFilters.reduce((prev, next) => {
      if (req.query[next]) {
        prev[next] = req.query[next];
      }
      return prev;
    }, {});
    const list = await report.getList(filter, "id url project options");
    if (list.length === 0) {
      throw Error("Not found");
    }

    // construct JSON payload
    const json = {
      options: {
        notifications: list[0].options.notifications
      },
      project: list[0].project,
      urls: list.map(item => {
        delete item.options.notifications;
        return {
          url: item.url,
          options: item.options
        };
      })
    };

    // don't care about result
    request({
      method: "POST",
      url: "http://localhost:3000/api/do",
      json
    });

    res.json({
      message: "Task has been started"
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get("/test", async (req, res) => {
  utils.sendNotification(
    {
      options: {
        notifications: {
          when: "always",
          email: "i@stoyandelev.com"
        }
      }
    },
    []
  );

  res.json({ test: 1 });
});

module.exports = router;
