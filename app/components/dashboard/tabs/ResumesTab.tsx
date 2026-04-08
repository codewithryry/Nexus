// components/dashboard/tabs/ResumesTab.tsx
"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Edit, 
  Trash2,
  Sparkles,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface ResumesTabProps {
  theme: 'light' | 'dark';
}

const ResumesTab: React.FC<ResumesTabProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const resumes = [
    { id: 1, name: 'Software Engineer Resume', version: 'v3', lastEdited: '2 hours ago', optimized: true },
    { id: 2, name: 'Product Manager Resume', version: 'v2', lastEdited: '1 day ago', optimized: true },
    { id: 3, name: 'Data Analyst Resume', version: 'v1', lastEdited: '3 days ago', optimized: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Resume Assistant
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Upload, edit, and optimize your resumes with AI
          </p>
        </div>
        <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Resume
        </button>
      </div>

      {/* AI Prompt Bar */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <input
            type="text"
            placeholder="Tell AI how to improve your resume... (e.g., 'Make it more technical' or 'Highlight leadership')"
            className={`flex-1 bg-transparent outline-none text-sm ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          <button className="bg-violet-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-violet-700 transition">
            Generate
          </button>
        </div>
      </div>

      {/* Resumes List */}
      <div className="space-y-3">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className={`rounded-xl p-5 ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:border-violet-500/30' 
                : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
            } transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center`}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {resume.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {resume.version}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {resume.lastEdited}
                      </span>
                    </div>
                    {resume.optimized && (
                      <div className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs">AI Optimized</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg transition ${
                  isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <Download className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg transition text-red-500 hover:bg-red-500/10`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default ResumesTab;