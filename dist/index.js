"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const catatanRoute_1 = __importDefault(require("./routers/catatanRoute"));
const swagger_1 = require("./swagger"); // otomatis baca src/swagger.ts
const global_1 = require("./global");
const app = (0, express_1.default)();
(0, swagger_1.setupSwagger)(app);
app.use((0, cors_1.default)());
app.use(`/catatan`, catatanRoute_1.default);
app.listen(global_1.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${global_1.PORT}`);
});
//# sourceMappingURL=index.js.map