import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useUserContext } from "../context/useUserContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { isAuthenticated, user } = useUserContext();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.pageYOffset > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { link: "Home", path: "" },
        { link: "Wedding", path: "wedding" },
        { link: "Agriculture", path: "agriculture" },
        { link: "Health", path: "fitness" },
    ];

    const menuItems = navItems.filter(
        (item) =>
            item.link === "Wedding" ||
            item.link === "Agriculture" ||
            item.link === "Health"
    );
    return (
        <header
            className={`w-full bg-white fixed top-0 left-0 right-0 ${
                isSticky ? "shadow-sm z-10" : ""
            }`}
        >
            <nav
                className={`py-2 lg:px-6 px-2 ${
                    isSticky ? "sticky top-0 left-0 right-0 duration-300" : ""
                }`}
            >
                <div className="p-2 flex justify-between">
                    <a href="/" className="flex items-center gap-1">
                        <img src="" alt="" />
                        <span className="font-bold text-xl text-primary">
                            WeddingBells
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4 border border-gray-300 rounded-full py-1 px-3 shadow-md shadow-gray-300">
                        {navItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <Link
                                        to={`/${item.path}`}
                                        className="block text-base text-gray-900 hover:text-primary first:font-medium"
                                    >
                                        {item.link}
                                    </Link>
                                </div>
                                {index !== navItems.length - 1 && (
                                    <div className=" border-l border-gray-300"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* User Login */}
                    <div>
                        {isAuthenticated ? (
                            <div className="flex gap-2">
                                <Link to="/host-wedding">
                                    <div className="md:block text-sm font-semibold py-1 px-2 rounded-full hover:bg-primary hover:text-white transition cursor-pointer shadow-md border-neutral-50">
                                        Host Wedding
                                    </div>
                                </Link>
                                <div className="p-2 md:p-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                    <div className="hidden md:flex">
                                        {user.firstName}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to={"/signin"}
                                className="flex gap-1 border border-gray-300 rounded-full py-1 px-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <div className="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Responsive Menu */}
                    <div className="md:hidden md:block text-sm font-semibold py-1 px-2 rounded-full hover:bg-primary hover:text-white transition cursor-pointer shadow-md border-neutral-50">
                        {isMenuOpen ? (
                            <FaXmark
                                onClick={toggleMenu}
                                className="text-gray-600 cursor-pointer"
                            />
                        ) : (
                            <FaBars
                                onClick={toggleMenu}
                                className="text-gray-600 cursor-pointer"
                            />
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`md:hidden ${
                            isMenuOpen ? "block" : "hidden"
                        }`}
                    >
                        <div className="mt-2 space-y-2">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={`/${item.path}`}
                                    className="block text-base text-gray-900 hover:text-primary"
                                >
                                    {item.link}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
