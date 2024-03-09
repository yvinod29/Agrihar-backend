import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useUserContext } from "../context/useUserContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { isAuthenticated, user } = useUserContext();
    console.log("datasignin");
    console.log(user);
    useEffect(() => {}, [isAuthenticated]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
            window.addEventListener("scroll", handleScroll);
        };
        return () => {
            window.addEventListener("scroll", handleScroll);
        };
    }, []);

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
        <div
            className={`fixed top-0 w-full bg-white ${
                isSticky ? "shadow-sm" : ""
            }`}
        >
            <div className="max-w-[252-px] mx-auto xl:px-20 md:md-10 sm:px-2 px-4">
                <header className="p-4 flex justify-between border-b-[1px] ">
                    <a href="/" className="flex items-center gap-1">
                        <img src="" alt="" />
                        <span className="font-bold text-xl text-primary">
                            WeddingBells
                        </span>
                    </a>

                    {/* Responsive Menu */}
                    <div className="md:hidden">
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

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                        {navItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <Link
                                        to={`/${item.path}`}
                                        className="block text-base text-gray900 hover:text-primary first:font-medium"
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
                    <div className="">
                        {isAuthenticated ? (
                            <div className="flex gap-3">
                                <div className="md:block text-sm font-semibold py-3 px-2 rounded-full hover:bg-primary hover:text-white transition cursor-pointer shadow-md border-neutral-50">
                                    <Link to="/host-wedding">
                                        <button >
                                            Host Wedding
                                        </button>
                                    </Link>
                                </div>
                                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
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
                                    <div className="hidden md:flex ">
                                        {user.firstName}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to={"/signin"}
                                className="flex gap-2 border border-gray-300 rounded-full py-2 px-4"
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
                </header>
            </div>
        </div>
    );
};

export default Navbar;
