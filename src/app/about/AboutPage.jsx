"use client";
import {useRouter} from 'next/navigation';

export default function AboutPage() {
    const router = useRouter();
    const containerStyle = {
        display: 'flex',
        alignItems: 'center'
    };
    const blurb1 = "The Robotics and Intelligent Systems Expo (RISE) aims to be on the frontier of showcasing innovation in the fields of robotics and autonomy. RISE's primary goal is to immerse attendees in the dynamic world of robotics and AI, showcasing the vast opportunities in these domains and igniting interest among students and faculty. We achieve this through robotics demonstrations, enlightening presentations, engaging networking sessions, and the presence of industry professionals. In doing so, we aim to connect individuals who share a passion for these fields while effectively highlighting Purdue University as a pioneering institution in the realm of robotics and AI.\n" +
        "\n";
   const blurb2 = "The initial RISE event, held in April 2023, proved to be a remarkable success. With 20 participating organizations and over 200 students in attendance from various disciplines across engineering and computer science, it became evident that there is a strong interest in robotics and AI-related research and activities on campus. Furthermore, the event has garnered significant attention from Purdue faculty and the broader research community, including undergraduate and graduate students passionate about the field.";
   return (
       <div>
           <div className="flex gap-10" style={containerStyle}>
               <img className="max-w-xs"
                    src="https://i.imgur.com/vHjvzZo.png"
                    alt="A group of people engaged in a discussion in front of a poster presentation at a robotics and AI expo"
               />
               <p>
                   {blurb1}
               </p>
           </div>
           <div className="flex gap-10" style={containerStyle}>
               <p>
                   {blurb2}
               </p>
               <img className="max-w-xs"
                   src="https://i.imgur.com/V8wxR17.png"
                   alt="A group of people posing for a photo at the RISE 2023 event, with a RISE 2023 poster in the background"
               />
           </div>
           <div className="flex justify-center w-full items-center">
           <button onClick={() => {
               router.push('/program');
           }}
               className="items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                   Learn More
               </button>
            </div>

       </div>);
}