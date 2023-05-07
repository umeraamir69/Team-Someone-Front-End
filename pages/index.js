import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navabr from '@/components/userview/Navbar'
import Banner from '@/components/userview/World'
import AddAdmin from '@/components/Dashbaord/AddAdmin'
import Head from '@/components/userview/Head'
import Categories from '@/components/userview/Categories'
import Featuers from '@/components/userview/Featuers'
import HowToUse from '@/components/userview/HowToUse'
import Reviews from '@/components/userview/Reviews'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head />
      <Categories />
      <Featuers />
      <Reviews />
    </>
  )
}
