import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import Header from './components/Header';
import Swipper from './components/Swapper';
import CustomCard from './components/Jobs';
import Curs from './components/Curs';
import RatingPage from './components/Rating';


const App = () => {
    const [userData, setUserData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [attendance, setAttendance] = useState(0); // Davomatni saqlash uchun state

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(user);

        const fetchUserData = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5001/students`);
                    setUserData(response.data);
                    setAttendance(user.attendance || 0);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const getAttendanceStyle = (attendance) => {
        const percentage = Math.min(attendance / 150, 1);
        return {
            background: `linear-gradient(to right, rgba(255, 165, 0, 1) ${percentage * 100}%, rgba(220, 220, 220, 1) ${percentage * 100}%)`,
            color: 'white'
        };
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-8 py-12 flex  gap-6 bg-gray-100">
                {/* Profile Section */}

                <div className="col-span-3 bg-white w-[450px] mt-14 p-6 rounded-lg shadow-lg sticky top-0">
                    {/* Profile Section */}  <h2 className="text-4xl mt-[-120px] ml-[-170px] flex justify-center items-center  text-[#100D5D] gap-4 font-extrabold mb-4 text-center font-poppins">
                        <img className='w-12 mt-8' src="https://space.marsit.uz/img/profile_logo.8dfe14fc.png" alt="" />
                        <p className='text-4xl mt-8 font-extrabold'>Profil</p>
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <Link to='/uplade'>
                            <img
                                src={loggedInUser?.image || 'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png'}
                                alt="Avatar"
                                className="w-36 h-36 rounded-full mx-auto mb-4"
                            />
                        </Link>
                        {loggedInUser ? (
                            <>
                                <h3 className="text-2xl font-bold">{loggedInUser.name}</h3>
                                <p className="text-lg text-gray-500">{loggedInUser.league} | {loggedInUser.group} | {loggedInUser.teacher} | {loggedInUser.time}</p>
                                <div className="bg-gray-200 p-2 rounded-lg my-6">
                                    <div className='bg-orange-600 p-4 rounded-lg w-full text-white flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            <FaCoins className='text-yellow-400 text-2x gap-2' />
                                            <p className='text-xl font-bold ml-2'>{loggedInUser.balance}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <img className='w-10 mr-2' src="https://space.marsit.uz/img/XP.2c530ff3.svg" alt="XP" />
                                            <p className='text-xl font-bold'>{loggedInUser.xp}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-lg text-gray-500">Loading...</p>
                        )}
                    </div>
                    {/* Attendance Section */}
                    <div className="px-6 rounded-lg my-2 text-center shadow-md flex flex-col">
                        <div className='flex gap-4'>
                            <img className='w-20 h-20' src="https://lab.marsit.uz/media/badges/50x%20Davomat/Artboard_1_KysZgAG.png" alt="" />
                            <div className='flex flex-col'>
                                <h4 className="text-xl font-bold mb-2 flex">{attendance}x Davomat</h4>
                                <p className="text-sm text-gray-600 text-left">150 ta dars qoldirmasdan darslarda qatnashish</p>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="150"
                            value={attendance}
                            onChange={(e) => setAttendance(Number(e.target.value))}
                            className="w-full mt-4 accent-orange-500 appearance-none h-2 rounded-lg bg-gray-300 cursor-pointer"
                            style={{ background: `linear-gradient(to right, #ff9900 ${attendance / 150 * 100}%, #e0e0e0 ${attendance / 150 * 100}%)` }}
                        />
                        <div className="flex justify-between items-center mt-4">
                            <Link to="/details" className="text-white text-lg">Batafsil</Link>
                        </div>
                    </div>

                    {/* Learning with Games Section */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-300 p-6 rounded-lg text-center shadow-md mt-6">
                        <h4 className="font-bold text-white text-xl mb-4">O'yinlar bilan o'rganing</h4>
                        <div className="flex flex-col gap-6">
                            <a href='https://typing-test-sable.vercel.app/' className="flex flex-col items-center">
                                <img
                                    className='w-[120px] h-[110px] rounded-2xl transition-transform duration-300 hover:scale-105'
                                    src="https://play-lh.googleusercontent.com/vqcumNluBRJ95zplaIUkBcOAyCSzu3_HsPcT_viEc33pjOWZLnxH_QVOywoSdojcXg"
                                    alt="Typing Game"
                                />
                                <p className='text-center text-2xl font-bold text-white mt-2'>Typing Game</p>
                            </a>
                            <hr />
                            <a href='https://siennameow.github.io/Code-Quiz/' className="flex flex-col items-center">
                                <img
                                    className='w-[120px] h-[110px] rounded-2xl transition-transform duration-300 hover:scale-105'
                                    src="https://exec.mit.edu/file-asset/QUE_stock_image?v=1"
                                    alt="Question Game"
                                />
                                <p className='text-center text-2xl font-bold text-white mt-2'>Question Game</p>
                            </a>
                            <hr />
                            <a target='blank' href="https://coins-ts-git-final-version-ai-ahmads-projects.vercel.app/" className='flex flex-col items-center'>
                                <img
                                    className='w-[120px] h-[110px] rounded-2xl transition-transform duration-300 hover:scale-105'
                                    src="https://cdn-icons-png.flaticon.com/512/3924/3924426.png"
                                    alt="MarsCoin Game"
                                />
                                <p className='text-center text-2xl font-bold text-white mt-2'>MarsCoin Game</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-14">
                   {/* Profile Section */}  <h2 className="text-4xl mt-[-90px] ml-[-890px] flex justify-center items-center  text-[#100D5D] gap-4 font-extrabold mb-4 text-center font-poppins">
                        <p className='text-4xl mt-8 font-extrabold'>Yangiliklar</p>
                    </h2>
                    <Swipper />
                    <CustomCard />
                    <Curs />
                </div>
            </div>
            <div className='w-full'>
                <RatingPage />
            </div>
        </>
    );
};

export default App;
