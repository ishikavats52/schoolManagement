import React from 'react';
import { Bell, Search, User } from 'lucide-react';

function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200 shadow-sm z-40">

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 border border-transparent focus-within:bg-white focus-within:border-blue-500 transition-all">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 w-full placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;