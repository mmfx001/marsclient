import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersEdit = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    league: '',
    coins: '',
    balance: '',
    attendance: '',
    xp: '',
    group: ''
  });
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/students'); // API URL ni o'zgartiring
        setStudents(response.data); // Olingan ma'lumotlarni saqlash
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
  
    fetchStudents();
  }, []);
  
  

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setEditedData({ ...student });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/students/${editingStudent}`, editedData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent ? { ...editedData } : student
        )
      );
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold text-orange-500 mb-5">Edit or Delete Students</h2>
  
      {/* Agar students bo'sh yoki undefined bo'lsa */}
      {students && students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div key={student.id} className="border p-4 rounded-md shadow-md bg-white">
              {editingStudent === student.id ? (
                <>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editedData.league}
                    onChange={(e) => setEditedData({ ...editedData, league: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="League"
                  />
                  <input
                    type="number"
                    value={editedData.coins}
                    onChange={(e) => setEditedData({ ...editedData, coins: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Coins"
                  />
                  <input
                    type="number"
                    value={editedData.balance}
                    onChange={(e) => setEditedData({ ...editedData, balance: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Balance"
                  />
                  <input
                    type="number"
                    value={editedData.attendance}
                    onChange={(e) => setEditedData({ ...editedData, attendance: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Attendance"
                  />
                  <input
                    type="number"
                    value={editedData.xp}
                    onChange={(e) => setEditedData({ ...editedData, xp: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="XP"
                  />
                  <input
                    type="text"
                    value={editedData.group}
                    onChange={(e) => setEditedData({ ...editedData, group: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Group"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingStudent(null)}
                    className="ml-2 text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">Name: {student.name}</p>
                  <p>League: {student.league}</p>
                  <p>Coins: {student.coins}</p>
                  <p>Balance: {student.balance}</p>
                  <p>Attendance: {student.attendance}</p>
                  <p>XP: {student.xp}</p>
                  <p>Group: {student.group}</p>
                  <div className="flex mt-4">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
  
};

export default UsersEdit;
