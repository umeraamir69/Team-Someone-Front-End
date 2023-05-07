import HeaderAbout from '@/components/userview/HeaderAbout'
import Reviews from '@/components/userview/Reviews'
import Timeline from '@/components/userview/Timeline'
import World from '@/components/userview/World'
import React from 'react'

const AboutUs = () => {
    return (
        <>
            <HeaderAbout />
            <Timeline />
            <Reviews />
            <World />
        </>
    )
}

export default AboutUs