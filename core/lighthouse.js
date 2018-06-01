const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const map = require("lodash/map");
const config = require("./config");

const flags = {
  runs: 1,
  submit: false,
  upload: false,
  view: false,
  expectations: false,
  json: false,
  chromeFlags: [],
  "chrome-flags": "--headless"
};

const run = ({ urls }) =>
  chromeLauncher
    .launch({
      chromeFlags: [
        "--headless",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu"
      ]
    })
    .then(chrome => {
      flags.port = chrome.port;

      async function executeSequentially() {
        const tasks = map(urls, (_, url) => () =>
          lighthouse(url, flags, config)
        );
        const completeTasks = [];
        for (const fn of tasks) {
          try {
            const result = await fn();
            delete result.artifacts;
            delete result.audits;
            //delete result.reportGroups;
            completeTasks.push(result);
          } catch (err) {
            console.log(err);
          }
        }

        return completeTasks;
      }

      return executeSequentially().then(completed =>
        chrome.kill().then(() => completed)
      );
    });

module.exports = {
  run
};
