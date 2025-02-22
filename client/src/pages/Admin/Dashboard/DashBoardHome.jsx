import React from 'react'
import AdminLayout from '../AdminLayout'
import Layout from '../../../components/Layout'

const DashBoardHome = () => {
    return (
        <Layout>
            <AdminLayout>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-500 p-4 text-white rounded">
                        <h2>Total Cars</h2>
                        <p>120</p>
                    </div>
                    <div className="bg-green-500 p-4 text-white rounded">
                        <h2>Active Users</h2>
                        <p>350</p>
                    </div>
                    <div className="bg-red-500 p-4 text-white rounded">
                        <h2>Pending Orders</h2>
                        <p>15</p>
                    </div>
                </div>
            </AdminLayout>
        </Layout>
    )
}

export default DashBoardHome