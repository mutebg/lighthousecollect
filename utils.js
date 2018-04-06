const util = require("util");
const path = require("path");
const writeFile = util.promisify(require("fs").writeFile);
const request = require("request-promise-native");

const handleError = e => console.log(e);

const saveAsFile = ({ task, project, outputpath }, validatorName, json) => {
  const fileName = `${validatorName}-${project}-${task}.json`;
  const fullPath = path.resolve(process.cwd(), outputpath, fileName);
  return writeFile(fullPath, JSON.stringify(json, null, "\t"), "utf8");
};

const saveOnWeb = (
  { task, project, remoteserver, urls },
  validatorName,
  json
) => {
  Promise.all(
    urls.map((url, index) => {
      const post = {
        validator: validatorName,
        project,
        url,
        task,
        data: json[index]
      };
      console.log(post);
      return request({
        method: "POST",
        url: remoteserver + "/api/record",
        json: true,
        body: post
      });
    })
  );
};
module.exports = {
  handleError,
  saveAsFile,
  saveOnWeb
};
