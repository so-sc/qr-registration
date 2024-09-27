"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENTS } from "@/lib/constants";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, School, Calendar, LucideIcon } from "lucide-react";
import Script from 'next/script';
export default function EventSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://localhost:8079/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: 10,
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
      const verificationResponse = await fetch("http://localhost:8079/verPayment", {
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
      if (verifyData.success==true) {
        toast.success("Payment Verified Successfully!");
      } else {
        toast.error("Payment Verification Failed!");
      }
    } catch (error:any) {
      toast.error("Error verifying payment:", error);
    }
  };
  
  return (<>
       <Script id="razorpay-checkout-js"src="https://checkout.razorpay.com/v1/checkout.js"/>
       <header className="bg-[#2A2A2A] shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-[#b4ff39]">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Home</span>
                    </Link>
                    <Link href="/profile" className="flex items-center space-x-2 text-[#b4ff39]">
                    <Button variant="outline" className="flex items-center space-x-2 bg-[#2A2A2A] text-[#b4ff39] border-[#b4ff39] hover:bg-[#b4ff39] hover:text-[#1E1E1E]">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Button>
                    </Link>
                </div>
                
            </header>
    <div className="max-w-2xl mx-auto pt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Events</h1>
      <div className="space-y-4">
        {EVENTS.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{event.name}</span>
              <span className="text-sm text-gray-500">{event.type}</span>
              <span className="text-sm text-gray-500">
                Speaker: {event.speaker}
              </span>
              <span className="text-sm text-gray-500">
                Date: {event.date} | Time: {event.time}
              </span>
            </div>
            <Input
              type="checkbox"
              checked={selectedEvents.includes(event.event_id)}
              disabled={loading}
              onChange={() => handleEventSelection(event.event_id)}
            />
          </div>
        ))}
      </div>
      <Button
        className="mt-6 w-full"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit Selected Events"}
      </Button>
    </div></>
  );
}