const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const customerController  = require('../controllers/customerController');

const router = express.Router();

router.get('/',authMiddleware , authorizeRoles('admin'), customerController.getAllCustomer);


module.exports = router;