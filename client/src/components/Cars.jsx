import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useCarsList, useSearch } from '../Context/Auth'

const Cars = () => {

    const [carsList, setCarsList] = useCarsList()


    return (
        <div className='mt-[50px]'>
            <h1 className='text-3xl font-semibold'>Antique Collection</h1>
            <div className="container flex mt-8 ">

                <div className="sidebar w-[20%]">
                    List of the anttic


                    <div className="flex flex-wrap justify-center">
                        {carsList.map(car => (
                            <li className='list-none bg-gray-400 m-2 p-5 w-[calc(50%-1rem)] cursor-pointer rounded-md h-10 hover:bg-gray-600 flex items-center justify-center hover:duration-150 hover: ease-in-out ' key={car._id}>
                                {car.color}
                            </li>
                        ))}
                    </div>


                </div>


                <div class="grid grid-cols-2 md:grid-cols-4 gap-4  w-[80%]">
                    {carsList.map(car => (
                        <Link
                            key={car._id}
                            className="border rounded-lg p-4 shadow-md cursor-pointer transform transition-all hover:scale-105 hover:bg-gray-100"
                            to={`/c/${car.slug}`}
                        >
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

            </div>
        </div>
    )
}

export default Cars