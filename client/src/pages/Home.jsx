import React from 'react'
import Layout from '../components/Layout'
import Coursel from '../components/Coursel'
import Cars from '../components/Cars'



const Home = () => {
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