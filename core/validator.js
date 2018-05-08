var Validator = require("jsonschema").Validator;
var v = new Validator();

const optionsSchema = {
  id: "/Options",
  type: "object",
  properties: {
    lookup: {
      type: "array",
      items: { type: "string" }
    }
  }
};

const urlSchema = {
  id: "/URL",
  type: "object",
  properties: {
    url: { type: "string" },
    options: { $ref: "/Options" }
  }
};

const mainSchema = {
  id: "/Main",
  type: "object",
  properties: {
    task: { type: "string" },
    project: { type: "string" },
    urls: {
      type: "array",
      items: { $ref: "/URL" }
    },
    options: { $ref: "/Options" }
  }
};

v.addSchema(optionsSchema, "/Options");
v.addSchema(urlSchema, "/URL");
v.addSchema(mainSchema, "/Main");

const validateConfig = config => {
  const result = v.validate(config, mainSchema);
  console.log(result.errors);
  if (result.errors.length > 0) {
    return result.errors;
  }
  return true;
};

module.exports = {
  validateConfig
};
