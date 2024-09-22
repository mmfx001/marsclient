import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const News = () => {
    // Dastlabki rasmni saqlash uchun state
    const [mainImage, setMainImage] = useState('https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_v3APJAz.png'); // Dastlabki katta rasm
    const [fade, setFade] = useState(false); // Fade animatsiya uchun state

    // Kichik rasmlar ro'yxati
    const smallImages = [
        {
            src: 'https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_v3APJAz.png', // Birinchi kichik rasm URL
            alt: 'Yangilik 1',
        },
        {
            src: 'https://lab.marsit.uz/media/news/Screenshot_2024-08-22_at_15.44.59_RqFVwVS.png', // Ikkinchi kichik rasm URL
            alt: 'Yangilik 2',
        },
    ];

    // Rasm almashganda animatsiya funksiyasi
    const handleImageChange = (newImage) => {
        setFade(true); // Animatsiyani boshlash
        setTimeout(() => {
            setMainImage(newImage); // Yangi rasmni o'rnatish
            setFade(false); // Animatsiyani qaytarish
        }, 300); // 300ms dan keyin rasm almashadi
    };

    return (
       <>
        <Header/>
        <div className='w-[100%] h-[100vh] flex justify-center items-center'>
            <div className="bg-white w-[75%]">
                {/* Title section */}
                <div className="bg-orange-500 p-4 rounded-t-lg">
                    <h2 className="text-white text-xl font-bold">Oxirgi yangiliklar</h2>
                </div>

                {/* Main content section */}
                <div className="flex p-4 gap-4 bg-gray-50 rounded-b-lg">
                    {/* Left side large image */}
                    <div className="w-2/3">
                        <img
                            src={mainImage} // Katta rasmni dinamik ko'rsatish
                            alt="Katta yangilik"
                            className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`} // Fade animatsiya
                        />
                    </div>

                    {/* Right side small images */}
                    <div className="w-1/3 flex flex-col gap-4">
                        {smallImages.map((image, index) => (
                            <div
                                key={index}
                                className={`bg-white border ${mainImage === image.src ? 'border-orange-500' : 'border-gray-200'} p-2 rounded-lg cursor-pointer`}
                                onClick={() => handleImageChange(image.src)} // Rasm bosilganda katta rasmni almashtirish
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full object-cover rounded-lg"
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