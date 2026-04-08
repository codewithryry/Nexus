// components/dashboard/DashboardSidebar.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { TabType } from '@/app/dashboard/page';

interface DashboardSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  theme: 'light' | 'dark';
}

const menuItems = [
  { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
  { id: 'profiles' as TabType, label: 'Smart Profiles', icon: UserCircle },
  { id: 'resumes' as TabType, label: 'Resumes', icon: FileText },
  { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
  { id: 'settings' as TabType, label: 'Settings', icon: Settings },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  theme,
}) => {
  const { logout } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 ${
      collapsed ? 'w-20' : 'w-64'
    } ${
      isDark 
        ? 'bg-[#0a0a0b] border-r border-white/10' 
        : 'bg-white border-r border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/src/Nexus.svg"
              alt="Nexus Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          {!collapsed && (
            <span className={`brand-font text-xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Nexus
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
              activeTab === item.id
                ? isDark
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20'
                : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
            isDark
              ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
            isDark
              ? 'text-gray-400 hover:text-white hover:bg-white/5'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;