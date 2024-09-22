import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productslice';
import './style.css'

const PurchasedProducts = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    // LocalStorage'dan sotib olingan mahsulotlar ma'lumotini olish
    const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Sotib Olingan Mahsulotlarim</h1>
            {status === 'loading' ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-center text-gray-700">Yuklanmoqda...</p>
                </div>
            ) : error ? (
                <p className="text-center text-red-600">Xato: {error}</p>
            ) : purchasedProducts.length === 0 ? (
                <p className="text-center text-gray-700">Hech qanday mahsulot sotib olinmagan.</p>
            ) : (
                <ul className="space-y-6">
                    {purchasedProducts.map((product, index) => {
                        // Redux store'dan topilgan mahsulot
                        const foundProduct = products.find(p => p.id === product.id);
                        return (
                            <li key={index} className="border w-[25%] flex-col gap-5 border-gray-300 rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex items-center">
                                <div className="flex-1">
                                    {/* Redux'dan topilgan mahsulot bo'yicha rasm va nom ko'rsatiladi */}
                                    {foundProduct ? (
                                        <img src={foundProduct.imgUrl} alt={foundProduct.name} className="w-[70%] h-auto mb-4" />
                                    ) : (
                                        <p>Mahsulot ma'lumoti topilmadi</p>
                                    )}
                                    {/* Mahsulot nomi */}
                                    <h3 className="text-xl font-semibold">
                                        {foundProduct ? foundProduct.name : product.name}
                                    </h3>
                                    <p className="text-gray-600">Sotib olingan coin: <span className="font-bold">{product.coin}</span></p>
                                    <p className="text-gray-600">ID: <span className="font-bold">{product.id}</span></p>
                                    {/* Sotib olingan sana */}
                                    <p className="text-gray-600">Sotib olingan sana: <span className="font-bold">{product.purchaseDate}</span></p>
                                    {/* Xarid kodi */}
                                    <p className="text-gray-600">Xarid kodi: <span className="font-bold">{product.purchaseCode}</span></p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PurchasedProducts;
