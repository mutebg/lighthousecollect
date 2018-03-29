const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
// const CL = require("chrome-launcher");
//
// const { launch, LaunchedChrome } = CL;

const urls = ["http://elements.nl"];
const config = {
  passes: [
    {
      recordTrace: true,
      pauseBeforeTraceEndMs: 5000,
      pauseAfterNetworkQuietMs: 2500,
      useThrottling: true,
      gatherers: []
    }
  ],

  audits: [
    "first-meaningful-paint",
    "speed-index-metric",
    "estimated-input-latency",
    "first-interactive",
    "consistently-interactive"
  ]
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

chromeLauncher
  .launch({
    chromeFlags: ["--headless"]
  })
  .then(chrome => {
    flags.port = chrome.port;
    return Promise.all(urls.map(url => lighthouse(url, flags, config))).then(
      results =>
        chrome.kill().then(() => {
          console.log(results);
        })
    );
  });
