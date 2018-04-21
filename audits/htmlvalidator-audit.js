/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
"use strict";

const Audit = require("lighthouse").Audit;
const validator = require("html-validator");
const options = {
  format: "json"
};

/**
 * @fileoverview Tests that `window.myLoadMetrics.searchableTime` was below the
 * test threshold value.
 */

class HTMLvalidatorAudit extends Audit {
  static get meta() {
    return {
      name: "htmlvalidator-audit",
      description: "Page has a valida HTML",
      failureDescription: "",
      helpText:
        "For more detail view check W3C validator [Learn more](https://validator.w3.org/)",
      requiredArtifacts: ["TakeHTML"]
    };
  }

  static audit(artifacts) {
    const html = artifacts.TakeHTML;
    options.data = html;

    return validator(options)
      .then(data => {
        const headings = [
          { key: "type", itemType: "text", text: "type" },
          { key: "message", itemType: "text", text: "type" },
          { key: "lastLine", itemType: "text", text: "type" },
          { key: "firstColumn", itemType: "text", text: "type" },
          { key: "extract", itemType: "text", text: "type" }
        ];
        const messages = data.messages
          .filter(({ type }) => type === "error")
          .map(({ type, message, lastLine, firstColumn, extract }) => ({
            type,
            message,
            lastLine,
            firstColumn,
            extract
          }));
        const details = Audit.makeTableDetails(headings, messages);

        return {
          rawValue: messages.length === 0,
          score: messages.length === 0,
          details
        };
      })
      .catch(error => {
        console.error(error);
      });
  }
}

module.exports = HTMLvalidatorAudit;
