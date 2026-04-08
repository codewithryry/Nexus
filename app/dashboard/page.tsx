// app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import ProfilesTab from '../components/dashboard/tabs/ProfilesTab';
import ResumesTab from '../components/dashboard/tabs/ResumesTab';
import AnalyticsTab from '../components/dashboard/tabs/AnalyticsTab';
import SettingsTab from '../components/dashboard/tabs/SettingsTab';

export type TabType = 'overview' | 'profiles' | 'resumes' | 'analytics' | 'settings';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/'); // Use replace instead of push to prevent back button issues
    }
  }, [user, loading, router]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) return null;

  const isDark = theme === 'dark';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab theme={theme} />;
      case 'profiles':
        return <ProfilesTab theme={theme} />;
      case 'resumes':
        return <ResumesTab theme={theme} />;
      case 'analytics':
        return <AnalyticsTab theme={theme} />;
      case 'settings':
        return <SettingsTab theme={theme} />;
      default:
        return <OverviewTab theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0a0a0b]' : 'bg-gray-50'}`}>
      <DashboardSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        theme={theme}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <DashboardHeader 
          theme={theme}
          toggleTheme={toggleTheme}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;