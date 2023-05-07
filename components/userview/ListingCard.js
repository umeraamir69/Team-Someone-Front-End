import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

const ListingCard = (props) => {
    return (
        <Link href={props.link}>
            <div className="group  w-96">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">

                    <Image width={1000} height={100} className=" w-96  object-scale-down transition-all duration-300 group-hover:scale-125" src={props.image} alt="Dawood Motor name of trust muhammad umer aamir" />

                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">

                            <span aria-hidden="true" className="absolute inset-0" />
                            {props.name}

                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{props.type}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{props.price} PKR</p>
                </div>
            </div>
        </Link>
    )
}

export default ListingCard



