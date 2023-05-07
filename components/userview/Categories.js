import React from 'react'
import Link from 'next/link';
import keys from '../../public/Images/key.png'

const Categories = () => {
    return (
        <div>
            <div className=" 2xl:container flex justify-center items-center w-full 2xl:mx-auto lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="w-80 md:w-auto grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6">
                    <Link href="/Products" className="relative group">
                        <img className="lg:block hidden w-full" src="/Images/key.png" alt="Women" />
                        <img className="lg:hidden md:block hidden w-full" src="https://i.ibb.co/PwMpH9g/pexels-two-dreamers-2345236-1-1.png" alt="Women" />
                        <img className="w-full md:hidden" src="https://i.ibb.co/Ks91wpt/pexels-two-dreamers-2345236-1.png" alt="Women" />
                        <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
                        <div className=" absolute top-0 left-0 w-full h-full flex justify-start items-end opacity-0 hover:opacity-100 p-8">
                            <p className=" font-semibold text-2xl leading-6 text-white">Gaming Gadgets</p>
                        </div>
                    </Link>
                    <div className=" lg:px-6 lg:py-0 md:py-16 md:px-24 py-16 px-6 flex flex-col justify-center items-center text-center bg-gray-100">
                        <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-10 leading-9 text-gray-800 lg:w-full md:w-7/12 w-full">Shop your Favourite Gadgets</h2>
                        <p className=" font-medium text-base leading-6 text-gray-600 mt-4 lg:w-full md:w-7/12 w-full">We offer a huge colletion of premium gadgets with excellence for our adored customers</p>
                        <Link href="/Products" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700 text-white text-base leading-4 bg-gray-800 lg:px-10 py-4 lg:w-auto w-72 mt-16">Discover More</Link>
                    </div>
                    <Link href="/Products" className="relative group">
                        <img className="lg:block hidden w-full" src="/Images/asd.jpeg" alt="Man" />
                        <img className="lg:hidden md:block hidden w-full" src="https://i.ibb.co/hYmYWgT/pexels-two-dreamers-2345236-2.png" alt="Man" />
                        <img className="w-full md:hidden" src="https://i.ibb.co/99kYP9T/pexels-two-dreamers-2345236-2.png" alt="Man" />
                        <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
                        <div className=" absolute top-0 left-0 w-full h-full flex justify-start items-end opacity-0 hover:opacity-100 p-8">
                            <p className=" font-semibold text-2xl leading-6 text-white">Video Games</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Categories