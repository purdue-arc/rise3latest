"use client";

import Image from "next/image";
import { useState,useEffect} from "react";

export default function Page() {
  //ADD PICTURES INTO THE ARRAY !
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const backgroundImages = [
    "/RISE3PhotoTest.png",
    "/RISE3PhotoTest.png",
    "/RISE3PhotoTest.png",
    "/RISE3PhotoTest.png",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 1000); // Change the interval time as needed

    return () => clearInterval(intervalId);
  }, [backgroundImages]);


//SAME DEAL ADD SOME PICTURES
  const [carouselSection, setCarouselSection] = useState(0);
  const carouselSectionImgs = [
    "/RISE3PhotoTest.png",
    "/RISE3PhotoTest.png",
  ]
  const handleNext = () => {
    
    setCarouselSection((prevIndex) => (prevIndex + 1) % carouselSectionImgs.length);
    };

  const handlePrev = () => {
    setCarouselSection((prevIndex) => (prevIndex - 1 + carouselSectionImgs.length) % carouselSectionImgs.length);
  };


  return (
    <div className="font-sans">
      <section className="relative">
      <Image
          src={backgroundImages[0]}
          layout="responsive"
          width={1600}
          height={900}
          alt="RISE3 Conference"
          className="w-full h-auto object-cover"
        />
        
        <div className=" absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 backg-img" style={{ backgroundImage: `url(${backgroundImages[backgroundImageIndex]})` }}>
          <h1 className="text-5xl font-bold mb-4">RISE3 Robotics Conference</h1>
          <p className="text-2xl mb-6">30th March 2025</p>
          <p className="text-xl mb-8">Largest Student Run Robotics Symposium</p>
          <a
            href="#"
            className="px-8 py-4 bg-blue-500 text-black rounded-md font-semibold hover:bg-blue-600"
          >
            Register Your Interest
          </a>
        </div>
      </section>

      <section className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">RISE3 Text</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">RISE3 Blurb</p>
      </section>

      <div className="flex justify-center items-center mt-12 relative">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white p-4 rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-700"
        >
          ❮
        </button>


   
        <div className="w-3/4 md:w-1/2 h-96 overflow-hidden rounded-lg flex justify-center items-center">
          <Image
            src={carouselSectionImgs[carouselSection]}
            width={800}
            height={500}
            alt={`Carousel Image ${carouselSection + 1}`}
            className="object-cover w-full h-full"
          />
        </div>

         
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white p-4 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-700"
        >
          ❯
        </button>
      </div>


      
    </div>
  );
}
