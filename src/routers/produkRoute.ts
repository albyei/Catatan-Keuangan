import express from "express";
import {
  getAllProduk,
  createProduk,
  updatedProduk,
  deleteProduk,
  changePicture,
} from "../controllers/menuController";
import { verifyAddProduk, verifyEditProduk } from "../middlewares/verifyProduk";
import uploadFile from "../middlewares/produkUpload";
import { verifyToken } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.get(`/`, [verifyToken], getAllProduk);
app.post(`/`, [verifyToken, verifyAddProduk], createProduk);
app.put(`/:id`, [verifyToken, verifyEditProduk], updatedProduk);
app.put(`/pic/:id`, [verifyToken, uploadFile.single("picture")], changePicture);
app.delete(`/:id`, [verifyToken], deleteProduk);

export default app;
