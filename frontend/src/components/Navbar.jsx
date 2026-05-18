import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { HiOutlineLogout, HiUserCircle } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-brand-dark text-white flex items-center justify-between px-6 z-30 shadow-md">
      <div className="text-xl font-black tracking-wider text-blue-400">HOSTEL OPERATIONAL ENGINE</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-700">
          <HiUserCircle className="text-lg text-blue-400"/>
          <span>{user?.name} ({user?.role})</span>
        </div>
        <button onClick={logout} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-all" title="Sign Out">
          <HiOutlineLogout className="text-lg"/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;