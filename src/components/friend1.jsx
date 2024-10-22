import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentListt = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('https://shoopjson-2.onrender.com/api/students');
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    throw new Error('Students data is not in the expected format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto px-8 py-8">
            <h2 className="text-4xl flex justify-center items-center gap-4 font-extrabold mb-6 text-center font-poppins">
                <img className='w-12' src="https://space.marsit.uz/img/profile_logo.8dfe14fc.png" alt="Profile" />
                <p className='text-4xl font-extrabold text-[#100D5D]'>Do'stlar</p>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {students.length > 0 ? (
                    students.map(student => (
                        <div key={student.id} className="bg-white w-full max-w-xs mx-auto p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                            <img src={student.image} alt={student.name} className="w-28 h-28 rounded-full mb-4 border-2 border-orange-500 object-cover" />
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                                <p className="text-gray-600"><strong>League:</strong> {student.league}</p>
                                <p className="text-gray-600"><strong>Group:</strong> {student.group}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No students available.</p>
                )}
            </div>
        </div>
    );
};

export default StudentListt;
