const util = require("util");
const path = require("path");
const writeFile = util.promisify(require("fs").writeFile);
const request = require("request-promise-native");
const mergeWith = require("lodash/mergeWith");
const merge = require("lodash/merge");
const isArray = require("lodash/isArray");
const cloneDeep = require("lodash/cloneDeep");
const validator = require("./validator");

const prepareConfig = config => {
  if (!config.task) {
    config.task = +new Date();
  }

  // prepare urls
  const standartOptions = config.options;
  const mergeCustomizer = (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    } else {
      return merge(objValue, srcValue);
    }
  };

  config.urls = config.urls.reduce((prev, curr) => {
    if (typeof curr === "string") {
      prev[curr] = standartOptions;
    } else if (curr.url) {
      const currentOptions = curr.options;
      if (currentOptions) {
        prev[curr.url] = mergeWith(
          currentOptions,
          cloneDeep(standartOptions),
          mergeCustomizer
        );
      } else {
        prev[curr.url] = standartOptions;
      }
    }
    return prev;
  }, {});

  return config;
};

const getUrlOptions = (config, url) => config.urls[url];

module.exports = {
  prepareConfig,
  getUrlOptions
};
