import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loggedInUserName = loggedInUser?.name || loggedInUser?.ism;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/students?name=${loggedInUserName}`);
        const studentData = response.data;

        if (studentData.length > 0) {
          setImages(studentData[0].image ? [studentData[0].image] : []); // Assuming image is a single URL
        }
      } catch (error) {
        console.error('Error fetching images:', error.response ? error.response.data : error.message);
      }
    };

    fetchImages();
  }, [loggedInUserName]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Uploaded Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="border rounded shadow-md overflow-hidden">
              <img src={image} alt={`Uploaded ${index}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-gray-700">Uploaded Image {index + 1}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
