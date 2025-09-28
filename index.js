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
