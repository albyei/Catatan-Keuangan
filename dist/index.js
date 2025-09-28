// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const cors_1 = __importDefault(require("cors"));
// const catatanRoute_1 = __importDefault(require("./routers/catatanRoute"));
// const swagger_1 = require("./swagger"); // otomatis baca src/swagger.ts
// const global_1 = require("./global");
// const app = (0, express_1.default)();
// (0, swagger_1.setupSwagger)(app);
// app.use((0, cors_1.default)());
// app.use(`/catatan`, catatanRoute_1.default);
// app.listen(global_1.PORT, () => {
//     console.log(`[server]: Server is running at http://localhost:${global_1.PORT}`);
// });
// //# sourceMappingURL=index.js.map

import express from "express";
import cors from "cors";
import catatanRoute from "./routers/catatanRoute";
import { setupSwagger } from "./swagger";
import { PORT } from "./global";
import path from "path";

const app = express();

// Setup EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk file statis (CSS, JS, dll.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware untuk parsing JSON dan URL-encoded (form data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/catatan", catatanRoute);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
