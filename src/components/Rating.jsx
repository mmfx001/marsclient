import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from 'react';

const RatingPage = () => {
    const [filter, setFilter] = useState('clans');
    const [oquvchi, setOquvchi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5001/students')
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setOquvchi(response.data);
                } else {
                    console.log('No student data found');
                }
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
                setError('Error fetching students');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const getStudentsByLeague = (league) => {
        return oquvchi
            .filter((student) => student.league.toLowerCase() === league.toLowerCase())
            .sort((a, b) => b.coins - a.coins);
    };

    return (
        <div>
            {loading ? (
                <div>Yuklanmoqda...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <header className="flex w-full flex-col md:flex-row bg-white  p-9 items-center">
                        <div className="flex w-full items-center gap-4 md:gap-64">
                            <h1 className="text-1xl font-bold text-blue-900 uppercase tracking-wide">Reyting</h1>
                            <div className="flex justify-around border-b border-gray-300 w-[500px] md:w-96">
                                <div onClick={() => handleFilterChange('clans')} className={`py-2 w-56 text-gray-400 relative cursor-pointer transition-all ${filter === 'clans' ? 'font-bold text-orange-500' : ''}`}>
                                    Klanlar ichida
                                </div>
                                <div onClick={() => handleFilterChange('groups')} className={`py-2 w-48 text-gray-400 relative cursor-pointer transition-all ${filter === 'groups' ? 'font-bold text-orange-500' : ''}`}>
                                    Guruh ichida
                                </div>
                                <div onClick={() => handleFilterChange('all')} className={`py-2 w-56 text-gray-400 relative cursor-pointer transition-all ${filter === 'all' ? 'font-bold text-orange-500' : ''}`}>
                                    Hammani orasida
                                </div>
                            </div>
                        </div>
                        <ul className="w-full max-w-sm mt-6 relative">
                            <li>
                                <details className="w-full mb-3 bg-gray-100 rounded-lg shadow-md relative border border-gray-300" open={isOpen}>
                                    <summary
                                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 transition duration-200"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <div className="flex items-center">
                                            <img src="https://static.vecteezy.com/system/resources/previews/005/988/959/non_2x/calendar-icon-free-vector.jpg" alt="Calendar Icon" className="w-6 h-6 mr-2" />
                                            <span className="text-gray-600 text-lg font-semibold">Oylik reyting</span>
                                        </div>
                                        <div className={`transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}>                                            <img src="https://cdn-icons-png.flaticon.com/512/271/271239.png" alt="Arrow Icon" className="w-4 h-4" />
                                        </div>
                                    </summary>
                                    <ul className={`list-none p-0 bg-white rounded-b-lg ${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                                        <li className="border-t border-gray-200">
                                            <a href="#" className="block p-3 hover:bg-orange-100 text-gray-700 transition duration-200">Kunlik reyting</a>
                                        </li>
                                        <li className="border-t border-gray-200">
                                            <a href="#" className="block p-3 hover:bg-orange-100 text-gray-700 transition duration-200">Haftalik reyting</a>
                                        </li>
                                        <li className="border-t border-gray-200">
                                            <a href="#" className="block p-3 hover:bg-orange-100 text-gray-700 transition duration-200">Oylik reyting</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </header>
                    <div className='bg-orange-600 w-full flex z-100 h-[270px] justify-between gap-6 py-20 px-6 md:px-32'>
                        <div className='flex flex-col gap-4'>
                            <span className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mr-2">Oylik reyting</span>
                            <p className="text-md md:text-lg font-semibold text-white w-full md:w-[360px]">Eng ko’p coin to’plagan o’quvchilarimizning bir haftalik reytingi</p>
                        </div>
                        <div>
                            <div className="carousel w-[400px]">
                                {oquvchi.map((student, index) => (
                                    <div id={`slide${index + 1}`} className="carousel-item relative w-full rounded-lg" key={student.id}>
                                        <div className='w-full p-4 bg-white rounded-lg shadow-lg flex justify-between transition-transform duration-300 ease-in-out transform'>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                                                <p className="text-gray-600">League: {student.league}</p>
                                                <p>Front | {student.group}</p>
                                            </div>
                                            <p className="flex mt-7 gap-1 text-gray-600">{student.coins} <img className='w-6 h-5 mt-0.5' src="https://space.marsit.uz/img/Coin.8a6f0644.svg" alt="" /></p>
                                        </div>
                                    </div>
                                ))}
                            </div></div>
                            </div>
                    <div className="mt-6">
                        {filter === 'clans' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
                                <LeagueBlock title="Geymerlar" students={getStudentsByLeague('Geymerlar')} />
                                <LeagueBlock title="Koderlar" students={getStudentsByLeague('coder')} />
                                <LeagueBlock title="Xakkerlar" students={getStudentsByLeague('Xakkerlar')} />
                            </div>
                        )}
                        {filter === 'groups' && (
                            <GroupList students={oquvchi} />
                        )}
                        {filter === 'all' && (
                            <GroupList students={oquvchi} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const LeagueBlock = ({ title, students }) => (
    <div className='bg-gray-100 rounded-3xl p-4'>
        <h2 className="text-xl mx-2 md:mx-44 my-8 font-semibold text-black">{title}</h2>
        <ul>
            {students.map((student, index) => (
                <li key={student.id} className={`relative flex items-center p-4 ${index === 0 ? 'bg-orange-600 text-white' : 'bg-white text-black'} rounded-lg shadow-md mb-4`}>
                    <div className='mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500'>{index + 1}</div>
                    <div className="flex-1">
                        <p className='font-bold text-lg'>{student.name}</p>
                        <p className='text-sm'>{student.group} | {student.teacher || 'N/A'}</p>
                    </div>
                    <div className={`font-bold ${index === 0 ? 'text-white' : 'text-orange-500'} flex items-center`}>
                        {student.coins} <img src="https://space.marsit.uz/img/Coin.8a6f0644.svg" alt="coin" className="ml-1 w-5 h-5" />
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
const GroupList = ({ students }) => {
    const sortedStudents = [...students].sort((a, b) => b.coins - a.coins);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className='bg-gray-100 rounded-3xl p-4'>
                <h2 className="text-xl pl-[490px] md:mx-44 my-8 font-semibold text-black"></h2>
                <ul>
                    {sortedStudents.map((student, index) => (
                        <li key={student.id} className={`relative flex items-center p-4 ${index === 0 ? 'bg-orange-600 text-white' : 'bg-white text-black'} rounded-lg shadow-md mb-4`}>
                            <div className='mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500'>{index + 1}</div>
                            <div className="flex-1">
                                <p className="font-bold text-lg">{student.name}</p>
                                <p className="text-sm">{student.group} | {student.teacher || 'N/A'}</p>
                            </div>
                            <div className={`font-bold ${index === 0 ? 'text-white' : 'text-orange-500'} flex items-center`}>
                                {student.coins} <img src="https://space.marsit.uz/img/Coin.8a6f0644.svg" alt="coin" className="ml-1 w-5 h-5" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};



export default RatingPage;