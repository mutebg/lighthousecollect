const validator = require("html-validator");
const options = {
  format: "json"
};

const run = ({ urls }) => {
  return Promise.all(
    urls.map(url =>
      validator({
        url,
        ...options
      })
    )
  );
};

module.exports = {
  run
};
