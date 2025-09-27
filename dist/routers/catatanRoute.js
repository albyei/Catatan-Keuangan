"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catatanController_1 = require("../controllers/catatanController");
const verifyCatatan_1 = require("../middlewares/verifyCatatan");
const swagger_1 = require("../../src/swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Catatan Keuangan API",
            version: "1.0.0",
        },
    },
    apis: ["./src/controllers/catatanController.ts", "./src/routers/catatanRoute.ts"],
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.get(`/`, catatanController_1.getAllCatatan);
app.post(`/`, [verifyCatatan_1.verifyAddCatatan], catatanController_1.createCatatan);
app.put(`/:id`, [verifyCatatan_1.verifyEditCatatan], catatanController_1.updatedCatatanKuangan);
app.delete(`/:id`, catatanController_1.deleteCatatan);
app.get(`/total`, catatanController_1.hitungTotalCatatan);
// []: midlleware
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = app;
//# sourceMappingURL=catatanRoute.js.map