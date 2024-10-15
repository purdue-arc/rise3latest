"use client";

export default function Navbar() {
  return (
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">RISE3 Robotics Conference</div>
          <ul className="flex space-x-8">
            <li className="nav-item">
              <a href="/about" className="text-white hover:text-gray-200 text-lg">About</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="text-white hover:text-gray-200 text-lg">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
  );
}