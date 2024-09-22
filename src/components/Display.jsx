import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentModal from './CommentModal';

const HeartIcon = ({ isLiked, onClick, likeCount }) => (
    <div className="flex items-center space-x-2">
        <svg
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={`w-8 h-8 fill-current transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {likeCount > 0 && (
            <span className="text-lg font-semibold text-gray-600">{likeCount}</span>
        )}
    </div>
);

const Display = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [likedStates, setLikedStates] = useState({});

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/posts');
                setData(response.data);

                const initialLikedStates = {};
                response.data.forEach(item => {
                    initialLikedStates[item.id] = false;
                });
                setLikedStates(initialLikedStates);
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/students');
                setUsers(response.data || []);

                if (loggedInUser) {
                    const user = response.data.find((u) => u.email === loggedInUser.email);
                    if (user) {
                        const userLikedItems = user.likeItems || [];
                        const updatedLikedStates = { ...likedStates };
                        data.forEach(item => {
                            updatedLikedStates[item.id] = userLikedItems.includes(item.id);
                        });
                        setLikedStates(updatedLikedStates);
                    }
                }
            } catch (error) {
                console.error('Foydalanuvchilarni olishda xatolik yuz berdi:', error);
            }
        };

        fetchUsers();
    }, [loggedInUser, data]);

    const handleLikeToggle = async (item) => {
        if (!loggedInUser) {
            alert('Mahsulotlarni yoqtirish uchun tizimga kiring.');
            return;
        }

        const user = users.find((user) => user.email === loggedInUser.email);
        if (!user) {
            console.error('Foydalanuvchi topilmadi.');
            return;
        }

        const isProductLiked = likedStates[item.id];
        const updatedLikedItems = isProductLiked
            ? user.likeItems.filter((i) => i !== item.id)
            : [...(user.likeItems || []), item.id];

        const updatedUser = {
            ...user,
            likeItems: updatedLikedItems,
        };

        const updatedItem = {
            ...item,
            likeCount: isProductLiked ? item.likeCount - 1 : item.likeCount + 1,
        };

        try {
            await axios.put(`http://localhost:5001/students/${user.id}`, updatedUser);
            await axios.put(`http://localhost:5001/posts/${item.id}`, updatedItem);            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.email === loggedInUser.email ? updatedUser : u
                )
            );

            setData((prevData) =>
                prevData.map((p) => (p.id === item.id ? updatedItem : p))
            );

            setLikedStates((prevStates) => ({
                ...prevStates,
                [item.id]: !isProductLiked,
            }));
        } catch (error) {
            console.error('Yoqtirilgan narsalarni yangilashda xatolik:', error);
        }
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
        fetchComments(product.id);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const fetchComments = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5001/comments?productId=${productId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Izohlarni olishda xatolik:', error);
        }
    };

    return (
        <div className=' max-w-md'>
            <h2 className="text-4xl flex justify-center items-center  gap-4 font-extrabold mb-[-10px] text-center font-poppins">
                <img className='w-12 mt-8' src="https://cdn-icons-png.flaticon.com/512/9672/9672588.png" alt="" />
                <p className='text-4xl mt-8 font-extrabold text-[#100D5D]'>Postlar</p>
            </h2>
            <div className="max-w-2xl mx-auto p-5 mt-10 overflow-auto" style={{ maxHeight: '90vh' }}>
                <div className="flex flex-col space-y-6">
                    {data.length === 0 ? (
                        <p className="text-center text-lg font-poppins">
                            Hozircha hech qanday mahsulot yo'q.
                        </p>
                    ) : (
                        data.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-gray-600 mb-5">{item.timestamp}</p>
                                <img src={item.image} alt={item.title} className="w-full object-cover rounded-md mb-2" />
                                <p className="text-md mb-2">{item.comment}</p>

                                <div className='flex justify-between items-center'>
                                    <HeartIcon
                                        isLiked={likedStates[item.id]}
                                        onClick={() => handleLikeToggle(item)}
                                        likeCount={item.likeCount}
                                    />
                                    <button
                                        onClick={() => handleCardClick(item)}
                                        className="mt-2 p-2 w-28 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                    >
                                        Izohlar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <CommentModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                productId={selectedProduct ? selectedProduct.id : null}
                comments={comments}
                userEmail={loggedInUser?.name}
                onCommentSubmit={(newComment) => setComments((prevComments) => [newComment, ...prevComments])}
            />
        </div>
    );
};

export default Display;