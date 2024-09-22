import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCoin } from './usersslice';

const ProductDetail = ({ product, closeModal }) => {
    const [isPurchased, setIsPurchased] = useState(false);
    const [purchaseError, setPurchaseError] = useState(null);
    const [purchaseDetails, setPurchaseDetails] = useState(null); // Sotib olingan ma'lumotlar
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handlePurchase = () => {
        const productCoin = parseInt(product.coin, 10);
        const userCoin = parseInt(user.coin, 10);

        if (user && userCoin >= productCoin) {
            setPurchaseError(null);

            // Xarid sanasi va kodi
            const purchaseDate = new Date().toLocaleDateString();
            const purchaseCode = Math.random().toString(36).substring(2, 10).toUpperCase();

            // Mahsulotni localStorage ga qo'shish
            const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
            purchasedProducts.push({
                id: product.id,
                coin: product.coin,
                purchaseDate: purchaseDate,
                purchaseCode: purchaseCode,
            });
            localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts));

            // User coin ni yangilash
            const newCoinAmount = userCoin - productCoin;
            dispatch(updateCoin(newCoinAmount));

            // Sotib olingan ma'lumotlarni saqlash va modalni ochish
            setPurchaseDetails({ name: product.name, code: purchaseCode });
            setIsPurchased(true);
        } else {
            setPurchaseError('Sizda yetarli coin mavjud emas!');
        }
    };

    const closePurchaseModal = () => {
        setIsPurchased(false);
        setPurchaseDetails(null);
        closeModal(); // Asosiy modalni yopish
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-[90%] md:w-[30%] shadow-lg product-detail-container"> {/* Responsiv class qo'shildi */}
                <h2 className="text-xl font-bold mb-2 text-center product-title">{product.name}</h2>
                <img src={product.imgUrl} alt={product.name} className="w-24 h-auto mx-auto mb-4 product-image" />
                <p className="text-lg mb-2 text-center product-price">Narxi: {product.coin}</p>
                <p className="text-sm text-gray-500 mb-4 text-center product-quantity">Qolgan soni: {product.have}</p>

                {purchaseError && (
                    <p className="text-red-600 font-bold text-center purchase-error">{purchaseError}</p>
                )}

                {!isPurchased ? (
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={handlePurchase}
                            className="bg-red-600 text-white py-2 px-4 w-full rounded-lg hover:bg-red-700 transition duration-200 purchase-button">
                            Sotib olish
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-600 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-700 transition duration-200 close-button">
                            Orqaga
                        </button>
                    </div>
                ) : (
                    <div className="text-green-600 font-bold text-center">Siz bu mahsulotni sotib oldingiz!</div>
                )}


{isPurchased && purchaseDetails && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-bold purchase-name">Mahsulot: {purchaseDetails.name}</p>
                        <p className="text-lg font-bold purchase-code">Xarid kodi: {purchaseDetails.code}</p>
                        <button
                            onClick={closePurchaseModal}
                            className="mt-4 bg-blue-600 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-700 transition duration-200 ok-button">
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
