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