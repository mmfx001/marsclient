import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upladeimg = () => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loggedInUserName = loggedInUser?.name || loggedInUser?.ism;
  const [isModalOpen, setModalOpen] = useState(true);
  const [postMethod, setPostMethod] = useState('url');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!loggedInUserName) {
      setErrorMessage('User not logged in or name not available');
      return;
    }

    // Ensure that image or URL is provided
    if (!image && !imageUrl) {
      setErrorMessage('Please provide an image file or image URL');
      return;
    }

    const imageSource = postMethod === 'file' ? await convertImageToBase64(image) : imageUrl;

    try {
      // Fetch user data based on name
      const studentResponse = await axios.get(`http://localhost:5001/students?name=${loggedInUserName}`);
      const studentData = studentResponse.data;

      // Update or create student record
      if (studentData.length > 0) {
        await axios.put(`http://localhost:5001/students/${studentData[0].id}`, {
          ...studentData[0],
          image: imageSource, // Update image URL or file
        });
      } else {
        await axios.post('http://localhost:5001/students', {
          name: loggedInUserName,
          image: imageSource, // Add new image
        });
      }

      // Reset form on success
      resetForm();
    } catch (error) {
      setErrorMessage('Error posting data: ' + (error.response ? error.response.data : error.message));
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const resetForm = () => {
    setComment('');
    setImage(null);
    setImageUrl('');
    setErrorMessage('');
    setModalOpen(false);
    navigate('/main');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl('');
    setPostMethod('file');
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImage(null);
    setPostMethod('url');
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-11/12 max-w-lg space-y-6 transform transition-all duration-500">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-4">Create a Post</h3>

          {/* Display error message */}
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="flex justify-between mb-6">
            <button
              type="button"
              onClick={() => setPostMethod('url')}
              className={`flex-1 py-3 mr-2 text-lg font-medium rounded-lg focus:outline-none transition-all ${postMethod === 'url' ? 'bg-[#EE4010] text-white shadow-md' : 'bg-[#00A8F1] text-white'}`}
            >
              Via URL
            </button>
            <button
              type="button"
              onClick={() => setPostMethod('file')}
              className={`flex-1 py-3 ml-2 text-lg font-medium rounded-lg focus:outline-none transition-all ${postMethod === 'file' ? 'bg-[#EE4010] text-white shadow-md' : 'bg-[#00A8F1] text-white'}`}
            >
              Via File
            </button>
          </div>

          {postMethod === 'file' ? (
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          ) : (
            <input
              type="url"
              value={imageUrl}
              onChange={handleUrlChange}
              placeholder="Enter image URL"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          )}

          <button type="submit" onClick={handleSubmit} className="w-full bg-[#EE4010] text-white py-3 rounded-xl shadow-md hover:bg-orange-600 hover:shadow-lg focus:ring-2 focus:ring-orange-400 transition-all">
            Post
          </button>

          <button type="button" onClick={resetForm} className="w-full bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-all">
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default Upladeimg;
