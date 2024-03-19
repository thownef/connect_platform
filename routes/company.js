import express from 'express';
import {
  getCompannyProfile,
  updateClient,
  getAllCompanyAdmin,
  getCompanyID,
  updateReview,
  getReview,
  createReview,
  getReviewId,
  deleteReview,
  createClient,
  deleteClient,
  getClient,
  getIntroduce,
  getExpertClient,
  getCompanyVic,
} from '../controllers/company.js';
import { getFourCompanyJapan } from '../controllers/company.js';
import { getFourCompanyVietNam } from '../controllers/company.js';
import { getCompanyByKeyword } from '../controllers/company.js';
import { updateIntroduce } from '../controllers/company.js';
import { updateAllow } from '../controllers/company.js';
import { UpdateCompanyByID } from '../controllers/company.js';
import { getCompanyProduct } from '../controllers/company.js';
import { getCompanyProductID } from '../controllers/company.js';
import { UpdateProductByID } from '../controllers/company.js';
import { InsertProductByID } from '../controllers/company.js';
import { InsertMember } from '../controllers/company.js';
import { getMemberID } from '../controllers/company.js';
import { UpdateMemberByID } from '../controllers/company.js';
import { InsertFeature } from '../controllers/company.js';
import { getFeatureID } from '../controllers/company.js';
import { UpdateFeatureByID } from '../controllers/company.js';
import { DeleteFeatureID } from '../controllers/company.js';
import { InsertOperator } from '../controllers/company.js';
import { InsertExpert } from '../controllers/company.js';
import { getDataExpert } from '../controllers/company.js';
import { getExpertID } from '../controllers/company.js';
import { UpdateExpertByID } from '../controllers/company.js';
import { getOperator } from '../controllers/company.js';
import { UpdateOperator } from '../controllers/company.js';
import { getOperatorByID } from '../controllers/company.js';
import { updateAllowExpert } from '../controllers/company.js';
import { UpdateExpert } from '../controllers/company.js';
import { DeleteExpertID } from '../controllers/company.js';
import { DeleteMemberID } from '../controllers/company.js';
import { DeleteProductID } from '../controllers/company.js';
import { InsertCompanyInfo } from '../controllers/company.js';
import { getDataExpertNew } from '../controllers/company.js';
import { getDataExpertPublic } from '../controllers/company.js';
import { getDataExpertDeactive } from '../controllers/company.js';

const router = express.Router();

// get company profile
router.get('/:user_id', getCompannyProfile);
// get company by search keyword, country, category
router.get('/be/getCompanyByKeyword', getCompanyByKeyword);
// get four jp company
router.get('/be/japancompany', getFourCompanyJapan);
// get four vn company
router.get('/be/vietnamcompany', getFourCompanyVietNam);

// get company info
router.get('/be/company/:id', getCompanyID); // get
router.put('/be/update/company/:id', UpdateCompanyByID);  //update

// company introduce
router.get('/be/introduce/:id', getIntroduce); //Get introduce
router.put('/be/introduce/:id', updateIntroduce); // update introduce

//company product(service)
router.get('/be/product/:id', getCompanyProductID); //Get by id
router.post('/be/product', InsertProductByID); // Create product
router.put('/be/product/:id', UpdateProductByID);  //Update by id
router.delete('/be/product/:id', DeleteProductID);  //delete by id

// Company feature
router.get('/be/feature/:id', getFeatureID); //Get by id
router.post('/be/feature', InsertFeature); // create feature
router.put('/be/feature/:id', UpdateFeatureByID); // update by id
router.delete('/be/feature/:id', DeleteFeatureID); // delete by id

// Company core search/expert
router.get('/be/member/:id', getMemberID);  // get by id
router.post('/be/member', InsertMember);   //create feature
router.put('/be/member/:id', UpdateMemberByID); // update by id
router.delete('/be/member/:id', DeleteMemberID); // delete 

// Company customer
router.get('/be/customer/:id', getClient);   // get by id
router.post('/be/customer', createClient);    // create customer
router.put('/be/customer/:id', updateClient); // update
router.delete('/be/customer/:id', deleteClient);  // delete

// Expert 
router.get('/be/expert', getDataExpert);  //get all expert
router.get('/be/u/expert', getExpertClient);  // get expert in client by search
router.get('/be/expert/:id', getExpertID);   // get detail expert by id

// get company vic
router.get('/be/companyvic', getCompanyVic);

router.post('/be/company/create', InsertCompanyInfo);
router.get('/be/company', getAllCompanyAdmin);
router.put('/be/allow/company/:id', updateAllow);
router.get('/be/company/product/:id', getCompanyProduct);

//Company information
router.post('/be/create/operator', InsertOperator);
router.get('/be/operator', getOperator);
router.put('/be/update/operator/:id', UpdateOperator);
router.get('/operator/:id', getOperatorByID);

//Support expert information
router.post('/be/create/expert', InsertExpert);
router.put('/be/update/expert/:id', UpdateExpertByID);
router.put('/be/expert/update/:id', UpdateExpert);
router.put('/be/allow/expert/:id', updateAllowExpert);
router.delete('/be/delete/expert/:id', DeleteExpertID);
router.get('/v1/expert/new', getDataExpertNew);
router.get('/v1/expert/public', getDataExpertPublic);
router.get('/v1/expert/deactive', getDataExpertDeactive);

//review
router.get('/be/review/:id', getReview);
router.get('/be/review/edit/:id', getReviewId);
router.post('/be/review/create', createReview);
router.put('/be/review/update/:id', updateReview);
router.delete('/be/review/delete/:id', deleteReview);

export default router;
