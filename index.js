#!/usr/bin/env node

const program = require("commander");
const identity = require("lodash").identity;
const map = require("lodash").map;

const utils = require("./utils");

//list of tool
const lighthouse = require("./lighthouse");

const tools = {
  lighthouse
};

const list = val => val.split(",").map(i => i.trim());

const options = [
  {
    param: "task",
    description: "Uniq task ID",
    validation: identity,
    defValue: +new Date()
  },
  {
    param: "project",
    description: "Uniq project name",
    validation: identity,
    defValue: null
  },
  {
    param: "urls",
    description: "List of urls, separeted with commas",
    validation: list,
    defValue: []
  },
  {
    param: "skip",
    description: "Skip validator",
    validation: list,
    defValue: null
  },
  {
    param: "only",
    description: "Run only single validator",
    validation: identity,
    defValue: null
  },
  {
    param: "outputpath",
    description: "Default outputh path",
    validation: identity,
    defValue: ""
  },
  {
    param: "remoteserver",
    description: "HTTP server",
    validator: identity,
    defValue: ""
  }
];

program.version("0.1.0");

options.forEach(({ param, description, validation, defValue }) => {
  program.option(`--${param} <${param}>`, description, validation, defValue);
});
program.parse(process.argv);

const config = {};
options.forEach(({ param }) => {
  config[param] = program[param];
});

map(tools, (validator, key) => ({
  name: key,
  validator
}))
  .filter(({ name }) => {
    if (config.only) {
      return config.only === name;
    } else if (config.skip) {
      return !config.skip.includes(name);
    }
    return true;
  })
  .forEach(({ validator, name }) => {
    validator
      .run(config)
      //.then(data => utils.saveOnWeb(config, name, data))
      .then(data => utils.saveAsFile(config, name, data))
      .then(() => {
        console.log("DONE:" + name);
      })
      .catch(console.log);
  });
