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

  if (!config.task) {
    config.task = +new Date();
  }

  if (!config.options.notifications) {
    config.options.notifications = {
      when: "never",
      email: null
    };
  }

  return config;
};

const getUrlOptions = (config, url) => config.urls[url];

const checkGoals = ({ categories, audits }, json) => {
  if (!categories && !audits) {
    return [];
  }
  const errors = [];
  const arrayToSet = (prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  };
  const categoriesSet = categories.reduce(arrayToSet, {});
  const auditsSet = audits.reduce(arrayToSet, {});

  json.reportCategories.forEach(({ name, score, audits }) => {
    // compare score on category level
    const goalScore = categoriesSet[name];
    if (goalScore !== "undefined" && score < goalScore) {
      errors.push(`${json.url} : ${name} score ${score} of ${goalScore} goal`);
    }

    //compare score on audit level
    audits.forEach(({ id, score }) => {
      const goalScore = auditsSet[id];
      if (goalScore !== "undefined" && score < goalScore) {
        errors.push(`${json.url} : ${id} score ${score} of ${goalScore} goal`);
      }
    });
  });

  return errors;
};

const sendNotification = (config, errors) => {
  const { when, email } = config.options.notifications;
  if (when !== "never" && email) {
    console.log("TODO: send notifications to " + email);
  }
};

module.exports = {
  prepareConfig,
  getUrlOptions,
  checkGoals,
  sendNotification
};
