// app/components/UserMenu.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  theme: 'light' | 'dark';
}

const UserMenu: React.FC<UserMenuProps> = ({ theme }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
    setIsOpen(false);
  };

  const handleDashboard = () => {
    router.push('/dashboard');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
          isDark
            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
            : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
          {user.email?.[0].toUpperCase() || 'U'}
        </div>
        <span className={`text-sm font-medium hidden sm:inline-block ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border overflow-hidden ${
          isDark
            ? 'bg-[#1a1a1e] border-white/10'
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.displayName || 'User'}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {user.email}
            </p>
          </div>
          
          <div className="py-1">
            <button
              onClick={handleDashboard}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition ${
                isDark
                  ? 'text-gray-300 hover:bg-white/5'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition ${
                isDark
                  ? 'text-red-400 hover:bg-white/5'
                  : 'text-red-600 hover:bg-gray-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;