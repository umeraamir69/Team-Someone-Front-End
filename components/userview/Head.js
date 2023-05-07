import React from 'react'
import Link from 'next/link';

const Head = () => {
    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">Welcome to
                        <span className="dark:text-violet-400">Someone Gaming</span>Store
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">Your ultimate desicisoin for all your need</p>
                    <div className="flex flex-wrap justify-center">
                        <Link href="/Products" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Purchase Now</Link>
                        <Link href="/AboutUs" className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-50 dark:border-gray-700">About Us</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Head