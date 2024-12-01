import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Coursel from '../components/Coursel'
import Cars from '../components/Cars'
import axios from 'axios'





const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    if (error) return <div>{error}</div>;
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