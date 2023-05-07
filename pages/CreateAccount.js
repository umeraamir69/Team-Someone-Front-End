import { useState, React, useEffect, useContext } from 'react'
import Stepper from '../components/userview/Stepper'
import { toast } from 'react-toastify';
import Router from 'next/router';
import Link from 'next/link';
import { AiOutlineCar } from 'react-icons/ai';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Action/userAuth'
import Head from 'next/head';


const CreateAccount = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [Disable, setDisable] = useState(false);
    const [Pass, setPass] = useState(false)
    const [CnfrmPass, setCnfrmPass] = useState(false)
    const [Data, setData] = useState({ firstName: "", lastName: "", phone: "", email: "", gender: "male", dob: "", password: "", CnfrmPass: "", city: "", province: "punjab", country: "" });
    const [loader, setloader] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const Verify = async () => {
            const request = await fetch('/api/ValidateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Token: localStorage.getItem("auth-token") }),
            })
            const output = await request.json()
            if (output.status) {
                toast.warn("Already Login", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                dispatch(loginSuccess(output.error));
                Router.push("/")
            }
            else {
                localStorage.removeItem("auth-token")
                dispatch(logout());
                setloader(false);

            }
        };

        if (localStorage.getItem("auth-token")) {
            Verify()
        } else {
            setloader(false)
        }

    }, [])

    const handleChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }
    const stepArray = [
        "Bio Data",
        "city",
        "Success"
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleClick = (clickType) => {
        let newStep = currentStep;
        if (!Disable) {

            (clickType == "next") ? newStep++ : newStep--;
        }
        // Check if steps are within the boundary
        if (newStep > 0 && newStep <= stepArray.length) {
            setCurrentStep(newStep)
        }

        if (newStep == stepArray.length && !Disable) {
            setDisable(true);


        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setloader(true);
            if (!(Data.password == Data.CnfrmPass) && (currentStep == 1)) {
                toast.error("password does'nt match", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setloader(false);
                return;
            }

            else if ((Data.password == Data.CnfrmPass) && (currentStep == 1)) {
                if (isNaN(Number(Data.phone))) {
                    toast.warn("Enter Correct Phone Number", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloader(false);
                    return;
                }


                const request = await fetch('https://softec-23-production.up.railway.app/api/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: Data.email, phone: Data.phone }),
                })
                const output = await request.json()


                if (!output.exists) {
                    scrollToTop();
                    handleClick("next");
                    setloader(false);
                    return
                }
                else if (!output.status) {
                    toast.error("Email & Phone Already Exsist", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloader(false);
                    return;
                }
            }


            else if (currentStep == 2) {
                const request = await fetch('https://softec-23-production.up.railway.app/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Data)
                })
                let output = await request.json()

                if (output.success) {
                    setloader(false);
                    handleClick("next");
                    toast.success("Account created Succesfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(loginSuccess({ Data }))
                    setData({ firstName: "", lastName: "", phone: "", email: "", Gender: "male", dob: "", password: "", CnfrmPass: "", Address: "", city: "", province: "Punjab", Type: "" })
                    localStorage.setItem("auth-token", output.data);
                    return
                }
                else if (!output.status) {
                    setloader(false);
                    toast.error("An Error Occur", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return
                }
            }
        }
        catch (e) {
            setloader(false);
            toast.error(e, {
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



    const handleSeePassword = () => {
        if (Pass) {
            setPass(false)
        }
        else {
            setPass(true);
        }
    }

    const handleSeeCnrmPassword = () => {
        if (CnfrmPass) {
            setCnfrmPass(false);
        }
        else {
            setCnfrmPass(true);
        }
    }

    return (
        <>

            {loader ? <Loader /> : ""}

            <Head>
                <title>Create Account - someone gaming shop</title>
                <meta name="description" content="Create Account at someone gaming shops. The name of trust. Leading car delaer In lahore punjab Pakistan. Developed by Muhammad Umer Aamir " />
                <meta name="keywords" content="Cars, honda, toyota , bmw , sports car , dawood , someone gaming shops , someone gaming shop , lahore , punjab , pakistan , muhammad umer aamir , car , car dealer , mulana shaukat ali road, xh.someone, umeraamir.69 , dawood aamir " />
                <meta name="author" content="Muhammad Umer Aamir xh.someone umeraamir.69 dawood Aamir" />
                <link rel="icon" href="123.svg" />
            </Head>

            <div className="container horizontal mt-5 mb-12 mx-auto py-2 my-2">


                <h1 className="sm:text-6xl text-4xl  mt-20 py-5 sm:mt-0 sm:pt-0 font-extrabold dark:text-white text-center  leading-tight  animate__backInDown  animate__animated ">Create Account</h1>


                <Stepper
                    steps={stepArray}
                    currentStepNumber={currentStep}
                    description="xczkvb"
                />

                <div className='my-20  flex align-middle justify-center lg:mx-32 sm:mx-0 md:mx-10 xl:mx-32 mx-2'>
                    {currentStep == 1 ?
                        <form className="w-full animate__fadeInLeft animate__animated" onSubmit={handleSubmit} method="POST">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase px-2 tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input onChange={handleChange} value={Data.firstName} className=" dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="firstName" name='firstName' type="text" placeholder="First Name" required minLength="02" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase px-2 tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input onChange={handleChange} value={Data.lastName} className="dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" type="text" placeholder="Last Name" name="lastName" required minLength="02" />
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

                                        <span className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer" onClick={handleSeePassword}>
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
                                <p className="text-gray-600 dark:text-gray-50 text-xs italic">password Must be eight digit long containing Alphnumberic & Special Charchters.</p>
                            </div>

                            <div className="flex flex-wrap mb-6">
                                <label className="block uppercase  dark:text-gray-50 tracking-wide text-gray-700 text-xs font-bold mb-2 px-2" htmlFor="CnfrmPass">
                                    Confirm password
                                </label>
                                <div className="w-full  bg-gray-200   text-gray-700 rounded  mb-3  focus:outline-none focus:bg-white focus:border-gray-500">

                                    <div className="relative">
                                        <input
                                            type={CnfrmPass ? "text" : "password"}
                                            id="CnfrmPass"
                                            className="w-full dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Enter password"
                                            required
                                            name='CnfrmPass'
                                            onChange={handleChange}
                                            value={Data.CnfrmPass}
                                            pattern=".{08,20}" title="08 to 20 digit Long"
                                        />

                                        <span className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer" onClick={handleSeeCnrmPassword}>
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
                                    <label className="block uppercase dark:text-gray-50 tracking-wide text-gray-700 px-2 text-xs font-bold mb-2" htmlFor="Gender">
                                        Gender
                                    </label>
                                    <div className="relative">
                                        <select name='Gender' required className="block dark:bg-gray-700 dark:text-gray-100 focus:text-gray-600  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Gender" onChange={handleChange} value={Data.Gender}>
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
                                <div className="w-full  dark:bg-gray-700  bg-gray-200 border-gray-200 border text-gray-700 rounded  mb-3  focus:outline-none focus:bg-white focus:border-gray-500">

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







                            <label htmlFor="iAgree" className="inline-flex relative items-center mb-5 cursor-pointer ">
                                <input type="checkbox" required id="iAgree" className="sr-only peer" />

                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-50">I agree with the
                                    <Link href="/TermsAndConditions">
                                        <span className="mx-1 text-blue-600 dark:text-blue-500 hover:underline" >Terms & Conditions. </span>
                                    </Link>
                                </span>
                            </label>


                            <div className={`container flex items-center   justify-between px-10 my-10  ${Disable ? "hidden" : "flex"
                                }`}>

                                <button onClick={() => handleClick()} className={`btn-outline-primary transition duration-300 ease-in-out focus:outline-none h-12 focus:shadow-outline border dark:border-gray-50 dark:text-gray-100 border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal px-4 rounded ${Disable || currentStep == 1 ? "cursor-not-allowed" : ""} `}> Previous </button>

                                <button type="submit" className={`btn-outline-primary transition duration-300 ease-in-out focus:outline-none h-12 focus:shadow-outline border border-orange-700 dark:border-gray-50 dark:text-gray-100 hover:bg-orange-700 text-orange-700 hover:text-white font-normal px-4 rounded ${Disable ? "cursor-not-allowed" : ""}`}> Next </button>

                            </div>

                            <div className="px-5 dark:text-gray-50">
                                Already have an account
                                <Link href="/Login">
                                    <span className="text-indigo-400 font-bold italic hover:underline hover:text-gray-500  mx-1">
                                        Login !
                                    </span>
                                </Link>
                            </div>

                        </form>


                        : ""}
                    {currentStep == 2 ?
                        <div className="w-full sm:rounded-md">
                            <form onSubmit={handleSubmit}>
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




                                <div className={`container flex items-center   justify-between px-10 my-10  ${Disable ? "hidden" : "flex"
                                    }`}>

                                    <button onClick={() => handleClick()} className={` dark:text-gray-100 dark:border-gray-50 btn-outline-primary transition duration-300 ease-in-out focus:outline-none h-12 focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal px-4 rounded ${Disable || currentStep == 1 ? "cursor-not-allowed" : ""} `}> Previous </button>

                                    <button type="submit" className={`dark:text-gray-100 dark:border-gray-50 btn-outline-primary transition duration-300 ease-in-out focus:outline-none h-12 focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal px-4 rounded ${Disable ? "cursor-not-allowed" : ""}`}> Next </button>

                                </div>
                            </form>
                        </div>
                        : ""}

                    {currentStep == 3 ? <div className='flex items-center justify-center flex-col'>
                        <h1 className='font-bold text-gray-700  font-erif  lg:text-5xl md:text-5xl sm:text-4xl text-2xl dark:text-gray-50'> Registerd Succesfully!</h1>
                        <svg className=' w-2/4  mx-auto text-green-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>

                        <Link href="/">
                            <span className="inline-flex overflow-hidden text-white bg-gray-900 rounded group">
                                <span className="px-3.5 py-2 text-white bg-red-500 group-hover:bg-orange-600 flex items-center justify-center">
                                    <AiOutlineCar className='w-7 h-7' />
                                </span>
                                <span className="pl-4 pr-5 py-3">Shop your Gadgets</span>
                            </span>
                        </Link>
                    </div>
                        : ""}
                </div>
            </div>
        </>
    )

}
export default CreateAccount;