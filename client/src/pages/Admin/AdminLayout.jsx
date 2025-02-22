import React from 'react'
import Sidebar from './component/Sidebar'
import AdminHeader from './component/AdminHeader'

const AdminLayout = ({ children }) => {
    return (
        <div className='admin-container flex'>
            <Sidebar />
            <div className="admin-container flex-1">

                <main className="p-4">{children}</main>
            </div>


        </div>
    )
}

export default AdminLayout