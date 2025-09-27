import  express  from "express";
import cors from 'cors'
import catatanRoute from './routers/catatanRoute'
import { setupSwagger } from "./swagger"; // otomatis baca src/swagger.ts

import {PORT} from './global'

const app = express()
setupSwagger(app);

app.use(cors())

app.use(`/catatan`, catatanRoute)


app.listen(PORT, () => {
    console.log (`[server]: Server is running at http://localhost:${PORT}`)
})