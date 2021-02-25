"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterSchema = void 0;
const mongoose = require("mongoose");
exports.chapterSchema = new mongoose.Schema({
    manga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manga"
    },
    index: {
        type: Number,
        default: 1
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    content: {
        type: String
    },
    commentCount: {
        type: Number,
        default: 0
    },
    before: {
        type: mongoose.Types.ObjectId,
        ref: "chapter"
    },
    after: {
        type: mongoose.Types.ObjectId,
        ref: "chapter"
    },
    images: [
        {
            type: String
        }
    ]
}, { timestamps: true });
exports.chapterSchema.index({ source: 1 });
//# sourceMappingURL=chapter.model.js.map