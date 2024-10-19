import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = ({ task }) => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [adminComment, setAdminComment] = useState('');
  // Получение комментария от администратора при загрузке задачи

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`https://shoopjson-2.onrender.com/api/files/${task.id}`);
        if (response.data.comment) {
          setAdminComment(response.data.comment);
        }
      } catch (error) {
        console.error('Ошибка при получении комментария:', error);
      }
    };

    fetchComment();
  }, [task.id]);

  // Обработчик для выбора файла
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Функция для отправки файла на сервер
  const postFile = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Пожалуйста, выберите файл перед отправкой.');
      return;
    }

    const fileBase64 = await convertFileToBase64(file);

    const fileData = {
      filename: file.name,
      fileData: fileBase64,
      username: user.ism,
      userId: user.id,
      timestamp: new Date().toISOString(),
      status: 'Подтверждается',
    };

    try {
      const response = await axios.post('https://shoopjson-2.onrender.com/api/files', fileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Файл успешно отправлен:', response.data);
      setUploadedFile(response.data);
    } catch (error) {
      console.error('Ошибка при отправке файла:', error);
    }
  };

  // Конвертация файла в base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div className='flex gap-[20px] w-full'>
        <div className='w-[430px] bg-white p-[15px] rounded-[10px]'>
          <b>
            <p className='bg-[#E0F6FF] w-[87px] text-center text-[#00A9F1] rounded-[7px] text-[11px]'>О задаче</p>
          </b>
          <b><h2 className='text-[#0E0D5D] text-[20px]'>{task.Topic}</h2></b>
          <p className='text-[#9E9E9E]'>{task.description}</p>
          {
            uploadedFile && (
              <div><strong><p className='text-[25px] text-[green]'>Jonatilindi</p></strong></div>
              
            )
          }
        </div>

        <div className='bg-white w-[430px] rounded-[10px] p-[15px]'>
          <b>
            <p className='bg-[#E0F6FF] w-[77px] text-center text-[#00A9F1] rounded-[7px] text-[11px]'>Требования</p>
          </b>
          <p className='text-[#0E0D5D] text-[17px]'><strong>Требования к заданию:</strong></p>
          <p className='text-[#9E9E9E]'>{task.requirement}</p>
        </div>
      </div>

      <div className='mt-[20px] flex gap-5'>
        <div className='bg-white w-[430px] p-[20px] rounded-[10px] flex flex-col gap-3'>
          <b>
            <p className='bg-[#E0F6FF] w-[73px] text-[12px] text-center text-[#00A9F1] rounded-[7px]'>Материалы</p>
          </b>
          <b><p className='w-[225px] text-[#0E0D5D] text-[17px]'>Материалы, необходимые для выполнения задачи</p></b>
          <img
            className='rounded-[10px]'
            style={{ boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' }}
            src={task.materials}
            alt="материалы"
          />
          <a href={task.materials} target="_blank" rel="noopener noreferrer">
            <button className='w-[100px] h-[50px] bg-[#00A9F1] rounded-[10px] text-white'>Открыть</button>
          </a>
        </div>        <div className='p-5 bg-white w-[430px] rounded-[10px] flex flex-col gap-3'>
          <b>
            <p className='bg-[#E0F6FF] w-[73px] text-[12px] text-center text-[#00A9F1] rounded-[7px]'>Материалы</p>
          </b>
          <b><p className='w-[204px] text-[#9E9E9E] text-[17px]'>Нет необходимых материалов для задачи</p></b>
        </div>
      </div>

      <form onSubmit={postFile}>
        <div className='w-[880px] bg-white h-[160px] rounded-[10px] mt-5 p-4 flex flex-col items-end gap-3'>
          <input
            className='w-full h-[90px] bg-[#F6FAFD] rounded-[10px] flex items-center px-[30%] py-[3%]'
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit" className='bg-[#EF400F] text-[white] p-2 rounded-[5px]'>Отправить</button>
        </div>
      </form>

      {/* Отображение загруженного файла */}



    </div>
  );
};

export default Task;