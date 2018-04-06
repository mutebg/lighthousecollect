const a11y = require("a11y");
const options = {
  delay: 5
};

const a11yPromisse = url =>
  new Promise((resolve, reject) => {
    a11y(url, options, (err, reports) => {
      if (err) {
        reject(err);
      } else {
        delete reports.report;
        resolve(reports);
      }
    });
  });

const run = ({ urls }) => {
  return Promise.all(urls.map(a11yPromisse));
};

module.exports = {
  run
};
