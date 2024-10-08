import React from 'react';
import { FaCoins, FaStar } from 'react-icons/fa'; // Importing icons from react-icons/fa
import { Link } from 'react-router-dom';
import RatingPage from './reating';

const Home = () => {

    
    const userdata = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(userdata);


    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}


            {/* Banner */}
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-16 px-8 text-center shadow-lg rounded-lg mt-8 mx-8">
                <h2 className="text-4xl font-bold">DO'STINGIZNI DARSLARIMIZGA OLIB KELING</h2>
                <p className="text-xl mt-4">Batafsil ma'lumotni ustozingizdan oling</p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-8 py-12 grid grid-cols-12 gap-6">
                <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">Profil</h2>
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <Link to='/uplade'>
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png"
                                alt="Avatar"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        </Link>
                        <h3 className="text-xl font-bold">Firdavs Murodjonov</h3>
                        <p className="text-sm text-gray-500">Kodery | FRONT-870 | Behruz Satimbayev | 19:00</p>

                        {/* Levels and Stars */}
                        <div className="bg-gray-200 p-4 rounded-lg my-6">
                            <p className="text-sm font-bold text-orange-600">Levels</p>
                            <div className="flex justify-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-lg mx-1" />
                                ))}
                            </div>
                        </div>


                        {/* Coins and XP */}
                        <div className="flex justify-around bg-gray-100 py-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <FaCoins className="text-yellow-400 text-2xl" />
                                <p className="ml-2 text-lg font-bold">83</p>
                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="XP"
                                    className="mr-2"
                                />
                                <p className="text-lg font-bold text-orange-500">2954</p>
                            </div>
                        </div>
                    </div>

                    {/* Attendance (Davomat) */}
                    <div className="bg-gray-50 p-4 rounded-lg my-6 text-center shadow-md">
                        <h4 className="font-bold text-blue-500 mb-2">25x Davomat</h4>
                        <p className="text-sm text-gray-500">poseshchat zanyatiya, ne propuskaya 25 zanyatiy</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-yellow-500">11</p>
                            <Link to="/details" className="text-blue-500 text-sm">Подробнее</Link>
                        </div>
                    </div>

                    {/* Mars Games Section */}
                    <div className="bg-gradient-to-r from-yellow-400 to-blue-500 p-4 rounded-lg text-center shadow-md mt-6">
                        <h4 className="font-bold text-white text-lg">Учитесь с играми</h4>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Играть</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Games!</h3>
                                <hr />

                                <div className='flex mt-10 gap-10 justify-center items-center'>
                                    <Link to='/TypeGame'>
                                        <div>
                                            <img className='w-[150px] h-[150px] rounded-2xl' src="https://play-lh.googleusercontent.com/vqcumNluBRJ95zplaIUkBcOAyCSzu3_HsPcT_viEc33pjOWZLnxH_QVOywoSdojcXg" alt="" />
                                            <p>typing game</p>
                                        </div>
                                    </Link>
                                    <Link to='/QuetionGame'>
                                        <div>
                                            <img className='w-[150px] h-[150px] rounded-2xl' src="https://exec.mit.edu/file-asset/QUE_stock_image?v=1" alt="" />
                                            <p>quetion game</p>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </dialog>
                    </div>
                </div>

                {/* Learning Journey Section */}
                <div className="col-span-9">
                    <div className="bg-white p-10 rounded-lg shadow-lg mb-10">
                        <h2 className="text-2xl font-bold text-orange-600">Learning Journey</h2>
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            {/* Card 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://space.marsit.uz/img/tutor-img.34ff9406.png"
                                        alt="Yordamchi o'qituvchi"
                                        className="w-12 h-12"
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-700">Yordamchi o'qituvchi</h4>
                                        <p className="text-sm text-gray-500">Qo'shimcha dars olish uchun ro'yxatdan o'ting</p>
                                    </div>
                                </div>
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button className="bg-[#1ce5ff] text-white w-[120px] h-[30px] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Записаться</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>

                                        <h3 className="font-bold text-lg">Дополнительный учитель</h3>
                                        <hr />
                                        <label className="form-control w-full max-w-xs">
                                            <select className="select select-bordered">
                                                <option disabled selected>Tutor</option>
                                                <option><div><img src="https://imgur.com/a/KRLwaNc" alt="" /></div></option>

                                            </select>
                                        </label>
                                    </div>
                                </dialog>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://space.marsit.uz/img/news.bb559cba.svg"
                                        alt="Yangiliklar"
                                        className="w-12 h-12"
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-700">Yangiliklar</h4>
                                        <p className="text-sm text-gray-500">O'quv markazimiz haqida so'nggi yangiliklardan xabardor bo'ling</p>
                                    </div>
                                </div>
                                <button className="bg-[#ea1e6237] text-blue-500 w-[120px] h-[30px] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Watch</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                    </div>
                                </dialog>
                            </div>


                            {/* Card 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://space.marsit.uz/img/certificate.137f8907.svg"
                                        alt="Sertifikatlar"
                                        className="w-12 h-12"
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-700">Sertifikatlar</h4>
                                        <p className="text-sm text-gray-500">Mars IT School tomonidan taqdim etilgan sertifikatlar</p>
                                    </div>
                                </div>
                                <button className="bg-[#cadce4] text-blue-500 w-[120px] h-[30px] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Check</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                    </div>
                                </dialog>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://space.marsit.uz/img/share-icon-left.c27c8ca7.svg"
                                        alt="Do'stlar bilan ulashing"
                                        className="w-12 h-12"
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-700">Do'stlar bilan ulashing</h4>
                                        <p className="text-sm text-gray-500">Mars IT School tomonidan taqdim etilgan sertifikatlar</p>
                                    </div>
                                </div>
                                <button className="bg-[#cadce4] text-blue-500 w-[120px] h-[30px] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Share</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                    </div>
                                </dialog>
                            </div>
                            <p>Guruhlar:</p>
                            {userdata ? (
                                <div>
                                    <Link to={'/learning'}>
                                        <button>{userdata.group}</button>
                                    </Link>
                                </div>
                            ) : (
                                <p>No user data found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RatingPage />
        </div>
    );
};

export default Home;
