const express = require('express');
const stripePaymentController  = require('../controllers/stripePaymentController');

const router = express.Router();

router.post('/payments/create-checkout-session', stripePaymentController.stripePayment);

module.exports = router;