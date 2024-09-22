import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "HTML nima?",
        options: ["Dasturlash tili", "Markup tili", "Stil tili"],
        answer: "Markup tili"
    },
    {
        question: "CSS nimani boshqaradi?",
        options: ["HTML strukturasini", "Veb sahifaning ko'rinishini", "Dasturlash mantig'ini"],
        answer: "Veb sahifaning ko'rinishini"
    },
    {
        question: "JavaScript nima uchun ishlatiladi?",
        options: ["Foydalanuvchi interfeysini yaratish", "Web sahifalarga dinamik xususiyatlar qo'shish", "Serverda ma'lumotlar saqlash"],
        answer: "Web sahifalarga dinamik xususiyatlar qo'shish"
    },
    {
        question: "HTML elementi qanday boshlanadi?",
        options: ["<element>", "[element]", "{element}"],
        answer: "<element>"
    },
    {
        question: "CSS-da sinflar qanday belgilanadi?",
        options: [".sinif", "#sinif", "sinif"],
        answer: ".sinif"
    },
    {
        question: "JavaScript qanday dasturlash paradigmasiga kiradi?",
        options: ["OOP", "Funktsional", "Procedural"],
        answer: "OOP"
    },
    {
        question: "HTML5 da qaysi yangi element kiritilgan?",
        options: ["<header>", "<footer>", "<section>", "<all>"],
        answer: "<header>"
    },
    {
        question: "CSS da transform xususiyati qanday ishlatiladi?",
        options: ["O'lchamni o'zgartirish", "Harakatlantirish", "Transformatsiya qilish"],
        answer: "Transformatsiya qilish"
    },
    {
        question: "JavaScript-da ob'ektni qanday yaratish mumkin?",
        options: ["let obj = {}; ", "let obj = []; ", "let obj = () => {}"],
        answer: "let obj = {}; "
    },
    {
        question: "CSS-da margin va padding o'rtasidagi farq nima?",
        options: ["Margin - elementning tashqi bo'shligi, padding - ichki bo'shligi", "Ikki bir xil xususiyat", "Padding - tashqi bo'shliq, margin - ichki bo'shliq"],
        answer: "Margin - elementning tashqi bo'shligi, padding - ichki bo'shligi"
    },
    {
        question: "HTML-da qanday qilib sharh (comment) qo'shish mumkin?",
        options: ["<!-- Bu sharh -->", "// Bu sharh", "/* Bu sharh */"],
        answer: "<!-- Bu sharh -->"
    },
    {
        question: "CSS-da hover effektini qanday qo'shish mumkin?",
        options: ["element:hover {}", "element:hover { effect: ...; }", "element:active {}"],
        answer: "element:hover {}"
    },
    {
        question: "JavaScript-da funksiyani qanday e'lon qilish mumkin?",
        options: ["function myFunction() {}", "function:myFunction() {}", "myFunction() = function() {}"],
        answer: "function myFunction() {}"
    },
    {
        question: "HTML5 da video elementini qanday qo'shish mumkin?",
        options: ["<video src='video.mp4'>", "<movie src='video.mp4'>", "<media src='video.mp4'>"],
        answer: "<video src='video.mp4'>"
    }
];

export const QuetionGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(8); // 8 sekund

    useEffect(() => {
        if (timeLeft > 0 && !isGameOver) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft, isGameOver]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(8); // Vaqtni tiklash
        } else {
            setIsGameOver(true);
        }
    };

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        handleNextQuestion();
    };

    const resetGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);
        setTimeLeft(8); // Vaqtni tiklash
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen" style={{ backgroundImage: `url('https://games.marsit.uz/static/media/typing-bg.59f194ab7574a98dc33f.png')`, backgroundSize: 'cover' }}>
            <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg mt-[100px] mb-12">IT Savol-Javob O'yini</h1>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-[50%]">
                {isGameOver ? (
                    <div className="text-center">
                        <h2 className="text-2xl mb-4 font-semibold">O'yin tugadi!</h2>
                        <p className="text-lg mb-4">Sizning ballingiz: {score}/{questions.length}</p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                            onClick={resetGame}
                        >
                            Qayta boshlash
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl mb-4 font-semibold">{questions[currentQuestionIndex].question}</h2>
                        <p className="mb-4">Berilgan vaqt: {timeLeft}</p>
                        <div className="flex flex-col">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 transition"
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuetionGame;
