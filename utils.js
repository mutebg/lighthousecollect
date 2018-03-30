const config = require("./config.json");

const getUrls = () => config.urls;

const handleError = e => console.log(e);

module.exports = {
  getUrls,
  handleError
};
