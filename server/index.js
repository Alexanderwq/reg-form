import express from 'express'
import mongoose from "mongoose";
import routes from './routes/routes.js'

const app = express()

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
