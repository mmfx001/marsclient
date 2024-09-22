import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productslice';
import ProductDetail from './Product'; // Modal uchun komponentni import qilamiz
import './style.css'; // Qo'shimcha responsiv CSS-ni import qilamiz

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal uchun tanlangan mahsulotni saqlash

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen loading-container"> {/* Yuklanish class qo'shildi */}
        <div className="text-center loader-wrapper"> {/* Yuklanish */}
          <div className="loader border-8 border-t-8 border-gray-300 rounded-full w-16 h-16 animate-spin border-t-red-600"></div>
          <p className="mt-4 text-2xl text-gray-700 loading-text">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center text-red-600 error-message">{error}</div>; {/* Xato xabar class qo'shildi */}
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 product-list-container"> {/* Mahsulotlar sahifasi */}
      <h1 className="text-3xl font-bold text-blue-900 mb-6 heading">Mahsulotlar ro'yxati</h1>
      <div className="flex flex-wrap justify-between items-center gap-5 product-grid"> {/* Mahsulot grid */}
        {products.map((product) => (
          <div key={product.id} className="border w-[20%] border-gray-300 text-center items-center rounded-lg flex flex-col gap-2 p-4 shadow-md bg-white product-card">
            <img src={product.imgUrl} alt={product.name} className="w-[70%] h-auto mb-4 product-image" />
            <h3 className="text-lg font-bold product-title">{product.name}</h3>
            <p className="text-gray-700 font-semibold product-price">{product.coin}</p>
            <p className="text-sm text-gray-500 text-center product-stock">Qolgan soni: {product.have}</p>
            <button 
              onClick={() => setSelectedProduct(product)} 
              className="bg-red-600 w-full text-white py-2 rounded-3xl hover:bg-red-700 transition duration-200 buy-button">
              Sotib olish
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && ( 
        <ProductDetail 
          product={selectedProduct} 
          closeModal={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductsList;
