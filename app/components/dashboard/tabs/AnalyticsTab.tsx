// components/dashboard/tabs/AnalyticsTab.tsx
"use client";

import React from 'react';
import { TrendingUp, Users, Eye, FileText, Download } from 'lucide-react';

interface AnalyticsTabProps {
  theme: 'light' | 'dark';
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const metrics = [
    { label: 'Total Profile Views', value: '2,847', change: '+18%', icon: Eye },
    { label: 'Unique Visitors', value: '1,234', change: '+12%', icon: Users },
    { label: 'Resume Downloads', value: '156', change: '+8%', icon: Download },
    { label: 'Engagement Rate', value: '8.2%', change: '+2.1%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Analytics
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Track your profile performance and engagement
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                <metric.icon className="w-5 h-5 text-violet-500" />
              </div>
              <span className="text-sm font-medium text-emerald-500">{metric.change}</span>
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {metric.value}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className={`rounded-xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Views Over Time
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Chart will be displayed here
          </p>
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
  );
};

export default AnalyticsTab;