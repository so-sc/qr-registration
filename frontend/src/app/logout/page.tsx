"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const LogoutPage = () => {
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/logout`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data= await response.json();
                if (data.logout=="success") {
                    router.push('/');
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logout();
    }, [router]);
    return (<div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-lime-500 border-solid"></div>
        </div>)
};

export default LogoutPage;
