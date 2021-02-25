"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionSchema = exports.VERSION_TYPE = void 0;
const mongoose = require("mongoose");
var VERSION_TYPE;
(function (VERSION_TYPE) {
    VERSION_TYPE["ANDROID"] = "ANDROID";
    VERSION_TYPE["IOS"] = "IOS";
})(VERSION_TYPE = exports.VERSION_TYPE || (exports.VERSION_TYPE = {}));
exports.versionSchema = new mongoose.Schema({
    version_type: {
        type: String,
        default: VERSION_TYPE.ANDROID
    },
    name: {
        type: String
    },
    support: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
//# sourceMappingURL=version.model.js.map