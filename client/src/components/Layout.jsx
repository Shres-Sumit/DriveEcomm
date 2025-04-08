import React from 'react'

import Header from './Header';


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="mt-2 max-w-[95%] m-auto">
                {children}
            </main>

        </>
    )
}

export default Layout