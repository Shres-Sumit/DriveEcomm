import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Coursel from '../components/Coursel'
import Cars from '../components/Cars'
import { useLocation } from 'react-router-dom'


const Home = () => {


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');

        if (paymentStatus === 'success') {
            toast.success('Your test drive schedule will be notified soon. Thank you!', {
                duration: 3000,
            });

            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);
    return (
        <>

            <Layout>
                <Coursel />

                <Cars />
            </Layout>

        </>
    )
}

export default Home