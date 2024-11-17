"use client";

import Image from "next/image";
import {useState, useEffect} from "react";

export default function Page() {
    const committeeContacts = [
        {
            name: "Revanth Senthil",
            title: "ARC Vice President",
            email: "senthilr@purdue.edu"
        },
        {
            name: "Aytaj Aslani",
            title: "ARC Treasurer",
            email: "aaslanli@purdue.edu"
        },
        {
            name: "Vijay Muthukumar",
            title: "RISE Director",
            email: "vmuthuku@purdue.edu"
        },
        {
            name: "Mouli Sangita",
            title: "ARC Operations Chair",
            email: "msangita@purdue.edu"
        }
    ];
    const developerContacts = [
        {
            name: "Edgar Babajanyan",
            title: "Lead Software Engineer",
            email: "ebabajan@purdue.edu"
        },
        {
            name: "Mikah Kainen",
            title: "Software Engineer",
            email: "mkainen@purdue.edu"
        },
        {
            name: "Pranesh Monda",
            title: "Software Engineer",
            email: "pmonda@purdue.edu"
        },
        {
            name: "Mert Karabulut",
            title: "Software Engineer",
            email: "mkarabul@purdue.edu"
        },
        {
            name: "Peter Kurto",
            title: "Software Engineer",
            email: "pkurto@purdue.edu"
        }
    ];

    return (
        <div className="w-full h-screen bg-black">
            <section className="container mx-auto py-12 text-center bg-black text-white">
            <h1 className="text-3xl font-bold mb-8">CONTACT US</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl font-bold text-white underline mb-5">GENERAL INQUIRIES</h2>
                    <a href="mailto:autonomy@purdue.edu"
                       className="text-blue-500 underline text-lg">autonomy@purdue.edu</a>
                </div>
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl font-bold text-white underline mb-5">COMMITTEE CONTACTS</h2>
                    {/* Loop over contacts and render each one */}
                    {committeeContacts.map((contact, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                            <p className="text-blue-400">{contact.title}</p>
                            <a href={`mailto:${contact.email}`} className="text-blue-500 underline text-lg">
                                {contact.email}
                            </a>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl font-bold text-white underline mb-5">DEVELOPER CONTACTS</h2>
                    {/* Loop over contacts and render each one */}
                    {developerContacts.map((contact, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                            <p className="text-blue-400">{contact.title}</p>
                            <a href={`mailto:${contact.email}`} className="text-blue-500 underline text-lg">
                                {contact.email}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}
