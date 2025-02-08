import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function SolutionContainer() {
    return (
        <div className="overflow-auto h-screen">
            {/* Sticky Navbar */}
            <nav className="bg-white text-black mb-4  sticky top-0 z-50">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between p-3">
                    <nav className="hidden md:flex items-center space-x-8">
                            {["Video", "Diet", "Exercise", "Documentation"].map((item) => (
                                <Link
                                    key={item}
                                    to={item.toLowerCase()}
                                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <div className="bg-white p-2 rounded-xl shadow-xl">
                <Outlet />
            </div>
        </div>
    );
}

export default SolutionContainer;
