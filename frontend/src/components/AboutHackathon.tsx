import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function AboutHackathon() {
  interface HackathonData {
    title: string;
    about: string;
    logoSrc: string;
  }

  const hackathonData: HackathonData = {
    title: "About Hackathon",
    about: "Participants form teams to tackle company-funded problem statements. The event includes an introduction, a 22-hour live hack, and a three-phase evaluation: Design, Progress, and Presentation. Judges evaluate teams on approach, ideas, user experience, soft skills, cost, and complexity. The final presentation is offline. Teams can be of any branch. Prizes will be awarded to the top-performing teams. Eligibility is open to all students. Mentors will be available to provide guidance and support throughout the hackathon.",
    logoSrc: "temp.jpg",
  };

  return (
    <div className="flex justify-center pb-10 items-center w-full">
      <div className="max-w-6xl mb-20 w-full">
        <HoverBorderGradient
          containerClassName="rounded-xl"
          className="bg-background w-full h-full"
        >
          <div className="pt-10 pb-10 px-5 md:px-10">
            <h1 className="select-none text-center text-2xl md:text-4xl font-semibold pb-6">
              {hackathonData.title}
            </h1>
            <p className="text-sm md:text-lg tracking-wider text-left">{hackathonData.about}</p>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
