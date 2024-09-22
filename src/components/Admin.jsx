import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../features/AdminSlice';
import { fetchProducts } from '../features/ProductSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [name, setName] = useState('');
  const [coin, setCoin] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [have, setHave] = useState(''); // Have maydonini qo'shish
  const [editId, setEditId] = useState(null); // Tahrir qilish uchun ID

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editId || Date.now(), // Tahrirlangan mahsulotni yangilash
      name,
      coin,
      imgUrl,
      have, // Have maydonini qo'shish
    };

    if (editId) {
      // Tahrir qilish
      dispatch(removeProduct(editId));
    }
    dispatch(addProduct(newProduct));
    // Formni tozalash
    setName('');
    setCoin('');
    setImgUrl('');
    setHave(''); // Have maydonini tozalash
    setEditId(null); // Tahrir qilishdan keyin ID ni tozalash
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleEdit = (product) => {
    setEditId(product.id); // Tahrir qilish uchun ID ni saqlash
    setName(product.name);
    setCoin(product.coin);
    setImgUrl(product.imgUrl);
    setHave(product.have); // Have maydonini saqlash
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen admin-panel-container">
      <h1 className="text-3xl font-bold mb-6 admin-panel-title">Admin Panel</h1>
      <h2 className="text-2xl mb-4 form-title">{editId ? 'Mahsulotni Tahrirlash' : 'Mahsulot Qo\'shish'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 form-container">
        <input
          type="text"
          placeholder="Mahsulot Nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded form-input"
          required
        />
        <input
          type="text"
          placeholder="Sotib Olingan Coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="p-2 border border-gray-300 rounded form-input"
          required
        />
        <input
          type="text"
          placeholder="Rasm URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded form-input"
          required
        />
        <input
          type="text"
          placeholder="Qolgan Soni"
          value={have}
          onChange={(e) => setHave(e.target.value)} // Have maydonini yangilash
          className="p-2 border border-gray-300 rounded form-input"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 submit-button">
          {editId ? 'Mahsulotni Yangilash' : 'Mahsulot Qo\'shish'}
        </button>
      </form>


      <h2 className="text-2xl mb-4 product-list-title">Mahsulotlar Ro'yxati</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center border p-2 mb-2 bg-white rounded shadow-md product-item">
            <div>
              <h3 className="text-lg font-bold product-name">{product.name}</h3>
              <p className="text-gray-600 product-coin">Coin: {product.coin}</p>
              <p className="text-gray-600 product-have">Qolgan Soni: {product.have}</p> {/* Qolgan sonini ko'rsatish */}
            </div>
            <div className="flex gap-2 action-buttons">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-200 edit-button">
                Tahrirlash
              </button>
              <button onClick={() => handleRemove(product.id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200 delete-button">
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
