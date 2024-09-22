import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Task from './Task';

const Learning = () => {
    const [userData, setUserData] = useState(null); // Состояние для хранения данных
    const [selectedTask, setSelectedTask] = useState(null); // Состояние для выбранного задания
    const userdata = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(`http://localhost:5001/students/${userdata.id}`);
                setUserData(usersResponse.data); // Сохранение данных
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userdata) {
            fetchData(); // Загрузка данных
        }
    }, [userdata]);

    const handleTaskClick = (task) => {
        setSelectedTask(task); // Установка выбранного задания
    };

    return (
        <div className='px-[120px]'>
            <div className='flex gap-[300px]'>
                <strong className='flex gap-[300px]'>
                    <h1 className='text-[30px] text-[#0E0D5D]'>Modul</h1>
                    <p className='text-[33px] text-[#0E0D5D]'>Задача</p>
                </strong>


            </div>


            {userData ? (
                <div className='flex'>
                    <div className='bg-[white] rounded-[10px] py-[10px] w-[380px] flex flex-col items-center'>
                        {userData.tasks.map((task) => (
                            <div key={task.id}>
                                <Link to="#" onClick={() => handleTaskClick(task)}>
                                    <button className='w-[360px] h-[48px] bg-white rounded-[10px]  focus:bg-[#EF400F] focus:text-[white]'>{task.id}. {task.Topic}</button>
                                    <hr />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div></div>

                    <div style={{ marginLeft: '20px' }}>
                        {selectedTask ? (
                            <Task task={selectedTask} />
                        ) : (
                            <p>Выберите задание для отображения информации.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading tasks...</p>
            )}
        </div>
    );
};

export default Learning;
