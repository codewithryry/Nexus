// components/dashboard/tabs/OverviewTab.tsx
"use client";

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  FileText,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Zap,
  Target,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface OverviewTabProps {
  theme: 'light' | 'dark';
}

const OverviewTab: React.FC<OverviewTabProps> = ({ theme }) => {
  const { userData } = useAuth();
  const isDark = theme === 'dark';

  const stats = [
    { 
      label: 'Profile Views', 
      value: '1,234', 
      change: '+12%', 
      trend: 'up',
      icon: Eye,
      color: 'violet'
    },
    { 
      label: 'Connections', 
      value: '89', 
      change: '+23%', 
      trend: 'up',
      icon: Users,
      color: 'emerald'
    },
    { 
      label: 'Resume Downloads', 
      value: '45', 
      change: '-3%', 
      trend: 'down',
      icon: FileText,
      color: 'amber'
    },
    { 
      label: 'Engagement Rate', 
      value: '8.2%', 
      change: '+5%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'blue'
    },
  ];

  const recentActivity = [
    { action: 'Profile viewed by TechCorp', time: '2 hours ago', type: 'view' },
    { action: 'Resume downloaded', time: '5 hours ago', type: 'download' },
    { action: 'New connection request', time: '1 day ago', type: 'connection' },
    { action: 'Smart profile updated', time: '2 days ago', type: 'update' },
  ];

  const suggestions = [
    { title: 'Add a project to your profile', impact: 'High', description: 'Profiles with projects get 3x more views' },
    { title: 'Update your skills section', impact: 'Medium', description: 'Add 3 trending skills to boost visibility' },
    { title: 'Create an investor profile', impact: 'High', description: 'Tailored for startup and VC conversations' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`rounded-2xl p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white`}>
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userData?.displayName?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-white/80">
          Your profile is looking great. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 bg-${stat.color}-500/10 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className={`lg:col-span-2 rounded-xl ${
          isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <div className={`p-5 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'view' ? 'bg-blue-500' :
                      activity.type === 'download' ? 'bg-emerald-500' :
                      activity.type === 'connection' ? 'bg-violet-500' :
                      'bg-amber-500'
                    }`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.action}
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className={`rounded-xl ${
          isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <div className={`p-5 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                AI Suggestions
              </h2>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-1.5 rounded-lg ${
                      suggestion.impact === 'High' 
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {suggestion.title}
                      </h4>
                      <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {suggestion.description}
                      </p>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        suggestion.impact === 'High'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {suggestion.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-xl p-6 ${
        isDark 
          ? 'bg-white/5 border border-white/10' 
          : 'bg-white border border-gray-200 shadow-sm'
      }`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            isDark
              ? 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20'
              : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
          }`}>
            <Zap className="w-4 h-4" />
            Create Smart Profile
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}>
            <FileText className="w-4 h-4" />
            Upload Resume
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            isDark
              ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}>
            <Users className="w-4 h-4" />
            Generate QR Code
          </button>
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

export default OverviewTab;