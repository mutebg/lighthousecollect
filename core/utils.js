const util = require("util");
const path = require("path");
const writeFile = util.promisify(require("fs").writeFile);
const request = require("request-promise-native");
const mergeWith = require("lodash/mergeWith");
const merge = require("lodash/merge");
const isArray = require("lodash/isArray");
const cloneDeep = require("lodash/cloneDeep");
const validator = require("./validator");

//const CONFIG_NAME = "config.json";

const handleError = e => console.log(e);

// const getConfigFile = name => {
//   const configName = name || CONFIG_NAME;
//   try {
//     config = require(path.resolve(process.cwd(), configName));
//     return config;
//   } catch (e) {
//     throw Error("Config does not exists: " + configName);
//   }
// };

// const saveAsFile = ({ task, project, outputpath }, json) => {
//   const fileName = `${project}-${task}.json`;
//   const fullPath = path.resolve(process.cwd(), outputpath, fileName);
//   return writeFile(fullPath, JSON.stringify(json, null, "\t"), "utf8");
// };

// const saveOnWeb = ({ task, project, remoteserver, urls }, json) => {
//   Promise.all(
//     urls.map((url, index) => {
//       const post = {
//         project,
//         url,
//         task,
//         data: json[index]
//       };
//       return request({
//         method: "POST",
//         url: remoteserver + "/api/record",
//         json: true,
//         body: post
//       });
//     })
//   );
// };

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
  handleError,
  //saveAsFile,
  //saveOnWeb,
  //getConfigFile,
  prepareConfig,
  getUrlOptions
};
