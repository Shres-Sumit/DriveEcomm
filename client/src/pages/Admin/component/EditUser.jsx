import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import AdminLayout from '../AdminLayout'
import axios from 'axios'

const EditUser = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get('/user/getAllUser')
            setUserList(data.users)
        }
        getUser()
    }, [])

    const admins = userList.filter(user => user.role === 1)
    const users = userList.filter(user => user.role === 0)

    return (
        <Layout>
            <AdminLayout>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="text-2xl font-bold text-center mb-4">Users</div>

                    {/* Admin Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
                        <h2 className="text-xl font-bold text-blue-600">Total Admins: {admins.length}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {admins.map((admin) => (
                            <div
                                key={admin._id}
                                className="bg-blue-100 p-4 rounded-lg shadow-md border-l-4 border-blue-600 cursor-pointer 
                transform transition duration-300 hover:scale-105 hover:bg-blue-200"
                            >
                                <h3 className="text-lg font-semibold">{admin.firstName} {admin.lastName}</h3>
                                <p className="text-gray-600">@{admin.userName}</p>
                                <p className="text-gray-500">📧 {admin.email}</p>
                                <p className="text-gray-500">📍 {admin.address}</p>
                                <p className="text-gray-500">📞 {admin.phone}</p>
                                <p className="mt-2 font-medium text-blue-600">Admin</p>
                            </div>
                        ))}
                    </div>

                    {/* Users Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
                        <h2 className="text-xl font-bold text-green-600">Total Users: {users.length}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-green-100 p-4 rounded-lg shadow-md border-l-4 border-green-600 cursor-pointer 
                transform transition duration-300 hover:scale-105 hover:bg-green-200"
                            >
                                <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                                <p className="text-gray-600">@{user.userName}</p>
                                <p className="text-gray-500">📧 {user.email}</p>
                                <p className="text-gray-500">📍 {user.address}</p>
                                <p className="text-gray-500">📞 {user.phone}</p>
                                <p className="mt-2 font-medium text-green-600">User</p>
                            </div>
                        ))}
                    </div>
                </div>



            </AdminLayout>
        </Layout>
    )
}

export default EditUser