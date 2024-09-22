import React from 'react';
import ProductsList from '../components/ProductList';
import '../components/style.css'

const ShopPage = () => {
    return (
        <div className="p-4 bg-gray-100 items-center">
            <div className='flex justify-between shop'>
                <h1 className="text-3xl font-bold mb-7 text-blue-900">Products</h1>
                <a href="/purchased" className="text-xl font-bold mb-7 text-orange-500">Sotib Olingan Mahsulotlarim</a>
            </div>
            <div>
                <ProductsList />
            </div>
        </div>
    );
};

export default ShopPage;
