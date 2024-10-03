"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "@/app/edit/loading"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Instagram, Github, Linkedin, Globe, Star } from "lucide-react"; // Import Star icon for interests

export default function RegisterForm() {
  const router = useRouter();
  const [insta, setInsta] = useState("");
  const [git, setGit] = useState("");
  const [red, setRed] = useState("");
  const [link, setLink] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [testLoad, setTestLoad] = useState(true);


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
          credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          console.log(data.user);
          setTestLoad(false);
        } else {
          console.log("failed");
          window.location.replace(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        window.location.replace(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google`);
      }
    };

    getUserData();
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userDetails = {
      insta,
      git,
      red,
      link,
      interests, 
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/socials_upd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userDetails),
      });
      if (response.status !== 200) {
        throw new Error("Failed to update details");
      }
      toast.success("Details updated successfully!", {
        description: "Welcome Aboard....",
      });
      setInsta("");
      setGit("");
      setRed("");
      setLink("");
      setInterests(""); // Reset interests
      router.push("/profile");
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("Failed to update details", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (testLoad) return <SkeletonLoader />; 

  return (
    <div className="max-w-2xl mx-auto md:pt-5 pt-10">
      <div className="fixed top-0 left-0 border-white/10 bg-background z-50 w-full p-5 py-7 border-b">
        <div className="max-w-7xl mx-auto md:px-5">
          <Link href="/">
            <Image
              priority
              src="/logo_h.png"
              alt="logo"
              className="w-40 h-4"
              width={500}
              height={500}
            />
          </Link>
        </div>
      </div>

      <form className="space-y-6 p-5" onSubmit={handleSubmit}>
        <div className="space-y-2 md:py-8 py-8 text-center">
          <h1 className="md:text-3xl text-2xl font-bold mt-4">Edit Details</h1>
          <p className="text-gray-400 dark:text-gray-500 md:text-base text-sm tracking-wide">
            Enter your social media handles and fields of Interest
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="link" className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5 text-blue-600" />
            <span>LinkedIn Handle</span>
          </Label>
          <Input
            id="link"
            disabled={loading}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter your LinkedIn username"
            className="w-full" 
          />
        </div>

        <div className="space-y-4 pb-10">
          <div className="space-y-2">
            <Label htmlFor="insta" className="flex items-center space-x-2">
              <Instagram className="h-5 w-5 text-pink-500" />
              <span>Instagram Handle</span>
            </Label>
            <Input
              id="insta"
              disabled={loading}
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              placeholder="Enter your Instagram username"
              className="w-full" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="git" className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-white" />
              <span>GitHub Handle</span>
            </Label>
            <Input
              id="git"
              disabled={loading}
              value={git}
              onChange={(e) => setGit(e.target.value)}
              type="text"
              placeholder="Enter your GitHub username"
              className="w-full" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="red" className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Portfolio Website</span>
            </Label>
            <Input
              id="red"
              disabled={loading}
              value={red}
              onChange={(e) => setRed(e.target.value)}
              type="text"
              placeholder="Enter your portfolio website URL"
              className="w-full" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" /> 
              <span>Interests</span>
            </Label>
            <Input
              id="interests"
              disabled={loading}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              type="text"
              placeholder="Enter your interests"
              className="w-full" 
            />
            <p className="text-gray-500 text-sm">Example: Java, c, c++, etc</p> {/* Subtext */}
          </div>


          <div className="relative">
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Now"}
            </Button>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            )}
          </div>
        </div>
      </form>

      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
