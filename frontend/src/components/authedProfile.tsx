"use client";

import React from "react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit2, Mail, Phone, School, Calendar, LucideIcon, Github, Linkedin, Instagram, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/app/profile/loading";
const CursorTrailCanvas = dynamic(() => import('@/components/CursorTrailCanvas'), { ssr: false });
type EventMap = Record<string, string>;
interface ProfileData {
    username: string;
    college: string;
    gID:string;
    phone: string;
    email: string;
    year: string;
    branch: string;
    insta: string;
    portf: string;
    ldn: string;
    git: string;
    interests:[string];
    events:[string];
}
const evn:EventMap ={
    "101": "CSS action",
    "102": "Competitive Programming",
    "103": "Capture the Flag",
    "104": "Blind Coding",
    "105": "Tech-Pitch",
    "106": "BGMI: Battlegrounds Mobile India",
    "107": "Rubix Cube",
    "108": "Speed Typing",
    "109": "Valorant"
  }
  
export default function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [qrUrl,setqrUrl] = useState<string>('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
                    credentials: "include",
                });
                if (res.status === 200) {
                    const data = await res.json();
                    const resData: ProfileData = data.user;
                    console.log("res"+resData)
                    setProfileData(resData);
                    QRCode.toDataURL(`${process.env.NEXT_PUBLIC_FRONTHOST}/viewuser?gid=${data.user.gID}`)
                    .then(url => {
                        setqrUrl(url);
                    })
                } else {
                    console.log("failed");
                    window.location.replace(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
                }
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                window.location.replace(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
        }
    }
        getUserData(); 

    }, []);

    if (!profileData) {
        return <SkeletonLoader />;
    }
    const evNames = (events: string[]) => {
        return events.map(ev => evn[ev] || "Unknown Event");
    };  
    const profile = {
        name: profileData.username,
        image: "/events/profile.jpg",
        email: profileData.email,
        phone: profileData.phone,
        college: profileData.college,
        branch: profileData.branch,
        year: profileData.year,
        ldn: profileData.ldn,
        gid: profileData.gID,
        git: profileData.git,
        insta: profileData.insta,
        portf: profileData.portf,
        eventsRegistered: evNames(profileData.events), 
        talksRegistered: [],  
        interests: profileData.interests,        
    };  
    const noSelectionText = "No selections have been made";
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white relative">
            <CursorTrailCanvas className="pointer-events-none z-50 md:flex hidden fixed inset-0 h-full w-full" />
            <header className="bg-[#2A2A2A] shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-[#b4ff39]">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Home</span>
                    </Link>
                    <Link href="/edit" className="flex items-center space-x-2 text-[#b4ff39]">
                        <Button variant="outline" className="flex items-center space-x-2 bg-[#2A2A2A] text-[#b4ff39] border-[#b4ff39] hover:bg-[#b4ff39] hover:text-[#1E1E1E]">
                            <Edit2 className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-[#2A2A2A] shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 relative">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1 sm:flex sm:items-center sm:space-x-6"> 
                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                    <Image
                                        src={profile.image}
                                        alt="Profile"
                                        width={100}
                                        height={100}
                                        className="rounded-full object-cover border-2 border-[#b4ff39]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-[#b4ff39]">{profile.name}</h1>
                                    <p className="mt-1 text-gray-300">{profile.college} - {profile.branch}</p>
                                </div>
                            </div>

                            {/* QR Code Placeholder */}
                            <div className="absolute right-4 top-4 flex-shrink-0 flex items-center">
                                <div className="w-28 h-28 sm:w-24 sm:h-24 bg-gray-300 rounded-md flex items-center justify-center"> {/* Increased size for mobile view */}
                                {qrUrl && <img src={qrUrl} alt="QR Code" className="rounded-lg"/>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-600 pt-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                                <ProfileItem icon={Mail} title="Email" value={profile.email} />
                                <ProfileItem icon={Phone} title="Phone" value={profile.phone} />
                                <ProfileItem icon={School} title="Branch" value={profile.branch} />
                                <ProfileItem icon={Calendar} title="Year of Study" value={profile.year} />
                            </dl>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <ProfileList title="Events Registered" items={profile.eventsRegistered.length > 0 ? profile.eventsRegistered : [noSelectionText]} />
                            <ProfileList title="Talks Registered" items={profile.talksRegistered.length > 0 ? profile.talksRegistered : [noSelectionText]} />
                            <ProfileList title="Interests" items={profile.interests.length > 0 ? profile.interests : [noSelectionText]} />
                        </div>

                        <div className="mt-8 flex flex-col items-center">
                            <h2 className="text-lg font-semibold text-[#b4ff39] mb-4">Connect with Me</h2>
                            <div className="flex space-x-4">
                                <Link href={`https://www.github.com/${profile.git}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white md:flex-row flex-col md:space-x-2">
                                        <Github className="h-5 w-5" />
                                        <span className="hidden md:inline">GitHub</span>
                                    </Button>
                                </Link>
                                <Link href={`https://www.linkedin.com/in/${profile.ldn}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white md:flex-row flex-col md:space-x-2">
                                        <Linkedin className="h-5 w-5" />
                                        <span className="hidden md:inline">LinkedIn</span>
                                    </Button>
                                </Link>
                                <Link href={`https://www.instagram.com/${profile.insta}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white md:flex-row flex-col md:space-x-2">
                                        <Instagram className="h-5 w-5" />
                                        <span className="hidden md:inline">Instagram</span>
                                    </Button>
                                </Link>
                                <Link href={`https://${profile.portf}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white md:flex-row flex-col md:space-x-2">
                                        <FileText className="h-5 w-5" />
                                        <span className="hidden md:inline">Portfolio</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

interface ProfileItemProps {
    icon: LucideIcon;
    title: string;
    value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon: Icon, title, value }) => (
    <div className="relative bg-[#2A2A2A] rounded-lg shadow p-2 sm:p-3 md:p-4 border border-gray-600 hover:border-[#b4ff39] transition duration-300 ease-in-out">
        <div className="flex items-center">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#b4ff39]" /> 
            <span className="ml-1 text-base sm:text-lg font-semibold">{title}</span> 
        </div>
        <div className="mt-1 text-gray-300 text-sm sm:text-base">{value}</div> 
    </div>
);


interface ProfileListProps {
    title: string;
    items: string[];
}

const ProfileList: React.FC<ProfileListProps> = ({ title, items }) => (
    <div className="relative bg-[#2A2A2A] rounded-lg shadow p-3 sm:p-4 border border-gray-600 hover:border-[#b4ff39] transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-[#b4ff39]">{title}</h3>
        <ul className="mt-2 space-y-2">
            {items.map((item, index) => (
                <li key={index} className="text-gray-300">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);
