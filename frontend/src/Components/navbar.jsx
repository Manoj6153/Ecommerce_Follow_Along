import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/my-products", label: "My Products" },
        { to: "/create-product", label: "Add Products" },
        { to: "/cart", label: "Cart" },
    ];

    return (
        <nav className="bg-blue-600 w-full fixed top-0 left-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-200 hover:text-white focus:outline-none"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Centered items */}
                    <div className="hidden md:flex justify-center items-center w-full">
                        <ul className="flex space-x-6 items-center">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-white font-semibold px-3 py-2 rounded-md text-md"
                                                : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md"
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md bg-black"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md bg-black"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/sign-up"
                                            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md bg-black"
                                        >
                                            Signup
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block text-white font-semibold px-3 py-2 rounded-md text-base"
                                            : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base"
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-center text-gray-200 hover:text-white px-3 py-2 rounded-md text-base bg-black"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base bg-black"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/sign-up"
                                        className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base bg-black" 
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
