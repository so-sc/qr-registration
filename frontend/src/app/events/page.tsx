"use client";
import { Button } from "@/components/ui/button";
import { EVENTS } from "@/lib/constants";
import { toast } from "sonner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import Script from 'next/script';

interface ProfileData {
  name: string;
  college: string;
  phone: string;
  email: string;
  year: string;
  branch: string;
  insta: string;
  portf: string;
  ldn: string;
  git: string;
  message: string;
  events: string[];
}

export default function EventSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [testLoad, setTestLoad] = useState(true);
  const [members, setMembers] = useState<Record<string, { name: string; email: string }[]>>({});

  const handleEventSelection = (eid: string) => {
    if (selectedEvents.includes(eid)) {
      setSelectedEvents(selectedEvents.filter((event_id) => event_id !== eid));
      delete members[eid]; 
      setMembers({ ...members });
    } else {
      setSelectedEvents([...selectedEvents, eid]);
      setMembers({ ...members, [eid]: [] }); 
    }
  };

  const handleAddMember = (eventId: string) => {
    const eventMembers = members[eventId] || [];
    const maxMembers = EVENTS.find(event => event.event_id === eventId)!.max_members;
    if (eventMembers.length < maxMembers) {
      setMembers({
        ...members,
        [eventId]: [...eventMembers, { name: "", email: "" }],
      });
    } else {
      toast.error(`Cannot add more than ${maxMembers} members.`);
    }
  };

  const handleDeleteMember = (eventId: string, index: number) => {
    const updatedMembers = members[eventId].filter((_, i) => i !== index);
    setMembers({ ...members, [eventId]: updatedMembers });
  };

  const handleMemberChange = (eventId: string, index: number, field: "name" | "email", value: string) => {
    const updatedMembers = [...(members[eventId] || [])];
    updatedMembers[index][field] = value;
    setMembers({ ...members, [eventId]: updatedMembers });
  };

  const handleSubmit = async () => {
    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event to continue.");
      return;
    }

    const allMembersValid = selectedEvents.every(eventId => {
      const eventMembers = members[eventId] || [];
      const minMembers = EVENTS.find(event => event.event_id === eventId)?.min_members || 1;
      return eventMembers.length >= minMembers;
    });

    if (!allMembersValid) {
      toast.error("Please add the required number of members for each selected event.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: 10, // Adjust this as needed
          currency: "INR",
          events: selectedEvents,
        }),
      });

      const orderData = await response.json();
      console.log(orderData);

      if (orderData && orderData.id) {
        if (window.Razorpay) {
          const options = {
            key: "rzp_test_bhvlhaqYBs58iu",
            amount: orderData.amount,
            currency: orderData.currency,
            name: "DevHost 2024 Event Registration",
            description: "Fee for selected events",
            order_id: orderData.id,
            handler: function (response: any) {
              console.log(response);
              verifyPayment(response, selectedEvents);
            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#4caf50",
            },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } else {
          console.error("Razorpay SDK not loaded");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (response: any, events: string[]) => {
    try {
      const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/verPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          events,
        }),
      });

      const verifyData = await verificationResponse.json();
      if (verifyData.success == true) {
        toast.success("Payment Verified Successfully!");
      } else {
        toast.error("Payment Verification Failed!");
      }
    } catch (error: any) {
      toast.error("Error verifying payment:", error);
    }
  };

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

  useEffect(() => {
    getUserData();
  }, []);

  if (testLoad) return (<></>);

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <header className="bg-[#1A1A1A] shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#d4d4d4] hover:text-[#aef737] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <Link href="/profile">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent text-[#d4d4d4] border-[#d4d4d4] hover:bg-[#aef737] hover:text-[#1A1A1A] hover:border-[#aef737] transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Button>
          </Link>
        </div>
      </header>
      <div className="max-w-2xl mx-auto pt-10 px-4 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Select Events</h1>
        <div className="space-y-6">
          {EVENTS.map((event, index) => (
            <div key={event.event_id}>
              <div
                className={`bg-[#2B2B2B] p-4 rounded-lg cursor-pointer hover:bg-[#3E3E3E] transition-colors`}
                onClick={() => handleEventSelection(event.event_id)}
              >
                <h2 className="text-lg font-semibold text-white">{event.name}</h2>
                <p className="text-gray-400">{event.description}</p>
                <p className="text-gray-400">
                  {event.date} - {event.time}
                </p>
                <p className="text-gray-400">Organizer: {event.organizer}</p>
                <p className="text-gray-400">
                  Selected: {selectedEvents.includes(event.event_id) ? "Yes" : "No"}
                </p>
              </div>
              {selectedEvents.includes(event.event_id) && (
                <div className="mt-4 bg-[#1C1C1C] p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-white">Team Members</h3>
                  <div className="space-y-4">
                    {members[event.event_id]?.map((member, index) => (
                      <div key={index} className="flex space-x-2 items-center">
                        <input
                          type="text"
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => handleMemberChange(event.event_id, index, "name", e.target.value)}
                          className="p-2 rounded-md bg-[#3E3E3E] text-white"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(event.event_id, index, "email", e.target.value)}
                          className="p-2 rounded-md bg-[#3E3E3E] text-white"
                          required
                        />
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteMember(event.event_id, index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => handleAddMember(event.event_id)}>Add Member</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit} className="mt-8 w-full" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </div>
    </>
  );
}
