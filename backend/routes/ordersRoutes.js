const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const orderController  = require('../controllers/orderController');

const router = express.Router();

router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/user/:user_id',authMiddleware, orderController.getByUserId);
router.get('/search', authMiddleware, orderController.searchOrders);
router.get('/:id', authMiddleware, orderController.getByOrderId);
router.put('/:id',authMiddleware, authorizeRoles('admin'),orderController.updateOrder);
router.post('/', authMiddleware, authorizeRoles('customer`'), orderController.createOrder);


module.exports = router;