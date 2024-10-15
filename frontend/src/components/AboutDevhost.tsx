import React from "react";
import { Download } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function AboutDevhost() {
  interface DevhostData {
    title: string;
    caption: string;
    about: string;
    logoSrc: string;
  }

  const devhostData: DevhostData = {
    title: "About Devhost",
    caption: "Where Curiosity Meets Expertise",
    about: "Devhost, the flagship event is a remarkable tech convergence by Sahyadri Open Source Community (SOSC), is set to be an exhilarating experience with an exciting mix of technical and non-technical events. It seeks to equip participants with knowledge and skills, while encouraging curiosity and fostering innovation. With a variety of tech and non-tech battles and events featuring dev talks and workshops led by industry experts, it creates opportunities for both personal development and self-exploration. Join the 22-hour live hack event to bring your ideas to fruition, with challenges designed for every level of experience.",
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
              {devhostData.title}
            </h1>
            <h2 className="leading-6 mb-4 font-semibold text-sm md:text-base text-primary tracking-wider text-left">
              {devhostData.caption}
            </h2>
            <p className="text-sm md:text-lg tracking-wider mb-6 text-left">{devhostData.about}</p>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
              <a href="/brochure/Event Rulebook - Devhost.pdf" download>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-background w-full md:w-auto px-6 md:px-8 py-2 md:py-3 group flex items-center justify-center space-x-2"
                >
                  <Download size={20} className="text-neon-green" />
                  <span className="text-neon-green text-sm md:text-base">Event Rulebook</span>
                </HoverBorderGradient>
              </a>

              <a href="/brochure/General Brochure Devhost.pdf" download>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-background w-full md:w-auto px-6 md:px-8 py-2 md:py-3 group flex items-center justify-center space-x-2"
                >
                  <Download size={20} className="text-neon-green" />
                  <span className="text-neon-green text-sm md:text-base">DevHost Brochure</span>
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
