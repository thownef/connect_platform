import express from 'express';
import { 
    getCategory,
    InsertCategory,
    editCategory,
    updateOperatorCategory,
    UpdateCategory,
    getCategoryAdmin
} from '../controllers/category.js';

const router = express.Router();

// Get category
router.get('/category', getCategory);

router.get('/be/category', getCategoryAdmin);
router.post('/be/create/category', InsertCategory);
router.get('/be/category/:id', editCategory);
router.put('/be/operator/category/:id', updateOperatorCategory);
router.put('/be/update/company/:id', UpdateCategory);

export default router;
