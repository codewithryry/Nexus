// components/AuthModal.tsx
"use client";

import React, { useState } from 'react';
import { X, Network, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authType: 'login' | 'signup';
  theme: 'light' | 'dark';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, authType, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, signUp, signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (authType === 'signup') {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          setError(error);
        } else {
          onClose();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className={`rounded-3xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-[#1a1a1e] border border-white/10' : 'bg-white border border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition`}>
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {authType === 'signup' ? 'Create your account' : 'Welcome back'}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Start presenting the right version of you
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-3 ${isDark ? 'bg-[#1a1a1e] text-gray-500' : 'bg-white text-gray-400'}`}>or</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {authType === 'signup' && (
            <input 
              type="text"
              placeholder="Full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50' 
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
              }`}
            />
          )}
          <input 
            type="email" 
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50' 
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
            }`}
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50' 
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
            }`}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>{authType === 'signup' ? 'Create Account →' : 'Sign In →'}</span>
            )}
          </button>
        </form>

        <p className={`text-center text-xs mt-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthModal;