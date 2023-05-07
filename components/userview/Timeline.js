import React from 'react'
import 'animate.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';



const Timeline = () => {
    const boxRef = useRef();
    const [animation, setanimation] = useState(true)



    useEffect(
        function onFirstMount() {
            const a = boxRef.current.offsetTop
            function onScroll() {
                const scrolled = document.documentElement.scrollTop;

                if (a <= scrolled + (screen.availHeight / 2)) {
                    setanimation(true);
                }
                else {
                    setanimation(false);
                }
            }
            window.addEventListener("scroll", onScroll);
        }, []
    );



    return (

        <div className=' my-5 ' >
            <h1 ref={boxRef} className={`dark:text-gray-100 mb-4 text-4xl  text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl  ${animation ? "animate__animated animate__rubberBand" : " animate-none"} `}>Our History</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Someone Gaming Store&#39;s 20 year timeline from the beginning</p>

            <div className="container mx-auto w-full h-full" >
                <div className="relative wrap overflow-hidden p-10 h-full">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-2/4" ></div>

                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                        </div>
                        <div className={`order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-4 py-6 sm:p-3 ${animation ? "animate__animated animate__fadeInRight" : ""}`}>

                            <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-2xl dark:text-white">The Begning   <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"> 2023</span></h1>

                            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Founded by <b>CEO</b> Someone in Fast Lahore , Pakistan.</p>
                        </div>
                    </div>


                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                        </div>
                        <div className={`order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-4 py-6 sm:p-3 ${animation ? "animate__animated animate__fadeInLeft" : ""}`}>

                            <h1 className="mb-4 text-1xl text-white font-extrabold leading-none tracking-tight  md:text-1xl lg:text-2xl">Registerd TradeMark <span className="underline underline-offset-3 decoration-8 decoration-blue-700 dark:decoration-blue-600"> 2023 </span></h1>

                            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Someone Gaming Store registerd at SECP punjab.</p>
                        </div>
                    </div>


                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                        </div>
                        <div className={`order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-4 py-6 sm:p-3 ${animation ? "animate__animated animate__fadeInRight" : ""}`}>
                            <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-2xl dark:text-white">Selling International Gears <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"> 2023</span></h1>
                            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Someone Gaming Shop start importing gadgets from abroad.</p>
                        </div>
                    </div>


                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
                        </div>
                        <div className={`order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-4 py-6 sm:p-3 ${animation ? "animate__animated animate__fadeInLeft" : ""}`}>

                            <h1 className="mb-4 text-1xl text-white font-extrabold leading-none tracking-tight  md:text-1xl lg:text-2xl">E-Commerence Website <span className="underline underline-offset-3 decoration-8 decoration-blue-700 dark:decoration-blue-600"> 2023</span></h1>

                            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">&quot; Created E-Commerence Online App: A Milestone in Someone Gaming Store History.&quot;</p>
                        </div>
                    </div>








                </div>


            </div>

        </div >
    )
}

export default Timeline;