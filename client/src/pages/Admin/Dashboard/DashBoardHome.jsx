import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import Layout from '../../../components/Layout'
import axios from 'axios'

const DashBoardHome = () => {
    const [cars, setCars] = useState([])
    const [userList, setUserList] = useState([])

    useEffect(() => {
        async function fetchCar() {
            try {
                const { data } = await axios.get('/car/getAllcars')
                console.log(data)
                setCars(data.productList)
            } catch (error) {
                console.log(error)
            }
        }
        async function getUser() {
            const { data } = await axios.get('/user/getAllUser')
            setUserList(data.users)
        }
        getUser()
        fetchCar()
    }, [])

    return (
        <Layout>
            <AdminLayout>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-500 p-4 text-white rounded font-semibold">
                        <h2>Total Cars</h2>
                        <p>{cars.length}</p>
                    </div>
                    <div className="bg-green-500 p-4 text-white rounded font-semibold">
                        <h2>Active Users</h2>
                        <p>{userList.length}</p>
                    </div>

                </div>
            </AdminLayout>
        </Layout>
    )
}

export default DashBoardHome