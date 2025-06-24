import React from 'react';
import Sidebar from './component/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className='admin-container flex min-h-screen'>
            <Sidebar />
            <div className="admin-content flex-1">
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;