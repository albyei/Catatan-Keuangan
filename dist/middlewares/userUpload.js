"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const global_1 = require("../global");
// define storage configurate of menu picture
const storage = multer_1.default.diskStorage({
    destination: (request, file, cb) => {
        //define location pf upload picture, make sure that ypu have crate a " public" folder in root folder
        //then create folder "menu_picture" inside pf "public folder"
        cb(null, `${global_1.BASE_URL}/public/profile_picture/`);
    },
    filename: (request, file, cb) => {
        //define file name of upload file
        cb(null, `${new Date().getTime().toString()}-${file.originalname}`);
    },
});
const uploadFile = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, //define max size of upload file, in this case max siza is 2 mb
});
exports.default = uploadFile;
//# sourceMappingURL=userUpload.js.map