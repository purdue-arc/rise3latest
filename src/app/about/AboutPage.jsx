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
    // Monday
    { day: 'Monday', time: '9:00 AM', desc: 'Event begins, Booths open', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Monday', time: '10:10 AM', desc: 'Keynote Speaker/Opening Remarks', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Monday', time: '11:00 AM', desc: 'Aidrivers', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Monday', time: '11:20 AM', desc: 'Purdue Space Program: Active Controls', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Monday', time: '11:40 AM', desc: 'TRACE Lab', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Monday', time: '12:00 PM', desc: 'Lunch/Panel: Future of AI Panel', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Monday', time: '2:00 PM', desc: 'CoRal Lab', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Monday', time: '2:20 PM', desc: 'NSWC AI Maritime Maneuvering', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Monday', time: '2:40 PM', desc: 'ROAR Lab', image: 'https://i.imgur.com/vHjvzZo.png' },

    // Tuesday
    { day: 'Tuesday', time: '9:00 AM', desc: 'Morning Workshops Begin', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '10:10 AM', desc: 'AI in Healthcare', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Tuesday', time: '11:00 AM', desc: 'Robotics Demonstrations', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '11:20 AM', desc: 'Autonomous Vehicles Panel', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '11:40 AM', desc: 'Smart Manufacturing Insights', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '12:00 PM', desc: 'Networking Lunch', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '2:00 PM', desc: 'AI Ethics Discussion', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '2:20 PM', desc: 'Deep Learning Workshop', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Tuesday', time: '2:40 PM', desc: 'Closing Remarks for Tuesday', image: 'https://i.imgur.com/V8wxR17.png' },

    // Wednesday
    { day: 'Wednesday', time: '9:00 AM', desc: 'Morning Keynote: Future of AI', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Wednesday', time: '10:10 AM', desc: 'Human-Robot Interaction', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Wednesday', time: '11:00 AM', desc: 'AI in Education', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Wednesday', time: '11:20 AM', desc: 'Robotics for Good', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Wednesday', time: '11:40 AM', desc: 'Smart Cities Panel', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Wednesday', time: '12:00 PM', desc: 'Lunch/Networking Session', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Wednesday', time: '2:00 PM', desc: 'AI Research Symposium', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Wednesday', time: '2:20 PM', desc: 'Autonomous Systems Workshop', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Wednesday', time: '2:40 PM', desc: 'Closing Remarks for Wednesday', image: 'https://i.imgur.com/V8wxR17.png' },

    // Thursday
    { day: 'Thursday', time: '9:00 AM', desc: 'Morning Workshop: Machine Learning', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '10:10 AM', desc: 'AI in Finance', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Thursday', time: '11:00 AM', desc: 'Robotics in Agriculture', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '11:20 AM', desc: 'Smart Home Technologies', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '11:40 AM', desc: 'AI in Transportation', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '12:00 PM', desc: 'Lunch/Panel: AI Innovations', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '2:00 PM', desc: 'Ethical AI Workshop', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '2:20 PM', desc: 'Robotics Maintenance', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Thursday', time: '2:40 PM', desc: 'Closing Remarks for Thursday', image: 'https://i.imgur.com/V8wxR17.png' },

    // Friday
    { day: 'Friday', time: '9:00 AM', desc: 'Morning Keynote: AI Trends', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '10:10 AM', desc: 'Robotics Competitions', image: 'https://i.imgur.com/vHjvzZo.png' },
    { day: 'Friday', time: '11:00 AM', desc: 'AI in Healthcare', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '11:20 AM', desc: 'Autonomous Drone Technology', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '11:40 AM', desc: 'Smart Logistics Panel', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '12:00 PM', desc: 'Lunch/Networking Session', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '2:00 PM', desc: 'AI in Entertainment', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '2:20 PM', desc: 'Future of Robotics Workshop', image: 'https://i.imgur.com/V8wxR17.png' },
    { day: 'Friday', time: '2:40 PM', desc: 'Closing Remarks and Awards', image: 'https://i.imgur.com/V8wxR17.png' },
];

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// StatCard Component with Fixed Counting Animation
const StatCard = ({ number, label, icon }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: false, // Allow re-triggering when scrolled back into view
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            // Start the animation when in view
            controls.start('visible');
            animateCount();
        } else {
            // Reset when out of view
            controls.start('hidden');
            setCount(0);
        }
    }, [inView, controls, number]);

    const animateCount = () => {
        let start = 0;
        const duration = 1000; // 1 second
        const incrementTime = 20; // ms
        const step = number / (duration / incrementTime);

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
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 p-8 rounded-lg flex flex-col items-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className="text-blue-500 text-4xl mb-4">{icon}</div>
            <h3 className="text-4xl font-bold">
                {count}
                {label === "Attendees" ? "+" : ""}
            </h3>
            <p className="mt-2 text-neutral-400">{label}</p>
        </motion.div>
    );
};

// EventCard Component with flex-shrink-0 to Prevent Shrinking
const EventCard = ({ event, isActive, handleEventClick }) => (
    <motion.div
        onClick={() => handleEventClick(event)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }} // Define exit animation
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.05 }}
        className={`flex flex-col items-center bg-neutral-900 p-6 rounded-lg shadow-md min-w-[200px] max-w-[300px] flex-shrink-0 transition-all duration-300 cursor-pointer ${
            isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-60'
        }`}
    >
        <h3 className="text-xl font-semibold text-neutral-100">{event.time}</h3>
        <p className="mt-2 text-neutral-400 text-center">{event.desc}</p>
    </motion.div>
);

// EventDialog Component Using Custom Dialog Components
const EventDialog = ({ isOpen, onClose, event }) => {
    if (!event) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogOverlay />
            <DialogContent>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key={event.time}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">{event.time} - {event.desc}</h2>
                                <button onClick={onClose} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
                            </div>
                            <img
                                src={event.image}
                                alt={`${event.desc} image`}
                                className="w-full h-64 object-cover rounded-md mb-4"
                                loading="lazy"
                            />
                            <p className="text-neutral-400">
                                {/* Detailed description can be added here */}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};

// FullTimeline Component with Horizontal Scroll Only
const FullTimeline = ({ events, handleEventClick }) => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const scrollX = scrollRef.current.scrollLeft;
                const containerWidth = scrollRef.current.offsetWidth;
                const totalScrollWidth = scrollRef.current.scrollWidth - containerWidth;
                const scrollPercentage = scrollX / totalScrollWidth;
                const newIndex = Math.round(scrollPercentage * (events.length - 1));
                setCurrentIndex(newIndex);
            }
        };

        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, [events.length]);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-20 bg-neutral-800 text-neutral-100"
        >
            <h2 className="text-center text-3xl font-semibold mb-12">Full Timeline (Monday - Friday)</h2>
            {/* Timeline Progress Bar */}
            <div className="relative mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
                <motion.div
                    className="absolute top-0 left-0 h-1 bg-blue-500"
                    style={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
                <div className="text-center py-8">
                    <span className="font-semibold block text-2xl mb-4">{events[currentIndex]?.day}</span>
                    <span className="font-semibold block text-2xl">{events[currentIndex]?.time}</span>
                </div>
            </div>
            {/* Scrollable Timeline */}
            <div
                ref={scrollRef}
                className="max-w-7xl mx-auto flex flex-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar space-x-12 px-4"
            >
                {events.map((event, idx) => (
                    <EventCard
                        key={`${event.day}-${event.time}-${idx}`} // Unique key for each EventCard
                        event={event}
                        isActive={idx === currentIndex}
                        handleEventClick={handleEventClick}
                    />
                ))}
            </div>
        </motion.section>
    );
};

// DayByDayTimeline Component with Horizontal Scroll Only
const DayByDayTimeline = ({ events, day, handleEventClick }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-20 bg-neutral-800 text-neutral-100"
        >
            <h2 className="text-center text-3xl font-semibold mb-12">{day} Timeline</h2>
            {/* Scrollable Day Timeline */}
            <div className="max-w-7xl mx-auto flex flex-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar space-x-12 px-4">
                {events.map((event, idx) => (
                    <EventCard
                        key={`${day}-${event.time}-${idx}`} // Unique key for each EventCard
                        event={event}
                        isActive={false}
                        handleEventClick={handleEventClick}
                    />
                ))}
            </div>
        </motion.section>
    );
};

// AboutPage Component
const AboutPage = () => {
    const router = useRouter();
    const [stats, setStats] = useState({ exhibitions: 30, attendees: 2000, partners: 15 });
    const [viewMode, setViewMode] = useState("full"); // 'full' or 'day'
    const [currentDay, setCurrentDay] = useState("Monday");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Start counter animation once the component mounts
    useEffect(() => {
        // Using a slight delay to ensure components are rendered before starting the count
        const timer = setTimeout(() => setStats({ exhibitions: 20, attendees: 2000, partners: 30 }), 300);
        return () => clearTimeout(timer);
    }, []);

    // Handle event card click
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsDialogOpen(true);
    };

    // Handle view mode toggle
    const handleViewToggle = (mode, day = "Monday") => {
        setViewMode(mode);
        if (mode === "day") setCurrentDay(day);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-poppins">
            {/* Hero Section */}
            <section className="flex flex-col items-center py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-bold text-neutral-100"
                >
                    Welcome to RISE
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-4 text-neutral-400 text-lg md:text-xl max-w-3xl"
                >
                    Explore the cutting edge of robotics and AI through exhibitions, networking, and insightful presentations from leaders in the field.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8"
                >
                    <Button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => router.push("/register")}
                    >
                        Register Now
                    </Button>
                </motion.div>
            </section>

            {/* Two Imgur Images with Descriptions */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="rounded-lg shadow-lg bg-neutral-800 p-6"
                    >
                        <img
                            src="https://i.imgur.com/vHjvzZo.png"
                            alt="A group of people engaged in a discussion in front of a poster presentation at a robotics and AI expo"
                            className="rounded-lg shadow-lg mb-4 w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-neutral-400">
                            The Robotics and Intelligent Systems Expo (RISE) aims to be on the frontier of showcasing innovation in robotics and autonomy. RISE's primary goal is to immerse attendees in the dynamic world of robotics and AI, showcasing the vast opportunities in these domains and igniting interest among students and faculty. We achieve this through robotics demonstrations, enlightening presentations, engaging networking sessions, and the presence of industry professionals. In doing so, we aim to connect individuals who share a passion for these fields while effectively highlighting Purdue University as a pioneering institution in the realm of robotics and AI.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="rounded-lg shadow-lg bg-neutral-800 p-6"
                    >
                        <img
                            src="https://i.imgur.com/V8wxR17.png"
                            alt="A group of people posing for a photo at the RISE 2023 event, with a RISE 2023 poster in the background"
                            className="rounded-lg shadow-lg mb-4 w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-neutral-400">
                            The initial RISE event, held in April 2023, proved to be a remarkable success. With 20 participating organizations and over 200 students in attendance from various disciplines across engineering and computer science, it became evident that there is a strong interest in robotics and AI-related research and activities on campus. Furthermore, the event has garnered significant attention from Purdue faculty and the broader research community, including undergraduate and graduate students passionate about the field.
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

            {/* View Mode Toggle */}
            <section className="py-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">View Mode</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => handleViewToggle("full")}
                        className={`px-4 py-2 rounded-md ${
                            viewMode === "full"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-neutral-300 hover:bg-gray-600"
                        }`}
                        aria-pressed={viewMode === "full"}
                    >
                        Full Timeline
                    </button>
                    {daysOfWeek.map((day) => (
                        <button
                            key={day}
                            onClick={() => handleViewToggle("day", day)}
                            className={`px-4 py-2 rounded-md ${
                                viewMode === "day" && currentDay === day
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-neutral-300 hover:bg-gray-600"
                            }`}
                            aria-pressed={viewMode === "day" && currentDay === day}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </section>

            {/* Timeline Section with AnimatePresence */}
            <AnimatePresence mode="wait">
                {viewMode === "full" ? (
                    <FullTimeline
                        key="full-timeline" // Key to help AnimatePresence identify changes
                        events={eventsData}
                        handleEventClick={handleEventClick}
                    />
                ) : (
                    <DayByDayTimeline
                        key={`day-timeline-${currentDay}`} // Unique key per day
                        events={eventsData.filter((event) => event.day === currentDay)}
                        day={currentDay}
                        handleEventClick={handleEventClick}
                    />
                )}
            </AnimatePresence>

            {/* Dialog for Event Details */}
            <EventDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                event={selectedEvent}
            />
        </div>
    );
};

export default AboutPage;
