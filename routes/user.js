import express from 'express';
import {
  getUserId,
  DeleteUserID,
  UpdateUserByID,
  getAllUser,
  getUserOperator,
  getUserOperatorActive,
  getUserOperatorDeActive,
  getUserOperatorPublic,
  updateAllow,
  updateOperator,
  viewLog,
  getViewLog,
  searchViewLog,
  summaryLog,
  summaryLogCompany,
  summaryLogCompanyDetail,
} from '../controllers/user.js';

const router = express.Router();

router.get('/getusers', getAllUser);
router.get('/getuser/:id', getUserId);
router.put('/be/update/operator/:id', updateOperator);
router.put('/be/update/allow/:id', updateAllow);
router.put('/be/update/:id', UpdateUserByID);
router.get('/be/u1/operator', getUserOperator);
router.get('/be/u1/operator/active', getUserOperatorActive);
router.get('/be/u1/operator/public', getUserOperatorPublic);
router.get('/be/u1/operator/deactive', getUserOperatorDeActive);
router.delete('/be/delete/user/:id', DeleteUserID);
// Create view
router.post('/be/viewlog', viewLog);
router.get('/be/viewlog/:id', getViewLog);
router.get('/be/searchviewlog/', searchViewLog);
router.get('/be/summaryLog/', summaryLog);
router.get('/be/summaryLogCompany/', summaryLogCompany);
router.post('/be/summaryLogCompany/detail', summaryLogCompanyDetail);

export default router;
