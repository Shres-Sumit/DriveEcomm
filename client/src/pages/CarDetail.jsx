import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TestDriveBookingModal from '../components/TestDriveBookingModal'

const CarDetail = () => {
    const { slug } = useParams()
    const [carDetails, setCarDetails] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(slug)

    async function getCarDetail() {
        try {
            const { data } = await axios.get(`/car/${slug}`)
            console.log(data)
            setCarDetails(data.car)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookDrive = (date) => {
        console.log('Test drive booked for:', date);
    };
    useEffect(() => {
        getCarDetail()
    }, [])
    return (
        <>
            <Layout>
                {carDetails ? (
                    <div className="grid md:grid-cols-2 gap-8 ">
                        {/* Image Section */}
                        <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-6">
                            <img
                                src={carDetails.image}
                                alt={`${carDetails.title} ${carDetails.year}`}
                                className="max-w-full h-[400px] object-contain"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            {/* Title and Price */}
                            <div className="border-b pb-4">
                                <h1 className="text-5xl font-bold text-gray-900 mb-2">{carDetails.title}</h1>
                                <div className="text-3xl font-extrabold text-blue-600">
                                    ${carDetails.price.toLocaleString()}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                                <p className="text-gray-600">{carDetails.description}</p>
                            </div>

                            {/* Key Specifications */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Model', value: carDetails.model },
                                    { label: 'Year', value: carDetails.year },
                                    { label: 'Color', value: carDetails.color },
                                    { label: 'Vehicle Type', value: carDetails.vehicleType },
                                    { label: 'Mileage', value: `${carDetails.mileage.toLocaleString()} miles` },
                                    { label: 'Fuel Type', value: carDetails.fuelType },
                                    { label: 'Transmission', value: carDetails.transmission },
                                    { label: 'Condition', value: carDetails.condition },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-white border rounded-lg p-3 text-center">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                                        <div className="font-semibold text-gray-800">{value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition" onClick={() => setIsModalOpen(true)}>
                                    Book Test Drive
                                </button>
                                <TestDriveBookingModal
                                    open={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onBook={handleBookDrive}

                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-600">Loading car details...</p>
                    </div>
                )}


            </Layout >
        </>
    )
}



export default CarDetail