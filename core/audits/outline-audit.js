const Audit = require("lighthouse").Audit;
const validator = require("html-validator");

class OutlineAudit extends Audit {
  static get meta() {
    return {
      id: "outline-audit",
      title: "outline-audit",
      description: "Check document outline headings",
      failureDescription: "",
      helpText: "[Learn more](http://html5doctor.com/outlines/)",
      requiredArtifacts: ["Outline"]
    };
  }

  static audit(artifacts) {
    const documentAllHeadings = artifacts.Outline;

    const outline = documentAllHeadings.map(h => {
      h.level = parseInt(h.tagName.toLowerCase().substring(1), 10);
      return h;
    });

    const messages = [];

    if (outline.length === 0) {
      messages.push({
        tagName: "H",
        text: "",
        message: `The page doesn't have any headings`
      });
    }

    if (outline[0].level !== 1) {
      messages.push({
        ...outline[0],
        message: `Your first heading is ${outline[0].tagName}, it should be H1`
      });
    }
    for (let i = 1; i < outline.length; i++) {
      const prevH = outline[i - 1];
      const currentH = outline[i];
      const levelDiff = currentH.level - prevH.level;
      if (levelDiff > 1) {
        messages.push({
          ...outline[i],
          message: `This heading doesn't fallow the heading hierarchy,
            the previos one is ${prevH.tagName}, the current one is ${
            currentH.tagName
          }`
        });
      }
    }

    const headings = [
      { key: "tagName", itemType: "text", text: "Tag" },
      { key: "message", itemType: "text", text: "Message" },
      { key: "text", itemType: "text", text: "text" }
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

module.exports = OutlineAudit;
