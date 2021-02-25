"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSchema = exports.REPORT_TYPE = void 0;
const mongoose = require("mongoose");
var REPORT_TYPE;
(function (REPORT_TYPE) {
    REPORT_TYPE["REPORT_MANGA"] = "REPORT_MANGA";
})(REPORT_TYPE = exports.REPORT_TYPE || (exports.REPORT_TYPE = {}));
exports.reportSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    manga_id: {
        type: mongoose.Types.ObjectId,
        ref: "manga"
    },
    report_type: {
        type: String,
        default: REPORT_TYPE.REPORT_MANGA
    },
    reason: {
        type: String,
        default: "hello"
    }
}, { timestamps: true });
//# sourceMappingURL=report.model.js.map