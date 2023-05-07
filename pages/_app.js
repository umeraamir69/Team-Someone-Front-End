import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/Store/configureStore';
import Navbar from '@/components/userview/Navbar';
import Footer from '@/components/userview/Footer';
import { ToastContainer } from 'react-toastify';
const store = configureStore();
import Navabr from '@/components/Dashbaord/Navbr';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [navbr, setnavbr] = useState(router.pathname.startsWith('/Dashboard'));
  const [loader, setloader] = useState(true);
  const [progress, setProgress] = useState(100)


  useEffect(() => {
    setnavbr(router.pathname.startsWith('/Dashboard'))
  }, [router]);

  return <Provider store={store} className="  ">
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    {navbr ? <Navabr /> : <Navbar />}
    <Component {...pageProps} />
    {!navbr ? <Footer /> : ""}
  </Provider>
}
