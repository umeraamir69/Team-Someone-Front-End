import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import WelcomeBanner from '@/components/Dashbaord/WelcomeBanner'
import { admimloginSuccess, adminlogout } from '../../store/Action/adminAuth'


const Home = (props) => {
    const [loader, setloader] = useState(true);
    const router = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.adminAuth.adminIsAuthenticated);


    useEffect(() => {
        const Verify = async () => {
            const request = await fetch('/api/ValidateJwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Token: localStorage.getItem("session") })
            })
            const output = await request.json()
            if (output.status) {
                dispatch(admimloginSuccess(output.error));
                setloader(false);
            }
            else {
                localStorage.clear("session")
                dispatch(adminlogout());
                router.replace("/Login");
            }
        }
        if (!isAuthenticated) {
            if (localStorage.getItem("session")) {
                Verify();
            }
            else {
                router.replace("/Login");
            }
        }
        else {
            setloader(false);
        }

    }, [isAuthenticated])


    const AdminData = useSelector((state) => state.adminAuth.adminUser);
    return (
        <>
            <section className=' mt-16 p-4'>
                <WelcomeBanner name={AdminData ? AdminData.firstName : "Admin"} />
            </section>
        </>
    )
}

export default Home