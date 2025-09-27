"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEditCatatan = exports.verifyAddCatatan = void 0;
const joi_1 = __importDefault(require("joi"));
/** create schema for detail of orderlist */
const addDataSchema = joi_1.default.object({
    type: joi_1.default.string().valid("INCOME", "EXPENSE").required(),
    amount: joi_1.default.number().min(0).required(),
    description: joi_1.default.string().required(),
});
const addEditSchema = joi_1.default.object({
    type: joi_1.default.string().valid("INCOME", "EXPENSE").optional(),
    amount: joi_1.default.number().min(0).optional(),
    description: joi_1.default.string().optional(),
});
const verifyAddCatatan = (request, response, next) => {
    const { error } = addDataSchema.validate(request.body, { abortEarly: false });
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(),
        });
    }
    return next();
};
exports.verifyAddCatatan = verifyAddCatatan;
const verifyEditCatatan = (request, response, next) => {
    const { error } = addEditSchema.validate(request.body, { abortEarly: false });
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(),
        });
    }
    return next();
};
exports.verifyEditCatatan = verifyEditCatatan;
//# sourceMappingURL=verifyCatatan.js.map