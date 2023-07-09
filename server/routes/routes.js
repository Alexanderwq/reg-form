import express from 'express'
import {getUserProfile, login, registration, sendConfirmationCode} from '../controllers/user.js'
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/send_code', sendConfirmationCode)
router.get('/get_user_profile', auth, getUserProfile)
export default router