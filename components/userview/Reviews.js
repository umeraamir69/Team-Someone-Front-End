import React from 'react'
import { useState, useRef, useEffect } from 'react';
import TestimoialsForm from './TestimoialsForm';
import TestimonialCards from './TestimonialCards';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const reviews = [{
    "id": 1,
    "Name": "Umer Aamir",
    "Raiting": 5,
    "Heading": "Amazing Experience!",
    "Comment": "I recently purchased a car from this dealership and was blown away by the level of service I received. The website was easy to use and allowed me to browse their inventory from home. When I came in for a test drive, the sales team was knowledgeable and helpful. Overall, a great experience!"
},
{
    "id": 2,
    "Name": " Aamir",
    "Raiting": 4,
    "Heading": "Great Service!",
    "Comment": "I've been using this dealership for years for all of my vehicle maintenance and repairs. The service department is always friendly and professional, and they always do a great job. The only reason I didn't give 5 Raiting is because I think the prices could be a bit lower."
},
{
    "id": 3,
    "Name": "yahya Aamir",
    "Raiting": 5,
    "Heading": "Smooth Financing Process",
    "Comment": "I was nervous about financing a car, but the finance team at this dealership made the process easy and stress-free. They walked me through all of my options and helped me find a payment plan that worked for my budget. I highly recommend this dealership."
},
{
    "id": 4,
    "Name": "daud",
    "Raiting": 4,
    "Heading": "Great Selection",
    "Comment": "I was impressed with the variety of cars available at this dealership. The website made it easy to see what was in stock, and when I came in for a test drive, the sales team was able to answer all of my questions. The only downside was that the process took longer than I expected."
},
{
    "id": 5,
    "Name": "sarim",
    "Raiting": 5,
    "Heading": "Excellent Customer Service",
    "Comment": "I had a minor issue with my car and brought it in for repairs. The service team was able to diagnose and fix the problem quickly, and they kept me informed throughout the process. Overall, I'm very happy with the service I received from this dealership."
}];



const Reviews = (props) => {
    const [num, setnum] = useState(0);
    const [animation, setanimation] = useState(true);
    const [initialAnimation, setinitialAnimation] = useState(false)
    const [form, setform] = useState(true);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.user);
    const router = useRouter()

    useEffect(() => {
        if (props.data) {
            JSON.parse(props.data).map((data, index) => (reviews.push(data)))
        }
    }, [props])


    const HandleChange = (a) => {
        if (a == 0) {
            if (num == 0) {
                setnum(reviews.length - 1);
            }
            else if (num > 0 && num <= reviews.length - 1) {
                setnum(num - 1);
            }
        }
        else if (a == 1) {
            if (num >= 0 && num < reviews.length - 1) {
                setnum(num + 1);
            }
            else if (num == reviews.length - 1) {
                setnum(0);
            }
        }
    }

    const handleClick = event => {
        if (!animation) {
            setanimation(true);
            setinitialAnimation(true);
        } else {
            setanimation(false);
            setTimeout(() => {
                setanimation(true);
            }, 10);
        }

    };

    const boxRef = useRef();


    const handelAddTestimonials = () => {
        if (isAuthenticated) {
            setform(!form)
        }
        else {
            toast.warning("Login First.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClick: (() => {
                    router.push('/Login', undefined, { shallow: true, state: { backUrl: router.asPath } });
                })
            });
        }


    }

    useEffect(
        function onFirstMount() {
            const a = boxRef.current.offsetTop
            function onScroll() {
                const scrolled = document.documentElement.scrollTop;

                if (a <= scrolled + (screen.availHeight / 2)) {
                    setanimation(true);
                    setinitialAnimation(true);
                }
                else {
                    setanimation(false);
                    setinitialAnimation(false)
                }
            }
            window.addEventListener("scroll", onScroll);
        }, []
    );

    return (
        <>

            <section className="bg-gray-100 dark:bg-gray-900 overflow-hidden" ref={boxRef}>
                <div
                    className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:mr-0 lg:pl-8 lg:pr-0">
                    <div
                        className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
                        <div className={`max-w-xl text-center sm:text-left ${initialAnimation ? "animate__animated animate__fadeInLeft" : " animate-none"}`}>
                            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl dark:text-gray-100">
                                Don&rsquo;t just take our word ...
                                Read reviews from our customers
                            </h2>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Read our reviews and discover why our customers love us! We take pride in providing exceptional service and quality vehicles to each and every customer.
                            </p>

                            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                                {form ? <> <button
                                    className="prev-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white" onClick={() => {
                                        HandleChange(0)
                                        handleClick();
                                    }}>
                                    <span className="sr-only">Previous Slide</span>
                                    <svg
                                        className="h-5 w-5 -rotate-180 transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 5l7 7-7 7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </button>

                                    <button
                                        className="next-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white" onClick={() => {
                                            HandleChange(1);
                                            handleClick();
                                        }}>
                                        <span className="sr-only">Next Slide</span>
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </button>
                                    <div onClick={handelAddTestimonials} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                                        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                        <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease dark:text-gray-200">Add Testimonials</span>
                                    </div>
                                </> : ""}
                            </div>
                        </div>

                        <div className="-mx-6 lg:col-span-2 lg:mx-0">
                            <div className="swiper-container !overflow-hidden">
                                <div className={animation ? "animate__animated animate__faser animate__bounceInRight" : ""} >
                                    {form ?
                                        <TestimonialCards name={reviews[num].Name} heading={reviews[num].Heading} stars={reviews[num].Raiting} id={reviews[num].id} comments={reviews[num].Comment} />
                                        :
                                        <TestimoialsForm setform={setform} Name={userData.FName + " " + userData.LName} email={userData.Email} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4 lg:hidden">
                        {form ? <> <button
                            aria-label="Previous slide"
                            className="prev-button rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
                            onClick={() => {
                                HandleChange(0);
                                handleClick();
                            }}>
                            <svg
                                className="h-5 w-5 -rotate-180 transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 5l7 7-7 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </button>

                            <button
                                aria-label="Next slide"
                                className="next-button rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
                                onClick={() => {
                                    HandleChange(1);
                                    handleClick();
                                }}>
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 5l7 7-7 7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                            <div onClick={handelAddTestimonials} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease dark:text-gray-200">Add Testimonials</span>
                            </div>
                        </> : ""}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews;




