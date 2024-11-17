'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-800 py-8 text-neutral-400 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-4"
            >
                {/* Social Links */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="text-blue-500 hover:text-blue-400 w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="text-blue-500 hover:text-blue-400 w-6 h-6" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="text-blue-500 hover:text-blue-400 w-6 h-6" />
                    </a>
                    <a href="mailto:info@rise.com">
                        <Mail className="text-blue-500 hover:text-blue-400 w-6 h-6" />
                    </a>
                </div>

                {/* Links and Info */}
                <div className="mb-4">
                    <p className="text-neutral-400">&copy; 2024 RISE | Robotics and Intelligent Systems Expo</p>
                    <nav className="flex justify-center space-x-6 mt-4">
                        <a href="/about" className="hover:text-blue-500">About</a>
                        <a href="/program" className="hover:text-blue-500">Program</a>
                        <a href="/registration" className="hover:text-blue-500">Registration</a>
                        <a href="/sponsorship" className="hover:text-blue-500">Sponsorship</a>
                    </nav>
                </div>

                {/* Final Note */}
                <div className="text-sm text-neutral-500 mt-4">
                    <p>Designed by RISE Team | Powered by Innovation</p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
