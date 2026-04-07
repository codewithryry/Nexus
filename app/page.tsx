"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  Users,
  ChevronDown,
  X,
  Menu,
} from 'lucide-react';

const NexusLandingPage = () => {
  const [activeMode, setActiveMode] = useState('investor');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('signup');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isAuthModalOpen]);

  const selectMode = (mode: string) => {
    setActiveMode(mode);
    console.log(`Selected mode: ${mode}`);
  };

  const openAuthModal = (type: 'login' | 'signup') => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demo: Authentication would proceed here. In production, this connects to backend.');
    closeAuthModal();
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
    { id: 'investor', title: 'Investor', description: 'Pitch-ready', icon: TrendingUp, color: 'blue' },
    { id: 'recruiter', title: 'Recruiter', description: 'Job-focused', icon: Briefcase, color: 'green' },
    { id: 'founder', title: 'Founder', description: 'Vision-led', icon: Rocket, color: 'purple' },
    { id: 'outreach', title: 'Outreach', description: 'Network mode', icon: MessageCircle, color: 'orange' }
  ];

  const features = [
    {
      title: 'Smart Profiles',
      description: 'Write short inputs about what you did and the impact. AI transforms this into compelling profile content and suggests LinkedIn updates.',
      icon: UserCog,
      color: 'indigo',
      badge: 'Core'
    },
    {
      title: 'Digital Business Cards',
      description: 'Compressed LinkedIn for the real world. Clean, mobile-first profiles shared via QR or link. Designed for speed at events and meetings.',
      icon: Smartphone,
      color: 'purple',
      badge: 'Mobile'
    },
    {
      title: 'AI Resume + Editing',
      description: 'Edit with simple prompts. "Make this more technical" or "Highlight leadership." Auto-formatting and export to PDF or Word.',
      icon: FileEdit,
      color: 'green',
      badge: 'AI Powered'
    },
    {
      title: 'Smart Templates',
      description: 'AI applies optimal structure based on purpose. Job applications highlight achievements; networking emphasizes shared interests.',
      icon: LayoutTemplate,
      color: 'orange',
      badge: 'Structure'
    }
  ];

  const teamMembers = [
    { name: 'Alex Chen', university: "Stanford '25", imageBg: 'from-indigo-100 to-purple-100' },
    { name: 'Jordan Smith', university: "MIT '24", imageBg: 'from-blue-100 to-cyan-100' },
    { name: 'Taylor Wong', university: "Berkeley '25", imageBg: 'from-green-100 to-emerald-100' },
    { name: 'Morgan Lee', university: "Harvard '24", imageBg: 'from-orange-100 to-red-100' }
  ];

  const useCases = [
    {
      title: 'Students',
      emoji: '🎓',
      description: 'Career fairs, internships, first impressions',
      color: 'blue',
      cards: [
        { title: 'Career Fair Mode', description: 'Quick QR exchange, highlights relevant coursework and projects' },
        { title: 'Internship App', description: 'Tailored resume emphasizing transferable skills' },
        { title: 'LinkedIn Ready', description: 'Professional summary optimized for recruiter search' }
      ]
    },
    {
      title: 'Founders',
      emoji: '🚀',
      description: 'Investor conversations, hiring, partnerships',
      color: 'purple',
      cards: [
        { title: 'Investor Deck', description: 'Founder bio emphasizing vision and traction' },
        { title: 'Hiring Mode', description: 'Company culture + role requirements clearly presented' },
        { title: 'Partner Outreach', description: 'Credibility-focused profile with past wins' }
      ]
    },
    {
      title: 'Interns',
      emoji: '💼',
      description: 'Job applications, networking, skill showcasing',
      color: 'green',
      cards: [
        { title: 'Full-time Conversion', description: 'Highlights internship projects and measurable impact' },
        { title: 'Skill Portfolio', description: 'Visual proof of work with context' },
        { title: 'Referral Request', description: 'Warm introduction templates for managers' }
      ]
    },
    {
      title: 'Event Attendees',
      emoji: '🤝',
      description: 'Conferences, meetups, networking events',
      color: 'orange',
      cards: [
        { title: 'Quick Exchange', description: 'QR code sharing, no app required for recipient' },
        { title: 'Follow-up Msg', description: 'Context-aware message templates post-event' },
        { title: 'Connection Track', description: 'Remember where you met and what you discussed' }
      ]
    }
  ];

  return (
    <div className="font-sans bg-[#fafafa] text-gray-900 antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        h1, h2, h3, .brand-font {
          font-family: 'Space Grotesk', sans-serif;
        }
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .qr-pattern {
          background-image: radial-gradient(circle, #000 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .mode-card.active {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
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
        .group.expanded .expanded\\:block {
          display: block !important;
        }
        .group.expanded .chevron-icon {
          transform: rotate(180deg);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="brand-font text-xl font-bold tracking-tight">Nexus</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">How it Works</a>
              <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#use-cases" onClick={(e) => handleSmoothScroll(e, '#use-cases')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Use Cases</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">About</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={() => openAuthModal('login')} className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">Log in</button>
              <button onClick={() => openAuthModal('signup')} className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition hover-lift">
                Get Started
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition py-2">How it Works</a>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition py-2">Features</a>
                <a href="#use-cases" onClick={(e) => handleSmoothScroll(e, '#use-cases')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition py-2">Use Cases</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition py-2">About</a>
                <div className="pt-2 flex gap-3">
                  <button onClick={() => openAuthModal('login')} className="flex-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full py-2">Log in</button>
                  <button onClick={() => openAuthModal('signup')} className="flex-1 bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">Sign Up</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Present the right version<br />
            <span className="gradient-text">of yourself</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Nexus helps you tailor your professional identity for every situation. One profile, infinite contexts.
          </p>
          
          {/* Profile Modes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {modeCards.map((mode) => (
              <div
                key={mode.id}
                className={`mode-card bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm cursor-pointer transition-all duration-300 hover:scale-102 ${activeMode === mode.id ? 'active' : ''}`}
                onClick={() => selectMode(mode.id)}
              >
                <div className={`w-12 h-12 bg-${mode.color}-100 rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                  <mode.icon className={`w-6 h-6 text-${mode.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900">{mode.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{mode.description}</p>
              </div>
            ))}
          </div>

          <button onClick={() => openAuthModal('signup')} className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition hover-lift inline-flex items-center gap-2">
            Create your smart profile
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-600">Three steps to context-aware professional presence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="relative step-connector">
              <div className="bg-gray-50 rounded-3xl p-8 hover-lift border border-gray-100">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6">1</div>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center qr-pattern relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <FileText className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Import your data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Resume, LinkedIn, certificates, portfolio. We extract the signal from the noise.</p>
              </div>
            </div>

            <div className="relative step-connector">
              <div className="bg-gray-50 rounded-3xl p-8 hover-lift border border-gray-100">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6">2</div>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium shadow-sm">Job App</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium shadow-sm">Networking</span>
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium shadow-sm">Investor</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Select context</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Choose your situation. Job application, networking event, or investor meeting.</p>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-3xl p-8 hover-lift border border-gray-100">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6">3</div>
                <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-indigo-100">
                  <div className="text-center">
                    <div className="flex justify-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-xs text-indigo-600 font-medium">AI generating...</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Get output</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Tailored profile, message, or resume. Ready to share via QR, link, or download.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Features</h2>
            <p className="text-gray-600">Tools designed for modern professional life</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 hover-lift border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <span className={`px-3 py-1 bg-${feature.color}-50 text-${feature.color}-700 rounded-full text-xs font-medium`}>{feature.badge}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{feature.description}</p>
                {feature.title === 'Smart Profiles' && (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white rounded text-xs border">Impact: +40%</span>
                      <span className="px-2 py-1 bg-white rounded text-xs border">Skills: AI, PM</span>
                    </div>
                  </div>
                )}
                {feature.title === 'Digital Business Cards' && (
                  <div className="bg-gray-50 rounded-2xl p-6 flex justify-center border border-gray-100">
                    <div className="bg-white p-4 rounded-xl shadow-sm w-32 text-center">
                      <div className="qr-pattern w-16 h-16 mx-auto mb-2 rounded"></div>
                      <p className="text-[10px] text-gray-500">Scan to connect</p>
                    </div>
                  </div>
                )}
                {feature.title === 'AI Resume + Editing' && (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 font-mono text-xs text-gray-600">
                    <span className="text-green-600">{'>'} </span>"Emphasize Python skills"<br />
                    <span className="text-gray-400">Adjusting content...</span><br />
                    <span className="text-green-600">✓ </span>Resume updated
                  </div>
                )}
                {feature.title === 'Smart Templates' && (
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-lg p-2 text-center">
                      <Briefcase className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <span className="text-[10px] text-gray-600">Job</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2 text-center">
                      <Users className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <span className="text-[10px] text-gray-600">Network</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2 text-center">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                      <span className="text-[10px] text-gray-600">Pitch</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-600">One person, multiple contexts</p>
          </div>

          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 transition cursor-pointer"
                onClick={(e) => toggleUseCase(e.currentTarget)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-${useCase.color}-100 rounded-2xl flex items-center justify-center text-2xl`}>{useCase.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold">{useCase.title}</h3>
                      <p className="text-gray-600 text-sm">{useCase.description}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-300 chevron-icon" />
                </div>
                <div className="hidden mt-6 pt-6 border-t border-gray-200 group-[.expanded]:block">
                  <div className="grid md:grid-cols-3 gap-4">
                    {useCase.cards.map((card, cardIndex) => (
                      <div key={cardIndex} className="bg-white p-4 rounded-xl border border-gray-100">
                        <h4 className="font-semibold text-sm mb-2">{card.title}</h4>
                        <p className="text-xs text-gray-600">{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Vision */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Nexus exists</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Students struggle with networking. Not because they lack achievements, but because presenting yourself clearly is hard.</p>
                <p>Generic profiles fail to capture nuance. The same resume won't work for a startup pitch and a banking internship. Context matters, but adapting your story takes time most don't have.</p>
                <p>Nexus bridges this gap. We believe your professional identity should be as dynamic as you are—compressed for speed, expanded for impact, always appropriate for the moment.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <blockquote className="text-xl font-medium text-gray-900 mb-4">
                "Your story is constant. How you tell it should be contextual."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">Founder's Vision</p>
                  <p className="text-xs text-gray-500">Built for students, by students</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">The Team</h3>
            <p className="text-gray-600 text-sm">Building the future of professional identity</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover-lift">
                <div className={`w-20 h-20 bg-gradient-to-br ${member.imageBg} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl`}>👤</div>
                <h4 className="font-bold text-sm">{member.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{member.university}</p>
                <a href="#" className="text-xs text-indigo-600 hover:underline flex items-center justify-center gap-1">
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to own your narrative?</h2>
          <p className="text-gray-400 text-lg mb-8">Join students and founders presenting their best selves.</p>
          <button onClick={() => openAuthModal('signup')} className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition hover-lift inline-flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-gray-500 text-sm mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <span className="brand-font font-bold">Nexus</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
            <p className="text-sm text-gray-400">© 2026 Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeAuthModal}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative fade-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeAuthModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{authType === 'signup' ? 'Create your profile' : 'Welcome back'}</h3>
              <p className="text-gray-600 text-sm">Start presenting the right version of you</p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                <span className="text-sm font-medium">Continue with Apple</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleAuth}>
              <div>
                <input type="email" placeholder="you@university.edu" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                Continue
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NexusLandingPage;