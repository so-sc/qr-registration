"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function RegisterForm() {
  const router=useRouter();
  const [insta, setInsta] = useState("")
  const [git, setGit] = useState("")
  const [red, setRed] = useState("")
  const [link, setLink] = useState("")
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
          credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          console.log(data.user);
          const user = data.user;
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
    const userDetails = {
      insta,
      git,
      red,
      link,
      interests,
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/socials_upd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },credentials:'include',
        body: JSON.stringify(userDetails),
      })
      if (response.status!=200) {
        throw new Error("Failed to update details")
      }
      toast.success("Details updated successfully!", {
        description: "Welcome Aboard....",
      })
      setInsta("")
      setGit("")
      setInterests([])
      router.push("/events");
    } catch (error) {
      console.error("Error updating details:", error)
      toast.error("Failed to update details", {
        description: "Please try again later.",
      })
    } finally {
      setLoading(false)
    }
    }
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
        <img
          className="w-full rounded-2xl"
          src="/cover.png"
          alt="cover"
          width={500}
          height={500}
        />
        <div className="space-y-2 md:py-5 py-5 text-center">
          <h1 className="md:text-3xl text-2xl font-bold">Edit Details</h1>
          <p className="text-gray-400 dark:text-gray-500 md:text-base text-sm tracking-wide">
            Enter your social media handles and fields of Interest
          </p>
        </div>
        <div className="space-y-2">
            <Label htmlFor="name">LinkedIn Handle</Label>
            <Input
              id="link"
              disabled={loading}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter your LinkedIn username"
            />
          </div>
        <div className="space-y-4 pb-10">
          <div className="space-y-2">
            <Label htmlFor="name">Instagram Handle</Label>
            <Input
              id="insta"
              disabled={loading}
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              placeholder="Enter your instagram username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="git">Github Handle</Label>
            <Input
              id="git"
              disabled={loading}
              value={git}
              onChange={(e) => setGit(e.target.value)}
              type="text"
              placeholder="Enter your github username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="git">PortFolio Website</Label>
            <Input
              id="red"
              disabled={loading}
              value={red}
              onChange={(e) => setRed(e.target.value)}
              type="text"
              placeholder="Enter your proftfolio website url"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update Now"}
          </Button>
        </div>
      </form>
    </div>
  )
}
