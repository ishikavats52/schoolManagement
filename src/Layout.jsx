import React from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
