import React from 'react'
import { Link } from 'react-router-dom'

const CarModify = () => {
    return (
        <div className='m-6 bg-slate-400 p-8 rounded-md'>
            <div className='flex justify-between items-center '>

                <h1 className='text-5xl'>Car Modification</h1>
                <div className='flex gap-3'>
                    <Link className='bg-green-400 p-3 cursor-pointer hover:bg-green-600' to={'/admin/create-product'}>Create</Link>
                    <Link className='bg-yellow-400 p-3 cursor-pointer hover:bg-yellow-600'>Show All Cars</Link>
                    <Link className='bg-blue-400 p-3 cursor-pointer hover:bg-blue-600'>Edit</Link>
                    <Link className='bg-red-400 p-3 cursor-pointer hover:bg-red-600'>Delete</Link>
                </div>
            </div>


        </div>

    )
}

export default CarModify