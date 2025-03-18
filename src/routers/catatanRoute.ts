import express from "express";
import {
  getAllCatatan,
  createCatatan,
  updatedCatatanKuangan,
  deleteCatatan,
  hitungTotalCatatan,
} from "../controllers/catatanController";
import { verifyAddCatatan, verifyEditCatatan } from "../middlewares/verifyCatatan";
const app = express();
app.use(express.json());

app.get(`/`, getAllCatatan);
app.post(`/`,  [verifyAddCatatan],createCatatan);
app.put(`/:id`, [verifyEditCatatan], updatedCatatanKuangan );
app.delete(`/:id`, deleteCatatan);
app.get(`/total`, hitungTotalCatatan)
// []: midlleware

export default app;
