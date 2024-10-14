import React from "react";
import { Download } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function AboutSRC() {
  interface SRCData {
    title: string;
    caption: string;
    about: string;
    logoSrc: string;
  }

  const srcData: SRCData = {
    title: "About SRC",
    caption: "Innovating the Future of Technology",
    about: "SRC is a pioneering initiative that brings together tech enthusiasts and innovators to explore the latest advancements in technology. Our mission is to foster creativity and collaboration among participants through hands-on workshops, engaging discussions, and interactive sessions. Whether you're a seasoned expert or just starting your tech journey, SRC provides a platform for everyone to learn, share ideas, and make a difference. Join us in our upcoming events where we dive into exciting topics ranging from artificial intelligence to sustainable technology practices.",
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
              {srcData.title}
            </h1>
            <h2 className="leading-6 mb-4 font-semibold text-sm md:text-base text-primary tracking-wider text-left">
              {srcData.caption}
            </h2>
            <p className="text-sm md:text-lg tracking-wider mb-6 text-left">{srcData.about}</p>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
              <a href="/brochure/SRC_Rulebook.pdf" download>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="div" // Change this to `div` instead of `button`
                  className="bg-background w-full md:w-auto px-6 md:px-8 py-2 md:py-3 group flex items-center justify-center space-x-2 cursor-pointer" // Add `cursor-pointer` to indicate it's clickable
                >
                  <Download size={20} className="text-neon-green" />
                  <span className="text-neon-green text-sm md:text-base">SRC Rulebook</span>
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
