import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navabr from '@/components/userview/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Navabr />
  )
}
