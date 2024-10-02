import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NoUserFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-[#b4ff39]">User Not Found</h1>
            <p className="mt-4 text-lg">We couldn&apos;t find any user with the provided GID.</p>
            <Link href="/" className="mt-6">
                <Button variant="outline" className="bg-[#2A2A2A] text-[#b4ff39] border-[#b4ff39] hover:bg-[#b4ff39] hover:text-[#1E1E1E]">
                    Go Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NoUserFound;
