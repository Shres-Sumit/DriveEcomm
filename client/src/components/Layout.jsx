import React from 'react'
import { FaSearch } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="mt-2 max-w-[95%] m-auto">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout