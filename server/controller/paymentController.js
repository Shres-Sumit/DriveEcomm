const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/paymentModel');


const paymetEpay = async (req, res) => {
    try {
        console.log('Initiating eSewa payment with data:', req.body);
        const { amount, userId, carId } = req.body;
        const productId = uuidv4();
        const signature = this.createSignature(`total_amount=${amount},transaction_uuid=${productId},product_code=EPAYTEST`);
        const formData = {
            amount: amount,
            failure_url: "http://localhost:5173/",
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: "EPAYTEST",
            signature: signature,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: "http://localhost:5173/esewa-success",
            tax_amount: "0",
            total_amount: amount,
            transaction_uuid: productId,
        };

        await new Payment({
            product_code: 'EPAYTEST',
            transaction_uuid: productId,
            total_amount: amount,
            status: 'PENDING',
            signature: signature,
            signed_field_names: 'total_amount,transaction_uuid,product_code',
            userId: userId,
            carId: carId,
        }).save();

        res.json({
            message: 'eSewa payment initiated successfully',
            formData,
        });
    }
    catch (error) {
        console.error('Error initiating eSewa payment:', error);
        res.status(500).json({ error: 'Failed to initiate payment.' });
    }
}


exports.createSignature = (message) => {
    const secret = "8gBm/:&EnhH.1/q"
    const hmac = require('crypto').createHmac('sha256', secret);
    hmac.update(message);
    const hashInbase64 = hmac.digest('base64');
    return hashInbase64;

}



const afterSuccessfullPayment = async (req, res) => {
    try {
        console.log('eSewa Success Callback Data:', req.query);
        const { data } = req.query;
        console.log(data);

        if (!data) {
            return res.redirect('http://localhost:5173/?status=error&msg=Missing data or user_id');
        }

        const decodedData = Buffer.from(data, 'base64').toString('utf-8');
        const paymentData = JSON.parse(decodedData);

        const payment = await Payment.findOne({ transaction_uuid: paymentData.transaction_uuid });
        payment.status = 'COMPLETE';
        await payment.save();

        console.log('✅ Payment saved:', payment);
        res.json({ status: 'success', message: 'Payment processed successfully', payment });

    } catch (error) {
        console.error('eSewa success handling error:', error);
        res.redirect('http://localhost:5173/?status=error&msg=Something went wrong');
    }
}
module.exports = { paymetEpay, afterSuccessfullPayment };;