
import React, { useState, useEffect } from 'react';
import Header from './Header';

const History = () => {
  const [history, setHistory] = useState([]);

  // Fetch purchase history from localStorage
  useEffect(() => {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    setHistory(purchaseHistory);
  }, []);

  return (
   <>
    <Header/>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0F0D5D] mb-6 flex items-center">
        ⏳ История покупок
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">Нет покупок.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <img className="w-full h-40 object-contain mb-4" src={item.image} alt={item.name} />
                <span className="absolute top-0 left-0 bg-green-100 text-green-600 px-3 py-1 text-xs font-semibold rounded-tr-lg">
                  {item.status === 'received' ? 'Товар получен' : 'Покупка отменена'}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-[#0F0D5D] mb-2">{item.name}</h2>
              <p className="text-red-500 font-bold text-xl mb-2">{item.price} Coins</p>
              <p className="text-gray-600">Код покупки: <span className="font-semibold">{item.purchaseCode}</span></p>
              <p className="text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
   </>
  );
};

export default History;
