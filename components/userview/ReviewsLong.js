import React from 'react'
import Stars from './Stars'

const ReviewsLong = (props) => {
    return (
        <>
            <div className="container px-4 mx-auto my-1 ">
                <div className="mb-2  border-b-2 border-gray-200 rounded-t-8xl rounded-b-5xl overflow-hidden flex flex-row flex-wrap lg:justify-start justify-center ">
                    <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                        <div className="flex flex-wrap  colum flex-col">
                            <h4 className="w-full md:w-auto text-xl font-heading font-medium" >{props.user}</h4>
                            <div className="flex ">
                                <div className="inline-flex my-3">
                                    <Stars Condition={props.ratings} />
                                </div>
                                <span className="mr-4 text-xl font-heading font-medium my-3 mx-2">{props.ratings}</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 overflow-hidden md:px-4 pb-2 bg-white lg:p-5 ">
                        <div className="flex flex-wrap lg:border-l-2 lg:border-t-0 border-gray-300 border-t-2 ">
                            <div className="w-full mb-3 md:mb-0 m-2">
                                <p className="mb-3 sm:mb-2 lg:mb-8 max-w-2xl text-darkBlueGray-400 leading-relaxed">{props.Comment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewsLong