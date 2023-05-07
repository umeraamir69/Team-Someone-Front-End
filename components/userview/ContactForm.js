var jwt = require('jsonwebtoken');
import { React, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const ContactForm = (props) => {
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const request = await fetch('/api/AddComplain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })



        const output = await request.json()

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
            setData({ Name: "", Contact: "", Email: "", Type: "complain", Message: "" })

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

        else {
            toast.warning(`Internal Server Error ${output.error}`, {
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

    const handleChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }


    const [Email, setEmail] = useState(false);
    const [EmailVal, setEmailVal] = useState("");
    useEffect(() => {
        const varsa = localStorage.getItem("auth-token");
        if (varsa) {
            // setEmail(true)
            // const decode = jwt.verify(varsa, "dbpjct234234sdfasdfXDEFSDFSDFDff");
            // setEmailVal(decode.Email);
        }
    }, [])

    const [Data, setData] = useState({ Name: "", Contact: "", Email: "", Type: "complain", Message: "" });


    return (
        <>
            <section className=" dark:bg-gray-800 dark:text-gray-50 my-5 lg:p-10 sm:p-2 lg:py-20">
                <fieldset className="container flex flex-col mx-auto space-y-12">
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 ">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="lg:text-2xl font-semibold sm:text-sm">{props.heading}</p>
                            <p className="text-sm">{props.details}</p>

                            <div className="p-2 w-full pt-8 mt-8  text-center ">
                                <p className="leading-normal my-5">49 Smith St.
                                    <br />Saint Cloud, MN 56301
                                </p>
                                <span className="inline-flex">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-4 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="block uppercase px-2 tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white" htmlFor="Name">
                                    Name
                                </label>
                                <input onChange={handleChange} value={Data.Name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Name" name='Name' type="text" placeholder="Name" required minLength="02" />
                            </div>
                            <div className="col-span-full sm:col-span-3">

                                <label htmlFor="Email" className="block uppercase px-2 tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">Email</label>

                                <div className="relative mt-1">
                                    <input
                                        type="email"
                                        id="Email"
                                        className={`w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
                                        placeholder="Enter Registered email"
                                        required
                                        name="Email"
                                        onChange={handleChange} value={Email ? EmailVal : Data.Email}
                                        minLength="6"
                                        disabled={Email}

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

                            <div className="col-span-full sm:col-span-3">
                                <label className="block uppercase tracking-wide px-2 text-gray-700 text-xs font-bold mb-2 dark:text-white" htmlFor="Contact">
                                    Contact
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="Contact"
                                    type="tel"
                                    placeholder="+92-XXX-XXXXXXX"
                                    required name="Contact"
                                    onChange={handleChange}
                                    value={Data.Contact}
                                    pattern=".{11,13}" title="11 to 13 numbers" />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label className="block uppercase tracking-wide text-gray-700 px-2 text-xs font-bold mb-2 dark:text-white" htmlFor="Type">
                                    Type
                                </label>
                                <div className="relative">
                                    <select name='Type' required className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Type" onChange={handleChange} value={Data.Type}>
                                        <option value="complain">Complain</option>
                                        <option value="opinion">Opinion</option>
                                        <option value="Collaboration">Collaboration</option>
                                        <option value="other">Others (Specify in Message)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                            </div>




                            <div className="col-span-full">
                                <label className="block uppercase px-2 tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white" htmlFor="Message">
                                    Message
                                </label>
                                <textarea onChange={handleChange} value={Data.Message} required name='Message' minLength="9" id="Message" placeholder="" className="w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                            </div>
                            <div className="col-span-full">
                                <button type="submit" className="px-4 py-2 border rounded-md dark:border-gray-100 hover:bg-white hover:text-gray-900 ">Submit</button>
                            </div>
                        </div>
                    </form>
                </fieldset>
            </section>


        </>
    )
}

export default ContactForm