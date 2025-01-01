import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../Context/Auth';
import axios from 'axios';

const UserInfo = () => {
    const [auth, setAuth] = useAuth();
    console.log(auth)
    const { user } = auth;

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const [profile, setProfile] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });

    const [address, setAddress] = useState({
        address: user.address,
        phone: user.phone,
    });

    const maskEmail = (email) => {
        const [local, domain] = email.split('@');
        const maskedLocal = local.slice(0, 2) + '*'.repeat(local.length - 2);
        return `${maskedLocal}@${domain}`;
    };

    const handleProfileEdit = () => setIsEditingProfile(true);
    const handleAddressEdit = () => setIsEditingAddress(true);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const updateUser = async (updateData) => {
        try {
            const { data } = await axios.patch(`/user/${user._id}`, updateData)
            setAuth({ ...auth, user: data.user })
            if (isEditingProfile) setIsEditingProfile(false);
            if (isEditingAddress) setIsEditingAddress(false);
        } catch (error) {
            console.error('Error updating user:', error);

            // Optional: Show error notification to the user
            alert('Failed to update user. Please try again.');
        }
    }

    const saveProfile = () => {
        const profileData = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
        };

        updateUser(profileData, () => setIsEditingProfile(false))
    };

    const saveAddress = () => {
        const addressData = {
            address: address.address,
            phone: address.phone,
        };

        updateUser(addressData, () => setIsEditingAddress(false));
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage My Account</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Personal Profile</h2>
                            {isEditingProfile ? (
                                <button
                                    onClick={saveProfile}
                                    className="text-blue-500 text-sm"
                                >
                                    SAVE
                                </button>
                            ) : (
                                <button
                                    onClick={handleProfileEdit}
                                    className="text-blue-500 text-sm"
                                >
                                    EDIT
                                </button>
                            )}
                        </div>
                        {isEditingProfile ? (
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={profile.firstName}
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full mb-2"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={profile.lastName}
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full mb-2"
                                    placeholder="Last Name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full"
                                    placeholder="Email"
                                />
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-800 font-medium uppercase  " >
                                    {`${user.firstName} ${user.lastName}`}
                                </p>
                                <p className="text-gray-600">{maskEmail(user.email)}</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Address Book</h2>
                            {isEditingAddress ? (
                                <button
                                    onClick={saveAddress}
                                    className="text-blue-500 text-sm"
                                >
                                    SAVE
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddressEdit}
                                    className="text-blue-500 text-sm"
                                >
                                    EDIT
                                </button>
                            )}
                        </div>
                        {isEditingAddress ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={address.address}
                                        onChange={handleAddressChange}
                                        className="border p-2 w-full mb-2"
                                        placeholder="Address"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={address.phone}
                                        onChange={handleAddressChange}
                                        className="border p-2 w-full"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h1 className="text-gray-600 text-sm font-medium">DEFAULT SHIPPING ADDRESS</h1>
                                    <p className="text-black  font-medium mt-2 uppercase" >
                                        {`${user.firstName} ${user.lastName}`}
                                    </p>
                                    <p className="text-black  capitalize text-sm">{user.address}</p>
                                    <p className="text-black text-sm">(+977) {user.phone}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-600  font-medium">DEFAULT BILLING ADDRESS</h3>
                                    <p className="text-black  font-medium mt-2 uppercase " >
                                        {`${user.firstName} ${user.lastName}`}
                                    </p>
                                    <p className="text-black capitalize text-sm">{user.address}</p>
                                    <p className="text-black text-sm">(+977) {user.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserInfo;
