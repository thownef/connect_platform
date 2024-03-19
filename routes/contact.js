import express from 'express';
import {
  InsertContact,
  updateSeenContact,
  getContactID,
  DeleteContactID,
  getCompanyContact,
  getContactSent,
  updateAllowEmailContact,
  InsertContactExpert,
  getContactExpertID,
  DeleteContactExpertID,
  getCompanyContactExpert,
  getContactSentExpert,
} from '../controllers/contact.js';

const router = express.Router();
// Send contact
router.post('/be/contact', InsertContact);
// send mail expert
router.post('/be/expert', InsertContactExpert);
// Get mail inbox by email
router.get('/be/inbox/:email', getCompanyContact);
// Get mail sent by email
router.get('/be/sent/:email', getContactSent);
// Get mail sent to expert by email
router.get('/be/expert/:email', getContactSentExpert);
// Update seen mail
router.put('/be/inbox/:id', updateSeenContact);


router.get('/be/contact/:id', getContactID);
router.delete('/be/delete/contact/:id', DeleteContactID);
router.put('/be/allow/contact/:id', updateAllowEmailContact);

// contact expert
router.get('/be/contact/inbox/:email', getCompanyContactExpert);
router.get('/be/contact/expert/:id', getContactExpertID);
router.delete('/be/delete/contact/expert/:id', DeleteContactExpertID);

export default router;
