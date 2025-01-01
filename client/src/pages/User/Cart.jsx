import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCart } from '../../feature/cart/cartSlice';
import axios from 'axios';

const Cart = () => {
    const cartItems = useSelector(state => state.cart?.items || []);
    console.log(cartItems)
    const dispatch = useDispatch();

    async function getAllCartProduct() {
        try {
            const { data } = await axios.get('/shop/getCart');
            dispatch(updateCart(data.carts));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCartProduct();
    }, []);

    const handleRemove = async (carId) => {
        try {
            await axios.delete(`/shop/deleteCart/${carId}`);
            dispatch(removeFromCart({ carId }));

        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, cart) => {
            const cartTotal = cart.productId.reduce((sum, car) => sum + car.price, 0);
            return total + cartTotal;
        }, 0);
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {(!cartItems.length || cartItems.every(cart => !cart.productId.length)) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Continue Shoppings
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cartItems.map(cart => (
                            cart.productId.map(car => (
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
                                            to={`/car/${car.slug}`}
                                            className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                                        >
                                            {car.title}
                                        </Link>
                                        <p className="text-gray-600 mt-1">
                                            Model: {car.model} | Year: {car.year}
                                        </p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="text-lg font-bold text-blue-600">
                                                ${car.price.toLocaleString()}
                                            </div>
                                            <button
                                                onClick={() => handleRemove(car._id)}
                                                className="text-red-600 hover:text-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))}

                        <div className="mt-8 bg-gray-50 rounded-lg p-6">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total:</span>
                                <span className="text-blue-600">
                                    ${calculateTotal().toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <Link
                                    to="/"
                                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
                                >
                                    Continue Shopping
                                </Link>
                                <button
                                    className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Checkout
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