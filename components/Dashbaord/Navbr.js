import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { admimloginSuccess, adminlogout } from '../../store/Action/adminAuth'
import { useSelector } from 'react-redux';
import { BiCommentDetail } from 'react-icons/bi'
import { BsNewspaper } from 'react-icons/bs'
import { MdOutlineSell } from 'react-icons/md'
import { FcInspection } from 'react-icons/fc'
import { Router, useRouter } from 'next/router';
import { IoExitOutline } from 'react-icons/io5'
import { MdWifiCalling1 } from 'react-icons/md'
import { FaFileInvoice } from 'react-icons/fa'
import { logout } from '@/store/Action/userAuth';





const Navabr = (props) => {
    const [show, setshow] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [showin, setshowin] = useState(false);
    const [sidebar, setsidebar] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.adminAuth.adminIsAuthenticated);
    const data = useSelector((state) => state.adminAuth.adminUser);

    useEffect(() => {
        const Verify = async () => {
            const request = await fetch('/api/ValidateJwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Token: localStorage.getItem("session") })
            })
            const output = await request.json()
            if (output.status) {
                dispatch(admimloginSuccess(output.error));
            }
            else {
                localStorage.clear("session")
                dispatch(adminlogout());
            }
        }
        if (!localStorage.getItem("session")) {
            router.push("/Login")
            dispatch(adminlogout())
        }
        else {
            Verify()
        }
    }, [])

    const handleLogout = () => {
        setshowin(false)
        router.replace("/")
        localStorage.clear()
        dispatch(adminlogout())
    }

    const handleLink = () => {
        setsidebar(!sidebar);
    }

    return (
        <div className=' print:hidden'>
            {isAuthenticated ?
                <>
                    <nav className="fixed top-0 z-50 w-full bg-white   border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start">

                                    <button onClick={() => setsidebar(!sidebar)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                        <span className="sr-only">Open sidebar</span>
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                        </svg>
                                    </button>

                                    <div className="flex ml-2 md:mr-24 items-center">


                                        <span className="self-center text-xl font-semibold sm:text-2xl ml-3 whitespace-nowrap dark:text-white">                                            <div className='flex'>

                                        </div> </span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div>
                                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { setshowin(!showin) }}>
                                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-800">
                                                    <span className="font-medium  text-gray-600 dark:text-white capitalize">{data.email[0]}</span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className={`${showin ? "fixed" : "hidden"} top-10 right-10  z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} >
                                            <div className="px-4 py-3" role="none">
                                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                    {data.Name}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 w-28" >
                                                    {data.Email}
                                                </p>
                                            </div>
                                            <ul className="py-1" role="none">
                                                <li>
                                                    <Link href="/Dashboard/Home" onClick={() => setshowin(!showin)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Dashboard</Link>
                                                </li>

                                                <li>
                                                    <div onClick={handleLogout} className="block cursor-pointer bg-red-700 px-4 py-2 text-sm hover:bg-red-900 text-red-200  " >Sign out</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <aside className={`fixed top-0   ${sidebar ? "left-64 md:left-0" : "hidden"}  z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"`}>
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link href="/Dashboard/Main" onClick={handleLink} >
                                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setshow(!show)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Postings</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul className={`${show ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/Car" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Cars</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Blogs" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Blog</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button onClick={() => setshow2(!show2)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Users</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul className={`${show2 ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/User" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Users</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Admin" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Admin</div>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Complain" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Complaint&apos;s</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Testimonials" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <BiCommentDetail className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Testimonials</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/PurchaseCarRequest" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <MdOutlineSell className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Seller Request</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Newsletter" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <BsNewspaper className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Newsletter</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setshow3(!show3)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <FcInspection className='w-6 h-6' />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Inspection</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <ul className={`${show3 ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/InspectionRequest" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Inspection Request</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Inspection" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Inspection</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/Dashboard/CallRequest" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLink} >
                                        <MdWifiCalling1 className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Call Request</span>
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Invoice" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLink} >
                                        <FaFileInvoice className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Invoice</span>
                                    </Link>
                                </li>


                                <li>
                                    <div onClick={handleLogout} className="flex items-center p-2 text-red-100 bg-red-700 rounded-lg  cursor-pointer hover:bg-red-500 ">
                                        <IoExitOutline className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </>

                :
                ""
            }
        </div >
    )
}

export default Navabr