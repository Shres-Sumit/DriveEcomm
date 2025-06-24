import React, { useEffect, useRef, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { PiDotsThreeCircleThin } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';
import { useAuth, useSearch } from '../Context/Auth';

const Header = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [searchResults, setSearchResults] = useSearch();

    const [search, setSearch] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('You have a new message!');
    const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false); // State for notification dropdown
    const dropdownRef = useRef(null);
    const calendarRef = useRef(null);
    const notificationRef = useRef(null); // Ref for notifications

    const userId = auth?.user?._id;

    const handleSearch = async () => {
        try {
            if (search) {
                const { data } = await axios.get(`/car/getOneCar/${search}`);
                setSearchResults(data.productList || []);
                navigate(`/search/${search}`);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults(null);
        }
    };

    function handleUserClick() {
        setDropdownOpen(!isDropdownOpen);
    }

    const handleClickedOutside = e => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setCalendarOpen(false);
        }
        if (notificationRef.current && !notificationRef.current.contains(e.target)) {
            setNotificationOpen(false); // Close notifications when clicked outside
        }
    };

    function handleLogOut() {
        setDropdownOpen(false);
        localStorage.clear();
        navigate('/login');
    }

    // Open/close modal for notifications
    const toggleModal = (purchaseId = null) => {
        setSelectedPurchaseId(purchaseId); // Set the selected purchase ID
        setModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const handleClickedOutside = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                setNotificationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickedOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickedOutside);
        };
    }, []);

    return (
        <>
            <nav className="shadow-xl max-w-[99%] mx-auto bg-gray-300 rounded-sm mb-[20px]">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start w-14">
                            <div className="flex shrink-0 items-center">
                                <Link to={'/'}>
                                    <h1 className="text-3xl font-bold text-indigo-600 tracking-wider italic drop-shadow-lg">
                                        Vintage
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-lg relative">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-2 pl-10 border-red-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer" onClick={handleSearch} />
                            </div>
                        </div>

                        <div className="flex items-center justify-center ml-8 w-[30%] gap-20">
                            <div className="group relative">
                                <Link
                                    to="/bucket"
                                    className={`flex flex-col items-center hover:text-gray-900 font-semibold text-gray-700 `}
                                >
                                    <FaCartShopping className={`text-3xl relative`} />
                                </Link>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300">
                                    Bucket
                                </div>
                            </div>

                            {auth.token && (
                                <>

                                    <div className="group relative" ref={calendarRef}>
                                        <button onClick={() => setCalendarOpen(!isCalendarOpen)} className="flex items-center hover:text-gray-900 font-semibold text-gray-700">
                                            <FaCalendarAlt className={`text-3xl relative`} />
                                        </button>
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300">
                                            Test Drive Calendar
                                        </div>

                                        {isCalendarOpen && (
                                            <div className="absolute right-0 mt-3 w-[350px] max-h-80 bg-white shadow-xl border rounded-md z-50 overflow-y-auto p-4">
                                                <h2 className="text-lg font-semibold mb-2 text-gray-800">Test Drive Schedule</h2>
                                                <UserTestDriveNotification userId={userId} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Notification Icon */}
                                    <div className="group relative" ref={notificationRef}>
                                        <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="flex items-center hover:text-gray-900 font-semibold text-gray-700">
                                            <PiDotsThreeCircleThin className={`text-3xl relative`} />
                                        </button>
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300">
                                            Notifications
                                        </div>

                                        {isNotificationOpen && (
                                            <div className="absolute right-0 mt-3 w-[350px] max-h-80 bg-white shadow-xl border rounded-md z-50 overflow-y-auto p-4">
                                                <h2 className="text-lg font-semibold mb-2 text-gray-800">Notifications</h2>
                                                <UserVisitDate userId={userId} />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {auth.token ? (
                                <div className='group relative'>
                                    <button onClick={handleUserClick} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                                        <FaUserCircle className="text-3xl " />
                                    </button>
                                    {isDropdownOpen && (
                                        <div ref={dropdownRef} className="absolute -right-10 mt-3 w-52 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                            <Link to={'/profile'} className="flex items-center  px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <span className="mr-2" >Profile</span>
                                                <FaUserCircle className='text-2xl' />
                                            </Link>
                                            <button onClick={handleLogOut} className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <span className="mr-2" >Log Out</span>
                                                <IoLogInOutline className='text-2xl' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="group relative">
                                    <Link to="/login" className="text-gray-700 hover:text-gray-900">
                                        <IoIosLogIn className="text-3xl font-bold" />
                                    </Link>
                                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300 w-20">
                                        Sign In
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal for Notifications */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        <UserVisitDate userId={userId} />
                        <button onClick={toggleModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

// Notification list
const NotificationList = () => {
    return (
        <div className="space-y-4">
            <div className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-100">
                <p><strong>New Message:</strong> You have a new message!</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-100">
                <p><strong>Reminder:</strong> Don't forget to complete your purchase.</p>
            </div>
        </div>
    );
};




const UserVisitDate = ({ userId }) => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            try {
                const response = await axios.get(`/purchase/${userId}`);
                setPurchases(response.data);
            } catch (error) {
                console.error("Error fetching purchase details:", error);
                setError("Failed to fetch purchase details.");
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseDetails();
    }, [userId]);

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!purchases.length) return <div>No purchase details available.</div>;

    return (
        <div className="space-y-4 max-h-64 overflow-y-auto">
            {purchases.map((purchase, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-100">
                    <p><strong>Purchase Date:</strong> {formatDate(purchase.purchasedAt)}</p>
                    <p><strong>Visit Date:</strong> {purchase.visitDate ? formatDate(purchase.visitDate) : "Not set yet"}</p>
                    <p><strong>Total Price:</strong> Rs {purchase.totalPrice}</p>

                    <div className="ml-4 mt-2">
                        {purchase.cars.map((item, i) => (
                            <div key={i} className="mb-2">
                                <p>🚗 <strong>Car:</strong> {item.carId?.title || "Unknown Car"}</p>
                                <p>📦 <strong>Quantity:</strong> {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const UserTestDriveNotification = ({ userId }) => {
    console.log(userId)
    const [testDrives, setTestDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestDriveDetails = async () => {
            try {
                const response = await axios.get(`/testDrive/${userId}`);
                setTestDrives(response.data); // Set as array
            } catch (error) {
                console.error("Error fetching test drive details:", error);
                setError("Failed to fetch test drive details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTestDriveDetails();
    }, [userId]);

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!testDrives.length) return <div>No test drive details available.</div>;

    return (
        <div className="space-y-4 max-h-64 overflow-y-auto">
            {testDrives.map((testDrive, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-100">
                    <p><strong>Test Drive Date:</strong> {formatDate(testDrive.date)}</p>
                    <p><strong>Status:</strong> {testDrive.status === 'approved' ? 'Confirmed' : testDrive.status === 'cancelled' ? 'Cancelled' : 'Pending'}</p>

                    <div className="ml-4 mt-2">
                        <p><strong>Car:</strong> {testDrive.car_id?.title || "Unknown Car"}</p>
                        <p><strong>User ID:</strong> {testDrive.user_id}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};



export default Header;

