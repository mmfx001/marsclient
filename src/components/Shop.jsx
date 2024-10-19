import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './style.css'; // CSS faylini import qiling

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [purchaseCode, setPurchaseCode] = useState('');

  useEffect(() => {
    fetch('https://shoopjson-2.onrender.com/api/shop')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Do\'kon ma\'lumotlarini olishda xato:', error));

    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      setLoggedInUser(userData);
    }
  }, []);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const sendPurchaseToBot = (purchaseDetails) => {
    const botToken = '7752343613:AAFbQY83ryNfDlLRFWZB1391HATSrJlD2Vk'; // Bot tokeningiz
    const chatId = '6288051090'; // Sizning chat IDingiz
  
    const message = `
  📸 Rasm: ${purchaseDetails.image}
  📦 Mahsulot: ${purchaseDetails.name}
  💰 Coin: ${purchaseDetails.price} coin
  📅 Xarid kodi: ${purchaseDetails.purchaseCode}
    `;
  
    // Rasm yuborish
    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        photo: purchaseDetails.image, // Rasm URL'si
        caption: message, // Xabar matni
        parse_mode: 'Markdown', // Markdown formatida yuborish
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Xato');
      })
      .catch((error) => console.error('Botga yuborishda xato:', error));
  };
  

  const handlePurchase = () => {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!userData || userData.balance < selectedProduct.price) {
      setPurchaseSuccess(false);
      return;
    }

    const generatedCode = Math.random().toString(36).substring(7);
    const purchase = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      purchaseCode: generatedCode,
      status: 'received',
      date: new Date().toLocaleString(),
    };

    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    purchaseHistory.push(purchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    const newBalance = userData.balance - selectedProduct.price;
    const updatedQuantity = selectedProduct.quantity - 1;

    fetch(`https://shoopjson-2.onrender.com/api/shop/${selectedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...selectedProduct, quantity: updatedQuantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Mahsulot miqdorini yangilashda xato');
        }
        return response.json();
      })
      .then(() => {
        const updatedProducts = products.map((product) =>
          product.id === selectedProduct.id ? { ...product, quantity: updatedQuantity } : product
        );
        setProducts(updatedProducts);


        fetch(`https://shoopjson-2.onrender.com/api/students/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userData, balance: newBalance }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Balansni yangilashda xato');
            }
            return response.json();
          })
          .then(() => {
            userData.balance = newBalance;
            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            setLoggedInUser(userData);
            setPurchaseSuccess(true);
            setPurchaseCode(generatedCode);

            // Xarid ma'lumotlarini botga yuboring
            sendPurchaseToBot({
              name: selectedProduct.name,
              price: selectedProduct.price,
              purchaseCode: generatedCode,
              image: selectedProduct.image, // Rasmni qo'shish
            });

          })
          .catch((error) => {
            console.error('Balansni yangilashda xato:', error);
            alert('Xaridni bajarishda xato. Iltimos, keyinroq qaytadan urinib ko\'ring.');
          });
      })
      .catch((error) => {
        console.error('Mahsulot miqdorini yangilashda xato:', error);
        alert('Xaridni bajarishda xato. Iltimos, keyinroq qaytadan urinib ko\'ring.');
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setPurchaseSuccess(null);
    setPurchaseCode('');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6 header-sec">
          <h1 className="text-3xl font-bold text-[#0F0D5D]">🛒 Магазин</h1>
          <div className="text-lg text-gray-600">
            Balance: {loggedInUser ? loggedInUser.balance : 0}
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
            <div key={product.id} className="product-card bg-white rounded-lg shadow-custom p-4">
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
                  <span>{product.quantity} qoldi</span>
                ) : (
                  <span className="text-red-500">Mavjud emas</span>
                )}
              </div>
              <button
                className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${product.quantity === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-white text-[#0F0D5D] border border-[#0F0D5D] hover:bg-[#0F0D5D] hover:text-white'
                  }`}
                onClick={() => handleBuyClick(product)}
                disabled={product.quantity === 0}
              >
                Sotib olish
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-contain mb-4" />
            <p className="text-gray-600 mb-4">Narxi: {selectedProduct.price} coin</p>
            <p className="text-gray-600 mb-4">Sizning balansi: {loggedInUser?.balance} coin</p>

            {purchaseSuccess === false && (
              <p className="text-red-500 font-semibold mb-4">Sizning coin yetmaydi!</p>
            )}

            {purchaseSuccess === true && (
              <>
                <p className="text-green-500 font-semibold mb-4">Siz tovarni muvaffaqiyatli sotib oldingiz!</p>
                <p className="text-gray-600 mb-4">Sizning kod: <span className="text-blue-500 font-semibold">{purchaseCode}</span></p>
              </>
            )}

            <div className="flex justify-between">
              {!purchaseSuccess && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handlePurchase}
                >
                  Sotib olish
                </button>
              )}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Orqaga
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
