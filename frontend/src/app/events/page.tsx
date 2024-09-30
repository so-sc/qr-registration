"use client";
import { Button } from "@/components/ui/button";
import { EVENTS } from "@/lib/constants";
import { toast } from "sonner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft, User, Mail, Phone, School, Calendar, LucideIcon ,Check} from "lucide-react";
import Script from 'next/script';
interface ProfileData {
  name: string;
  college: string;
  phone: string;
  email: string;
  year: string;
  branch: string;
  insta:string;
  portf:string;
  ldn:string;
  git:string;
  message:string;
  events:[string];
}
export default function EventSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [testLoad, setTestLoad] = useState(true);

  const handleEventSelection = (eid: string) => {
    if (selectedEvents.includes(eid)) {
      setSelectedEvents(selectedEvents.filter((event_id) => event_id !== eid));
    } else {
      setSelectedEvents([...selectedEvents, eid]);
    }
  };

  const handleSubmit = async () => {
    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event to continue.");
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

    useEffect(() => {
        getUserData();
    }, []);
    if(testLoad) return (<></>)
  else  return (
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
            <div
              key={index}
              className="flex items-center justify-between space-x-4 bg-[#222222] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`flex-shrink-0 w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                    selectedEvents.includes(event.event_id)
                      ? "bg-[#aef737] border-[#aef737]"
                      : "border-[#d4d4d4]"
                  }`}
                  onClick={() => handleEventSelection(event.event_id)}
                >
                  {selectedEvents.includes(event.event_id) && (
                    <Check className="text-[#1A1A1A] w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-semibold text-lg text-[#aef737]">{event.name}</h3>
                  <p className="text-sm text-white">{event.description}</p>
                  <p className="text-sm text-[#a0a0a0]">Date: {event.date}</p>
                  <p className="text-sm text-[#a0a0a0]">Time: {event.time}</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-[#aef737] text-lg font-bold">
                ₹{event.price}
              </div>
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
