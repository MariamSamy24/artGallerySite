const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const productController  = require('../controllers/productController');
const uploadImage = require('../utils/uploadImage');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware,authorizeRoles('admin'),uploadImage.single('image'), productController.createProduct);
router.put('/:id',authMiddleware,authorizeRoles('admin'),uploadImage.single('image') ,productController.updateProduct);
router.delete('/:id',authMiddleware, authorizeRoles('admin'), productController.deleteProduct);


module.exports = router;