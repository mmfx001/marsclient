import React, { useState } from 'react';
import axios from 'axios'; // Axiosni import qilamiz
import { Link } from 'react-router-dom';

const CustomCard = () => {
    const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [support, setSupport] = useState([]);

    const handleRegister = async () => {
        const newSupport = {
            supportImg: "https://space.marsit.uz/img/tutor-img.34ff9406.png",
            supportName: "Diyor Rahmatullayev",
            supportWork: "Frontend",
            supportDay: "Mon",
            supportClock: "9:00" // Tanlangan vaqt
        };

        try {
            // Ma'lumotlarni POST qilish
            const response = await axios.post('http://localhost:5001/Support', newSupport);

            // Agar so'rov muvaffaqiyatli bo'lsa, frontenddagi supportni yangilaymiz
            setSupport((prevSupport) => [...prevSupport, response.data]);
            closeTutorModal(); // Modalni yopamiz
        } catch (error) {
            console.error('Xatolik: Ma\'lumotni qo\'shishda muammo yuz berdi', error);
        }
    };

    const openTutorModal = () => {
        setIsTutorModalOpen(true);
    };

    const closeTutorModal = () => {
        setIsTutorModalOpen(false);
    };

    const openNewsModal = () => {
        setIsNewsModalOpen(true);
    };

    const closeNewsModal = () => {
        setIsNewsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Card 1 - Yordamchi o'qituvchi */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/tutor-img.34ff9406.png"
                        alt="Yordamchi o'qituvchi"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="font-bold text-gray-700">Yordamchi o'qituvchi</p>
                        <p className="text-gray-500">Zapisa oling</p>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white w-[120px] h-[30px] rounded-lg"
                    onClick={openTutorModal}
                >
                    Zapisa
                </button>
            </div>

            {/* Tutor Modal */}
            {isTutorModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeTutorModal}
                        >
                            ✕
                        </button>
                        <h2 className="text-center text-xl font-bold mb-4">Yordamchi o'qituvchi</h2>
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="https://space.marsit.uz/img/tutor-img.34ff9406.png"
                                alt="Tutor"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <p className="text-gray-700 text-lg font-medium">Diyor Rahmatullayev</p>
                            <p className="text-gray-500">Frontend</p>
                        </div>
                        <button
                            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white w-full py-2 rounded-lg"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}            {/* Card 2 - Новости */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/news.bb559cba.svg"
                        alt="Новости"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="font-bold text-gray-700">Новости</p>
                        <p className="text-gray-500">Yangiliklardan xabardor bo'ling</p>
                    </div>
                </div>
                <Link
                    to="/news"
                    className="bg-red-500 text-center text-white w-[120px] h-[30px] rounded-lg"
                    onClick={openNewsModal}
                >
                    Watch
                </Link>
            </div>

            {/* News Modal */}
            {isNewsModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeNewsModal}
                        >
                            ✕
                        </button>
                        <h2 className="text-center text-xl font-bold mb-4">Новости</h2>
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="https://space.marsit.uz/img/news.bb559cba.svg"
                                alt="News"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <p className="text-gray-700 text-lg font-medium">Новости</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Card 3 - Сертификаты */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/certificate.137f8907.svg" // Placeholder image
                        alt="Сертификаты"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="  text-gray-700">Сертификаты</p>
                        <p className=" text-gray-500">Сертификаты, выданные Mars IT School</p>
                    </div>
                </div>
                <button className="bg-blue-200 text-blue-500 w-[120px] h-[30px] rounded-lg">
                    Check
                </button>
            </div>
            {/* Card 4 - Поделиться с друзьями */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/share-icon-left.c27c8ca7.svg" // Placeholder image
                        alt="Поделиться с друзьями"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className=" text-gray-700">Поделиться с друзьями</p>
                        <p className="text-gray-500">Делитесь с друзьями и получайте коины</p>
                    </div>
                </div>
                <button className="bg-blue-200 text-blue-500 w-[120px] h-[30px] rounded-lg">
                    Share
                </button>
            </div>
        </div>
    );
};

export default CustomCard;