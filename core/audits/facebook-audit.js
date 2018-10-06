const Audit = require("lighthouse").Audit;
const objectKeyValidator = require("../helpers/validators").objectKeyValidator;

class FacebookAudit extends Audit {
  static get meta() {
    return {
      id: "facebook-audit",
      title: "facebook-audit",
      description: "The page has all metatags for sharing on Facebook",
      failureDescription: "",
      helpText:
        "[Learn more](https://developers.facebook.com/docs/sharing/webmasters#markup)",
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
      rawValue: errors.length === 0,
      scoreDisplayMode: "binary",
      score: Number(errors.length === 0),
      details
    };
  }
}

module.exports = FacebookAudit;
