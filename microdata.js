var request = require("request-promise-native");
var WAE = require("web-auto-extractor").default;
var wae = WAE();

var urls =
  "https://brandpuntplus.kro-ncrv.nl/brandpuntplus/precap-einde-blindheid/";

request(urls).then(body => {
  var parsed = wae.parse(body);
  console.log(parsed);
});
