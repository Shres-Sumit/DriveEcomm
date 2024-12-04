import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const CarList = () => {
    useEffect(() => {
        async function fetchCar() {
            try {
                const { data } = await axios.get('/car/getAllcars')
                console.log(data.product)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCar()
    }, [])
    return (
        <Layout></Layout>
    )
}

export default CarList