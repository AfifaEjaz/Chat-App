import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRoutes from './user/routes.js'
import messageRoutes from './message/routes.js'
import connectDB from './db/ConnectToMongoDB.js'

import { fileURLToPath } from 'url';
import path from 'path'

const app = express()
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, './client/dist');
console.log(clientPath);
app.use('/', express.static(clientPath))

// app.get('/', (req, res) => {
//   res.send('Hello Worlddddgg!')
// })
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));

app.use("/api/user", userRoutes)
app.use("/api/messages", messageRoutes)

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'./client/dist/index.html'))
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})