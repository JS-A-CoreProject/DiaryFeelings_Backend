'use client'

import { useSession } from "next-auth/react";
import Denined from "../components/Deniend";

const Layout = ({children} : {children: React.ReactNode}) => {
    const { status } = useSession();
    if(status === 'loading') {
        return <></>
    }
    if(status === 'authenticated') {
        return <Denined />
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default Layout;