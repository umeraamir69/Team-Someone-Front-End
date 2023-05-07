import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const AddReviews = (props) => {

    const [Data, setData] = useState({ Comment: "" })
    const [rating, setRating] = useState(0)
    const [Loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (rating == 0) {
            return toast.warning("Please Select Stars.", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        Data.raiting = rating;

        setLoading(true);

        const request = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify(Data),
        })

        const output = await request.json()

        if (output.status) {
            toast.success(output.error, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setData({ Name: props.name, Email: props.email, Comment: "", Heading: "" })
            setLoading(false);
            return props.setform(true);
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
            return setLoading(false);
        }

        else {
            toast.warning(`Internal Server Error.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return setLoading(false);
        }
    };






    const handleRatingClick = (value) => {
        setRating(value);
    }

    const handleChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <div className="">
                <blockquote className="flex h-full flex-col justify-between bg-white p-12 dark:bg-gray-800">
                    <div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="z-0 w-full mb-6 group">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <span className=' text-yellow-500 text-xl cursor-pointer px-1'
                                                key={value}
                                                onClick={() => handleRatingClick(value)}
                                            >
                                                {value <= rating ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <textarea onChange={handleChange} value={Data.Comment} type="text" name="Comment" id="Comment" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="Comment " className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Comments</label>
                                </div>
                                {Loading ?
                                    <button className="flex flex-row text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
                                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                            <AiOutlineLoading3Quarters />
                                        </svg> Processing...
                                    </button>
                                    :
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                }

                            </form>

                        </div>
                    </div>

                </blockquote>
            </div>


        </div>
    )
}

export default AddReviews

