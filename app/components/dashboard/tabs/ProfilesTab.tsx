// components/dashboard/tabs/ProfilesTab.tsx
"use client";

import React, { useState } from 'react';
import { 
  UserCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  QrCode,
  Eye,
  TrendingUp,
  Briefcase,
  Rocket,
  MessageCircle,
} from 'lucide-react';

interface ProfilesTabProps {
  theme: 'light' | 'dark';
}

const ProfilesTab: React.FC<ProfilesTabProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');

  const profiles = [
    {
      id: 1,
      name: 'Professional Profile',
      type: 'recruiter',
      icon: Briefcase,
      views: 234,
      lastUpdated: '2 days ago',
      isActive: true,
    },
    {
      id: 2,
      name: 'Investor Pitch',
      type: 'investor',
      icon: TrendingUp,
      views: 89,
      lastUpdated: '5 days ago',
      isActive: true,
    },
    {
      id: 3,
      name: 'Founder Vision',
      type: 'founder',
      icon: Rocket,
      views: 156,
      lastUpdated: '1 week ago',
      isActive: false,
    },
    {
      id: 4,
      name: 'Networking Mode',
      type: 'outreach',
      icon: MessageCircle,
      views: 67,
      lastUpdated: '3 days ago',
      isActive: true,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Profiles' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Drafts' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Smart Profiles
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Create and manage your context-aware profiles
          </p>
        </div>
        <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Profile
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeFilter === filter.id
                ? isDark
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-violet-50 text-violet-700 border border-violet-200'
                : isDark
                  ? 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div
              key={profile.id}
              className={`rounded-xl p-5 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:border-violet-500/30' 
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
              } transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {profile.name}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Updated {profile.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  profile.isActive
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-gray-500/10 text-gray-500'
                }`}>
                  {profile.isActive ? 'Active' : 'Draft'}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {profile.views} views
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-dashed">
                <button className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <Copy className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <QrCode className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg transition text-red-500 hover:bg-red-500/10 ml-auto`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for New Profile */}
      <button className={`w-full p-8 rounded-xl border-2 border-dashed transition ${
        isDark 
          ? 'border-white/10 hover:border-violet-500/30 text-gray-400 hover:text-violet-400' 
          : 'border-gray-200 hover:border-violet-300 text-gray-500 hover:text-violet-600'
      }`}>
        <Plus className="w-8 h-8 mx-auto mb-2" />
        <span className="text-sm font-medium">Create New Smart Profile</span>
      </button>

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
  );
};

export default ProfilesTab;