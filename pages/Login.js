import Link from 'next/link';
import Router from 'next/router';
import { React, useState, useEffect } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../store/Action/userAuth'
import { admimloginSuccess } from '@/store/Action/adminAuth';

const Login = () => {

    const [Pass, setPass] = useState(false)
    const [Data, setData] = useState({ email: "", password: "" });


    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            Router.push("/");
        }
        else if (localStorage.getItem("session")) {
            Router.push("/Dashboard/Home");
        }
    }, []); // Redercting to Home page if user is loged in (no need to login if auth-token is avalible for user)
    const dispatch = useDispatch();



    const handleChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }

    const handleSeepassword = () => {
        if (Pass) {
            setPass(false)
        }
        else {
            setPass(true);
        }

    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const request = await fetch('https://softec-23-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })
        let output = await request.json()
        console.log(output);

        if (output.success) {
            toast.success("Login Succesful", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom,
            });
            setData({ email: "", password: "" });
            if (output.user.role == "admin") {
                localStorage.setItem("session", output.token);
                dispatch(admimloginSuccess(output.user));
                Router.push("/Dashboard/Home")
            }
            else {
                localStorage.setItem("auth-token", output.token);
                dispatch(loginSuccess(output.user));
                Router.push("/")
            }
            return
        }

        else if (!output.status) {
            toast.error(output.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />



            <section className="relative flex flex-wrap mb-10 lg:items-center">
                <div className="w-full px-2 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">


                    <div className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Shop From us today</h1>

                        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat
                            mollitia?
                        </p>

                        <form onSubmit={handleLoginSubmit} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl  py-16">
                            <p className="text-lg font-medium">Sign in to your account</p>

                            <div>
                                <label htmlFor="email" className="text-sm font-medium">email & Contact</label>

                                <div className="relative mt-1">
                                    <input
                                        type="email"
                                        id="email"
                                        name='email'
                                        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter Valid email"
                                        required
                                        value={Data.email}
                                        onChange={handleChange}
                                    />

                                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="stroke-2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-end">
                                    <label htmlFor="password" className="text-sm font-medium mr-auto">password</label>
                                    <Link href="/Frogotpassword">
                                        <p className=" ml-auto text-xs hover:underline dark:text-gray-500  hover:text-indigo-600  font-bold" >Forgot password?</p>
                                    </Link>
                                </div>

                                <div className="relative mt-1">
                                    <input
                                        type={Pass ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter password"
                                        required
                                        value={Data.password}
                                        onChange={handleChange}

                                    />

                                    <span className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer" onClick={handleSeepassword}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="stroke-2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="stroke-2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                                Sign in
                            </button>

                            <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
                                <Link href="/CreateAccount">
                                    <span className="hover:underline text-sm font-bold  px-2 dark:text-indigo-800">Sign up</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>




                <div className="relative w-full sm:h-96 lg:w-1/2 lg:h-full  xl:h-full z-0">
                    <div className="px-4 py-10 sm:mt-5 md:mt-5 space-y-10 bg-gray-100 xl:py-32 md:px-40 lg:px-20 xl:px-40">

                        <svg
                            className="w-8 text-deep-purple-accent-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                        >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Vestire Store.
                        </span>
                        <span className="sr-only">Kutty Home Page</span>

                        <div className="flex space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-purple-700">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h2 className="text-xl font-medium text-purple-700">Free account</h2>
                                <p className="mt-1 text-gray-700">Create apps, connect databases and add-on services, and collaborate on your apps, for free.</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-purple-700">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h2 className="text-xl font-medium text-purple-700">Your app platform</h2>
                                <p className="mt-1 text-gray-700">A platform for apps, with app management & instant scaling, for development and production.</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-purple-700">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h2 className="text-xl font-medium text-purple-700">Deploy now</h2>
                                <p className="mt-1 text-gray-700">Go from code to running app in minutes. Deploy, scale, and deliver your app to the world.</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-purple-700">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h2 className="text-xl font-medium text-purple-700">Free account</h2>
                                <p className="mt-1 text-gray-700">Create apps, connect databases and add-on services, and collaborate on your apps, for free.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>









        </>
    )
}

export default Login