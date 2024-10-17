import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionData = [
  {
    id: "item-1",
    question: "Who is eligible to participate in the hackathon?",
    answer:
      "This hackathon is inclusive and welcomes participants from all backgrounds, including students and employees.",
  },
  {
    id: "item-2",
    question: "Do all team members need to register and pay individually?",
    answer:
      "All team members must create individual profiles on our platform. However, only one team member needs to register the team for the event and handle the payment.",
  },
  {
    id: "item-3",
    question: "Can I participate as an individual or do I need a team?",
    answer:
      "Participation is limited to teams of 2 to 4 members. Individual participation is not allowed.",
  },
  {
    id: "item-4",
    question: "Can students from different colleges be in the same team?",
    answer:
      "Absolutely! Teams can consist of a mix of college students and employees, fostering diverse collaboration.",
  },
  {
    id: "item-5",
    question: "Will there be mentors or workshops during the hackathon?",
    answer:
      "Yes, the event will feature experienced mentors available throughout to offer guidance, answer questions, and assist teams in overcoming challenges.",
  },
  {
    id: "item-6",
    question: "What resources will be provided during the hackathon?",
    answer:
      "Participants will have access to necessary infrastructure, including Wi-Fi, power outlets, and collaborative spaces. Additionally, specific tools and platforms may be provided by event sponsors.",
  },
  {
    id: "item-7",
    question: "How can I stay informed about event updates and announcements?",
    answer:
      "Stay connected with us by following our social media channels, regularly checking the event website, and joining the dedicated WhatsApp groups for announcements. Additionaly important announcements will be made through mail.",
  },
];

export default function FAQ() {
  return (
    <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <Accordion className="w-full max-w-3xl mx-auto" type="single" collapsible>
        <h1 className="select-none text-center text-3xl sm:text-4xl md:text-4xl font-semibold pb-6 md:pb-10">
          FAQ&apos;s
        </h1>
        {accordionData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-b border-white/10"
          >
            <AccordionTrigger className="text-left text-base sm:text-lg font-medium tracking-wide py-4 sm:py-5 pr-8">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/60 text-sm sm:text-base pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}