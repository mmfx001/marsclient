import React from 'react';

const Curs = () => {
    return (
        <div className="container mx-auto py-6">
                    {/* Profile Section */}  <h2 className="text-4xl ml-[-880px] mb-8 mt-5 text-left flex justify-center items-center  text-[#100D5D] gap-4 font-extrabold  font-poppins">
                    <img className='w-12 mt-8' src="https://images.vexels.com/content/158669/preview/notebook-illustration-laptop-f57f36.png" alt="" />
                        <p className='text-4xl mt-8 font-extrabold'>Kurslar</p>
                    </h2>
            <div className="carousel carousel-end rounded-box space-x-11">
                {/* Slide 1 */}
                <div className="bg-white rounded-lg shadow-md p-4 w-60 flex flex-col  items-center">
                    <div className="bg-[#00a9f1] w-full h-32 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://lab.marsit.uz/media/group_category_images/17/starter-icon.png"
                            alt="Course Icon"
                            className="w-20 h-20"
                        />
                    </div>
                    <button className="bg-blue-500 text-white rounded px-3 py-1 mb-2">Current</button>
                    <h2 className="text-xl font-bold text-[#0F0D5D] mb-1">Star2.0</h2>
                    <p className="text-gray-600">KS | ODD | 15:30 - 16:50</p>
                    <a href="/details" className="mt-4 inline-block text-blue-500 hover:text-blue-600 transition duration-300">
                        Check <span className="ml-1">❯</span>
                    </a>
                </div>

                {/* Slide 2 */}
                <div className="bg-white rounded-lg shadow-md p-4 w-60 flex flex-col items-center">
                    <div className="bg-[#00a9f1] w-full h-32 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://lab.marsit.uz/media/group_category_images/17/starter-icon.png"
                            alt="Course Icon"
                            className="w-20 h-20"
                        />
                    </div>
                    <button className="bg-blue-500 text-white rounded px-3 py-1 mb-2">Current</button>
                    <h2 className="text-xl font-bold text-[#0F0D5D] mb-1">Star2.0</h2>
                    <p className="text-gray-600">KS | ODD | 15:30 - 16:50</p>
                    <a href="/details" className="mt-4 inline-block text-blue-500 hover:text-blue-600 transition duration-300">
                        Check <span className="ml-1">❯</span>
                    </a>
                </div>

                {/* Slide 3 */}
                <div className="bg-white rounded-lg shadow-md p-4 w-60 flex flex-col items-center">
                    <div className="bg-[#00a9f1] w-full h-32 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://lab.marsit.uz/media/group_category_images/17/starter-icon.png"
                            alt="Course Icon"
                            className="w-20 h-20"
                        />
                    </div>
                    <button className="bg-blue-500 text-white rounded px-3 py-1 mb-2">Current</button>
                    <h2 className="text-xl font-bold text-[#0F0D5D] mb-1">Star2.0</h2>
                    <p className="text-gray-600">KS | ODD | 15:30 - 16:50</p>
                    <a href="/details" className="mt-4 inline-block text-blue-500 hover:text-blue-600 transition duration-300">
                        Check <span className="ml-1">❯</span>
                    </a>
                </div>

                {/* Slide 4 */}
                <div className="bg-white rounded-lg shadow-md p-4 w-60 flex flex-col items-center">
                    <div className="bg-[#00a9f1] w-full h-32 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://lab.marsit.uz/media/group_category_images/17/starter-icon.png"
                            alt="Course Icon"
                            className="w-20 h-20"
                        />
                    </div>
                    <button className="bg-blue-500 text-white rounded px-3 py-1 mb-2">Current</button>
                    <h2 className="text-xl font-bold text-[#0F0D5D] mb-1">Star2.0</h2>
                    <p className="text-gray-600">KS | ODD | 15:30 - 16:50</p>
                    <a href="/details" className="mt-4 inline-block text-blue-500 hover:text-blue-600 transition duration-300">
                        Check <span className="ml-1">❯</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Curs;
