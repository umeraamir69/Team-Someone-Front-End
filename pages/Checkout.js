import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { admimloginSuccess, adminlogout, logout } from '../store/Action/userAuth'
import { useSelector } from 'react-redux'
import Link from 'next/link';
import { ToastContainer, toast, Zoom } from 'react-toastify';

export default function Checkout() {
    const [dropdown1, setDropdown1] = useState(false);
    const [changeText1, setChangeText1] = useState("City");
    const [cart, setcart] = useState()
    const [sumry, setsumry] = useState(false)
    const [smrydata, setsmrydata] = useState()

    const HandleText1 = (e) => {
        setChangeText1(e);
        setDropdown1(false);
    };

    const handleorder = async (e) => {
        e.preventDefault()
        const datasend = []
        const a = JSON.parse(localStorage.getItem("cart"))
        for (let index = 0; index < a.length; index++) {
            const x = { qty: a[index].qty, productId: a[index]._id }
            datasend.push(x)
        }
        const request = await fetch('https://softec-23-production.up.railway.app/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({ products: datasend }),
        })
        const output = await request.json()
        if (output.status == 201) {
            toast.success(`Order Places Succesfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setsumry(true)
            setsmrydata(output.order)
            localStorage.setItem("key", output.order._id)
        }
    }


    useEffect(() => {
        setcart(JSON.parse(localStorage.getItem("cart")))
    }, []);


    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    return (
        <div className="overflow-y-hidden">
            {!sumry ?

                <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
                    <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <div className="flex w-full  flex-col justify-start items-start">
                            <div className>
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                            </div>
                            {isAuthenticated ?
                                <button onClick={handleorder} className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">Order Now</button>
                                :
                                <Link href="/Login">
                                    <button className="focus:outline-none  px-20 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">Login First</button>
                                </Link>
                            }
                            <div className="mt-4 flex justify-start items-center w-full">
                                <a href="javascript:void(0)" className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                                    Back to my bag
                                </a>
                            </div>
                        </div>
                        {cart ?
                            JSON.parse(localStorage.getItem("cart")).map((product) => (
                                <li key={product._id} className="flex py-6">


                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link href={`/ Products / ${product._id}`}> {product.title} </Link>
                                                </h3>
                                                <p className="ml-4">{product.type}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {product.qty}</p>
                                        </div>
                                    </div>
                                </li>
                            )) : "No Products In Cart"}
                    </div>
                </div>
                :
                <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                    <div>
                        <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                    </div>
                    <div className="flex mt-7 flex-col items-end w-full space-y-6">
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Total items</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">{smrydata.products.length}</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">250 PKR</p>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <p className="text-lg leading-4 text-gray-600">Sub total </p>
                            <p className="text-lg font-semibold leading-4 text-gray-600">{smrydata.orderTotalAmount}</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full items-center mt-32">
                        <p className="text-xl font-semibold leading-4 text-gray-800">Total </p>
                        <p className="text-lg font-semibold leading-4 text-gray-800">{Number(smrydata.orderTotalAmount) + 250} PKR</p>
                    </div>
                </div>

            }
        </div>
    );
}
