const mergeWith = require("lodash/mergeWith");
const merge = require("lodash/merge");
const isUndefined = require("lodash/isUndefined");
const isArray = require("lodash/isArray");
const cloneDeep = require("lodash/cloneDeep");
const nodemailer = require("nodemailer");

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
  if (config.options && !config.options.notifications) {
    config.options.notifications = {
      when: "never",
      email: ""
    };
  }
  return config;
};

const getUrlOptions = (config, url) => config.urls[url];

// gether list of unachieved goals
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
    if (!isUndefined(goalScore) && score < goalScore) {
      errors.push(`${json.url} : ${name} score ${score} of ${goalScore} goal`);
    }

    //compare score on audit level
    audits.forEach(({ id, score }) => {
      const goalScore = auditsSet[id];
      if (!isUndefined(goalScore) && score < goalScore) {
        errors.push(`${json.url} : ${id} score ${score} of ${goalScore} goal`);
      }
    });
  });

  return errors;
};

// send email with all errors
const sendNotification = async (config, errors) => {
  const { when, email } = config.notifications;

  if (when !== "never" && email) {
    try {
      await nodemailer.createTestAccount();
      const SMTP = process.env.SMTP;
      const transporter = nodemailer.createTransport(SMTP);
      const text = errors.length === 0 ? "No errors" : errors.join(" | ");

      let message = {
        to: email,
        subject: "LighthouseCollect report",
        text
      };
      const info = await transporter.sendMail(message);
      // TODO
      console.log({ info });
    } catch (e) {
      console.log("Error sending email", e);
    }
  }
};

module.exports = {
  prepareConfig,
  getUrlOptions,
  checkGoals,
  sendNotification
};
