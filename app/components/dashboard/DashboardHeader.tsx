// components/dashboard/DashboardHeader.tsx (updated)
"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon,
  ChevronDown,
  LogOut,
  User,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  theme,
  toggleTheme,
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <header className={`h-16 border-b flex items-center justify-between px-6 ${
      isDark ? 'bg-[#0a0a0b] border-white/10' : 'bg-white border-gray-200'
    }`}>
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className={`relative ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition ${
              isDark
                ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
            }`}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition ${
            isDark
              ? 'hover:bg-white/5 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition ${
              isDark
                ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)}
              />
              <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-50 overflow-hidden ${
                isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'
              }`}>
                <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                </div>
                <div className="p-4">
                  <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No new notifications
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-lg transition hover:bg-white/5"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {getInitials()}
            </div>
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50 overflow-hidden ${
                isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'
              }`}>
                <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {getDisplayName()}
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email}
                  </p>
                </div>
                <div className="py-2">
                  {/* <button 
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition flex items-center gap-3 ${
                      isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button> */}
                  <button 
                    onClick={() => {
                      router.push('/dashboard');
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition flex items-center gap-3 ${
                      isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <div className={`border-t my-1 ${isDark ? 'border-white/10' : 'border-gray-100'}`} />
                  <button 
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 text-sm transition flex items-center gap-3 ${
                      isDark ? 'text-red-400 hover:bg-white/5' : 'text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;