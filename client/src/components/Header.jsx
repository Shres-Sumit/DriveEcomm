import React, { useEffect, useRef, useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";




import { useAuth, useSearch } from '../Context/Auth'
import axios from 'axios'




const Header = () => {

    const navigate = useNavigate()
    const [auth] = useAuth()
    const [searchResults, setSearchResults] = useSearch()

    const [search, setSearch] = useState('')
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)



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

    function handleUserClick() {
        setDropdownOpen(!isDropdownOpen)
    }

    function handleLogOut() {
        setDropdownOpen(false)
        localStorage.clear()
        navigate('/login')

    }


    useEffect(() => {
        const handleClickedOutside = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        };
        document.addEventListener('mousedown', handleClickedOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickedOutside)
        }

    }, [])



    return (
        <>
            <nav className="shadow-xl max-w-[99%] mx-auto bg-gray-300  rounded-sm mb-[20px]">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start w-14">
                            <div className="flex shrink-0 items-center">
                                <Link to={'/'}>
                                    <h1 className="text-3xl font-bold text-indigo-600 tracking-wider italic drop-shadow-lg">
                                        Vintage
                                    </h1>
                                </Link>
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

                            <div className="group relative">
                                <Link

                                    to="/bucket"
                                    className={`flex flex-col items-center hover:text-gray-900 font-semibold  'text-gray-700' `}
                                >
                                    <FaCartShopping className={`text-3xl  relative`} />

                                </Link>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300 ">
                                    Bucket
                                </div>
                            </div>

                            {
                                auth.token ? <div className='group relative'>
                                    <button onClick={handleUserClick} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                                        <FaUserCircle className="text-3xl " />

                                    </button>
                                    {
                                        !isDropdownOpen && (
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-10 transition-opacity transition-delay-200 duration-300">
                                                {auth?.user?.userName}
                                            </div>
                                        )
                                    }

                                    {isDropdownOpen && (
                                        <div ref={dropdownRef} className="absolute -right-10 mt-3 w-52 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                            <Link to={'/profile'} className="flex items-center  px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <span className="mr-2" >Profile</span>
                                                <FaUserCircle className='text-2xl' />
                                            </Link>
                                            <button onClick={handleLogOut} className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <span className="mr-2" >Log Out</span>
                                                <IoLogInOutline className='text-2xl' />

                                            </button>
                                        </div>
                                    )}

                                </div> :
                                    <div className="group relative">
                                        <Link to="/login" className="text-gray-700 hover:text-gray-900">
                                            <IoIosLogIn className="text-3xl font-bold" />
                                        </Link>
                                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-200 text-gray-700 text-base px-2 py-1 rounded-md z-20 transition-opacity transition-delay-200 duration-300 w-20">
                                            Sign In
                                        </span>
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