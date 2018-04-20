const Audit = require("lighthouse").Audit;
const objectKeyValidator = require("../helpers/validators").objectKeyValidator;

class FacebookAudit extends Audit {
  static get meta() {
    return {
      name: "facebook-audit",
      description: "....TODO....",
      failureDescription: "....TODO....",
      helpText: "....TODO....",
      requiredArtifacts: ["Microdata"]
    };
  }

  static audit(artifacts) {
    const { metatags } = artifacts.Microdata;
    const rules = ["og:url", "og:title", "og:description", "og:image"];
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

module.exports = FacebookAudit;
