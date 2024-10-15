"use client";

import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselImages = [
        "/carousel-image1.jpg",
        "/carousel-image2.jpg",
        "/carousel-image3.jpg",
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
        );
    };

    return (
        <div className="font-sans">
            <nav className="flex justify-between items-center px-8 py-6 bg-gray-900 text-white">
                <div className="text-3xl font-bold">RISE3 Robotics Conference</div>
                <ul className="flex space-x-8 text-lg">
                    <li><a href="#" className="hover:text-gray-400">Home</a></li>
                    <li><a href="#" className="hover:text-gray-400">About</a></li>
                    <li><a href="#" className="hover:text-gray-400">Speakers</a></li>
                    <li><a href="#" className="hover:text-gray-400">Schedule</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </nav>

            <section className="relative">
                <Image
                    src="/RISE3PhotoTest1.svg"
                    layout="responsive"
                    width={1600}
                    height={900}
                    alt="RISE3 Conference"
                    className="w-full h-auto object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold mb-4">RISE3 Robotics Conference</h1>
                    <p className="text-2xl mb-6">30th March 2025</p>
                    <p className="text-xl mb-8">Largest Student Run Robotics Symposium</p>
                    <a href="#" className="px-8 py-4 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600">Register Your Interest</a>
                </div>
            </section>

            <section className="px-8 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">RISE3 Text</h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed">
                    RISE3 Blurb
                </p>
            </section>

            <div className="flex justify-center items-center mt-12 relative">
                <button onClick={handlePrevious} className="bg-gray-800 text-white p-4 rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-700">❮</button>
                <div className="w-3/4 md:w-1/2 h-96 overflow-hidden rounded-lg flex justify-center items-center">
                    <Image
                        src={carouselImages[currentIndex]}
                        width={800}
                        height={500}
                        alt={`Carousel Image ${currentIndex + 1}`}
                        className="object-cover w-full h-full"
                    />
                </div>
                <button onClick={handleNext} className="bg-gray-800 text-white p-4 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-700">❯</button>
            </div>
        </div>
    );
}