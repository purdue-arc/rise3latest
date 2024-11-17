"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const backgroundImages = [
    "/RISE3PhotoTest.png",
    "/pic.jpeg"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 2000); // Adjust interval for slower zoom timing

    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  return (
    <div className="font-sans">
      <section className="relative">
        <Image
          src={backgroundImages[backgroundImageIndex]}
          layout="responsive"
          width={1600}
          height={900}
          alt="RISE3 Conference"
          className={`w-full h-auto object-cover transition-opacity duration-500 slow-zoom`}
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-5xl font-bold mb-4">RISE3 Robotics Conference</h1>
          <p className="text-2xl mb-6">30th March 2025</p>
          <p className="text-xl mb-8">Largest Student Run Robotics Symposium</p>
          <a
            href="https://riseforms.purduearc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-500 text-black rounded-md font-semibold hover:bg-blue-600"
          >
            Register Your Interest
          </a>
        </div>
      </section>

      <section className="px-8 py-16 text-center flex flex-col items-center">
        <Image
          src="/logoclubcompany.png"
          width={500}
          height={500}
          alt="RISE3 Profile"
          className="mx-auto"
        />
        <p className="max-w-3xl mx-auto text-lg leading-relaxed mt-4">
          Created by the Autonomous Robotics Club (ARC) in partnership with the Institute for Networks, Optimization, and Control (ICON)...
        </p>
      </section>

   
    </div>
  );
}
