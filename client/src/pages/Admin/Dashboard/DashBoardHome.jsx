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
                    userId: drive.user,
                    carId: drive.car,
                    date: drive.date[0]?.date || drive.date, // Handling array structure
                    createdAt: drive.createdAt,
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
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-500 border border-gray-300">
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
