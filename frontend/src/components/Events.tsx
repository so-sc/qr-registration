import { Link } from "lucide-react";
// import Image from "next/image"; // Commenting out Image import for now
import React from "react";

export default function Events() {
  interface CardData {
    id: number;
    title: string;
    date: string;
    time: string;
    caption: string;
    description: string;
    organizer: string;
    imageSrc: string;
  }

  const cardData: CardData[] = [
    {
      id: 1,
      title: "CSS action",
      caption: "Put your web design chops to the test!",
      description:
        "Join a dynamic web-based competition showcasing stunning UI using HTML, CSS, and JavaScript.",
      organizer: "Koshin Hegde - 7899715941",
      date: "7th Nov",
      time: "11:30am - 12:45pm",
      imageSrc: "ui-battle.png",
    },
    {
      id: 2,
      title: "Competitive Programming",
      caption: "Unleash Your Coding Prowess",
      description:
        "Take on the ultimate coding challenge and prove your skills against top minds in the field.",
      organizer: "Nithesh Alva - 7843775694",
      date: "8th Nov",
      time: "8:45am - 9:45am",
      imageSrc: "cp.jpg",
    },
    {
      id: 3,
      title: "Capture the Flag",
      caption: "Ready for a mind-bending challenge?",
      description:
        "Test your problem-solving skills and capture flags to claim victory in this exciting competition.",
      organizer: "Yash Laxman - 6362072050",
      date: "8th Nov",
      time: "10:30am - 12:00pm",
      imageSrc: "ctf.png",
    },
    {
      id: 4,
      title: "Blind Coding",
      caption: "Are you a coding mastermind?",
      description:
        "Solve complex problems without tools and prove your mental acuity in this thrilling challenge.",
      organizer: "Rithuparna K.S - 7019821295",
      date: "8th Nov",
      time: "12:00pm - 1:30pm",
      imageSrc: "blind-coding.jpeg",
    },
    {
      id: 5,
      title: "Tech-Pitch",
      caption: "Spark Innovation and Inspire Change!",
      description:
        "Bring your ideas to life and compete for roles in the future of technology and entrepreneurship.",
      organizer: "Apeksha L Naik - 8904315769",
      date: "8th Nov",
      time: "10:30am - 1:30pm",
      imageSrc: "tech_pitch.jpg",
    },
    {
      id: 6,
      title: "BGMI: Battlegrounds Mobile India",
      caption: "Dominate the battlefield in our tournament!",
      description:
        "Showcase your skills and emerge victorious in this exciting BGMI competition.",
      organizer: "Advaith S Shetty - 9902698070",
      date: "8th Nov",
      time: "2:00pm - 4:00pm",
      imageSrc: "bgmi.jpg",
    },
    {
      id: 7,
      title: "Rubix Cube",
      caption: "Are you a Rubik's Cube prodigy?",
      description:
        "Race against top competitors and push your limits in this exhilarating speedcubing contest.",
      organizer: "Manushree P B - 6363316781",
      date: "Date not allotted",
      time: "Time not allotted",
      imageSrc: "rubix-cube.jpeg",
    },
    {
      id: 8,
      title: "Speed Typing",
      caption: "Are you a typing speed demon?",
      description:
        "Demonstrate your skills in our typing competition and compete for the title of fastest typist!",
      organizer: "Kshama S - 9741433993",
      date: "Date not allotted",
      time: "Time not allotted",
      imageSrc: "speed-typing.jpg",
    },
    {
      id: 9,
      title: "Valorant",
      caption: "Become the ultimate agent in our competition!",
      description:
        "Master your skills and outsmart opponents to achieve victory in thrilling Valorant matches.",
      organizer: "Not yet decided",
      date: "7th Nov",
      time: "2:15pm - 4:30pm",
      imageSrc: "valorant.jpg",
    },
  ];
  
  return (
    <div className="flex justify-center pb-10 items-center w-full">
      <div className="max-w-6xl mb-20 w-full">
        <h1 className="select-none text-center text-3xl md:text-4xl font-semibold md:pb-16 pb-10">
          Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col transition-shadow duration-300 hover:shadow-[0_0_5px_2px_rgba(180,255,57,0.4)] rounded-xl"
            >
              <div className="event_card border-white/10 border rounded-xl p-6 bg-background h-[350px]"> 
                {/* Uncomment below to display images later */}
                {/* <Image
                  className="bg-background mb-5 border shadow-sm border-white/10 rounded-md"
                  src={`/events/${card.imageSrc}`}
                  alt={card.title}
                  width={300}
                  height={200}
                /> */}
                <div className="flex flex-col h-full">
                  <h1 className="leading-6 mb-1 font-semibold text-xl tracking-wider text-white">
                    {card.title}
                  </h1>
                  <p className="block mb-2 font-semibold leading-none text-white/80 pt-2">
                    {card.date}
                  </p>
                  <time className="block mb-2 font-normal leading-none text-white/60">
                    {card.time}
                  </time>
                  <h1 className="leading-6 mb-1 pt-2 font-semibold text-base text-primary tracking-wider">
                    {card.caption}
                  </h1>
                  <p className="text-sm tracking-wider py-2 flex-grow">
                    {card.description}
                  </p>
                  <p className="block font-semibold leading-none text-white mt-2 text-sm">
                    Organizer:
                  </p>
                  <p className="block pb-2 font-normal leading-none text-white/90 mt-1 text-sm">
                    {card.organizer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
