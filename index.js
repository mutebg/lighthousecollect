#!/usr/bin/env node

const program = require("commander");
const identity = require("lodash").identity;
const map = require("lodash").map;
const utils = require("./utils");

//list of tool
const lighthouse = require("./lighthouse");

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
    defValue: null
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
    defValue: null
  },
  {
    param: "remoteserver",
    description: "HTTP server",
    validator: identity,
    defValue: null
  },
  {
    param: "config",
    description: "Path to config file",
    validator: identity,
    defValue: utils.CONFIG_NAME
  }
];

program.version("0.1.0");

options.forEach(({ param, description, validation, defValue }) => {
  program.option(`--${param} <${param}>`, description, validation, defValue);
});
program.parse(process.argv);

const config = utils.getConfigFile(program.config);
options.forEach(({ param }) => {
  if (program[param]) {
    config[param] = program[param];
  }
});

config.urls = utils.prepareUrls(config);

//is global object so anyone can access the config trought files
globalConfig = config;

//run lighthouse
lighthouse
  .run(config)
  //.then(data => utils.saveOnWeb(config, name, data))
  .then(data => utils.saveAsFile(config, data))
  .then(() => {
    console.log("DONE");
  })
  .catch(console.log);
