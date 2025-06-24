const express = require('express');


const { paymetEpay, afterSuccessfullPayment } = require('../controller/paymentController');

const PaymentRouter = express.Router();

PaymentRouter.post('/initiate-esewa', paymetEpay);
PaymentRouter.get('/esewa-success', afterSuccessfullPayment);

// Failure callback handler
PaymentRouter.get('/esewa-failure', async (req, res) => {
    try {
        console.log('eSewa Payment Failed:', req.query);
        res.redirect(`http://localhost:5173/esewa-failure?status=failed&data=${encodeURIComponent(JSON.stringify(req.query))}`);
    } catch (error) {
        console.error('eSewa failure handling error:', error);
        res.redirect('http://localhost:5173/esewa-failure?status=error');
    }
});

module.exports = { PaymentRouter };