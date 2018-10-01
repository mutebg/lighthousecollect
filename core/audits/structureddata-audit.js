const Audit = require("lighthouse").Audit;

class StructuredAudit extends Audit {
  static get meta() {
    return {
      id: "structureddata-audit",
      title: "structureddata-audit",
      description: "Check document for structured data",
      failureDescription: "",
      helpText:
        "[Learn more](https://developers.google.com/search/docs/guides/intro-structured-data)",
      requiredArtifacts: ["Structuredata"]
    };
  }

  static audit(artifacts) {
    const data = artifacts.Structuredata;

    const messages = data.errors.map(({ errorType, args }) => ({
      errorType,
      args: args.join(",")
    }));

    const headings = [
      { key: "errorType", itemType: "text", text: "Error" },
      { key: "args", itemType: "text", text: "Message" }
    ];
    const details = Audit.makeTableDetails(headings, messages);

    return {
      details,
      rawValue: messages.length === 0,
      scoreDisplayMode: "binary",
      score: Number(messages.length === 0)
    };
  }
}

module.exports = StructuredAudit;
