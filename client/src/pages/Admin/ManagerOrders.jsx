import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManagePurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingPurchaseId, setEditingPurchaseId] = useState(null);
    const [isDateConfirmed, setIsDateConfirmed] = useState(false); // Track if the date is confirmed



    // Get today's date for minDate
    const today = new Date();


    const isSaturday = (date) => {
        return date.getDay() === 6;
    };

    const handleDateChange = (date, id) => {
        if (editingPurchaseId === id) {
            setSelectedDate(date);
            setIsDateConfirmed(false); // Reset the confirmation when a new date is picked
        }
    };

    const handleDateConfirm = async (purchaseId) => {
        try {
            const { data } = await axios.put("/purchase/update-visit-date", {
                purchaseId: purchaseId,
                visitDate: selectedDate,
            });
            alert("Visit date updated successfully!");
            setIsDateConfirmed(true);
            fetchPurchases();
        } catch (error) {
            console.error("Error updating visit date:", error);
            alert("Failed to update visit date. Please try again.");
        }
        console.log("Selected date:", selectedDate);
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/purchase/get-purchase');
            setPurchases(data.purchases);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch purchases:', err);
            setError('Failed to load purchases. Please try again.');
            setLoading(false);
        }
    };
    console.log(purchases)
    console.log(editingPurchaseId)

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };


    const closeModal = () => {
        setSelectedPurchase(null);
    };



    return (
        <Layout>
            <AdminLayout>
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Purchase Management</h1>
                        <button
                            onClick={fetchPurchases}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 shadow">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4 text-left">Car</th>
                                        <th className="py-3 px-4 text-left">Quantity</th>
                                        <th className="py-3 px-4 text-left">Customer</th>
                                        <th className="py-3 px-4 text-left">Purchase Date</th>
                                        <th className="py-3 px-4 text-left">Status</th>
                                        <th className="py-3 px-4 text-left">Visit date</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                                                No purchases found
                                            </td>
                                        </tr>
                                    ) : (
                                        purchases.map((purchase) => (
                                            <tr key={purchase._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">
                                                    {purchase.carDetailsSnapshot ? purchase.carDetailsSnapshot.title : 'Unknown Car'}
                                                </td>
                                                <td className="py-3 px-4">{purchase.quantity}</td>
                                                <td className="py-3 px-4">
                                                    {purchase.userId ? purchase.userId.firstName : 'Unknown User'}
                                                </td>
                                                <td className="py-3 px-4">{formatDate(purchase.purchasedAt)}</td>

                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-white ${purchase.status === 'completed'
                                                            ? 'bg-green-500'
                                                            : purchase.status === 'pending'
                                                                ? 'bg-yellow-500'
                                                                : purchase.status === 'cancelled'
                                                                    ? 'bg-red-500'
                                                                    : 'bg-blue-500'
                                                            }`}
                                                    >
                                                        {purchase.status || 'Processing'}
                                                    </span>
                                                </td>

                                                <td className="py-3 px-4">
                                                    {editingPurchaseId === purchase._id ? (
                                                        <>
                                                            <DatePicker
                                                                selected={selectedDate}
                                                                onChange={(date) => handleDateChange(date, purchase._id)}
                                                                className="border border-gray-300 rounded p-2 w-full"
                                                                dateFormat="MMM dd, yyyy"
                                                                minDate={today}
                                                                filterDate={(date) => !isSaturday(date)}
                                                            />
                                                            {!isDateConfirmed && selectedDate && (
                                                                <button
                                                                    onClick={() => handleDateConfirm(purchase._id)}
                                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-2"
                                                                >
                                                                    Confirm Date
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {purchase.visitDate ? (
                                                                <span className="block mb-1">{formatDate(purchase.visitDate)}</span>
                                                            ) : (
                                                                <span className="text-gray-500 block mb-1">Not set</span>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    setEditingPurchaseId(purchase._id);
                                                                    setSelectedDate(purchase.visitDate ? new Date(purchase.visitDate) : null);
                                                                }}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                            >
                                                                {purchase.visitDate ? 'Change Date' : 'Select Date'}
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {selectedPurchase && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Purchase Details</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg border-b pb-2 mb-2">Car Information</h3>
                                        {selectedPurchase.carId ? (
                                            <div>
                                                <div className="mb-4">
                                                    {selectedPurchase.carId.images && selectedPurchase.carId.images[0] && (
                                                        <img
                                                            src={`/public/uploads/${selectedPurchase.carId.images[0]}`}
                                                            alt={selectedPurchase.carId.name}
                                                            className="w-full h-48 object-cover rounded"
                                                        />
                                                    )}
                                                </div>
                                                <p><span className="font-medium">Model:</span> {selectedPurchase.carId.name}</p>
                                                <p><span className="font-medium">Brand:</span> {selectedPurchase.carId.brand}</p>
                                                <p><span className="font-medium">Price:</span> ${selectedPurchase.carId.price?.toLocaleString()}</p>
                                                <p><span className="font-medium">Year:</span> {selectedPurchase.carId.year}</p>
                                                <p><span className="font-medium">Quantity Purchased:</span> {selectedPurchase.quantity || 1}</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">Car information not available</p>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg border-b pb-2 mb-2">Customer Details</h3>
                                        {selectedPurchase.userId ? (
                                            <div>
                                                <p><span className="font-medium">Name:</span> {selectedPurchase.userId.name}</p>
                                                <p><span className="font-medium">Email:</span> {selectedPurchase.userId.email}</p>
                                                <p><span className="font-medium">Phone:</span> {selectedPurchase.userId.phone || 'Not provided'}</p>
                                                <p><span className="font-medium">Address:</span> {selectedPurchase.userId.address || 'Not provided'}</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">Customer information not available</p>
                                        )}

                                        <h3 className="font-semibold text-lg border-b pb-2 mb-2 mt-4">Visit Information</h3>
                                        <p><span className="font-medium">Purchase Date:</span> {formatDate(selectedPurchase.createdAt)}</p>
                                        <p><span className="font-medium">Visit Date:</span> {selectedPurchase.visitDate ? formatDate(selectedPurchase.visitDate) : 'Not scheduled'}</p>
                                        <p><span className="font-medium">Status:</span> {selectedPurchase.status || 'Processing'}</p>
                                        {selectedPurchase.notes && (
                                            <p><span className="font-medium">Notes:</span> {selectedPurchase.notes}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t pt-4 flex justify-end gap-2">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Close
                                    </button>


                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </Layout>
    );
};

export default ManagePurchases;