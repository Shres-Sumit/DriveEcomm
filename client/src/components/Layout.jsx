import React from 'react'

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