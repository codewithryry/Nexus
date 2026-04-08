// app/components/ThemeToggle.tsx
"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition ${
        theme === 'dark'
          ? 'bg-white/5 hover:bg-white/10 text-yellow-400'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;