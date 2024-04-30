import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//iniciando el servidor
const app = express();

// middleware para convertir los req body o que el back lo pueda entender con express
app.use(express.json())
app.use(cors())
app.use(cookieParser())

export default app