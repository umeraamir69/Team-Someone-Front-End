import { useState, React } from 'react';
import { ShoppingCartIcon, ExclamationCircleIcon, HomeIcon } from '@heroicons/react/outline'
import ReviewsLong from '../../components/userview/ReviewsLong'
import Stars from '../../components/userview/Stars'
import Link from 'next/link';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Image from 'next/image'
import AddReviews from '@/components/userview/AddReviews';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'


const ProductPg = ({ res }) => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [data, setdata] = useState(JSON.parse(res))
    const [addrev, setAddrev] = useState(false)

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.user);

    const handlereviews = () => {
        setAddrev(!addrev)
    }
    const HanldeClick = (event) => {
        console.log("I have clicked", event.target.name);
    }

    const handleCart = (event) => {
        if (localStorage.getItem("cart")) {
            const a = JSON.parse(localStorage.getItem("cart"))
            let flag = false
            for (let index = 0; index < a.length; index++) {
                if (a[index]._id == data._id) {
                    a[index].qty = ++a[index].qty;
                    toast.success(`${data.title} Quantity Increased`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                else {
                    flag = true
                }
            }

            if (flag || a.length == 0) {
                a.push({
                    _id: data._id,
                    title: data.title,
                    price: data.marketPrice,
                    qty: 1,
                    type: data.inventoryType
                })
                toast.success(`${data.title} Added to cart`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            localStorage.setItem("cart", JSON.stringify(a))
        }
        else {
            localStorage.setItem("cart", JSON.stringify([
                {
                    _id: data._id,
                    title: data.title,
                    price: data.marketPrice,
                    qty: 1,
                    type: data.inventoryType
                }
            ]))
            toast.success(`${data.title} Added to cart`, {
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

        <div>
            {!data.code ?
                <div>
                    <section>
                        <div className="relative max-w-screen-xl px-4 py-8 mx-auto my-8">
                            <div className=' font-extrabold text-center text-5xl py-4 mb-8 title-font text-gray-800  '>{data.Name}</div>
                            <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                                    <div className="aspect-w-1 aspect-h-1">
                                        <Image
                                            className="object-cover rounded-xl"
                                            src={data.image[0]}
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 lg:mt-4">
                                        {data.image.map((images) => (
                                            <div key={images} className="aspect-w-1 aspect-h-1">
                                                <Image
                                                    alt="Mobile Phone Stand"
                                                    className="object-cover rounded-xl"
                                                    src={images}
                                                    width={1000}
                                                    height={1000}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="sticky top-0">
                                    {data.sale ? <strong className="border border-red-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-sm bg-gray-100 text-red-600 p-5"> On Sale {data.Discount} % Discount</strong> : ""}
                                    {data.quantity == 0 ? <strong className="border mx-2 border-red-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-sm bg-gray-100 text-red-600 p-5">Out of Stock !</strong> : ""}
                                    <div className="lg:w-full w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.title}</h1>

                                        <div className="flex mb-4">
                                            <span className="flex items-center">

                                                <span className="text-gray-600 ml-3">Age: {data.minimumAge}</span>
                                            </span>

                                        </div>
                                        <p className="leading-relaxed">{data.Description}</p>
                                        <div>

                                            <p className="text-base leading-4 mt-7 text-gray-600">Product Code: {data._id}</p>
                                            <p className="text-base leading-4 mt-3 text-gray-600">Stock : {data.quantity} Items left</p>
                                            <p className="text-base leading-4 mt-3 text-gray-600">Type: {data.inventoryType}</p>
                                            <p className="md:w-96 text-base leading-normal text-gray-600 mt-3">Delivery: 1-3 Working Days</p>
                                        </div>


                                        <div className="flex mt-5">
                                            <span className="title-font font-medium text-2xl text-gray-900">PKR {data.marketPrice} /-</span>
                                            <button onClick={handleCart} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-500 rounded" name={data._id}>Add To Cart
                                                <ShoppingCartIcon className="mx-2 h-6 w-6" aria-hidden="true" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className=" 2xl:container 2xl:mx-auto md:py-2 lg:px-36 md:px-6 py-5 px-4">
                        {isAuthenticated ? <a onClick={handlereviews} class="relative inline-block text-lg group">
                            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span class="relative">Add Reviews</span>
                            </span>
                            <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                        </a> :
                            <Link href="/Login" class="relative inline-block text-lg group ">
                                <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                    <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                    <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span class="relative">Login to Add Reviews</span>
                                </span>
                                <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </Link>
                        }
                        {
                            !addrev ?

                                <div className=" flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
                                    <div className=" md:w-full lg:w-full w-full md:mt-0 sm:mt-14 mt-10">

                                        <div>
                                            <div className=" flex justify-between items-center cursor-pointer cursor-pointer" onClick={() => setShow(!show)}>
                                                <h3 className=" font-semibold text-xl leading-5 text-gray-800">Reviews</h3>
                                                <button aria-label="too" className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path className={show ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4.16602 10H15.8327" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <section className={"font-normal py-4 text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show ? "block" : "hidden")}>
                                                {!data.reviews.length <= 0 ? data.reviews.map((item) => (
                                                    <div key={item}>{item}</div>
                                                )) : "no Reviews Avalble"}
                                            </section>
                                        </div>

                                        <hr className={`bg-gray-200 ${show ? "mt-0 mb-7" : "my-7"}`} />
                                    </div>
                                </div> :
                                <AddReviews />
                        }
                    </div>
                </div> :
                <div className='flex items-center justify-center lg:h-72 sm:h-64 flex-wrap flex-col'>
                    <div className='flex  flex-row p-5'>
                        <ExclamationCircleIcon className='h-8 w-8' />
                        <p className='text-xl font-semibold px-2  '>Sorry! This product is no longer available.
                        </p>
                    </div>
                    <Link href="/">
                        <div >
                            <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-500 rounded" >
                                <HomeIcon className="mx-2 h-6 w-6" aria-hidden="true" />Home Page
                            </button>
                        </div>
                    </Link>
                </div>
            }





        </div>
    )
}


export async function getServerSideProps(context) {
    const request = await fetch(`https://softec-23-production.up.railway.app/api/inventory/${context.query.id}`, {
        method: 'GET', headers: { 'Content-Type': 'application/json', }
    })
    let output = await request.json()
    if (output._id)
        return { props: { res: JSON.stringify(output) } };
    else {
        return { props: { res: JSON.stringify(output) } };
    }
}


export default ProductPg;


