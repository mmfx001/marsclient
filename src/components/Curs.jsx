import React from 'react';

const Curs = () => {
    return (
        <div className="container mx-auto py-6">
            {/* Profile Section */}
            <h2 className="text-4xl mb-8 mt-5 text-center text-[#100D5D] flex justify-center items-center gap-4 font-extrabold font-poppins">
                <img className='w-12' src="https://images.vexels.com/content/158669/preview/notebook-illustration-laptop-f57f36.png" alt="" />
                <p className='font-extrabold'>Kurslar</p>
            </h2>

            {/* Scrollable Slides */}
            <div className="flex flex-col space-y-4  max-h-[400px] md:max-h-[500px]">
                {/* Slide 1 */}
                <div className="bg-white rounded-lg shadow-lg p-4 w-full flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105">
                    <div className="bg-[#00a9f1] w-full h-32 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://lab.marsit.uz/media/group_category_images/17/starter-icon.png"
                            alt="Course Icon"
                            className="w-20 h-20"
                        />
                    </div>
                    <button className="bg-blue-500 text-white rounded px-4 py-2 mb-2">Current</button>
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
