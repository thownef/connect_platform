import express from 'express';
import { register } from '../controllers/auth.js';
import { login } from '../controllers/auth.js';
import { loginAdmin } from '../controllers/auth.js';
import { loginExpert } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin', loginAdmin);
router.post('/expert/login', loginExpert);

export default router;
