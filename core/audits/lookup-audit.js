const Audit = require("lighthouse").Audit;
const utils = require("../utils");

class LookupAudit extends Audit {
  static get meta() {
    return {
      name: "lookup-audit",
      description: "Check for existing text inside the code",
      failureDescription: "",
      helpText: "More information TODO",
      requiredArtifacts: ["URL", "TakeHTML"]
    };
  }

  static audit(artifacts, options) {
    const html = artifacts.TakeHTML;
    const url = artifacts.URL.initialUrl;
    const lookupFor = utils.getUrlOptions(globalConfig, url).lookup;
    const errors = lookupFor
      .map(item => {
        const isHere = html.includes(item);
        if (isHere) {
          return true;
        }
        return {
          item
        };
      })
      .filter(item => item !== true);

    const headings = [{ key: "item", itemType: "text", text: "Text" }];
    const details = Audit.makeTableDetails(headings, errors);

    return {
      rawValue: false,
      score: errors.length === 0,
      details
    };
  }
}

module.exports = LookupAudit;
