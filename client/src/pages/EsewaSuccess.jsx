import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EsewaSuccess = () => {
    const [processing, setProcessing] = useState(true);
    const [message, setMessage] = useState('Processing your payment...');



    useEffect(() => {
        const processPayment = async () => {
            try {
                // Get URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const datas = urlParams.get('data');


                // You can get user_id and car_id from URL params or localStorage or wherever you store them


                if (datas) {
                    // Call your backend using fetch
                    const { data } = await axios.get('http://localhost:5050/payment/esewa-success', {
                        params: { data: datas },
                    });

                    console.log('Payment response:', data.payment.carId);

                    const today = new Date().toISOString().split('T')[0];
                    console.log('Today:', today);
                    console.log('User ID:', data.payment.userId);
                    console.log('Car ID:', data.payment.carId); // Assuming carId is part of the response

                    await axios.post('http://localhost:5050/testDrive/book-test-drive', {
                        date: today,
                        user_id: data.payment.userId,
                        car_id: data.payment.carId, // Assuming carId is part of the response
                    })

                    setMessage('Payment saved successfully! Redirecting...');

                    // Redirect to home after success
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    setMessage('Payment processing completed. Redirecting...');
                    setTimeout(() => {
                        window.location.href = '/?payment=failed';
                    }, 2000);
                }
            } catch (error) {
                console.error('Payment processing error:', error);
                setMessage('Payment processed. Redirecting...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        };

        processPayment();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Payment</h2>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-500">Please wait while we confirm your payment...</p>
                </div>
            </div>
        </div>
    );
};

export default EsewaSuccess;