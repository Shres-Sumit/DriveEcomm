import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import AdminLayout from '../AdminLayout'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EditCar = () => {
    const [cars, setCars] = useState([])
    useEffect(() => {
        async function fetchCar() {
            try {
                const { data } = await axios.get('/car/getAllcars')
                // console.log(data.productList)
                setCars(data.productList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCar()
    }, [])
    return (
        <Layout>
            <AdminLayout>
                <div className="bg-blue-400 p-4 rounded-lg shadow-md mb-6 text-center hover:bg-blue-600 cursor-pointer font-bold text-3xl text-gray-900 hover:text-gray-400">
                    <Link to={'/admin/create-product'}>Add Car</Link>
                </div>
                <div className="max-w-[100%] mx-auto grid grid-cols-4 gap-4 mt-4">
                    {cars.map(car => (
                        <Link key={car._id} className="border rounded-lg p-4 shadow-md cursor-pointer" to={`/c/${car.slug}`}>
                            <div className="mb-2">
                                <img
                                    src={car.image}
                                    alt={`${car.title} ${car.model}`}
                                    className="w-full h-48 object-cover rounded-md"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/300/200';
                                        e.target.alt = 'Car image not available';
                                    }}
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg">{car.title} </h3>
                                <p className="font-semibold text-xl text-blue-600">${car.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </AdminLayout>

        </Layout>
    )
}

export default EditCar