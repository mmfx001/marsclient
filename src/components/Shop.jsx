import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch shop data from a local JSON file or API
  useEffect(() => {
    fetch('http://localhost:5001/shop') 
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching the shop data:', error));

    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      setLoggedInUser(userData);
    }
  }, []);

  // Function to handle purchase and save to localStorage
  const handleBuy = (product) => {
    if (!loggedInUser || loggedInUser.coins < product.price) {
      alert('Not enough coins to make this purchase.');
      return;
    }

    const purchase = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      purchaseCode: Math.random().toString(36).substring(7), // Generate random code
      status: 'received',
      date: new Date().toLocaleString() // Current date and time
    };

    // Get the existing purchase history from localStorage
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    
    // Add the new purchase to the history
    purchaseHistory.push(purchase);
    
    // Save the updated history back to localStorage
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    // Update user coins
    loggedInUser.coins -= product.price;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    alert(`${product.name} has been purchased!`);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0F0D5D]">🛒 Магазин</h1>
          <div className="text-lg text-gray-600">
            Coins: {loggedInUser ? loggedInUser.coins : 0}
          </div>
          <Link to="/shop/history" className="flex items-center text-red-500 hover:text-red-600 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 6H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-4 4v4"
              />
            </svg>
            История покупок
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <img className="w-full h-40 object-contain mb-4" src={product.image} alt={product.name} />
                {product.promotion && (
                  <span className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-tr-lg">
                    {product.promotion}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-[#0F0D5D] mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="text-yellow-500 font-semibold mb-4">
                <span>{product.price}</span> {product.currency}
              </div>
              <div className="text-gray-500 mb-4">
                {product.quantity > 0 ? (
                  <span>{product.quantity} осталось</span>
                ) : (
                  <span className="text-red-500">Нет в наличии</span>
                )}
              </div>
              <button
                className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
                  product.quantity === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-white text-[#0F0D5D] border border-[#0F0D5D] hover:bg-[#0F0D5D] hover:text-white'
                }`}
                onClick={() => handleBuy(product)}
                disabled={product.quantity === 0}
              >
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
