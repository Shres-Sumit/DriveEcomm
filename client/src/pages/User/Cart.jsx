import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'

const Cart = () => {
    const carSelect = useSelector(state => state.cart.items)
    console.log(carSelect)
    return (
        <Layout>
            {carSelect.map(car => (
                <Link key={car._id}>
                    <h1>{car.title}</h1>
                </Link>
            ))}
        </Layout>
    )
}

export default Cart