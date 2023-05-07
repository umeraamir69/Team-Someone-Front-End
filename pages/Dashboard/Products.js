import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
// import AddCar from '../../components/Dashboard/AddCar';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { admimloginSuccess, adminlogout } from '../../store/Action/adminAuth'
import AddProduct from '@/components/Dashbaord/AddProduct';

const Products = (props) => {
    const [data, setdata] = useState(JSON.parse(props.data))
    const [form, setform] = useState(true);
    const [edit, setedit] = useState(false)
    const [editData, seteditData] = useState({ _id: "", title: "", marketPrice: "", costPrice: "", margin: "", minimumAge: "", image: [] })


    const handleEdit = (event) => {
        event.preventDefault()
        setedit(!edit);
        const x = JSON.parse(event.target.id)
        seteditData({ _id: x._id, name: x.name, price: x.price, model: x.model, color: x.color, raiting: x.raiting, register: x.register, transmission: x.transmission, millage: x.millage, fuel: x.fuel, engineSize: x.engineSize, Sold: x.Sold, acive: x.acive, RegestrationNumber: x.RegestrationNumber, details: x.details })
    }

    const handleChange = (event) => {
        seteditData({ ...editData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const request = await fetch('/api/EditCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData),
        })

        const resuelt = await request.json();

        if (resuelt.status) {
            setedit(!edit)
            handleRefresh()
            return toast.success(resuelt.error, {
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
            return toast.error(resuelt.error, {
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


    const handleRefresh = async () => {
        setloader(true);
        const request = await fetch('/api/ReadCars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pass: "umer" })
        })
        let output = await request.json()
        if (output.status) {
            setdata(output.data)
            setloader(false);
        }
    }

    const handleTick = (event) => {
        seteditData({ ...editData, [event.target.name]: event.target.checked })
    }



    const handleDelete = async (event) => {
        const ID = event.target.id
        const descision = confirm("Are you Sure ?");
        if (descision) {
            const request = await fetch('/api/DeleteCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ID)
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
                return handleRefresh();
            }
            else {
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
    }


    const [loader, setloader] = useState(true);
    const router = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.adminAuth.adminIsAuthenticated);
    const userData = useSelector((state) => state.adminAuth.adminUser);


    useEffect(() => {
        const Verify = async () => {
            const request = await fetch('/api/Auth/ValidateAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Token: localStorage.getItem("session") })
            })
            const output = await request.json()
            if (output.status) {
                dispatch(admimloginSuccess(output.error));
                setloader(false);
            }
            else {
                localStorage.clear("session")
                dispatch(adminlogout());
                router.replace("/Auth/Login");
            }
        }
        if (!isAuthenticated) {
            if (localStorage.getItem("session")) {
                Verify();
            }
            else {
                router.replace("/Auth/Login");
            }
        }
        else {
            setloader(false);
        }

    }, [isAuthenticated])



    return (
        <>
            {loader ? <Loader /> : ""}
            {form ?
                <div>
                    <Head>
                        <title>Cars -  Dawood Motor</title>
                        <meta name="description" content="Dawood motors name of trust. Leading car delaer In lahore punjab Pakistan. Developed by Muhammad Umer Aamir " />
                        <meta name="keywords" content="Cars, honda, toyota , bmw , sports car , dawood , dawood motors , dawood motor , lahore , punjab , pakistan , muhammad umer aamir , car , car dealer , mulana shaukat ali road, xh.someone, umeraamir.69 , dawood aamir " />
                        <meta name="author" content="Muhammad Umer Aamir xh.someone umeraamir.69 dawood Aamir" />
                        <link rel="icon" href="../../123.svg" />
                    </Head>
                    <div className={`p-4  mt-16`}>
                        <div className='flex items-center justify-center' >

                            <h1 className="mb-2 mx-2 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Products</h1>
                        </div>
                        <div className='flex flex-wrap '>
                            <div>
                                <a onClick={() => setform(!form)} className="w-32 cursor-pointer flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-500 whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                                    Add Product
                                </a>
                            </div>
                            <div>
                                <a onClick={handleRefresh} className="w-36 mx-2 cursor-pointer flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-500 whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                                    Refresh data
                                </a>
                            </div>
                            <div className="  w-52 mx-2 cursor-pointer flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-500 whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                                <CSVLink data={data} filename="Cars Dawood Motors.csv" >
                                    Download Data (CSV)
                                </CSVLink>
                            </div>
                        </div>
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">
                                                Sr.
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Type
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Inventory
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                marketPrice
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Coast Price
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                margin
                                            </th>


                                            <th scope="col" className="px-3 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((data, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                                <td className="px-2 py-4">
                                                    {index + 1}.
                                                </td>
                                                <th scope="row" className="px-3 py-4 italic font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <Link href={`/Cars/${data._id}`} target="_blank" rel="noreferrer" >
                                                        {data.title}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-4">
                                                    {data.inventoryType}
                                                </td>
                                                <td className="px-3 py-4">
                                                    {data.quantity}
                                                </td>
                                                <td className="px-3 py-4">
                                                    {data.marketPrice}
                                                </td>
                                                <td className="px-3 py-4">
                                                    {data.costPrice}
                                                </td>
                                                <td className="px-3 py-4">
                                                    {data.margin}
                                                </td>


                                                <td className="px-3 py-4 flex">
                                                    <div className="mx-1 font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" onClick={handleDelete} id={data._id} >
                                                        <svg clipRule="evenodd" className='w-5 h-5 fill-red-500' fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id={data._id}>
                                                            <path id={data._id} d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                                                        </svg>
                                                    </div>
                                                    <div className="mx-1 font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" id={JSON.stringify(data)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24" id={JSON.stringify(data)} onClick={handleEdit} className="dark:fill-white">
                                                            <path id={JSON.stringify(data)} d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                                                        </svg>
                                                    </div>
                                                    <Link href={`/Cars/${data._id}`} target="_blank" rel="noreferrer"  >
                                                        <div className="mx-1 font-medium w-5 h-5 dark:fill-white text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" id={data._id}  >
                                                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fillRule="nonzero" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>






                    <div className={`${edit ? "fixed" : "hidden"} top-0  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                        <div className="relative w-full h-full max-w-2xl md:h-auto">

                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Edit<b className=' font-semibold'> {editData.name}</b>
                                    </h3>
                                    <button onClick={() => setedit(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">


                                    <form onSubmit={handleSubmit} autoComplete='off'>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.name} />
                                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Car Name</label>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="number" name="model" id="model" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.model} min={1999} max={2024} />
                                                <label htmlFor="model" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Model</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="number" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.price} min={100000} />
                                                <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Price</label>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="number" name="millage" id="millage" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.millage} min={0} />
                                                <label htmlFor="millage" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Millage</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="number" name="engineSize" id="engineSize" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.engineSize} min={0} />
                                                <label htmlFor="engineSize" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Engine Size</label>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="text" name="RegestrationNumber" id="RegestrationNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 uppercase peer" placeholder=" " required onChange={handleChange} value={editData.RegestrationNumber} />
                                                <label htmlFor="RegestrationNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Regestration Number</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="number" name="raiting" id="raiting" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={editData.raiting} />
                                                <label htmlFor="raiting" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" min={0.1} max={10}>Raiting (0-10)</label>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="text" name="register" id="register" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize" placeholder=" " required onChange={handleChange} value={editData.register} />
                                                <label htmlFor="register" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Regestration City</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Color:</label>
                                                <select onChange={handleChange} value={editData.color} id="color" name="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="white">White</option>
                                                    <option value="black">Black</option>
                                                    <option value="silver">Silver</option>
                                                    <option value="gray">Gray</option>
                                                    <option value="golden">Golden</option>
                                                    <option value="red">Red</option>
                                                    <option value="green">Green</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <label htmlFor="transmission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Transmission :</label>
                                                <select onChange={handleChange} value={editData.transmission} id="transmission" name="transmission" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="Automatic">Automatic</option>
                                                    <option value="Manual">Manual</option>
                                                </select>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <label htmlFor="fuel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Fuel type:</label>
                                                <select onChange={handleChange} value={editData.fuel} id="fuel" name="fuel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electricity">Electricity</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="relative z-0 w-full mb-6 group">
                                            <textarea onChange={handleChange} value={editData.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 h-auto bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="flex items-center mb-4">
                                                <input onClick={handleTick} id="acive" name='acive' defaultChecked={editData.acive} value={editData.acive} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="acive" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-`300">Add Acive</label>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <input onClick={handleTick} id="Sold" name='Sold' defaultChecked={editData.Sold} value={editData.Sold} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="Sold" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sold</label>
                                            </div>
                                        </div>

                                        <div className='flex '>
                                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Changes</button>

                                            <div onClick={() => (setedit(!edit))} className="w-min text-red-100 bg-red-700  mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  dark:border-gray-500  hover:bg-red-600 dark:focus:ring-gray-600">Cancel</div>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
                :



                <AddProduct setform={setform} form={form} handleRefresh={handleRefresh} />

            }
        </>
    )
}

export default Products;


export async function getServerSideProps(context) {
    const request = await fetch(`https://softec-23-production.up.railway.app/api/inventory`, {
        method: 'GET', headers: { 'Content-Type': 'application/json', }
    })
    const resuelt = await request.json()
    console.log(resuelt);
    return { props: { data: JSON.stringify(resuelt) } };
};  