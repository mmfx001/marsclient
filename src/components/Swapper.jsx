import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Swipper = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === 2 ? 1 : prevSlide + 1));
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Link to="/news">
            <div className="carousel w-full rounded-3xl">
                <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
                    <img
                        src="https://lab.marsit.uz/media/news/Space_oktyabr_380x1050.png"
                        className="w-full rounded-3xl" alt='Rasm' />
                        
                </div>
                <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
                    <img
                        src="https://lab.marsit.uz/media/news/880x300.png"
                        className="w-full rounded-3xl" alt='rasm' />
                </div>
            </div>
        </Link>
    );
};

export default Swipper;