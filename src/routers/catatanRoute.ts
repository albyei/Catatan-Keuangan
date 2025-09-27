import express from "express";
import {
  getAllCatatan,
  createCatatan,
  updatedCatatanKuangan,
  deleteCatatan,
  hitungTotalCatatan,
} from "../controllers/catatanController";
import { verifyAddCatatan, verifyEditCatatan } from "../middlewares/verifyCatatan";
import { setupSwagger } from "../../src/swagger";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Catatan Keuangan API",
      version: "1.0.0",
    },
  },
  apis: ["./src/controllers/catatanController.ts", "./src/routers/catatanRoute.ts"],
});

const app = express();
app.use(express.json());

setupSwagger(app);

app.get(`/`, getAllCatatan);
app.post(`/`,  [verifyAddCatatan],createCatatan);
app.put(`/:id`, [verifyEditCatatan], updatedCatatanKuangan );
app.delete(`/:id`, deleteCatatan);
app.get(`/total`, hitungTotalCatatan)
// []: midlleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;
