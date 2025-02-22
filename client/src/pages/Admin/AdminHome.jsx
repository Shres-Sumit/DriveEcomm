import React from 'react'
import Layout from '../../components/Layout'
import Coursel from '../../components/Coursel'
import Cars from '../../components/Cars'
import CarModify from './CarModify'
import AdminLayout from './AdminLayout'

const AdminHome = () => {
    return (
        <>
            <Layout>
                <AdminLayout>


                    <Coursel />

                    <Cars />
                </AdminLayout>
            </Layout>
        </>
    )
}

export default AdminHome