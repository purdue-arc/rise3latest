'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
    BriefcaseIcon,
    MapPinIcon,
    UsersIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { useInView } from 'react-intersection-observer';

// Sample Events Data: 9 events per day for Monday-Friday (45 events total)
const eventsData = [
    { day: 'Monday', time: '9:00 AM', desc: 'Event begins, Booths open', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Monday', time: '10:10 AM', desc: 'Keynote Speaker/Opening Remarks', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '9:00 AM', desc: 'Morning Workshops Begin', image: 'https://i.imgur.com/V8wxR17.png' },
    // More events ...
];

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// StatCard Component with Fixed Counting Animation
const StatCard = ({ number, label, icon }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            controls.start('visible');
            animateCount();
        } else {
            controls.start('hidden');
            setCount(0);
        }
    }, [inView, controls, number]);

    const animateCount = () => {
        let start = 0;
        const incrementTime = 20;
        const step = number / (1000 / incrementTime);
        const timer = setInterval(() => {
            start += step;
            if (start >= number) {
                setCount(number);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 p-8 rounded-lg flex flex-col items-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className="text-blue-500 text-4xl mb-4">{icon}</div>
            <h3 className="text-4xl font-bold">{count}{label === "Attendees" ? "+" : ""}</h3>
            <p className="mt-2 text-neutral-400">{label}</p>
        </motion.div>
    );
};

// AboutPage Component
const AboutPage = () => {
    const router = useRouter();
    const [stats, setStats] = useState({ exhibitions: 30, attendees: 2000, partners: 15 });
    const [viewMode, setViewMode] = useState("full");
    const [currentDay, setCurrentDay] = useState("Monday");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStats({ exhibitions: 20, attendees: 2000, partners: 30 }), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-poppins">
            {/* Hero Section */}
            <section id="rise3-info" className="flex flex-col items-center py-20 text-center">
                <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold text-neutral-100">Welcome to RISE</motion.h1>
                <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mt-4 text-neutral-400 text-lg md:text-xl max-w-3xl">
                    Explore the cutting edge of robotics and AI through exhibitions, networking, and insightful presentations from leaders in the field.
                </motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-8">
                    <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => router.push("/register")}>Register Now</Button>
                </motion.div>
            </section>

            {/* Two Imgur Images with Descriptions */}
            <section id="past-events" className="py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-lg shadow-lg bg-neutral-800 p-6">
                        <img src="https://i.imgur.com/vHjvzZo.png" alt="A group of people engaged in a discussion at a robotics expo" className="rounded-lg shadow-lg mb-4 w-full h-64 object-cover" loading="lazy" />
                        <p className="text-neutral-400">
                            The Robotics and Intelligent Systems Expo (RISE) aims to be on the frontier of showcasing innovation in robotics and autonomy. RISE's primary goal is to immerse attendees in the dynamic world of robotics and AI, showcasing the vast opportunities in these domains and igniting interest among students and faculty.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-lg shadow-lg bg-neutral-800 p-6">
                        <img src="https://i.imgur.com/V8wxR17.png" alt="A group of people posing at the RISE 2023 event, with a RISE 2023 poster in the background" className="rounded-lg shadow-lg mb-4 w-full h-64 object-cover" loading="lazy" />
                        <p className="text-neutral-400">
                            The initial RISE event, held in April 2023, proved to be a remarkable success. With 20 participating organizations and over 200 students in attendance, it became evident that there is a strong interest in robotics and AI-related research on campus.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats with Animated Counters */}
            <section className="py-20 bg-neutral-800 text-neutral-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard number={stats.exhibitions} label="Exhibitions" icon={<BriefcaseIcon />} />
                    <StatCard number={stats.attendees} label="Attendees" icon={<UsersIcon />} />
                    <StatCard number={stats.partners} label="Partners" icon={<MapPinIcon />} />
                </div>
            </section>

            {/* Timeline */}
            <section id="timeline" className="py-20 bg-neutral-800 text-neutral-100">
                <h2 className="text-center text-3xl font-semibold mb-12">Event Timeline</h2>
                <div className="max-w-7xl mx-auto flex flex-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar space-x-12 px-4">
                    {eventsData.map((event, idx) => (
                        <motion.div key={`${event.day}-${event.time}-${idx}`} className="flex flex-col items-center bg-neutral-900 p-6 rounded-lg shadow-md min-w-[200px] max-w-[300px] flex-shrink-0 transition-all duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold text-neutral-100">{event.time}</h3>
                            <p className="mt-2 text-neutral-400 text-center">{event.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
