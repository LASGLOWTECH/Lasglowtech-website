import React, { useState, useEffect } from 'react';

import { Outlet, Link,useLocation } from 'react-router-dom';
import { FaPlus, FaListUl, FaEnvelope } from 'react-icons/fa'
import { RiQuestionFill } from "react-icons/ri";
const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100 " >
            {/* Sidebar */}
            
            <aside className="bg-white w-64 py-8 px-4 shadow-md ">
                <div className="text-lg font-semibold mb-6 text-gray-800">Admin Panel</div>
                <nav className="flex flex-col space-y-2">
                    <Link
                        to="/dashboard/createblog"
                        className={`flex items-center w-full py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none ${location.pathname === 'dashboard/createblog' ? 'bg-gray-200 font-semibold' : ''}`}
                    >
                        <FaPlus className="h-5 w-5 mr-2" />
                        Add blogs
                    </Link>



                     <Link
                        to="/dashboard/updateblog"
                        className={`flex items-center w-full py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none ${location.pathname === 'dashboard/updateblog' ? 'bg-gray-200 font-semibold' : ''}`}
                    >
                        <FaPlus className="h-5 w-5 mr-2" />
              Update Blog
                    </Link>

                    <Link
                        to="/dashboard/bloglist"
                        className={`flex items-center w-full py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none ${location.pathname === '/dashboard/bloglist' ? 'bg-gray-200 font-semibold' : ''}`}
                    >
                        <FaListUl className="h-5 w-5 mr-2" />
                        Blog lists
                    </Link>



                 
                    <Link
                        to="/dashboard/subscriptions"
                        className={`flex items-center w-full py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none ${location.pathname === '/admin/subscriptions' ? 'bg-gray-200 font-semibold' : ''}`}
                    >
                        <FaEnvelope className="h-5 w-5 mr-2" />
                        Subscriptions
                    </Link>


                    {/* Add more navigation links here */}
                </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-1 transition-all duration-300 ease-in-out" >
            
                <Outlet /> {/* This is where the child route components will be rendered */}
            </main>
        </div>
    );
};

export default AdminLayout;