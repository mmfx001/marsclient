import React from 'react'
import { Route } from 'react-router-dom'
import Users from './Users'
import Display from './Display'
import StudentList from './Friend'


function Blog() {
    return (
        <div className="flex flex-col mr-24 gap-24 bg-gray-100 w-full md:flex-row">
            <div className="w-full md:w-1/4 p-4  ">
                <Users />
            </div>
            <div className="w-full md:w-1/2 p-4 ml-16 ">
                <Display />
            </div>
            <div className="w-full md:w-1/4 p-4 ml-[-380px] ">
                <StudentList />
            </div>
        </div>

    )
}

export default Blog