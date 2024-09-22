import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoggedInStudentInfo = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  // Get the logged-in user's name from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loggedInUserName = loggedInUser?.name; // Access the name property from the user object

  useEffect(() => {
    if (loggedInUserName) {
      // Fetch data from the API
      axios.get('http://localhost:5001/allGroups')
        .then(response => {
          console.log(response.data); // Log the API response to check the data structure
          const branches = response.data.branches;

          // Find the branch that contains the logged-in user's name
          for (let branch of branches) {
            const matchedStudent = branch.students.find(student => student.name === loggedInUserName);
            if (matchedStudent) {
              // Set the student data if found
              setStudentData({
                branchName: branch.name,
                teacher: branch.teacher,
                time: branch.time,
                ...matchedStudent // Spread the matched student's details
              });
              break; // Stop searching once found
            }
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data'); // Set error if the API request fails
        })
        .finally(() => {
          setLoading(false); // Set loading to false after data is fetched
        });
    } else {
      setLoading(false); // Set loading to false if no user is found in localStorage
    }
  }, [loggedInUserName]);

  if (loading) {
    return <p>Loading...</p>; // Display while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Display error message if the API request fails
  }

  if (!studentData) {
    return <p>No student data found for {loggedInUserName}</p>; // Display if no match is found
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px', margin: '0 auto', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Student Information</h2>
      <p><strong>Name:</strong> {studentData.name}</p>
      <p><strong>Coins:</strong> {studentData.coins}</p>
      <p><strong>Group Name:</strong> {studentData.branchName}</p>
      <p><strong>Teacher:</strong> {studentData.teacher}</p>
      <p><strong>Time:</strong> {studentData.time}</p>
    </div>
  );
};

export default LoggedInStudentInfo;
