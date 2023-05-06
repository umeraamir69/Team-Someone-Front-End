import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/Store/configureStore';
import Navbar from '@/components/userview/Navbar';
const store = configureStore();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [navbr, setnavbr] = useState(router.pathname.startsWith('/Dashboard'));
  const [loader, setloader] = useState(true);
  const [progress, setProgress] = useState(100)


  return <Provider store={store} className="  ">
    {true ? <Navbar /> : <div></div>}
    <Component {...pageProps} />
  </Provider>
}
