const Audit = require("lighthouse").Audit;
const objectKeyValidator = require("../helpers/validators").objectKeyValidator;

class TwitterAudit extends Audit {
  static get meta() {
    return {
      id: "twitter-audit",
      title: "twitter-audit",
      description: "The page has all metatags for sharing on Twitter",
      failureDescription: "",
      helpText:
        "[Learn more](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup)",
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
      details,
      rawValue: errors.length === 0,
      scoreDisplayMode: "binary",
      score: Number(errors.length === 0)
    };
  }
}

module.exports = TwitterAudit;
