const Gatherer = require("lighthouse").Gatherer;
const request = require("request-promise-native");

class Structuredata extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    return driver
      .evaluateAsync("new XMLSerializer().serializeToString(document)")
      .then(html =>
        request({
          method: "POST",
          url:
            " https://search.google.com/structured-data/testing-tool/validate",
          form: {
            //url: options.initialUrl
            html
          }
        }).then(data => {
          try {
            const data_ = data.substring(4);
            const data_array = JSON.parse(data_);
            return Promise.resolve(data_array);
          } catch (err) {
            return Promise.reject(err);
          }
        })
      );
  }
}

module.exports = Structuredata;
