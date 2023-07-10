import express from 'express'
import mongoose from "mongoose";
import routes from './routes/routes.js'
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))

app.use(routes)

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 3000

mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`port: ${PORT}`)))
    .catch((error) => console.log(error.message))
