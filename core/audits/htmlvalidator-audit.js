const Audit = require("lighthouse").Audit;
const validator = require("html-validator");
const options = {
  format: "json"
};

class HTMLvalidatorAudit extends Audit {
  static get meta() {
    return {
      id: "htmlvalidator-audit",
      title: "htmlvalidator-audit",
      description: "Page has a valid HTML",
      failureDescription: "",
      helpText:
        "For more detail view check W3C validator [Learn more](https://validator.w3.org/)",
      requiredArtifacts: ["TakeHTML"]
    };
  }

  static audit(artifacts) {
    const html = artifacts.TakeHTML;
    options.data = html;

    return validator(options)
      .then(data => {
        const headings = [
          { key: "type", itemType: "text", text: "type" },
          { key: "message", itemType: "text", text: "type" },
          { key: "lastLine", itemType: "text", text: "type" },
          { key: "firstColumn", itemType: "text", text: "type" },
          { key: "extract", itemType: "text", text: "type" }
        ];
        const messages = data.messages
          .filter(({ type }) => type === "error")
          .map(({ type, message, lastLine, firstColumn, extract }) => ({
            type,
            message,
            lastLine,
            firstColumn,
            extract
          }));
        const details = Audit.makeTableDetails(headings, messages);

        return {
          details,
          rawValue: messages.length === 0,
          scoreDisplayMode: "binary",
          score: Number(messages.length === 0)
        };
      })
      .catch(error => {
        console.error(error);
      });
  }
}

module.exports = HTMLvalidatorAudit;
