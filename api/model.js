const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = mongoose.model(
  "Report",
  new Schema({
    id: mongoose.Schema.ObjectId,
    project: { type: String },
    task: { type: String },
    options: Schema.Types.Mixed,
    goalErrors: [String],
    overview: Schema.Types.Mixed,
    userAgent: { type: String },
    environment: Schema.Types.Mixed,
    lighthouseVersion: { type: String },
    fetchTime: { type: Date },
    requestedUrl: { type: String },
    finalUrl: { type: String },
    runWarnings: Schema.Types.Mixed,
    runtimeError: Schema.Types.Mixed,
    audits: Schema.Types.Mixed,
    configSettings: Schema.Types.Mixed,
    categories: Schema.Types.Mixed,
    categoryGroups: Schema.Types.Mixed,
    timing: Schema.Types.Mixed,
    i18n: Schema.Types.Mixed
  })
);

const getProjects = () => report.find().distinct("project");

const getList = (
  filter,
  fields = "id project task requestedUrl fetchTime overview"
) =>
  report
    .find(filter)
    .select(fields)
    .sort({ fetchTime: "desc" })
    .limit(20)
    .exec();

const getById = id => report.findOne({ _id: id }).exec();

const create = data => report.create(data);

module.exports = {
  getProjects,
  getList,
  getById,
  create
};
