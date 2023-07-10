import express from 'express'
import {
    getAuthStatus,
    login,
    registration,
    sendConfirmationCode,
} from '../controllers/user.js'
import auth from "../middleware/auth.js";
import fileUpload from 'express-fileupload'
import {getUserProfile, updateUserProfile, uploadProfilePhoto} from "../controllers/profile.js";

const router = express.Router()

router.get('/get_auth_status', auth, getAuthStatus)
router.post('/registration', registration)
router.post('/login', login)
router.post('/send_code', sendConfirmationCode)
router.get('/get_user_profile', auth, getUserProfile)
router.post('/update_user_profile', auth, updateUserProfile)
router.post('/upload_profile_photo', fileUpload({}), auth, uploadProfilePhoto)

export default router