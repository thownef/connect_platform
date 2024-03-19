import express from 'express';
import { deleteImageS3, uploadS3 } from '../controllers/image.js';

const router = express.Router();

router.post('/s3Url', uploadS3);
router.delete('/s3Url/delete', deleteImageS3);

export default router;
