import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import AdminLayout from '../AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const AdminCarComponent = () => {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCar() {
            try {
                const { data } = await axios.get('/car/getAllcars')
                setCars(data.productList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCar()
    }, [])

    const handleEdit = (slug) => {
        navigate(`/admin/edit-car/${slug}`)
    }

    const handleDelete = async (id) => {
        console.log(id)
        if (!window.confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`/car/delete/${id}`);
            setLoading(false);
            navigate('/admin/cars');
        } catch (err) {
            setError('Failed to delete car');
            setLoading(false);
            console.error(err);
        }
    }

    return (
        <Layout>
            <AdminLayout>
                <div className="bg-blue-400 p-3 rounded-lg shadow-md mb-6 text-center hover:bg-blue-500 cursor-pointer font-bold text-3xl text-gray-900 hover:text-gray-900 duration-150" >
                    <Link to={'/admin/create-product'}>ADD CAR</Link>
                </div>
                <div className="max-w-[100%] mx-auto grid grid-cols-4 gap-4 mt-4">
                    {cars.map(car => (
                        <div
                            key={car._id}
                            className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-slate-100 flex flex-col justify-between"
                        >
                            <Link to={`/c/${car.slug}`} className="block">
                                <div className="mb-2">
                                    <img
                                        src={car.image}
                                        alt={`${car.title} ${car.model}`}
                                        className="w-full h-32 object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/300/200';
                                            e.target.alt = 'Car image not available';
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-lg">{car.title}</h3>
                                    <p className="font-semibold text-xl text-blue-600">Rs {car.price}</p>
                                </div>
                            </Link>
                            {/* Edit and Delete Buttons */}
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                                    onClick={() => handleEdit(car.slug)}
                                >
                                    <span className='text-2xl'>
                                        <RiEdit2Fill />
                                    </span>
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition-colors duration-200 ease-in-out"
                                    onClick={() => handleDelete(car._id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminLayout>
        </Layout>
    )
}

export default AdminCarComponent