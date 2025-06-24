import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null); // Corrected to object
    const [quantity, setQuantity] = useState(1);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const user_id = auth?.user?._id;

    async function getAllCartProduct() {
        try {
            const { data } = await axios.get('/shop/getCart');
            setCartId(data.carts._id);
            setCartItems(data.carts.productId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCartProduct();
    }, []);

    const handleRemove = async (carId) => {
        try {
            await axios.patch(`/shop/deleteCart/${carId}`, { cartId });
            setCartItems((prevItem) => prevItem.filter(item => item._id !== carId));
        } catch (error) {
            console.error(error);
        }
    };

    const openShopModal = (car) => {
        setSelectedCar(car); // Select car object
        setQuantity(1); // Reset quantity to 1 when opening the modal
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCar(null);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handlePurchase = async () => {
        try {
            console.log('Selected Car:', selectedCar);

            const purchaseData = [
                { carId: selectedCar._id, quantity }
            ];

            console.log('Selected Cars:', purchaseData);
            console.log('User ID:', user_id);

            const { data } = await axios.post('/purchase/create-purchase', {
                cars: purchaseData,
                user_id
            });

            console.log('Purchase successful:', data.purchases);
            closeModal();

            alert("Purchase successful! Please wait for the due date to visit.");
            getAllCartProduct(); // Refresh cart after purchase
        } catch (error) {
            console.error('Purchase failed:', error);

            // Show meaningful error from backend
            const errorMsg = error.response?.data?.error || error.message || "Unknown error occurred";
            alert(`Purchase failed: ${errorMsg}`);
        }
    };


    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                {(!cartItems.length) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cartItems.map(car => (
                            <div
                                key={car._id}
                                className="bg-white rounded-lg shadow p-6 flex items-center gap-6"
                            >
                                <div className="w-32 h-32 flex-shrink-0">
                                    <img
                                        src={car.image}
                                        alt={car.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <Link
                                        to={`/c/${car.slug}`}
                                        className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                                    >
                                        {car.title}
                                    </Link>
                                    <p className="text-gray-600 mt-1">
                                        Model: {car.model} | Year: {car.year}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-lg font-bold text-blue-600">
                                            Rs {car.price.toLocaleString()}
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => openShopModal(car)}
                                                className="flex items-center text-green-600 hover:text-green-700 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Shop
                                            </button>
                                            <button
                                                onClick={() => handleRemove(car._id)}
                                                className="text-red-600 hover:text-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Shop Modal */}
                {showModal && selectedCar && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Purchase Details</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <img
                                    src={selectedCar.image}
                                    alt={selectedCar.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{selectedCar.title}</h3>
                                <p className="text-gray-600">
                                    Model: {selectedCar.model} | Year: {selectedCar.year}
                                </p>
                                <p className="text-blue-600 font-bold mt-2">
                                    Rs {selectedCar.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">How many cars do you want to purchase?</label>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="bg-gray-200 px-3 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="border border-gray-300 text-center w-16 py-1"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="bg-gray-200 px-3 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Total: Rs {(selectedCar.price * quantity).toLocaleString()}</p>
                                <button
                                    onClick={handlePurchase}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Confirm Purchase
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
