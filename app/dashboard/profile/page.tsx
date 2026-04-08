// app/dashboard/profile/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save,
  Camera,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';
import Image from 'next/image';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';


const ProfilePage = () => {
  const { user, userData, refreshUserData } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Profile form state
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    occupation: '',
    company: '',
  });

  // Security form state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    theme: 'light' as 'light' | 'dark',
    language: 'en',
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      setPreferences(prev => ({ ...prev, theme: savedTheme }));
    }
  }, []);

  useEffect(() => {
    // Load user data into form
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        bio: (userData as any).bio || '',
        location: (userData as any).location || '',
        website: (userData as any).website || '',
        occupation: (userData as any).occupation || '',
        company: (userData as any).company || '',
      });
    }
  }, [userData]);

  const isDark = theme === 'dark';

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (!user) throw new Error('No user logged in');

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      await refreshUserData();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (securityData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (!user || !auth) throw new Error('No user logged in');
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email!,
        securityData.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, securityData.newPassword);
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/wrong-password') {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to update password' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setSaving(true);
    setMessage(null);

    try {
      if (!user) throw new Error('No user logged in');

      // Save preferences to Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        preferences: {
          emailNotifications: preferences.emailNotifications,
          pushNotifications: preferences.pushNotifications,
          language: preferences.language,
        },
        updatedAt: new Date().toISOString(),
      });

      // Save theme to localStorage
      localStorage.setItem('theme', preferences.theme);
      document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
      setTheme(preferences.theme);

      await refreshUserData();
      setMessage({ type: 'success', text: 'Preferences updated successfully!' });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update preferences' });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (formData.displayName) {
      return formData.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0b]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className={`p-2 rounded-lg transition ${
                isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl overflow-hidden sticky top-8 ${
              isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6 text-center border-b border-gray-200 dark:border-white/10">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto">
                    {getInitials()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-violet-600 rounded-full text-white hover:bg-violet-700 transition">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <h3 className={`mt-4 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formData.displayName || user?.email?.split('@')[0] || 'User'}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user?.email}
                </p>
              </div>

              <div className="p-4 space-y-1">
                {[
                  { id: 'profile', label: 'Profile Information', icon: User },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'preferences', label: 'Preferences', icon: Palette },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                      activeTab === tab.id
                        ? isDark
                          ? 'bg-violet-500/20 text-violet-400'
                          : 'bg-violet-50 text-violet-600'
                        : isDark
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success'
                  ? isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isDark ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className={`rounded-xl ${isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'}`}>
                <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Profile Information
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Update your personal information and public profile
                  </p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition resize-none ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Occupation
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        }`}
                        placeholder="e.g., Software Engineer"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        }`}
                        placeholder="e.g., Nexus"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        }`}
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        }`}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className={`rounded-xl ${isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'}`}>
                <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Security Settings
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Update your password and security preferences
                  </p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="p-6 space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      required
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      required
                      minLength={6}
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                    />
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      required
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Update Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className={`rounded-xl ${isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'}`}>
                <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Preferences
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Customize your experience
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Notifications
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email Notifications
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Receive updates about your account via email
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={preferences.emailNotifications}
                            onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-violet-600 transition"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                        </div>
                      </label>

                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Push Notifications
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Get real-time updates in your browser
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={preferences.pushNotifications}
                            onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-violet-600 transition"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg text-sm outline-none transition ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-violet-500/50'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      }`}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handlePreferencesUpdate}
                      disabled={saving}
                      className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Preferences
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;