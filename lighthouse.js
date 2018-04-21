const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const config = {
  extends: "lighthouse:default",

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [
    {
      passName: "defaultPass",
      gatherers: ["gatherers/html", "gatherers/microdata"]
    }
  ],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
    "audits/facebook-audit",
    "audits/twitter-audit",
    "audits/htmlvalidator-audit"
  ],

  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    microdata: {
      name: "Microdata metrics",
      audits: [
        { id: "twitter-audit", weight: 1 },
        { id: "facebook-audit", weight: 1 }
      ]
    },
    validator: {
      name: "HTML validator metrics",
      audits: [{ id: "htmlvalidator-audit", weight: 1 }]
    }
  }
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
            delete result.artifacts;
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
