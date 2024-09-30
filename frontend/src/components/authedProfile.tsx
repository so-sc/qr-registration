"use client";

import React from "react";
// import { redirect } from 'next/navigation'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit2, Mail, Phone, School, Calendar, LucideIcon, Github, Linkedin, Instagram, FileText } from "lucide-react";
import dynamic from 'next/dynamic';
const CursorTrailCanvas = dynamic(() => import('@/components/CursorTrailCanvas'), { ssr: false });
interface ProfileData {
    username: string;
    college: string;
    phone: string;
    email: string;
    year: string;
    branch: string;
    insta:string;
    portf:string;
    ldn:string;
    git:string;
  }
export default function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    useEffect(() => {
        const getUserData = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
              credentials: "include",
            });
            if (res.status === 200) {
            const data=await res.json();
            const resData:ProfileData=data.user;
            setProfileData(resData);
                
            } else {
              console.log("failed");
            //   redirect(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
            window.location.href="https://devhostapi.sosc.org.in/auth/google";
            }
          } catch (error) {
            console.error("Failed to fetch user details:", error);
            // redirect(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
          }
        };
        
        getUserData();
      }, []);
    if(!profileData){
        return (<></>)
    }
    const profile = {
        name: profileData.username,
        image: "/events/profile.jpg",
        email: profileData.email,
        phone: profileData.phone,
        college: profileData.college,
        branch: profileData.branch,
        year: profileData.year,
        ldn:profileData.ldn,
        git:profileData.git,
        insta:profileData.insta,
        portf:profileData.portf,
        eventsRegistered: ["Hackathon 2024", "AI Workshop", "Web Dev Bootcamp","ui battle"],
        talksRegistered: ["Future of AI", "Blockchain Revolution", "UX Design Trends"],
        interests: ["DSA", "Java Programming", "Machine Learning"]
    };

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white">
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
                    <div className="px-4 py-5 sm:p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-6 items-center">
                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                    <Image
                                        src={profile.image}
                                        alt="Profile"
                                        width={100}
                                        height={100}
                                        className="rounded-full object-cover border-2 border-[#b4ff39]"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-[#b4ff39]">{profile.name}</h1>
                                    <p className="mt-1 text-gray-300">{profile.college} - {profile.branch}</p>
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
                            <ProfileList title="Events Registered" items={profile.eventsRegistered} />
                            <ProfileList title="Talks Registered" items={profile.talksRegistered} />
                            <ProfileList title="Interests" items={profile.interests} />
                        </div>
                        <div className="mt-8 flex flex-col items-center">
                            <h2 className="text-lg font-semibold text-[#b4ff39] mb-4">Connect with Me</h2>
                            <div className="flex space-x-4">
                                <Link href={`https://www.github.com/in/${profile.git}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                        <Github className="h-5 w-5" />
                                        <span>GitHub</span>
                                    </Button>
                                </Link>
                                <Link href={`https://www.linkedin.com/in/${profile.ldn}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                        <Linkedin className="h-5 w-5" />
                                        <span>LinkedIn</span>
                                    </Button>
                                </Link>
                                <Link href={`https://www.instagram.com/${profile.insta}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                        <Instagram className="h-5 w-5" />
                                        <span>Instagram</span>
                                    </Button>
                                </Link>
                                <Link href={`https://${profile.portf}`} target="_blank" rel="noopener noreferrer">
                                    <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                        <FileText className="h-5 w-5" />
                                        <span>Portfolio</span>
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

function ProfileItem({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-[#b4ff39] mt-1" />
            <div>
                <dt className="text-sm font-medium text-gray-300">{title}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{value}</dd>
            </div>
        </div>
    );
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="bg-[#2A2A2A] border border-gray-600 rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold px-4 py-3 bg-[#b4ff39] text-[#1E1E1E]">{title}</h3>
            <ul className="divide-y divide-gray-600">
                {items.map((item, index) => (
                    <li key={index} className="px-4 py-3 text-sm hover:bg-[#3A3A3A] transition-colors">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}