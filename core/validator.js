var Validator = require("jsonschema").Validator;
var v = new Validator();

const optionsSchema = {
  id: "/Options",
  type: "object",
  properties: {
    lookup: {
      type: "array",
      items: { type: "string" }
    },
    limits: { $ref: "/Limit" }
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

const limitItemSchema = {
  id: "/LimitItem",
  type: "object",
  properties: {
    name: { type: "string" },
    value: { type: "number" }
  }
};

const limitSchema = {
  id: "/Limit",
  type: "object",
  properties: {
    categories: {
      type: "array",
      items: { $ref: "/LimitItem" }
    },
    audit: {
      type: "array",
      items: { $ref: "/LimitItem" }
    }
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
v.addSchema(limitItemSchema, "/LimitItem");
v.addSchema(limitSchema, "/Limit");
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
