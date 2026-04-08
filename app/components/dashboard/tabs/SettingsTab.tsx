// components/dashboard/tabs/SettingsTab.tsx
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, Bell, Globe, Shield } from 'lucide-react';

interface SettingsTabProps {
  theme: 'light' | 'dark';
}

const SettingsTab: React.FC<SettingsTabProps> = ({ theme }) => {
  const { user, userData } = useAuth();
  const isDark = theme === 'dark';
  const [displayName, setDisplayName] = useState(userData?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64 space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                section.id === 'profile'
                  ? isDark
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'bg-violet-50 text-violet-700'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className={`flex-1 rounded-xl p-6 ${
          isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Profile Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Display Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Change Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                  }`}
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
              Save Changes
            </button>
          </div>
        </div>

              <div className="fixed bottom-4 right-4 text-[11px] text-gray-400 opacity-50 leading-tight text-right">
        <div>Developed by Reymel Mislang</div>
        {/* <a 
          href="https://github.com/codewithryry"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 block"
        >
          github.com/codewithryry
        </a>
        <a 
          href="https://devrymel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 block"
        >
          devrymel.vercel.app
        </a> */}
      </div>

      
      </div>
    </div>
  );
};

export default SettingsTab;