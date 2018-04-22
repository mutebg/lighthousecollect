const WAE = require("web-auto-extractor").default;
const Gatherer = require("lighthouse").Gatherer;

class Microdata extends Gatherer {
  afterPass(options, loadData) {
    const driver = options.driver;
    return driver
      .evaluateAsync("new XMLSerializer().serializeToString(document)")
      .then(html => {
        const wae = WAE();
        const results = wae.parse(html);
        return Promise.resolve(results);
      });
  }
}

module.exports = Microdata;
