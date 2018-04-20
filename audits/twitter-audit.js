const Audit = require("lighthouse").Audit;
const objectKeyValidator = require("../helpers/validators").objectKeyValidator;

class TwitterAudit extends Audit {
  static get meta() {
    return {
      name: "twitter-audit",
      description: "....TODO....",
      failureDescription: "....TODO....",
      helpText: "....TODO....",
      requiredArtifacts: ["Microdata"]
    };
  }

  static audit(artifacts) {
    const { metatags } = artifacts.Microdata;
    const rules = [
      "twitter:card",
      "twitter:site",
      "twitter:title",
      "twitter:description",
      "twitter:image"
    ];
    const errors = objectKeyValidator(rules, metatags);
    const headings = [{ key: "message", itemType: "text", text: "type" }];
    const messages = errors.map(message => ({ message: "Missing " + message }));
    const details = Audit.makeTableDetails(headings, messages);
    return {
      rawValue: false,
      score: errors.length === 0,
      details
    };
  }
}

module.exports = TwitterAudit;
