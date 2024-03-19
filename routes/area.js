import express from 'express';
import { getArea } from '../controllers/area.js';

const router = express.Router();

// Get all in client
router.get('/', getArea);

export default router;
