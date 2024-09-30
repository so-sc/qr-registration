"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COLLEGES } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function RegisterForm() {
  const router=useRouter();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [usn, setUsn] = useState("")
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
          setName(user.username);
          setEmail(user.email);
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
      name,
      email,
      phone,
      college,
      branch,
      year,
      usn,
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/details_update`, {
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
      setName("")
      setEmail("")
      setPhone("")
      setCollege("")
      setBranch("")
      setYear("")
      setUsn("")
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
          <h1 className="md:text-3xl text-2xl font-bold">Event Registration</h1>
          <p className="text-gray-400 dark:text-gray-500 md:text-base text-sm tracking-wide">
            Fill out the form below to register for the event.
          </p>
        </div>
        <div className="space-y-4 pb-10">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              disabled={loading}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Select
              onValueChange={(value) => setCollege(value)}
              defaultValue={college}
              disabled={loading}
              name="college"
              required
            >
              <SelectTrigger id="college">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                {COLLEGES.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              disabled={loading}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              type="text"
              placeholder="Enter your branch (CS, IS, EC)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year of Study</Label>
            <Select
              onValueChange={(value) => setYear(value)}
              defaultValue={year}
              disabled={loading}
              name="year"
              required
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select your year of study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Registering..." : "Register Now"}
          </Button>
        </div>
      </form>
    </div>
  )
}
