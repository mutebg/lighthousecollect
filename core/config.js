const config = {
  extends: "lighthouse:default",
  settings: {
    skipAudits: ["critical-request-chains"]
  },

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [
    {
      passName: "defaultPass",
      gatherers: [
        "core/gatherers/html",
        "core/gatherers/microdata",
        "core/gatherers/outline",
        "core/gatherers/structureddata"
      ]
    }
  ],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
    "core/audits/facebook-audit",
    "core/audits/twitter-audit",
    "core/audits/htmlvalidator-audit",
    "core/audits/outline-audit",
    "core/audits/lookup-audit",
    "core/audits/structureddata-audit"
  ],

  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    microdata: {
      name: "Microdata metrics",
      description: "TODO",
      audits: [
        { id: "twitter-audit", weight: 1 },
        { id: "facebook-audit", weight: 1 },
        { id: "outline-audit", weight: 1 },
        { id: "lookup-audit", weight: 1 },
        { id: "structureddata-audit", weight: 2 }
      ]
    },
    validator: {
      name: "HTML validator metrics",
      description: "TODO",
      audits: [{ id: "htmlvalidator-audit", weight: 1 }]
    }
  },
  options: {
    bla: 1
  }
};

module.exports = config;
