import React, { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { CiLogin } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";



import { useAuth, useSearch } from '../Context/Auth'
import axios from 'axios'




const Header = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useSearch()

    const handleSearch = async (e) => {
        try {
            if (search) {
                const { data } = await axios.get(`/car/getOneCar/${search}`)
                setSearchResults(data.productList || [])
                navigate(`/search/${search}`)
            }
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults(null)
        }
    }

    return (
        <>
            <nav className="shadow-xl max-w-[99%] mx-auto bg-gray-300  rounded-sm mb-[20px]">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start w-14">
                            <div className="flex shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-lg relative">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-2 pl-10 border-red-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer" onClick={handleSearch} />
                            </div>
                        </div>

                        <div className="flex items-center justify-center ml-8 w-[30%] gap-20">
                            <div className="flex ">
                                <Link to="#" className="flex flex-col items-center text-gray-700 hover:text-gray-900 font-semibold">
                                    <FaCar className="text-2xl mb-1  " />
                                    <span className="text-xl"> Choose</span>
                                </Link>


                            </div>
                            <div className="flex ">
                                <Link to="/shop" className="flex flex-col items-center text-gray-700 hover:text-gray-900 font-semibold">
                                    <BsCart2 className="text-2xl mb-1 " />
                                    <span className="text-xl "> Carts</span>
                                </Link>


                            </div>
                            {
                                auth.token ? <div>
                                    <Link to="/login" className="flex flex-col items-center text-gray-700 hover:text-gray-900 font-semibold">
                                        <FaUserCircle className="text-2xl mb-1" />

                                        <span className="text-xl">{auth?.user?.userName} </span>
                                    </Link>
                                </div> :
                                    <div>
                                        <Link to="/login" className="flex flex-col items-center text-gray-700 hover:text-gray-900 font-semibold">
                                            <CiLogin className="text-2xl mb-1" />
                                            <span className="text-xl">Sign in</span>
                                        </Link>
                                    </div>
                            }

                        </div>
                    </div>
                </div>


            </nav>


        </>
    )
}

export default Header