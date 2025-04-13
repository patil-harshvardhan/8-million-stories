"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 w-full z-[999] shadow-sm shadow-black bg-[#202020]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center">
              {/* You would need to replace with your actual logo */}
              <span className="text-3xl font-bold">codex</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6">
            <Link href="/admin" className="hover:text-gray-300 px-2">
              <div className="flex items-center">
                <span>Admin</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="/overview" className="hover:text-gray-300 px-2">
              <div className="flex items-center">
                <span>Overview</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="/website-health" className="hover:text-gray-300 px-2">
              <div className="flex items-center">
                <span>Website Health</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link
              href="/search-visibility"
              className="hover:text-gray-300 px-2"
            >
              <div className="flex items-center">
                <span>Search Visibility</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="/performance" className="hover:text-gray-300 px-2">
              <div className="flex items-center">
                <span>Performance & Forecasting</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="/budget-tracker" className="hover:text-gray-300 px-2">
              <div className="flex items-center">
                <span>Budget Tracker</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </Link>
          </nav>

          {/* User Profile Icon - visible on desktop */}
          <div className="hidden lg:block">
            <div className="w-10 h-10 rounded-full bg-white"></div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className=" focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4">
            <nav className="flex flex-col space-y-2 pb-4">
              <Link href="/admin" className="hover:text-gray-300">
                Admin
              </Link>
              <Link href="/overview" className="hover:text-gray-300">
                Overview
              </Link>
              <Link href="/website-health" className="hover:text-gray-300">
                Website Health
              </Link>
              <Link href="/search-visibility" className="hover:text-gray-300">
                Search Visibility
              </Link>
              <Link href="/performance" className="hover:text-gray-300">
                Performance & Forecasting
              </Link>
              <Link href="/budget-tracker" className="hover:text-gray-300">
                Budget Tracker
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Client Information Section */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1">Client:</label>
              <select className="border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                <option>General Mills</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Company:</label>
              <select className="border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                <option>Betty Crocker</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Website:</label>
              <select className="border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                <option>Betty Crocker UK</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Segment:</label>
              <select className="border border-gray-600 rounded px-3 py-2  focus:outline-none focus:border-blue-500">
                <option>Full site</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
