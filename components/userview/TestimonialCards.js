import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

const TestimonialCards = (props) => {
    const arr = [props.stars]
    return (
        <div className="">
            <blockquote className="flex h-full flex-col justify-between bg-white p-8 md:p-12 dark:bg-gray-800 w-screen md:w-auto">
                <div>
                    <div className="flex gap-0.5 text-yellow-500">
                        {[...Array(props.stars || 5)].map((star) => {
                            return <svg
                                key={Math.random()}
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                        })}
                        {props.stars < 5 ? [...Array(5 - props.stars)].map((star) => {
                            return <AiOutlineStar key={Math.random()} className='w-5 h-5' />
                        }) : ""}
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl font-bold text-pink-600 sm:text-3xl">{props.heading}</p>
                        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-200">{props.comments}</p>
                    </div>
                </div>
                <footer className="mt-8 text-sm text-gray-600 font-bold  dark:text-gray-200 capitalize">
                    &mdash; {props.name}
                </footer>
            </blockquote>
        </div>
    )
}

export default TestimonialCards