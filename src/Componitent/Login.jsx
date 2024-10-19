import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedPassword = password.trim();

        if (!trimmedName || !trimmedPassword) {
            setMessage('Iltimos, ism va parolni to\'ldiring');
            return;
        }

        try {
            const usersResponse = await axios.get('https://shoopjson-2.onrender.com/api/students');
            const users = usersResponse.data;

            const user = users.find(v => v.name === trimmedName && v.password === trimmedPassword);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                onLoginSuccess(user);
                navigate('/');
                return;
            }

            setMessage('Foydalanuvchi topilmadi');
        } catch (error) {
            console.error('Xato:', error);
            setMessage('Tarmoq xatosi');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-cover" style={{ backgroundImage: 'url("/path/to/background-image.jpg")' }}>
            <div className="w-full max-w-md bg-white bg-opacity-90 rounded-3xl shadow-lg p-8 space-y-6">
                <div className="text-center mb-4">
                    <img src="./src/assets/marsicon.png" alt="Mars logo" className="mx-auto w-32" />
                    <h1 className="text-3xl font-bold text-gray-800 mt-4">Добро пожаловать в Space</h1>
                </div>

                <div className="flex justify-center space-x-2 mb-4">
                    <button className="w-full py-2 text-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">
                        Я студент
                    </button>
                    <button className="w-full py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300">
                        Я родитель
                    </button>
                </div>



                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Ismingizni kiriting"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Passwordni kiriting"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            // Parolni ko'rish uchun qo'shimcha funksiya qo'shishingiz mumkin
                        >
                        </button>
                    </div>
                    {message && (
                        <p className={`text-center ${message.includes('topilmadi') ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                    >
                        Войти
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Нет аккаунта? <a href="#" className="text-blue-600 hover:underline">Регистрация</a>
                </div>
            </div>
        </div>
    );
};

export default Login;