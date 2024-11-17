"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isDropdownOpen) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isDropdownOpen, controls]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 pt-6 sticky -top-2 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="/" className="header-logo-link">
              <img src="/Rise2Logo.png" alt="Logo" className="header-logo w-24 h-12"/>
            </a>
            <div className="text-white text-2xl font-bold">
              RISE3 Robotics Conference
            </div>
          </div>
          <ul className="flex space-x-8">
            <li className="relative nav-item group">
              <button
                  onClick={handleDropdownToggle}
                  className="flex items-center justify-center text-white text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md px-4 py-2"
              >
                About
              </button>
              <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-full mt-2 left-0 w-40 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-lg overflow-hidden"
              >
                <ul>
                  <li>
                    <a
                        href="/about#rise3-info"
                        className="block px-6 py-3 hover:bg-blue-700 transition-colors duration-200 ease-in-out rounded-md"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                      RISE3 Info
                    </a>
                  </li>
                  <li>
                    <a
                        href="/about#past-events"
                        className="block px-6 py-3 hover:bg-blue-700 transition-colors duration-200 ease-in-out rounded-md"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                      Past Events
                    </a>
                  </li>
                  <li>
                    <a
                        href="/about#timeline"
                        className="block px-6 py-3 hover:bg-blue-700 transition-colors duration-200 ease-in-out rounded-md"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </motion.div>
            </li>
            <li className="nav-item group">
              <a
                  href="/contact"
                  className="flex items-center justify-center text-white text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md px-4 py-2"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
}