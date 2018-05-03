const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = mongoose.model(
  "Report",
  new Schema({
    id: mongoose.Schema.ObjectId,
    project: { type: String },
    task: { type: String },
    userAgent: { type: String },
    lighthouseVersion: { type: String },
    generatedTime: { type: Date },
    initialUrl: { type: String },
    url: { type: String },
    runWarnings: Schema.Types.Mixed,
    audits: Schema.Types.Mixed,
    runtimeConfig: Schema.Types.Mixed,
    score: { type: Number },
    reportCategories: Schema.Types.Mixed,
    reportGroups: Schema.Types.Mixed,
    timing: Schema.Types.Mixed
  })
);

const getProjects = () => report.find().distinct("project");

const getList = filter =>
  report
    .find(filter)
    .sort({ created: "desc" })
    .exec();

const getById = id => report.findOne({ _id: id }).exec();

const create = data => report.create(data);

module.exports = {
  getProjects,
  getList,
  getById,
  create
};