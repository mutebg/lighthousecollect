const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const config = {
  extends: "lighthouse:default"
};
const flags = {
  runs: 1,
  submit: false,
  upload: false,
  view: false,
  expectations: false,
  json: false,
  chromeFlags: []
  //output: "json"
  //"chrome-flags": "--headless"
};

const run = ({ urls }) =>
  chromeLauncher
    .launch({
      chromeFlags: ["--headless"]
    })
    .then(chrome => {
      flags.port = chrome.port;

      async function executeSequentially() {
        const tasks = urls.map(url => () => lighthouse(url, flags, config));
        const completeTasks = [];
        for (const fn of tasks) {
          try {
            const result = await fn();
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
