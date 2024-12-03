import React from 'react'
import Layout from '../../components/Layout'
import Coursel from '../../components/Coursel'
import Cars from '../../components/Cars'
import CreateProduct from './CarModify'
import CarModify from './CarModify'

const AdminHome = () => {
    return (
        <>
            <Layout>

                <CarModify />
                <Coursel />

                <Cars />
            </Layout>
        </>
    )
}

export default AdminHome