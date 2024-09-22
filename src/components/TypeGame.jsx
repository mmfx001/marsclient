import React, { useState, useEffect, useRef } from 'react';

const wordList = {
    uz: ["reakt", "javascript", "kodlash", "klaviatura", "tezlik", "aniqlik", "maymun", "tur", "diqqat", "sinov"],
    ru: ["реакт", "javascript", "кодирование", "клавиатура", "скорость", "точность", "обезьяна", "тип", "фокус", "вызов"],
    en: ["react", "javascript", "coding", "keyboard", "speed", "accuracy", "monkey", "type", "focus", "challenge"]
};

const textContent = {
    uz: {
        title: "Yozish O'yini",
        start: "O'yinni boshlash",
        stop: "O'yinni to'xtatish",
        timeLeft: "Qolgan vaqt",
        result: "O'yin tugadi!",
        wordsTyped: "Yozilgan so'zlar soni",
        correctWords: "To'g'ri yozilgan so'zlar",
        incorrectWords: "Noto'g'ri yozilgan so'zlar"
    },
    ru: {
        title: "Игра на печатание",
        start: "Начать игру",
        stop: "Остановить игру",
        timeLeft: "Оставшееся время",
        result: "Игра окончена!",
        wordsTyped: "Количество написанных слов",
        correctWords: "Правильно написанные слова",
        incorrectWords: "Неправильно написанные слова"
    },
    en: {
        title: "Typing Game",
        start: "Start Game",
        stop: "Stop Game",
        timeLeft: "Time Left",
        result: "Game Over!",
        wordsTyped: "Words Typed",
        correctWords: "Correct Words",
        incorrectWords: "Incorrect Words"
    }
};

const generateWords = (numWords, language) => {
    return Array.from({ length: numWords }, () => wordList[language][Math.floor(Math.random() * wordList[language].length)]);
};

const TypeGame = () => {
    const [language, setLanguage] = useState('uz');
    const [words, setWords] = useState(generateWords(50, language));
    const [currentInput, setCurrentInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isGameActive, setIsGameActive] = useState(false);
    const [correctWords, setCorrectWords] = useState(0);
    const [typedWords, setTypedWords] = useState(0);
    const [incorrectWordsList, setIncorrectWordsList] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setWords(generateWords(50, language));
    }, [language]);

    useEffect(() => {
        if (isGameActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsGameActive(false);
        }
    }, [timeLeft, isGameActive]);

    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            checkWord();
            setCurrentInput("");
            setTypedWords((prev) => prev + 1);
        }
    };

    const checkWord = () => {
        const wordToCompare = words[currentWordIndex];
        if (currentInput.trim() === wordToCompare) {
            setCorrectWords((prev) => prev + 1);
        } else {
            setIncorrectWordsList((prev) => [...prev, currentInput.trim()]);
        }
        setCurrentWordIndex((prev) => prev + 1);
    };

    const startGame = () => {
        setIsGameActive(true);
        setTimeLeft(selectedTime);
        setWords(generateWords(50, language));
        setCurrentWordIndex(0);
        setCorrectWords(0);
        setTypedWords(0);
        setCurrentInput("");
        setIncorrectWordsList([]);
        inputRef.current.focus();
    };

    const stopGame = () => {
        setIsGameActive(false);
        setTimeLeft(null);
        setCurrentInput("");
        setCurrentWordIndex(0);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        stopGame();
    };

    const handleTimeSelection = (time, unit) => {
        setSelectedTime(time);
        setSelectedUnit(unit);
    };

    return (
        <div className="monkeytype-game bg-cover bg-center min-h-screen flex justify-center items-center"
            style={{ backgroundImage: `url('https://games.marsit.uz/static/media/typing-bg.59f194ab7574a98dc33f.png')` }}>
            <div className="bg-white p-10 rounded-lg shadow-lg w-[60%]">
                <div className="flex justify-end gap-3 mb-5">
                    <button onClick={() => changeLanguage('uz')} className="bg-gray-300 text-gray-800 p-2 rounded font-bold">UZ</button>
                    <button onClick={() => changeLanguage('ru')} className="bg-gray-300 text-gray-800 p-2 rounded font-bold">RU</button>
                    <button onClick={() => changeLanguage('en')} className="bg-gray-300 text-gray-800 p-2 rounded font-bold">EN</button>
                </div>

                <h1 className="text-4xl font-bold mb-5 text-center text-black">{textContent[language].title}</h1>
                <p className="mb-5 text-center font-bold text-black">Tez va aniq yozing!</p>

                {!isGameActive && timeLeft === null && (
                    <div className="text-center">
                        <div className="flex gap-3 justify-center mb-5">
                            <button onClick={() => handleTimeSelection(15, 's')} className="bg-blue-600 text-white p-2 rounded">15 Seconds</button>
                            <button onClick={() => handleTimeSelection(30, 's')} className="bg-blue-600 text-white p-2 rounded">30 Seconds</button>
                            <button onClick={() => handleTimeSelection(60, 'm')} className="bg-red-600 text-white p-2 rounded">1 Minute</button>
                            <button onClick={() => handleTimeSelection(90, 'm')} className="bg-red-600 text-white p-2 rounded">1.5 Minutes</button>
                        </div>

                        <button
                            onClick={startGame}
                            className="bg-green-500 text-white p-2 rounded mb-5 w-full"
                            disabled={selectedTime === null}
                        >
                            {textContent[language].start}
                        </button>

                        {selectedTime && (
                            <p className="text-center mb-4">
                                Tanlangan vaqt: {selectedTime} {selectedUnit === 's' ? 'soniya' : 'daqiqa'}
                            </p>
                        )}
                    </div>
                )}

                {isGameActive && (
                    <div>
                        <p className="mb-4 text-center font-bold text-black">{textContent[language].timeLeft}: {timeLeft} soniya</p>
                        <div className="words-container flex flex-wrap gap-2 mb-4 justify-center">
                            {words.map((word, index) => (
                                <span key={index} className={`${index === currentWordIndex ? "text-blue-600 font-bold" : "text-black"}`}>
                                    {word}
                                </span>
                            ))}
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="border p-2 rounded w-full"
                            placeholder="So'zni yozing"
                        />
                        <button
                            onClick={stopGame}
                            className="bg-red-600 text-white p-2 rounded mt-4 w-full"
                        >
                            {textContent[language].stop}
                        </button>
                    </div>
                )}

                {!isGameActive && timeLeft === 0 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{textContent[language].result}</h2>
                        <p className="mb-2">{textContent[language].wordsTyped}: {typedWords}</p>
                        <p className="mb-5 text-green-500 font-bold">{textContent[language].correctWords}: {correctWords}</p>
                        <p className="mb-5 text-red-500 font-bold">{textContent[language].incorrectWords}: {incorrectWordsList.join(', ') || "Yo'q"}</p>
                        <button
                            onClick={startGame}
                            className="bg-blue-600 text-white p-2 rounded mt-4 w-full"
                        >
                            {textContent[language].start}
                        </button>
                        <button
                            onClick={() => {
                                setSelectedTime(null);
                                setSelectedUnit('');
                                startGame();
                            }}
                            className="bg-yellow-500 text-white p-2 rounded mt-4 w-full"
                        >
                            Qayta boshlash
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypeGame;
