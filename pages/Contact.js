import { React, useState, useEffect } from 'react'
import Image from 'next/image';

import Link from 'next/link';
import ContactForm from '../components/userview/ContactForm';

import { AiOutlinePhone } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillChatFill } from 'react-icons/bs'


const FAQ1 = [{
    Id: 1,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
}, {
    Id: 2,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
},
{
    Id: 3,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
}]
const FAQ2 = [{
    Id: 1,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
}, {
    Id: 2,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
},
{
    Id: 3,
    Name: 'jkahda sknd',
    Details: "loremr aoiduh asudioy iusao tuifyg ulsa g"
}]

const Contact = () => {
    const [show, setShow] = useState(false);


    return (
        < >
            <div className="relative overflow-hidden  ">
                <img src="/images/contact_banner.png" layout="intrinsic" height={400} className='sm:h-48' placeholder='blur' alt='' />
                <div className="absolute top-0 left-0 px-6 lg:pt-11 lg:pl-12 ">
                    <h4 className=" lg:text-5xl lg:mt-10 lg:font-bold font-semibold tracking-tight text-white ">Need Help ?</h4>
                    <p className="lg:text-3xl lg:mt-8 lg:mb-4 text-gray-100 text-sm sm:text-sm">We are always avalible to help our beloved customers!</p>
                    <p className=" lg:text-3xl  text-gray-100 mt-3 text-sm sm:text-xs">( 9:00 AM to 5:00 PM ) Mon - Sun</p>
                </div>
            </div>













            <section class="text-gray-700">
                <div class="container px-5 py-10 mx-auto">
                    <div class="text-center mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Recently Asked Question</h1>
                        <p class="leading-relaxed text-gray-500  xl:w-2/4 lg:w-3/4 mx-auto">
                            The following are the Recently asked Question.make an eye on it may the question matched been asked with one you have and we save time
                        </p>
                    </div>


                    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div class="w-full lg:w-1/2 px-4 py-2">

                            {FAQ1.map((Faq) => (
                                <details class="mb-4" key={Faq.Id}>
                                    <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        {Faq.Name}
                                    </summary>

                                    <span>
                                        {Faq.Details}
                                    </span>
                                </details>
                            ))}
                        </div>
                        <div class="w-full lg:w-1/2 px-4 py-2">
                            {FAQ2.map((Faq) => (
                                <details class="mb-4" key={Faq.Id}>
                                    <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        {Faq.Name}
                                    </summary>

                                    <span>
                                        {Faq.Details}
                                    </span>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>





            <div id="form" className='mt-2'>
                <ContactForm heading="Contact Us" details="lorem10 iubghasxc iubgha 9" />
            </div>

            <div id="contact" className='flex items-center justify-center lg:py-12  flex-col lg:mt-10'>
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2  text-gray-900">Still Have Queries !</h1>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-400">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>

                <div className='mt-5 flex-wrap  sm:mx-1 flex items-center justify-center'>

                    <a href="tel:+923335911922" className="my-1 lg:mx-5  md:mx-1 cursor-pointer flex flex-col  items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 py-4 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 justify-center">
                        <AiOutlinePhone className="h-28 w-28 rounded-full border-2 p-5 text-black dark:text-white " aria-hidden="true" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Call Us</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">       +92 325 8258232       </p>
                        </div>
                    </a>

                    <a href="mailto:umeraamir45@gmail.com" className="my-1 lg:mx-5  md:mx-1 cursor-pointer flex flex-col  items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 py-4 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 justify-center">
                        <AiOutlineMail className="h-28 w-28 rounded-full border-2 p-5 text-black dark:text-white " aria-hidden="true" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">E-Mail</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">umeraamir45@gmail.com</p>
                        </div>
                    </a>

                    <Link href="/Contact#form">
                        <div className="my-1 lg:mx-5  md:mx-1 cursor-pointer flex flex-col  items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 py-4 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 justify-center">
                            <BsFillChatFill className="h-28 w-28 rounded-full border-2 p-5 text-black dark:text-white " aria-hidden="true" />


                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Online</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">      By filling the form.      </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>


        </>
    )
}

export default Contact

