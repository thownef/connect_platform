import express from 'express';
import { allList, assign, changeActive, create, deleteAssign, getAllAssign, getAssignCompany, list } from '../controllers/consultant.js';

const router = express.Router();

router.get('/', list);
router.get('/getall', allList);
router.put('/active/:id', changeActive);
router.post('/create', create);
router.post('/assign', assign);
router.get('/getAssignCompany/:id', getAssignCompany);
router.get('/getAllAssign', getAllAssign);
router.delete('/assign/:id', deleteAssign);

export default router;
