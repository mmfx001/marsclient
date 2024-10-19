import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCoin } from '../features/UsersSlice';

const ProductDetail = ({ product, closeModal }) => {
    const [isPurchased, setIsPurchased] = useState(false);
    const [purchaseError, setPurchaseError] = useState(null);
    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const dispatch = useDispatch();

    const sendPurchaseInfoToBot = async (productName, productCoin, productImageUrl, purchaseCode) => {
        const botToken = '7752343613:AAFbQY83ryNfDlLRFWZB1391HATSrJlD2Vk'; // O'zingizning bot tokeningiz
        const chatId = '6288051090'; // O'zingizning chat ID'ingiz

        const message = `📦 *Mahsulot*: ${productName}\n💰 *Coin*: ${productCoin}\n📅 *Xarid kodi*: ${purchaseCode}`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', productImageUrl);
        formData.append('caption', message);
        formData.append('parse_mode', 'Markdown');

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Telegram ga yuborishda xatolik:', response.statusText);
            }
        } catch (error) {
            console.error('Telegramga yuborishda xatolik:', error);
        }
    };

    const handlePurchase = async () => {
        const productCoin = parseInt(product.coin, 10);
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            const response = await fetch(`https://shoopjson-2.onrender.com/api/students`);
            if (!response.ok) {
                setPurchaseError('Foydalanuvchi ma\'lumotlari olishda xato!');
                return;
            }

            const studentsData = await response.json();
            const userData = studentsData.find(student => student.name === loggedInUser.name);

            if (userData) {
                const userCoin = parseInt(userData.balance, 10);

                if (userCoin >= productCoin) {
                    setPurchaseError(null);

                    const purchaseDate = new Date().toLocaleDateString();
                    const purchaseCode = Math.random().toString(36).substring(2, 10).toUpperCase();

                    const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
                    purchasedProducts.push({
                        id: product.id,
                        coin: product.coin,
                        purchaseDate: purchaseDate,
                        purchaseCode: purchaseCode,
                    });
                    localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts));

                    // Foydalanuvchi ma'lumotlarini yangilash
                    const newCoinAmount = userCoin - productCoin;

                    const updatedUserData = { ...userData, balance: newCoinAmount };

                    await fetch(`https://shoopjson-2.onrender.com/api/students/${userData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUserData),
                    });

                    loggedInUser.coin = newCoinAmount;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    dispatch(updateCoin(newCoinAmount));

                    setPurchaseDetails({ name: product.name, code: purchaseCode });
                    setIsPurchased(true);


                    // Telegram botga yuborish
                    sendPurchaseInfoToBot(product.name, product.coin, product.imgUrl, purchaseCode);
                } else {
                    setPurchaseError('Sizda yetarli coin mavjud emas!');
                }
            } else {
                setPurchaseError('Foydalanuvchi topilmadi!');
            }
        }
    };

    const closePurchaseModal = () => {
        setIsPurchased(false);
        setPurchaseDetails(null);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-[90%] md:w-[30%] shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
                <img src={product.imgUrl} alt={product.name} className="w-24 h-auto mx-auto mb-4" />
                <p className="text-lg mb-2 text-center">Narxi: {product.coin}</p>
                <p className="text-sm text-gray-500 mb-4 text-center">Qolgan soni: {product.have}</p>

                {purchaseError && (
                    <p className="text-red-600 font-bold text-center">{purchaseError}</p>
                )}

                {!isPurchased ? (
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={handlePurchase}
                            className="bg-red-600 text-white py-2 px-4 w-full rounded-lg hover:bg-red-700 transition duration-200">
                            Sotib olish
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-600 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-700 transition duration-200">
                            Orqaga
                        </button>
                    </div>
                ) : (
                    <div className="text-green-600 font-bold text-center">Siz bu mahsulotni sotib oldingiz!</div>
                )}

                {isPurchased && purchaseDetails && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-bold">Mahsulot: {purchaseDetails.name}</p>
                        <p className="text-lg font-bold">Xarid kodi: {purchaseDetails.code}</p>
                        <button
                            onClick={closePurchaseModal}
                            className="mt-4 bg-blue-600 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-700 transition duration-200">
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
