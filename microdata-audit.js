const Audit = require("lighthouse").Audit;
const WAE = require("web-auto-extractor").default;
const wae = WAE();

class MicrodataAudit extends Audit {
  static get meta() {
    return {
      name: "microdata-audit",
      description: "....TODO....",
      failureDescription: "....TODO....",
      helpText: "....TODO....",
      requiredArtifacts: ["TakeHTML"]
    };
  }

  static audit(artifacts) {
    const html = artifacts.TakeHTML;
    const data = wae.parse(html);

    let score = 100;
    const reportItems = [];
    const metaErrors = validateMeta(data);
    const facebookErrors = validateFacebook(data);
    const twitterErrors = validateTwitter(data);
    if (metaErrors.length > 0) {
      reportItems.push(
        formatMsg({
          type: "Meta",
          message: `those tags are missing: ${metaErrors.join(", ")}`
        })
      );
      score -= 10;
    }
    if (facebookErrors.length > 0) {
      reportItems.push(
        formatMsg({
          type: "Facebook sharing",
          message: `those tags are missing: ${facebookErrors.join(", ")}`
        })
      );
      score -= 7;
    }
    if (twitterErrors.length > 0) {
      reportItems.push(
        formatMsg({
          type: "Twitter sharing",
          message: `Those tags are missing: ${twitterErrors.join(", ")}`
        })
      );
      score -= 5;
    }
    console.log(reportItems);

    return {
      rawValue: data,
      score,
      displayValue: false,
      details: {
        type: "table",
        header: "View Details",
        itemHeaders: [
          {
            type: "text",
            itemType: "text",
            text: "Info"
          },
          {
            type: "text",
            itemType: "text",
            text: "Description"
          }
        ],
        items: reportItems
      }
    };
  }
}

module.exports = MicrodataAudit;

const metaRules = ["keywords", "description"];
const facebookRules = ["og:url", "og:title", "og:description", "og:image"];
const twitterRules = [
  "twitter:card",
  "twitter:site",
  "twitter:title",
  "twitter:description",
  "twitter:image"
];

const validator = (rules, metatags) => {
  const missing = [];
  rules.forEach(rule => {
    if (!metatags[rule]) {
      missing.push(rule);
    }
  });
  return missing;
};

const validateMeta = ({ metatags }) => validator(metaRules, metatags);
const validateFacebook = ({ metatags }) => validator(facebookRules, metatags);
const validateTwitter = ({ metatags }) => validator(twitterRules, metatags);

const formatMsg = ({ type, message }) => [
  {
    type: "text",
    text: type
  },
  {
    type: "text",
    text: message
  }
];
