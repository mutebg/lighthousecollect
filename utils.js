const util = require("util");
const path = require("path");
const writeFile = util.promisify(require("fs").writeFile);

const handleError = e => console.log(e);

const saveAsFile = ({ task, project, outputpath }, validatorName, json) => {
  const fileName = `${validatorName}-${project}-${task}.json`;

  const fullPath = path.resolve(process.cwd(), outputpath, fileName);
  console.log({ fullPath });
  return writeFile(fullPath, JSON.stringify(json, null, "\t"), "utf8");
};

module.exports = {
  handleError,
  saveAsFile
};
