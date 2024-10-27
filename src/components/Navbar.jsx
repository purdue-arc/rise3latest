"use client";

import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <nav className="bg-blue-600 p-4 pt-6 sticky -top-2 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            RISE3 Robotics Conference
          </div>
          <ul className="flex space-x-8">
            <li className="relative nav-item group"> {/* Add group class here */}
              <button
                  onClick={handleDropdownToggle}
                  className="flex items-center justify-center relative text-white text-lg focus:outline-none border border-transparent group-hover:border-black transition duration-200 rounded-md px-4 py-2"
              >
                About
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                  <ul className="absolute top-full mt-2 left-0 w-40 bg-blue-700 text-white rounded shadow-lg">
                    <li>
                      <a
                          href="/about#rise3-info"
                          className="block px-4 py-2 hover:bg-blue-800"
                          onClick={() => setIsDropdownOpen(false)}
                      >
                        RISE3 Info
                      </a>
                    </li>
                    <li>
                      <a
                          href="/about#past-events"
                          className="block px-4 py-2 hover:bg-blue-800"
                          onClick={() => setIsDropdownOpen(false)}
                      >
                        Past Events
                      </a>
                    </li>
                    <li>
                      <a
                          href="/about#timeline"
                          className="block px-4 py-2 hover:bg-blue-800"
                          onClick={() => setIsDropdownOpen(false)}
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
              )}
            </li>
            <li className="nav-item group"> {/* Add group class here */}
              <a
                  href="/contact"
                  className="flex items-center justify-center relative text-white text-lg border border-transparent group-hover:border-black transition duration-200 rounded-md px-4 py-2"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
}