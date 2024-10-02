"use client";

import React, { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { EVENTS } from "@/lib/constants";
import { toast } from "sonner";
import Link from "next/link";
import SkeletonLoader from "@/app/events/loading";
import { ArrowLeft, User, Check, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import Script from "next/script";

interface Event {
  event_id: string;
  name: string;
  description: string;
  price: number;
  date: string;
  time: string;
}

interface Member {
  name: string;
  email: string;
}

interface SelectedEvent {
  selected: boolean;
  members: Member[];
}

interface SelectedEvents {
  [key: string]: SelectedEvent;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function EventSelection() {
  const [selectedEvents, setSelectedEvents] = useState<SelectedEvents>({});
  const [loading, setLoading] = useState(false);
  const [testLoad, setTestLoad] = useState(true);
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
          credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          setTestLoad(false)
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
  }, []);
  if(testLoad) return(<SkeletonLoader/>)
  const validateMembers = (members: Member[]): { isValid: boolean; error?: string } => {
    for (const member of members) {
      if (!member.name.trim()) {
        return { isValid: false, error: "All name fields must be filled" };
      }
      if (!member.email.trim()) {
        return { isValid: false, error: "All email fields must be filled" };
      }
      if (!isValidEmail(member.email)) {
        return { isValid: false, error: `Invalid email format: ${member.email}` };
      }
    }
    return { isValid: true };
  };

  const handleEventSelection = (eid: string) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [eid]: prev[eid]
        ? { ...prev[eid], selected: !prev[eid].selected }
        : { selected: true, members: [] },
    }));
  };

  const handleAddMember = (eid: string) => {
    const eventDetails = EVENTS.find((e) => e.event_id === eid);
    if (!eventDetails) return;

    const { max_members: MAX_MEMBERS } = eventDetails;

    if (selectedEvents[eid]?.members.length >= MAX_MEMBERS) {
      toast.error(`Maximum ${MAX_MEMBERS} members allowed for this event.`);
      return;
    }
    setSelectedEvents((prev) => ({
      ...prev,
      [eid]: {
        ...prev[eid],
        members: [...(prev[eid]?.members || []), { name: "", email: "" }],
      },
    }));
  };
  const handleRemoveMember = (eid: string, index: number) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [eid]: {
        ...prev[eid],
        members: prev[eid].members.filter((_, i) => i !== index),
      },
    }));
  };

  const handleMemberInput = (
    eid: string,
    index: number,
    field: keyof Member,
    value: string
  ) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [eid]: {
        ...prev[eid],
        members: prev[eid].members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        ),
      },
    }));
  };

  const handleSubmit = async () => {
    const selectedEventIds = Object.keys(selectedEvents).filter(
      (eid) => selectedEvents[eid].selected
    );
  
    if (selectedEventIds.length === 0) {
      toast.error("Please select at least one event to continue.");
      return;
    }
  
    for (const eid of selectedEventIds) {
      const event = selectedEvents[eid];
      const memberCount = event.members.length;
      const eventDetails = EVENTS.find((e) => e.event_id === eid);
      
      if (!eventDetails) continue;
  
      const { min_members: MIN_MEMBERS, max_members: MAX_MEMBERS } = eventDetails;
      
      if (memberCount < MIN_MEMBERS) {
        toast.error(`Event ${eventDetails.name} requires at least ${MIN_MEMBERS} members.`);
        return;
      }
      if (memberCount > MAX_MEMBERS) {
        toast.error(`Event ${eventDetails.name} allows a maximum of ${MAX_MEMBERS} members.`);
        return;
      }
      
      const validation = validateMembers(event.members);
      if (!validation.isValid) {
        toast.error(`${validation.error} for ${eventDetails.name}`);
        return;
      }
    }
  

    setLoading(true);
    const eventsWithMembers = selectedEventIds.map((eid) => ({
      event_id: eid,
      members: selectedEvents[eid].members,
    }));
    console.log(eventsWithMembers,selectedEventIds)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: 10,
          currency: "INR",
          events: selectedEventIds,
        }),
      });

      const orderData = await response.json();

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
              verifyPayment(response, eventsWithMembers);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (response: any, eventsDet: { event_id: string; members: Member[] }[]) => {
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
          eventsDet,
        }),
      });

      const verifyData = await verificationResponse.json();
      if (verifyData.success) {
        toast.success("Payment Verified Successfully!");
      } else {
        toast.error("Payment Verification Failed!");
      }
    } catch (error) {
      toast.error("Error verifying payment");
    }
  };
  if(testLoad) return (<></>)
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
          {EVENTS.map((event: Event) => (
            <div
              key={event.event_id}
              className="bg-[#222222] rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => handleEventSelection(event.event_id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className={`flex-shrink-0 w-6 h-6 border-2 rounded-md transition-colors ${
                      selectedEvents[event.event_id]?.selected
                        ? "bg-[#aef737] border-[#aef737]"
                        : "border-[#d4d4d4]"
                    }`}
                  >
                    {selectedEvents[event.event_id]?.selected && (
                      <Check className="text-[#1A1A1A] w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#aef737]">{event.name}</h3>
                    <p className="text-sm text-white">{event.description}</p>
                    <p className="text-sm text-[#a0a0a0]">Date: {event.date}</p>
                    <p className="text-sm text-[#a0a0a0]">Time: {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-[#aef737] text-lg font-bold">₹{event.price}</div>
                  {selectedEvents[event.event_id]?.selected ? (
                    <ChevronUp className="w-6 h-6 text-[#d4d4d4]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#d4d4d4]" />
                  )}
                </div>
              </div>
              {selectedEvents[event.event_id]?.selected && (
                <div className="p-4 border-t border-[#333333]">
                  <div className="space-y-4">
                    {selectedEvents[event.event_id].members.map((member, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 sm:items-center">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={`Member ${index + 1} Name`}
                            value={member.name}
                            onChange={(e) =>
                              handleMemberInput(event.event_id, index, "name", e.target.value)
                            }
                            className="w-full p-2 bg-[#333333] text-white rounded"
                            required
                          />
                        </div>
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="email"
                            placeholder={`Member ${index + 1} Email`}
                            value={member.email}
                            onChange={(e) =>
                              handleMemberInput(event.event_id, index, "email", e.target.value)
                            }
                            className="flex-1 p-2 bg-[#333333] text-white rounded"
                            required
                          />
                          <Button
                            onClick={() => handleRemoveMember(event.event_id, index)}
                            className="bg-[#ff4d4f] text-white hover:bg-[#ff7875] transition-colors flex-shrink-0"
                            size="icon"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleAddMember(event.event_id)}
                    className="mt-4 bg-[#444444] text-white hover:bg-[#555555] transition-colors"
                    disabled={selectedEvents[event.event_id].members.length >= (EVENTS.find(e => e.event_id === event.event_id)?.max_members || Infinity)}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Member
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          className="mt-8 w-full bg-[#aef737] text-[#1A1A1A] hover:bg-[#8ed626] transition-colors"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Register for Selected Events"}
        </Button>
      </div>
    </>
  );
}