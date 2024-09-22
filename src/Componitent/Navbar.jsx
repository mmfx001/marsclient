import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setLoggedInUser }) => {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const userInfoRef = useRef(null);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleUserInfoClick = () => {
        setShowUserInfo((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        setShowUserInfo(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
                setShowUserInfo(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white py-4 px-10 flex justify-between items-center shadow-lg relative">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src="data:image/png;base64,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"
                    alt="Mars Logo"
                    className="w-32 h-auto mr-4"
                />
            </div>

            {/* Nav Links */}
            <div className="text-gray-700 flex items-center space-x-10 text-lg">
                <Link to="/" className="hover:text-orange-500 transition duration-300 font-semibold">
                    Home
                </Link>
                <Link to="/learning" className="hover:text-orange-500 transition duration-300 font-semibold">
                    Learning
                </Link>
                <Link to="/shop" className="hover:text-orange-500 transition duration-300 font-semibold">
                    Shop
                </Link>
                <Link to="/blog" className="hover:text-orange-500 transition duration-300 font-semibold">
                    Blog
                </Link>
                <Link to="/learning" className="hover:text-orange-500 transition duration-300 font-semibold">
                    Le
                </Link>
            </div>

            {/* Right Side (Button and Profile) */}
            <div className="flex items-center space-x-4">
            <Link to='/post'>
            <button className=" from-white border-2 border-orange-300 text-orange-400 px-6 py-[6px] rounded-lg shadow hover:shadow-lg transition duration-300 font-semibold">
                    + Post Yaratish
                </button></Link>

                {/* User Profile */}
                {!loggedInUser ? (
                    <Link
                        to="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition duration-300"
                    >
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png"
                            alt="Login"
                            className="w-9 h-9"
                        />
                    </Link>
                ) : (
                    <div className="relative">
                        <div
                            className="cursor-pointer w-10 h-10 bg-white flex items-center justify-center rounded-full border border-gray-300 shadow hover:shadow-lg transition duration-300"
                            onClick={handleUserInfoClick}
                        >
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png"
                                alt="User Info"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        {showUserInfo && (
                            <div
                                ref={userInfoRef}
                                className="absolute right-0 mt-2 w-72 bg-white p-4 rounded-lg shadow-lg z-20 border border-gray-200"
                            >
                                <p className="font-semibold text-gray-700">
                                    Email: <span className="text-blue-500">{loggedInUser.name}</span>
                                </p>
                                <p className="font-semibold text-gray-700">
                                    ID: <span className="text-blue-500">{loggedInUser.id}</span>
                                </p>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 w-full font-semibold transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;