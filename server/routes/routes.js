import express from 'express'
import {login, registration, sendConfirmationCode} from '../controllers/user.js'

const router = express.Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/send_code', sendConfirmationCode)

export default router