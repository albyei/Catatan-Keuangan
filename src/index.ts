import  express  from "express";
import cors from 'cors'
import produkRoute from './routers/produkRoute'
import userRoute from './routers/userRoute'
import {PORT} from './global'

const app = express()
app.use(cors())

app.use(`/produk`, produkRoute)
app.use(`/user`, userRoute)

app.listen(PORT, () => {
    console.log (`[server]: Server is running at http://localhost:${PORT}`)
})