const Gatherer = require("lighthouse").Gatherer;

class Outline extends Gatherer {
  afterPass(options, loadData) {
    const driver = options.driver;
    const expression = `(function() {
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      return Array.from(elements)
        .map(node => ({
          tagName: node.tagName,
          text: node.textContent
        }));
    })()`;

    return driver.evaluateAsync(expression);
  }
}

module.exports = Outline;
