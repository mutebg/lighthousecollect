const Gatherer = require("lighthouse").Gatherer;

class TakeHTML extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    return driver.evaluateAsync(
      "new XMLSerializer().serializeToString(document)"
    );
  }
}

module.exports = TakeHTML;
