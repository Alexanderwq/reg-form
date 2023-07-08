import express from 'express';
import { registration } from '../controllers/user.js'

const router = express.Router();

router.get('/registration', registration);

export default router;