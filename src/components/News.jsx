import React, { useState } from 'react';

import { FaArrowLeftLong } from "react-icons/fa6";
import Header from './Header';

const News = () => {
    const [mainImage, setMainImage] = useState('https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_v3APJAz.png'); // Default large image
    const [fade, setFade] = useState(false); // State for fade animation

    // Array of small images
    const smallImages = [
        {
            src: 'https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_v3APJAz.png',
            alt: 'Yangilik 1',
        },
        {
            src: 'https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_RqFVwVS.png',
            alt: 'Yangilik 2',
        },
    ];

    // Function to change the image with fade animation
    const handleImageChange = (newImage) => {
        setFade(true);
        setTimeout(() => {
            setMainImage(newImage);
            setFade(false);
        }, 300);
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center w-full h-screen">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3">
                    {/* Title section */}
                    <div className="bg-orange-500 p-4 rounded-t-lg">
                        <h2 className="text-white text-2xl font-bold">Oxirgi Yangiliklar</h2>
                    </div>

                    {/* Main content section */}
                    <div className="flex flex-col md:flex-row p-4 gap-4 bg-gray-50 rounded-b-lg">
                        {/* Left side large image */}
                        <div className="md:w-2/3">
                            <img
                                src={mainImage}
                                alt="Katta yangilik"
                                className={`w-full h-auto object-cover rounded-lg transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>

                        {/* Right side small images */}
                        <div className="md:w-1/3 flex flex-col gap-4">
                            {smallImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`bg-white border ${mainImage === image.src ? 'border-orange-500' : 'border-gray-200'} p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
                                    onClick={() => handleImageChange(image.src)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default News;
