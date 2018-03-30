const request = require("request-promise-native");
const WAE = require("web-auto-extractor").default;
const wae = WAE();

const run = ({ urls }) =>
  Promise.all(urls.map(url => request(url).then(body => wae.parse(body))));

module.exports = {
  run
};
