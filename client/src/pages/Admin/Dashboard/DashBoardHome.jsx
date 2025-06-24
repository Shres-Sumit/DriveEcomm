import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Layout from "../../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashBoardHome = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [userList, setUserList] = useState([]);
    const [testDrives, setTestDrives] = useState([]);

    useEffect(() => {
        async function fetchCar() {
            try {
                const { data } = await axios.get("/car/getAllcars");
                setCars(data.productList);
            } catch (error) {
                console.log(error);
            }
        }

        async function getUser() {
            try {
                const { data } = await axios.get("/user/getAllUser");
                setUserList(data.users);
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchTestDrives() {
            try {
                const { data } = await axios.get("/testDrive/book-test-drive");
                console.log(data);
                const formattedTestDrives = data.date.map((drive) => ({
                    id: drive._id, // Adding id for handling approvals/cancellations
                    userId: drive.user_id,
                    carId: drive.car_id,
                    date: drive.date[0]?.date || drive.date, // Handling array structure
                    createdAt: drive.createdAt,
                    status: drive.status || 'pending' // Adding default status
                }));
                setTestDrives(formattedTestDrives);
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
        fetchCar();
        fetchTestDrives();
    }, []);


    const getCarDetails = (carId) => {
        const car = cars.find((c) => c._id === carId);
        return car ? { name: car.title, image: car.image } : { name: "Unknown Car", image: "" };
    };


    const getUserName = (userId) => {
        const user = userList.find((u) => u._id === userId);
        return user ? user.userName : "Unknown User";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear()

        // Function to add ordinal suffix (st, nd, rd, th)
        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return "th"; // Covers 11th-19th
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return (
            <>
                {month} {day}
                <sup>{getOrdinalSuffix(day)}</sup>, {year}
            </>
        );
    };

    const handleApprove = async (testDriveId) => {
        try {
            // Replace with your actual API endpoint
            await axios.put(`/testDrive/update-status/${testDriveId}`, {
                status: 'approved'
            });

            // Update local state to reflect change
            setTestDrives(prevDrives =>
                prevDrives.map(drive =>
                    drive.id === testDriveId ? { ...drive, status: 'approved' } : drive
                )
            );
        } catch (error) {
            console.error("Error approving test drive:", error);
            alert("Failed to approve test drive. Please try again.");
        }
    };

    const handleCancel = async (testDriveId) => {
        try {
            // Replace with your actual API endpoint
            await axios.put(`/testDrive/update-status/${testDriveId}`, {
                status: 'cancelled'
            });

            // Update local state to reflect change
            setTestDrives(prevDrives =>
                prevDrives.map(drive =>
                    drive.id === testDriveId ? { ...drive, status: 'cancelled' } : drive
                )
            );
        } catch (error) {
            console.error("Error cancelling test drive:", error);
            alert("Failed to cancel test drive. Please try again.");
        }
    };

    // Helper function to get status styling
    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 font-medium';
            case 'cancelled':
                return 'bg-red-100 text-red-800 font-medium';
            default:
                return 'bg-yellow-100 text-yellow-800 font-medium';
        }
    };
    console.log(testDrives);

    return (
        <Layout>
            <AdminLayout>
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-blue-500 p-6 text-white rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-blue-600 transition duration-300" onClick={() => navigate("/admin/cars")} >
                            <h2 className="text-lg font-semibold">Total Cars</h2>
                            <p className="text-3xl font-bold">{cars.length}</p>
                        </div>

                        <div className="bg-green-500 p-6 text-white rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-green-600 transition duration-300" onClick={() => navigate("/admin/users")}>
                            <h2 className="text-lg font-semibold">Active Users</h2>
                            <p className="text-3xl font-bold">{userList.length}</p>
                        </div>

                        <div className="bg-yellow-500 p-6 text-white rounded-lg shadow-md flex flex-col items-center">
                            <h2 className="text-lg font-semibold">Total Test Drives</h2>
                            <p className="text-3xl font-bold">{testDrives.length}</p>
                        </div>
                    </div>

                    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Test Drives</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="bg-gray-100 border-b border-gray-300">
                                    <tr>
                                        <th className="py-3 px-4 border border-gray-300 text-left">User</th>
                                        <th className="py-3 px-4 border border-gray-300 text-left">Car</th>
                                        <th className="py-3 px-4 border border-gray-300 text-left">Booking Date</th>
                                        <th className="py-3 px-4 border border-gray-300 text-left">Test Drive Date</th>
                                        <th className="py-3 px-4 border border-gray-300 text-left">Status</th>
                                        <th className="py-3 px-4 border border-gray-300 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testDrives.length > 0 ? (
                                        testDrives.map((drive, index) => {
                                            const { name, image } = getCarDetails(drive.carId);
                                            return (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="py-3 px-4 border border-gray-300 bg-blue-100">{getUserName(drive.userId)}</td>
                                                    <td className="py-3 px-4 border border-gray-300 bg-blue-100">
                                                        <div className="flex flex-col items-center">
                                                            <span className="font-semibold text-gray-800">{name}</span>
                                                            {image && (
                                                                <img
                                                                    src={image}
                                                                    alt={name}
                                                                    className="w-40 h-24 object-cover rounded mt-2 shadow-lg border border-gray-400"
                                                                />
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 border border-gray-300 bg-blue-100 text-green-900 font-semibold">
                                                        {formatDate(drive.createdAt)}
                                                    </td>
                                                    <td className="py-3 px-4 border border-gray-300 bg-blue-100 text-blue-900 font-semibold">
                                                        {formatDate(drive.date)}
                                                    </td>
                                                    <td className={`py-3 px-4 border border-gray-300 ${getStatusStyles(drive.status)}`}>
                                                        {drive.status ? drive.status.charAt(0).toUpperCase() + drive.status.slice(1) : 'Pending'}
                                                    </td>
                                                    <td className="py-3 px-4 border border-gray-300 bg-gray-50">
                                                        <div className="flex gap-2">
                                                            {drive.status !== 'approved' && (
                                                                <button
                                                                    onClick={() => handleApprove(drive.id)}
                                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    disabled={drive.status === 'cancelled'}
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}

                                                            {drive.status !== 'cancelled' && (
                                                                <button
                                                                    onClick={() => handleCancel(drive.id)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    disabled={drive.status === 'approved'}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            )}

                                                            {drive.status === 'approved' && (
                                                                <span className="text-green-600 font-medium">Approved</span>
                                                            )}

                                                            {drive.status === 'cancelled' && (
                                                                <span className="text-red-600 font-medium">Cancelled</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-gray-500 border border-gray-300">
                                                No test drives found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </Layout>
    );
};

export default DashBoardHome;