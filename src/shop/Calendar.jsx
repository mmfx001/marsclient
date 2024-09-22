import React from 'react';
import './style.css'

const Calendar = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthDays = [
    [26, 27, 28, 29, 30, 31, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
  ];
  const presentDays = [4, 6, 13, 20];

  return (
    <div className="calendar-container max-w-md mx-auto p-6 bg-white shadow-2xl rounded-xl">
      {/* Calendar Header */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Посещаемость</h2>
        <div className="flex space-x-4">
          <button className="text-gray-500 text-xl hover:text-gray-800 transition">←</button>
          <span className="text-xl font-semibold text-orange-500">September</span>
          <button className="text-gray-500 text-xl hover:text-gray-800 transition">→</button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {monthDays.flat().map((day, index) => (
          <div
            key={index}
            className={`calendar-day border-2 rounded-lg relative transition-transform transform hover:scale-105 ${
              day === 1 || day > 22
                ? 'text-gray-400 border-gray-200'
                : 'text-gray-800 border-gray-300'
            }`}
          >
            <span className="absolute top-2 right-2 text-lg font-bold">{day}</span>
            {presentDays.includes(day) && (
              <div className="absolute bottom-2 left-2 bg-green-100 text-green-600 text-sm font-semibold px-2 py-1 rounded-md">
                Присутствовал
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
