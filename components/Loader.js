import React from 'react'
import { BsCircle } from 'react-icons/bs'

const Loader = () => {
    return (
        <div className="flex justify-center items-center  h-full bg-gray-200 dark:bg-gray-900 fixed w-screen z-50  ">
            <div className="grid gap-2">
                <div className="flex items-center justify-center ">
                    <div className="w-40 h-40 rounded-full animate-spin ">
                        <BsCircle className='w-10 h-10' />
                    </div>
                </div>
                <h1 className='text-2xl text-center dark:text-gray-100 p-2'>Loading...</h1>
            </div>
        </div>
    )
}

export default Loader