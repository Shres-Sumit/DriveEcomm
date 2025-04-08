import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <nav className="mt-4">
                <ul>
                    <li className="">
                        <NavLink to="/admin" end className={({ isActive }) => `block p-2 rounded cursor-pointer ${isActive ? "bg-gray-600" : "hover:bg-gray-700"} `}>Dashboard</NavLink>
                    </li>
                    <li >
                        <NavLink to="/admin/cars" className={({ isActive }) => `block p-2 rounded cursor-pointer ${isActive ? "bg-gray-600" : "hover:bg-gray-700"} `}>Manage Cars</NavLink>
                    </li>
                    <li >
                        <NavLink to="/admin/users" className={({ isActive }) => `block p-2 rounded cursor-pointer ${isActive ? "bg-gray-600" : "hover:bg-gray-700"} `}>User List</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar