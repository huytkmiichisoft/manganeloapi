"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: "jungle-z",
    api_key: "927555213464771",
    api_secret: "UFm306BTw3wamziVh0AUrRa8DKY"
});
exports.storageCloudinary = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "avatar"
    }
});
//# sourceMappingURL=index.js.map