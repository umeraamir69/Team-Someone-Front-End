import React from 'react'
import { StarIcon as StartSimple } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'

const Stars = (props) => {
    return (
        <>
            {props.Condition > 1 ?
                <StarIcon fill="currentColor" className="w-6 h-6 text-indigo-500" />
                : <StartSimple className="w-6 h-6 text-indigo-500" />}
            {props.Condition > 2 ?
                <StarIcon fill="currentColor" className="w-6 h-6 text-indigo-500" />
                : <StartSimple className="w-6 h-6 text-indigo-500" />}
            {props.Condition > 3 ?
                <StarIcon fill="currentColor" className="w-6 h-6 text-indigo-500" />
                : <StartSimple className="w-6 h-6 text-indigo-500" />}
            {props.Condition > 4 || props.Condition == 4 ?
                <StarIcon fill="currentColor" className="w-6 h-6 text-indigo-500" />
                : <StartSimple className="w-6 h-6 text-indigo-500" />}
            {props.Condition == 5 ?
                <StarIcon fill="currentColor" className="w-6 h-6 text-indigo-500" />
                : <StartSimple className="w-6 h-6 text-indigo-500" />}

        </>
    )
}

export default Stars