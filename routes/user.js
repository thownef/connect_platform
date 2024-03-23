import express from 'express';
import { getAll } from '../controllers/user.js';

const router = express.Router();

router.get('/getAllUser', getAll);

export default router