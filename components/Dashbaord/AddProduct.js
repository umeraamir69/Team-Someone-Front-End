import React, { useState } from 'react'
import Link from 'next/link'
import { IoCarSportSharp } from 'react-icons/io5'
import { toast, Zoom } from 'react-toastify';


const AddProduct = (props) => {
    const [data, setdata] = useState({ title: "", marketPrice: "", costPrice: "", inventoryType: "video_games", margin: 0, minimumAge: 0, image: [] });
    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState([]);



    const [image, setImage] = useState('');

    const handleImageChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        //Handle report
        data.image = image

        const request = await fetch('https://softec-23-production.up.railway.app/api/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("session")}`
            },
            body: JSON.stringify(data),
        })

        const resuelt = await request.json();

        if (resuelt.status) {
            props.handleRefresh();
            props.setform(!props.form);
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




    const handleChange = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value })
    }






    return (
        <>
            <div className={`p-4   mt-16`}>
                <div className='flex items-center justify-center' >
                    <IoCarSportSharp className="w-10 h-10 dark:text-gray-100" />
                    <h1 className="mb-2 mx-2 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Add Product</h1>
                </div>
                <div>
                    <a onClick={() => props.setform(!props.form)} className="w-48 cursor-pointer flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-500 whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                        View Product Data
                    </a>
                </div>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">



                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <div className="relative z-0 w-full mb-6 group">
                            <input min={10} type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.title} />
                            <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >title</label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="number" name="quantity" id="quantity" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.quantity} min={0} max={2000} />
                                <label htmlFor="quantity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Quantity</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="number" name="marketPrice" id="marketPrice" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.price} min={1} />
                                <label htmlFor="marketPrice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Market Price</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="number" name="costPrice" id="costPrice" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.costPrice} min={1} />
                                <label htmlFor="costPrice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">cost Price</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="number" name="margin" id="margin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.margin} min={0} />
                                <label htmlFor="margin" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">margin</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="number" name="minimumAge" id="minimumAge" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={data.minimumAge} min={1} max={200} />
                                <label htmlFor="minimumAge" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >minimumAge</label>
                            </div>

                        </div>


                        <div className="grid md:grid-cols-2 md:gap-6">

                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="inventoryType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type:</label>
                                <select onChange={handleChange} value={data.inventoryType} id="inventoryType" name="inventoryType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="video_games">video_games</option>
                                    <option value="gaming_gear">Geaming Gear</option>

                                </select>
                            </div>
                        </div>




                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />

                        <button onSubmit={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AddProduct


