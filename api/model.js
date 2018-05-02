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

module.exports = report;
