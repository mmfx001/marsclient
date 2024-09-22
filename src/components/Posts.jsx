import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // Make sure this is always a string
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loggedInUserName = loggedInUser?.name || loggedInUser?.ism;
  const [isModalOpen, setModalOpen] = useState(true);
  const [postMethod, setPostMethod] = useState('url'); // Default method: URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUserName) {
      console.error('User not logged in or name not available');
      return;
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const postData = {
      comment,
      name: loggedInUserName,
      likeCount: 0,
      timestamp,
      image: postMethod === 'file' ? await convertImageToBase64(image) : imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:5001/posts', postData);
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const resetForm = () => {
    setComment('');
    setImage(null);
    setImageUrl(''); // Ensure this is reset
    setModalOpen(false);
    navigate('/main');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(''); // Clear URL field
    setPostMethod('file'); // Change method to file
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImage(null); // Clear file field
    setPostMethod('url'); // Change method to URL
  };  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
          <h3 className="text-2xl font-bold text-orange-600">Create a Post</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            rows="4"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex space-x-2 mb-4">
            <button type="button" onClick={() => setPostMethod('url')} className={`flex-1 py-2 ${postMethod === 'url' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'}`}>
              URL orqali
            </button>
            <button type="button" onClick={() => setPostMethod('file')} className={`flex-1 py-2 ${postMethod === 'file' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'}`}>
              Fayl orqali
            </button>
          </div>
          {postMethod === 'file' ? (
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ marginBottom: '10px' }}
            />
          ) : (
            <input
              type="url"
              value={imageUrl} // Keep this controlled
              onChange={handleUrlChange}
              placeholder="Enter image URL"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200">
            Post
          </button>
          <button type="button" onClick={resetForm} className="w-full bg-gray-600 mt-3 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200">
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default Post;