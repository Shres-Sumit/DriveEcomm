import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../Context/Auth'
import { Link } from 'react-router-dom'

const SearchCom = () => {
    const [searchResults, setSearchResults] = useSearch()
    console.log(searchResults)

    return (
        <Layout>
            <div>

                {searchResults.length > 0 ? (
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4  w-[80%]">
                        {searchResults.map((car) => (
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
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </Layout>
    )
}

export default SearchCom