import { Fragment, useEffect, useState, useContext, useRef } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import AiOutlineMenu from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineUser } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import styleNav from '../../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Slide, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { admimloginSuccess, adminlogout, logout } from '../../store/Action/userAuth'
import { useSelector } from 'react-redux'
import keyss from '../../public/Images/key.png'
import { LOGOUT } from '@/store/Action/type'





const linksArray = [
    // [[title: string, href: string, icon : JSX]]
    ["Orders", "/AboutUs",
        <div className="mr-1" key={7}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        </div>],
    ["Log Out", "/",
        <div className="mr-1 text-red-600" key={3}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </div>]
]


const navigation = {
    categories: [
        {
            id: 'Categories',
            name: 'Categories',
            featured: [
                {
                    name: 'New Keyboards',
                    href: '/Products',
                    imageSrc: 'Images/key.png',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Playstation 5',
                    href: '#',
                    imageSrc: 'Images/asd.jpeg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'Geaming_Gear',
                    name: 'Geaming Gear',
                    items: [
                        { name: 'Gears', href: '/Products' },
                        { name: 'Accesories', href: '/Products' }
                    ],
                },
                {
                    id: 'Video Games',
                    name: 'Video Games',
                    items: [
                        { name: 'Video Games', href: '/Products' }
                    ],
                }
            ],
        }
    ],
    pages: [
        { name: 'About Us', href: '/AboutUs' },
        { name: 'Contact Us', href: '/Contact' }
    ],
    home: [
        { name: 'Home', href: '/' }
    ]
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const [Cart, setCart] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [Serach, setSerach] = useState("");
    const router = useRouter()

    const buttonRef = useRef(null)

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.user);

    const [openState, setOpenState] = useState(false)
    const handleClick = (open) => {
        setOpenState(!open)
    }



    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            event.stopPropagation()
        }
    }
    // =======================================================


    const handleRemove = (event) => {
        const a = JSON.parse(localStorage.getItem("cart"))
        for (let index = 0; index < a.length; index++) {
            if (a[index]._id == event.target.name) {
                a.splice(index, index + 1)
            }
        }
        console.log(a);
        localStorage.setItem("cart", JSON.stringify(a))
        setCart(false)
        if (a.length < 0) {

            setcart(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            localStorage.clear("auth-token");
            localStorage.clear("session");
        }

        document.addEventListener("mousedown", handleClickOutside)
        setcart(localStorage.getItem("cart"))
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, []);


    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("auth-token");
        //logout func
        toast.success("Logout Succesfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide
        });
        dispatch(logout())
    }

    const handleCartClick = () => {
        setCart(!Cart)
        if (localStorage.getItem("cart")) {
            setcart(true)
        }
    }


    const handleSearchClick = (e) => {
        e.preventDefault()
        console.log(Serach);

        //this task is to perform at end
        setSerach("")
    }

    const handleSearchText = (e) => {
        setSerach(e.target.value);
    }

    const [cart, setcart] = useState()

    return (
        <>
            <div className="bg-white sticky top-0 z-30">
                {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                                    <div className="px-4 pt-5 pb-2 flex"  >
                                        <button
                                            type="button"
                                            className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-600"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            xion
                                        </button>
                                    </div>

                                    {/* Links */}
                                    <Tab.Group as="div" className="mt-2">
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex px-4 space-x-8">
                                                {navigation.categories.map((category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({ selected }) =>
                                                            classNames(
                                                                selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                                'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>
                                        <Tab.Panels as={Fragment}>
                                            {navigation.categories.map((category) => (
                                                <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                                    <div className="grid grid-cols-2 gap-x-4">
                                                        {category.featured.map((item) => (
                                                            <div key={item.name} className="group relative text-sm">
                                                                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                    <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                                                </div>
                                                                <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                    <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                                    {item.name}
                                                                </Link>
                                                                <p aria-hidden="true" className="mt-1">
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {category.sections.map((section) => (
                                                        <div key={section.name}>
                                                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                                {section.name}
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {section.items.map((item) => (
                                                                    <li key={item.name} className="flow-root">
                                                                        <Link href={item.href} className="-m-2 p-2 block text-gray-500">
                                                                            {item.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>

                                    <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <Link href={page.href}>
                                                    <div className={`-m-2 p-2  block  font-medium text-gray-900 ${(router.asPath == page.href) ? "font-extrabold" : ""}`}>
                                                        {page.name}
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                        <div className="flow-root">
                                            <Link href="/Login">
                                                <div className={`-m-2 p-2 block font-medium text-gray-900 ${(router.asPath == "/Login") ? "font-extrabold" : ""}`}>
                                                    Sign in
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href="/CreateAccount" >
                                                <div className={`-m-2 p-2 block font-medium  ${(router.asPath == "/CreateAccount") ? "font-extrabold text-gray-700" : "text-gray-900"}`}>
                                                    Create account
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <p className="bg-yellow-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
                        our headline at top
                    </p>

                    <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="h-16 flex items-center">
                                <button
                                    type="button"
                                    className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    menu
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="#">
                                        <span className="sr-only">Workflow</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </a>
                                </div>



                                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">

                                    <div className="h-full flex space-x-6 items-center">
                                        {
                                            navigation.home.map((page) => (
                                                <Link key={page.name}
                                                    href={page.href}>
                                                    <p
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        {page.name}
                                                    </p>
                                                </Link>
                                            ))
                                        }
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'border-indigo-600 text-indigo-600'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-30 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </Popover.Button>
                                                        </div>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="z-50 absolute top-full inset-x-0 text-sm text-gray-500">

                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <div className="relative bg-white">
                                                                    <div className="max-w-7xl mx-auto px-8">
                                                                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                                {category.featured.map((item) => (
                                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                                            <img
                                                                                                src={item.imageSrc}
                                                                                                alt={item.imageAlt}
                                                                                                className="object-center object-cover"
                                                                                            />
                                                                                        </div>
                                                                                        <Link href={item.href} className="mt-6 block font-medium text-gray-900" >
                                                                                            <span className="absolute z-30 inset-0" aria-hidden="true" />
                                                                                            {item.name}
                                                                                        </Link>
                                                                                        <p aria-hidden="true" className="mt-1">
                                                                                            Shop now
                                                                                        </p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                                {category.sections.map((section) => (
                                                                                    <div key={section.name}>
                                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                            {section.name}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {section.items.map((item) => (
                                                                                                <li key={item.name} className="flex">
                                                                                                    <Link href={item.href} className="hover:text-gray-800">
                                                                                                        {item.name}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )
                                                }
                                            </Popover >
                                        ))}

                                        {
                                            navigation.pages.map((page) => (
                                                <Link key={page.name}
                                                    href={page.href}>
                                                    <div
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        {page.name}
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div >
                                </Popover.Group >




                                <div className="ml-auto flex items-center">
                                    {isAuthenticated ?
                                        //if user is logged in
                                        <div className="w-auto lg:ml-6">
                                            <Popover className="relative mx-auto">
                                                {({ open }) => (
                                                    <div className="flex flex-col">
                                                        <Popover.Button ref={buttonRef}>
                                                            <div className="flex" onClick={() => handleClick(open)}>
                                                                <span className="uppercase">
                                                                    <CiUser className="text-gray-400  hover:text-gray-500 h-6 w-6 inline-block" aria-hidden="true" />
                                                                </span>
                                                            </div>
                                                        </Popover.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0 translate-y-1"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 translate-y-1"
                                                        >
                                                            <Popover.Panel static className="z-30 ">
                                                                <div
                                                                    className=
                                                                    "absolute grid bg-white border-2  border-gray-300 border-solid rounded-md  w-32">
                                                                    {linksArray.map(([title, hrefs, icon]) => (
                                                                        <Fragment key={"AccountOptions" + title + hrefs}>
                                                                            <Link href={hrefs} >
                                                                                <div className="flex  px-4 py-2 border-b-2 font-semibold text-gray-700 text-sm" onClick={title == "Log Out" ? handleLogout : ""}>
                                                                                    {icon} {title}
                                                                                </div>
                                                                            </Link>
                                                                        </Fragment>
                                                                    ))}
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </div>
                                                )
                                                }
                                            </Popover >
                                        </div >

                                        :
                                        // If user is not logged in
                                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <Link href="/Login">
                                                <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                    Sign in
                                                </div>
                                            </Link>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <Link href="/CreateAccount">
                                                <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                    Create account
                                                </div>
                                            </Link>
                                        </div>
                                    }



                                    {/* Search */}
                                    <div className="flex lg:ml-6">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>

                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div className={`ml-4 flow-root lg:ml-6 ${styleNav.cartBtn}`}>
                                        <a onClick={handleCartClick} className="group -m-2 p-2 flex items-center">
                                            <MdOutlineShoppingBag
                                                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />

                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"></span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div >

                        </div >
                    </nav >
                </header >
            </div >


            <div className={`cartSideMenu`}>



                <Transition.Root show={Cart} as={Fragment}>
                    <Dialog as="div" className="relative z-30" onClose={setCart}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-700"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-700"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden ">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 z-50">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-700 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-700 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                    <div className="flex items-start justify-between">
                                                        <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart </Dialog.Title>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="-m-2 p-2 text-red-500 hover:bg-rose-500 hover:text-yellow-200 "
                                                                onClick={() => setCart(false)}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                x   <div onclick={handleCartClick} className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                {cart ?
                                                                    JSON.parse(localStorage.getItem("cart")).map((product) => (
                                                                        <li key={product._id} className="flex py-6">


                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                        <h3>
                                                                                            <Link href={`/Products/${product._id}`}> {product.title} </Link>
                                                                                        </h3>
                                                                                        <p className="ml-4">{product.type}</p>
                                                                                    </div>
                                                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    <p className="text-gray-500">Qty {product.qty}</p>

                                                                                    <div className="flex">
                                                                                        <button
                                                                                            type="button"
                                                                                            name={product._id}
                                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                            onClick={handleRemove}
                                                                                        >
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )) : "no Products In Cart"}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                    <div className="mt-6">
                                                        <Link
                                                            href="/Checkout"
                                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                        >
                                                            Checkout
                                                        </Link>
                                                    </div>
                                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                        <p>
                                                            or{' '}
                                                            <button
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                onClick={() => setCart(false)}
                                                            >
                                                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>







            {
                showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  transition-transform duration-700 ease-in-out"
                        >
                            <div className="relative w-1/3 my-6 mx- max-w-4xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">

                                        <form className="flex items-center pt-4" onSubmit={handleSearchText}>
                                            <label htmlFor="simple-search" className="sr-only">Search</label>
                                            <div className="relative w-full">
                                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                                </div>
                                                <input value={Serach} onChange={handleSearchText} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search" required />
                                            </div>
                                            <button onClick={handleSearchClick} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                <span className="sr-only">Search</span>
                                            </button>
                                        </form>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-1 rounded-b">
                                        <button
                                            className="text-red-400  background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex  hover:bg-rose-500 hover:text-yellow-200"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-r" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Close
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }


        </>
    )
}

export default Navbar
