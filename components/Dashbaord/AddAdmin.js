import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'


const AddAdmin = (props) => {
    const [Pass, setPass] = useState(false);
    const [Data, setData] = useState({ firstName: "", LastName: "", phone: "", email: "", gender: "male", dob: "", password: "", city: "", province: "punjab", country: "" });


    const isAuthenticated = useSelector((state) => state.adminAuth.adminIsAuthenticated);



    const handleChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = await fetch('/api/ChckNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: Data.email, phone: Data.phone }),
        })
        const output = await request.json()

        if (output.status) {
            const request = await fetch('/api/AddUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            })
            let output = await request.json()
            if (output.status) {
                toast.success(output.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setData({ firstName: "", LastName: "", phone: "", email: "", gender: "male", dob: "", password: "", city: "", province: "punjab", Type: "Individual" });
                props.handleRefresh()
                return props.setform(true);
            }
        }
        else {
            return toast.error(output.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>

            <div className={`p-4   mt-16`}>
                <div className='flex items-center justify-center' >
                    <h1 className="mb-2 mx-2 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Add User </h1>
                </div>
                <div>
                    <a onClick={() => props.setform(!props.form)} className="w-48 cursor-pointer flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-500 whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                        View Users
                    </a>
                </div>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">



                    <form className="w-full" onSubmit={handleSubmit} method="POST">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase px-2 tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input onChange={handleChange} value={Data.firstName} className=" dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="firstName" name='firstName' type="text" placeholder="First Name" required minLength="02" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase px-2 tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2" htmlFor="LastName">
                                    Last Name
                                </label>
                                <input onChange={handleChange} value={Data.LastName} className="dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="LastName" type="text" placeholder="Last Name" name="LastName" required minLength="02" />
                            </div>
                        </div>


                        <div className="flex flex-wrap  mb-6">
                            <div className='w-full'>
                                <label htmlFor="email" className="block dark:text-gray-50 uppercase px-2 tracking-wide text-gray-700 text-xs font-bold mb-2">email</label>

                                <div className="relative mt-1">
                                    <input
                                        type="email"
                                        id="email"
                                        className="dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="Enter Valid email"
                                        required
                                        name="email"
                                        onChange={handleChange} value={Data.email}
                                        minLength="6"
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
                        </div>


                        <div className="flex flex-wrap  mb-6">
                            <label className="block uppercase tracking-wide px-2 text-gray-700 text-xs dark:text-gray-50 font-bold mb-2" htmlFor="password">
                                password
                            </label>
                            <div className="w-full  bg-gray-200   text-gray-700  mb-3  focus:outline-none focus:bg-white focus:border-gray-500">
                                <div className="relative">
                                    <input
                                        type={Pass ? "text" : "password"}
                                        id="password"
                                        className="dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="Enter password"
                                        required
                                        name="password"
                                        onChange={handleChange} value={Data.password}
                                        pattern=".{08,20}" title="08 to 20 digit Long"
                                    />

                                    <span className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer" onClick={() => setPass(!Pass)}>
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
                        </div>





                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                <label className="block dark:text-gray-50 uppercase tracking-wide px-2 text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                    phone
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600 "
                                    id="phone"
                                    type="tel"
                                    placeholder="03XXXXXXXXX"
                                    required name="phone"
                                    onChange={handleChange}
                                    value={Data.phone}
                                    pattern=".{11,13}" title="11 to 13 numbers" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase dark:text-gray-50 tracking-wide text-gray-700 px-2 text-xs font-bold mb-2" htmlFor="gender">
                                    gender
                                </label>
                                <div className="relative">
                                    <select name='gender' required className="block dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="gender" onChange={handleChange} value={Data.gender}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other&rsquo;s</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className="flex flex-wrap  mt-6">
                            <label className="block uppercase dark:text-gray-50 tracking-wide text-gray-700 text-xs font-bold mb-2 px-5" htmlFor="dob">
                                Date Of Birth
                            </label>
                            <div className="w-full  bg-gray-200 border-gray-200 border text-gray-700 rounded  mb-3  focus:outline-none focus:bg-white focus:border-gray-500">

                                <div className="relative">
                                    <input
                                        type="date"
                                        id="dob"
                                        className=" bg-gray-200 dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  py-3 px-3 leading-tight ocus:outline-none focus:bg-white w-full focus:border-gray-500"
                                        placeholder="Enter Date of Birth"
                                        required
                                        name='dob'
                                        value={Data.dob}
                                        onChange={handleChange}

                                    />

                                </div>
                            </div>
                        </div>






                        <div className="w-full sm:rounded-md">

                            <label className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold my-3 px-2" htmlFor="city">
                                city
                            </label>
                            <input
                                name="city"
                                id='city'
                                type="text"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  focus:border-gray-500"
                                placeholder="city"
                                required
                                onChange={handleChange}
                                value={Data.city}
                                minLength="3"
                            />
                            <div className="w-full ">
                                <label className="px-2 block dark:text-gray-50 uppercase tracking-wide text-gray-700 text-xs font-bold my-3" htmlFor="province">
                                    province
                                </label>
                                <div className="relative">
                                    <select name="province" id="province" required className="dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} value={Data.province}>
                                        <option>Punjab</option>
                                        <option>Sindh</option>
                                        <option>Khyber Pakhtunkhwa (KPK)</option>
                                        <option>Balochistan</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <label className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold my-3 px-2" htmlFor="city">
                                country
                            </label>
                            <input
                                name="country"
                                id='country'
                                type="text"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  focus:border-gray-500"
                                placeholder="country"
                                required
                                onChange={handleChange}
                                value={Data.country}
                                minLength="3"
                            />







                            <div className={`container flex items-center   justify-between px-10 my-10 `}>


                                <button type="submit" className={`dark:text-gray-100 dark:border-gray-50 btn-outline-primary transition duration-300 ease-in-out focus:outline-none h-12 focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal px-4 rounded `}> Add User </button>

                            </div>

                        </div>




                    </form>

                </div>
            </div>

        </>
    )
}

export default AddAdmin


