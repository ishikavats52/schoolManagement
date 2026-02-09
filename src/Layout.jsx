import React from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Assuming Sidebar width is roughly w-72 (18rem) or user's w-69. 
    // Let's use standard classes for now and let Sidebar handle its width.
    // User had w-69 which is ~276px. ml-64 is 256px.

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 flex flex-col transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
