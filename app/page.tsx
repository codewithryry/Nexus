// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Network, 
  TrendingUp, 
  Briefcase, 
  Rocket,
  MessageCircle,
  ArrowRight,
  FileText,
  UserCog,
  Smartphone,
  FileEdit,
  LayoutTemplate,
  ChevronDown,
  Menu,
  Sparkles,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import Image from "next/image";
import AuthModal from './components/AuthModal';
import ThemeToggle from './components/ThemeToggle';
import UserMenu from './components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const NexusLandingPage = () => {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState('investor');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('signup');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const selectMode = (mode: string) => {
    setActiveMode(mode);
  };

  const openAuthModal = (type: 'login' | 'signup') => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('akshata@nexus.xyz');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleUseCase = (element: HTMLElement) => {
    const isExpanded = element.classList.contains('expanded');
    document.querySelectorAll('#use-cases .group').forEach(el => {
      el.classList.remove('expanded');
    });
    if (!isExpanded) {
      element.classList.add('expanded');
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const modeCards = [
    { id: 'investor', title: 'Investor', description: 'Pitch-ready', icon: TrendingUp, emoji: '📈' },
    { id: 'recruiter', title: 'Recruiter', description: 'Job-focused', icon: Briefcase, emoji: '💼' },
    { id: 'founder', title: 'Founder', description: 'Vision-led', icon: Rocket, emoji: '🚀' },
    { id: 'outreach', title: 'Outreach', description: 'Network mode', icon: MessageCircle, emoji: '🤝' }
  ];

  const features = [
    {
      title: 'Smart Profiles',
      description: 'Drop your raw thoughts. AI turns them into fire profile content that actually gets noticed.',
      icon: UserCog,
      badge: 'Core',
      stat: '3x engagement'
    },
    {
      title: 'Digital Business Cards',
      description: 'Your LinkedIn, but better. QR or link, works everywhere. Designed for IRL networking.',
      icon: Smartphone,
      badge: 'Mobile',
      stat: '<2s connect'
    },
    {
      title: 'AI Resume Assistant',
      description: 'Prompt it naturally. "Make it more technical" or "Highlight leadership". Export anywhere.',
      icon: FileEdit,
      badge: 'AI',
      stat: '10x faster'
    },
    {
      title: 'Smart Templates',
      description: 'AI knows the context. Job apps get achievement focus. Networking gets shared interests.',
      icon: LayoutTemplate,
      badge: 'Smart',
      stat: 'context-aware'
    }
  ];

  const teamMembers = [
    { 
      name: 'Akshat Sharma', 
      role: 'Founder & Vision', 
      emoji: '👑',
      gradient: 'from-violet-500 to-purple-500',
    },
    { 
      name: 'Reymel Mislang', 
      role: 'Full-Stack Developer', 
      emoji: '⚡',
      gradient: 'from-blue-500 to-cyan-500',
    },
    { 
      name: 'Lakshit', 
      role: 'Full-Stack Developer', 
      emoji: '💻',
      gradient: 'from-emerald-500 to-green-500',
    }
  ];

  const useCases = [
    {
      title: 'Students',
      emoji: '🎓',
      description: 'Career fairs, internships, first impressions',
      cards: [
        { title: 'Career Fair Mode', description: 'Quick QR exchange, highlights relevant coursework and projects' },
        { title: 'Internship Applications', description: 'Tailored resume emphasizing transferable skills' },
        { title: 'LinkedIn Ready', description: 'Professional summary optimized for recruiter search' }
      ]
    },
    {
      title: 'Founders',
      emoji: '🚀',
      description: 'Investor conversations, hiring, partnerships',
      cards: [
        { title: 'Investor Pitch', description: 'Founder bio emphasizing vision and traction' },
        { title: 'Hiring Mode', description: 'Company culture and role requirements clearly presented' },
        { title: 'Partner Outreach', description: 'Credibility-focused profile with past wins' }
      ]
    },
    {
      title: 'Interns',
      emoji: '💼',
      description: 'Job applications, networking, skill showcasing',
      cards: [
        { title: 'Full-time Conversion', description: 'Highlights internship projects and measurable impact' },
        { title: 'Skill Portfolio', description: 'Visual proof of work with context' },
        { title: 'Referral Requests', description: 'Warm introduction templates for managers' }
      ]
    },
    {
      title: 'Event Attendees',
      emoji: '🤝',
      description: 'Conferences, meetups, networking events',
      cards: [
        { title: 'Quick Exchange', description: 'QR code sharing, no app required for recipient' },
        { title: 'Follow-up Messages', description: 'Context-aware message templates post-event' },
        { title: 'Connection Tracking', description: 'Remember where you met and what you discussed' }
      ]
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`font-sans antialiased overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0a0a0b] text-white' : 'bg-white text-gray-900'
    }`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        h1, h2, h3, .brand-font {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        .mode-card.active {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }
        
        .group.expanded .expanded\\:block {
          display: block !important;
        }
        .group.expanded .chevron-icon {
          transform: rotate(180deg);
        }

        .step-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -50%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: translateY(-50%);
          z-index: -1;
        }
        @media (max-width: 768px) {
          .step-connector::after { display: none; }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0a0a0b]/80 backdrop-blur-md border-white/10' 
          : 'bg-white/80 backdrop-blur-md border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
              <span className={`brand-font text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Nexus
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {['how-it-works', 'features', 'use-cases', 'about'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  onClick={(e) => handleSmoothScroll(e, `#${item}`)} 
                  className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {user ? (
                <UserMenu theme={theme} />
              ) : (
                <>
                  <button 
                    onClick={() => openAuthModal('login')} 
                    className={`hidden md:block text-sm font-medium transition ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')} 
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                  >
                    Get Started
                  </button>
                </>
              )}
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className={`md:hidden ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-1">
                {['how-it-works', 'features', 'use-cases', 'about'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`} 
                    onClick={(e) => handleSmoothScroll(e, `#${item}`)} 
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition ${
                      isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`absolute inset-0 -z-10 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-violet-100 to-indigo-100 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Beta now live
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Present the </span>
            <span className="gradient-text">right version</span>
            <br />
            <span className={isDark ? 'text-white' : 'text-gray-900'}>of yourself</span>
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            One profile. Infinite contexts. Nexus helps you present the right version for every situation.
          </p>
          
          {/* Profile Modes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
            {modeCards.map((mode) => (
              <div
                key={mode.id}
                className={`mode-card p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeMode === mode.id ? 'active' : ''
                } ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:border-violet-500/30' 
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                }`}
                onClick={() => selectMode(mode.id)}
              >
                <div className="text-2xl mb-2">{mode.emoji}</div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{mode.title}</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{mode.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => openAuthModal('signup')} 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition inline-flex items-center gap-2"
            >
              Create your smart profile
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className={`px-8 py-4 rounded-full text-lg font-medium transition inline-flex items-center gap-2 ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10' 
                : 'bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
            }`}>
              <Terminal className="w-5 h-5" />
              See demo
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How it works
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Three simple steps to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              { step: '1', title: 'Import your data', desc: 'Resume, LinkedIn, certificates. We extract what matters.', icon: FileText },
              { step: '2', title: 'Select context', desc: 'Job application? Networking? Investor meeting? We adapt.', icon: LayoutTemplate },
              { step: '3', title: 'Get output', desc: 'Tailored profile ready to share via QR, link, or download.', icon: Sparkles },
            ].map((item, idx) => (
              <div key={idx} className={`relative ${idx < 2 ? 'step-connector' : ''}`}>
                <div className={`rounded-3xl p-8 hover-lift h-full ${
                  isDark 
                    ? 'bg-white/5 border border-white/10' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-white">{item.step}</span>
                  </div>
                  <div className={`h-40 rounded-2xl mb-6 flex items-center justify-center ${
                    isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                    <item.icon className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Powerful features
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to present your best self
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`rounded-3xl p-8 hover-lift ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:border-violet-500/30' 
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {feature.badge}
                    </span>
                    <span className="text-xs font-medium text-emerald-600">{feature.stat}</span>
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Use cases
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              One person, multiple contexts
            </p>
          </div>

          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`group rounded-3xl p-8 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:border-violet-500/30' 
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                }`}
                onClick={(e) => toggleUseCase(e.currentTarget)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="text-4xl">{useCase.emoji}</div>
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {useCase.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 chevron-icon ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                <div className={`hidden mt-6 pt-6 border-t group-[.expanded]:block ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <div className="grid md:grid-cols-3 gap-4">
                    {useCase.cards.map((card, cardIndex) => (
                      <div key={cardIndex} className={`p-5 rounded-xl ${
                        isDark ? 'bg-white/5' : 'bg-gray-50'
                      }`}>
                        <h4 className={`font-semibold text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {card.title}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Team */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Why Nexus exists
              </h2>
              <div className={`space-y-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Students struggle with networking. Not because they lack achievements, but because presenting yourself clearly is hard.</p>
                <p>Generic profiles fail to capture nuance. The same resume won't work for a startup pitch and a banking internship.</p>
                <p>Nexus bridges this gap. Your professional identity should be as dynamic as you are—context-aware, always appropriate.</p>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={copyEmail} 
                  className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-white' 
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  akshata@nexus.xyz
                </button>
              </div>
            </div>
            
            <div className={`p-8 rounded-3xl relative ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              <div className="absolute top-0 right-0 text-8xl opacity-10">💭</div>
              <blockquote className={`text-2xl font-medium mb-4 relative z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                "Your story is constant. How you tell it should be contextual."
              </blockquote>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-xl">
                  👑
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Akshat Sharma</p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Founder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meet the team
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Building the future of professional identity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className={`rounded-3xl p-8 text-center hover-lift ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}>
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-50`} />
                  <div className={`relative w-full h-full bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-4xl`}>
                    {member.emoji}
                  </div>
                </div>
                <h4 className={`font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-indigo-50 opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`rounded-[4rem] p-12 md:p-16 ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to own your narrative?
            </h2>
            <p className={`text-lg mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Join students and founders presenting their best selves.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => openAuthModal('signup')} 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition inline-flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className={`text-sm mt-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/src/Nexus.svg"
                alt="Nexus Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className={`brand-font text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Nexus
              </span>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className={`transition ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Privacy</a>
              <a href="#" className={`transition ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Terms</a>
              <a href="#" className={`transition ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Contact</a>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              © 2026 Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
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
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        authType={authType} 
        theme={theme}
      />
    </div>
    
  );
};

export default NexusLandingPage;