import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Task from './Task';

const Learning = () => {
    const [userData, setUserData] = useState(null); // Ma'lumotlarni saqlash uchun holat
    const [selectedTask, setSelectedTask] = useState(null); // Tanlangan vazifa uchun holat
    const userdata = JSON.parse(localStorage.getItem('loggedInUser')); // Tizimga kirgan foydalanuvchi ma'lumotlarini olish

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(`http://localhost:5001/students/${userdata.id}`);
                setUserData(usersResponse.data); // Ma'lumotlarni saqlash
            } catch (error) {
                console.error('Ma\'lumotlarni olishda xatolik:', error);
            }
        };

        if (userdata) {
            fetchData(); // Ma'lumotlarni yuklash
        }
    }, [userdata]);

    const handleTaskClick = (task) => {
        setSelectedTask(task); // Tanlangan vazifani o'rnatish
    };

    return (
        <div className='px-[120px]'>
            <div className='flex gap-[300px]'>
                <strong className='flex gap-[300px]'>
                    <h1 className='text-[30px] text-[#0E0D5D]'>Modul</h1>
                    <p className='text-[33px] text-[#0E0D5D]'>Vazifa</p>
                </strong>
            </div>

            {userData ? (
                <div className='flex'>
                    <div className='bg-white rounded-[10px] py-[10px] w-[380px] flex flex-col items-center shadow-lg'>
                        {userData.tasks.map((task) => (
                            <div key={task.id}>
                                <Link to="#" onClick={() => handleTaskClick(task)}>
                                    <button className='w-[360px] h-[48px] bg-white rounded-[10px] focus:bg-[#EF400F] focus:text-white border border-gray-300 hover:bg-gray-100'>
                                        {task.id}. {task.Topic}
                                    </button>
                                    <hr />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginLeft: '20px', flex: 1 }}>
                        {selectedTask ? (
                            <Task task={selectedTask} />
                        ) : (
                            <p>Vazifani ko'rsatish uchun tanlang.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Vazifalar yuklanmoqda...</p>
            )}
        </div>
    );
};

export default Learning;
