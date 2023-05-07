
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import ListingCard from '../components/userview/ListingCard'
import { RxCross2 } from 'react-icons/rx'
import Head from 'next/head'
import { AiTwotoneFunnelPlot } from 'react-icons/ai'




const subCategories = [
    { name: 'Date Updated : Old to New', a: 'otn' },
    { name: 'Date Updated : New to old', a: 'nto' },
    { name: 'Clear Filters', a: "clear" }
]

const filters = [
    {
        id: 'color',
        name: 'Type',
        options: [
            { value: 'gaming gear' },
            { value: 'video gear' },
        ],
    }
]



export default function ListingPg(props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [Data, setData] = useState(JSON.parse(props.data))
    const [Color, setColor] = useState(false);
    const [colorData, setcolorData] = useState();
    const [sort, setsort] = useState("");


    const HandleColor = (event) => {
        if (event.target.checked) {
            setColor(event.target.name);
            setcolorData(Data.filter(car => car.color == event.target.name))
        }
        else {
            setColor(false)
            setcolorData([]);
        }
    }


    const HanldeSort = (event) => {
        if (event.target.id == "nto" && sort != "nto") {
            setData([...Data].reverse())
            setsort(event.target.id)
        }
        else if (event.target.id == "otn" && sort == "nto") {
            setData([...Data].reverse())
            setsort(event.target.id)
        }
        else if (event.target.id == "clear") {
            setColor(false);
            setcolorData([]);
            if (sort == "otn") {
                setData([...Data].reverse())
                setsort("");
            }
        }
    }

    return (
        <div className=" dark:text-gray-100">


            <Head>
                <title>Cars someone gaming shop</title>
                <meta name="description" content="Cars at someone gaming shops.The name of trust. Leading car delaer In lahore punjab Pakistan. Developed by Muhammad Umer Aamir " />
                <meta name="keywords" content="Cars, honda, toyota , bmw , sports car , dawood , someone gaming shops , someone gaming shop , lahore , punjab , pakistan , muhammad umer aamir , car , car dealer , mulana shaukat ali road, xh.someone, umeraamir.69 , dawood aamir " />
                <meta name="author" content="Muhammad Umer Aamir xh.someone umeraamir.69 dawood Aamir" />
                <link rel="icon" href="123.svg" />
            </Head>

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <RxCross2 className="h-6 w-6" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900 dark:text-gray-100">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <div className="block px-2 py-3  cursor-pointer" onClick={HanldeSort} id={category.a}>
                                                        {category.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between  px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <div className="h-5 w-5" aria-hidden="true" >-</div>
                                                                    ) : (
                                                                        <div className="h-5 w-5" aria-hidden="true" >+</div>
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={option.value}
                                                                            name={option.value}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            checked={Color === option.value ? true : false}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={option.value}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-gray-100"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>

                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="sm:text-5xl text-3xl mt-5 sm:mt-0 text-center sm:text-left font-bold tracking-tight text-gray-900 dark:text-gray-100">Someone Gaming Inventory {Color ? <div className='text-lg mt-2 capitalize'>Filter Color : {Color}</div> : ""}</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >

                                </Transition>
                            </Menu>


                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <AiTwotoneFunnelPlot className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <div className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <div className='text-gray-800 dark:text-gray-100  cursor-pointer' onClick={HanldeSort} id={category.a}>{category.name}</div>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <div className="h-5 w-5 dark:text-gray-100" aria-hidden="true" >-</div>
                                                            ) : (
                                                                <div className="h-5 w-5 dark:text-gray-100" aria-hidden="true" >+</div>
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={option.value}
                                                                    name={option.value}
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300  text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={HandleColor}
                                                                    checked={Color === option.value ? true : false}
                                                                />
                                                                <label
                                                                    htmlFor={option.value}
                                                                    className="ml-3 text-sm text-gray-600 capitalize dark:text-gray-100"
                                                                >
                                                                    {option.value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>

                            <div className="lg:col-span-3 ">




                                <div className="grid lg:grid-cols-2 space-y-5  ">
                                    {Color ?
                                        colorData.map((data, index) => (
                                            <ListingCard key={index} name={data.title} type={data.inventoryType} price={data.marketPrice} image={data.image[0]} link={`/Products/${data._id}`} />
                                        ))
                                        :
                                        Data.map((data, index) => (
                                            <ListingCard key={index} name={data.title} type={data.inventoryType} price={data.marketPrice} image={data.image[0]} link={`/Products/${data._id}`} />
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const request = await fetch('https://softec-23-production.up.railway.app/api/inventory', {
        method: 'GET', headers: { 'Content-Type': 'application/json', }
    })
    let output = await request.json()
    return { props: { data: JSON.stringify(output) } };
};
