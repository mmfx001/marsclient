import React from 'react'
import Users from './Users'
import Display from './Display'
import StudentList from './Friend'
import StudentListt from './friend1';


function Blog() {
    return (
        <div className="flex flex-col gap-5 lg:gap-24 bg-gray-100 w-full md:flex-row">
            <div className="w-full md:w-1/4 p-4 hidden sm:block">
                <Users />
            </div>
            <div className="w-full md:w-1/2 p-4">
                <Display />
            </div>
            {/* Hide StudentList on screens smaller than 500px */}
            <div className="w-full md:w-1/4 p-4 hidden sm:block">
                <StudentList />
            </div>

            {/* Show StudentListt on screens smaller than 500px */}
            <div className="w-full md:w-1/4 p-4 sm:hidden block">
                <StudentListt />
            </div>
        </div>
    );
}

export default Blog