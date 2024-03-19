import express from 'express';
import { updateProfile } from '../controllers/member.js';

const router = express.Router();
// api update info after register success
router.post('/be/updateprofile', updateProfile);

export default router;
