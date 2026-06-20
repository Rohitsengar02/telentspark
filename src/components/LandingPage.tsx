'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState, UserRole } from '@/store/state';
import { 
  Shield, 
  Package, 
  Users, 
  ArrowLeft,
  ArrowRight, 
  BarChart3, 
  Warehouse, 
  Globe, 
  KeyRound, 
  Lock, 
  Mail, 
  Workflow, 
  TrendingUp, 
  Cpu, 
  Check, 
  HelpCircle,
  Eye,
  EyeOff,
  Server,
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  const { login } = useAppState();
  const [hoveredEl, setHoveredEl] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Navigation step state: 'landing' shows sections, 'portals' shows cards
  const [view, setView] = useState<'landing' | 'portals'>('landing');

  const handleRoleCardClick = (role: UserRole) => {
    setSelectedRole(role);
  };


  // Custom cursor position tracker
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      title: "Real-time Warehouse Tracking",
      desc: "Supervise storage capacity, layouts, and racks with interactive mapping tools.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Collaborative Supplier Portals",
      desc: "Connect and transact with vendors and regional stockists on a unified network.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "AI-Powered Analytics",
      desc: "Forecast sales demand, track expiries, and automate stock replenishments.",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Omnichannel Communications",
      desc: "Deliver automated order receipts and status alerts via WhatsApp, SMS, and Email.",
      img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the multi-portal structure isolate user roles?",
      a: "Each portal is secured by dedicated auth parameters. Administrators manage pricing and CRM leads; Stockists view warehouse layouts and shelves; Vendors log purchase records and deliveries."
    },
    {
      q: "Can we integrate existing SMS and WhatsApp gateways?",
      a: "Yes, Talentspark includes modular settings cards supporting WhatsApp APIs, SendGrid, and regional SMS gateways with visual connection indicators."
    },
    {
      q: "Does the system support real-time stock notifications?",
      a: "Absolutely. Triggers flag low-threshold items immediately, alerting stockists via the sidebar live activity feed and connected gateways."
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto carousel effect
  useEffect(() => {
    if (view !== 'landing') return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [view, carouselSlides.length]);

  // Soft delay/spring effect for the custom cursor trail
  useEffect(() => {
    let frameId: number;
    const updateTrail = () => {
      setTrailPos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      frameId = requestAnimationFrame(updateTrail);
    };
    frameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(frameId);
  }, [mousePos]);

  const triggerLogin = (role: UserRole) => {
    login(role);
  };

  // Role Theme definitions for the Login Panel overlays (matching user image layout specs)
  const roleThemes = {
    admin: {
      name: 'Super Admin Portal',
      desc: 'Master orchestration, analytics, reports, and CRM control panel.',
      bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
      logoColor: 'text-blue-600',
      btnColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 text-white',
      email: 'admin@talentspark.com',
      avatarText: 'Get access to your administrative control center.',
      icon: Shield,
    },
    stockist: {
      name: 'Stockist Hub',
      desc: 'Track warehouse inventory mapping, products, and incoming shipments.',
      bgGradient: 'from-purple-600 via-violet-650 to-pink-600',
      logoColor: 'text-purple-600',
      btnColor: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20 text-white',
      email: 'stockist@talentspark.com',
      avatarText: 'Monitor layouts, racks, and inventories instantly.',
      icon: Warehouse,
    },
    vendor: {
      name: 'Vendor Console',
      desc: 'Fulfill customer orders, update dispatch logs, and monitor invoices.',
      bgGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      logoColor: 'text-emerald-600',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 text-white',
      email: 'vendor@talentspark.com',
      avatarText: 'Update orders, status levels, and invoices.',
      icon: Users,
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden custom-cursor-active selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Cursor Element */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-105 hidden md:block"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
          transform: `translate(-50%, -50%) scale(${hoveredEl ? 1.5 : 1})`,
        }}
      >
        <div className={`w-8 h-8 rounded-full border ${hoveredEl ? 'border-blue-600 bg-blue-600/10 shadow-lg shadow-blue-500/20 scale-125' : 'border-slate-400/40 bg-slate-900/5'} transition-all duration-300`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
      </div>

      {/* Decorative Moving Background Mesh - Light Variant */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-violet-400 rounded-full blur-3xl animate-pulse-slow-reverse" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-emerald-350 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200 bg-white/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/25">
            Ω
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider uppercase text-slate-800">Talentspark</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enterprise ERP</p>
          </div>
        </div>

        {view === 'landing' ? (
          <button
            onClick={() => setView('portals')}
            onMouseEnter={() => setHoveredEl(true)}
            onMouseLeave={() => setHoveredEl(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-md flex items-center gap-2"
          >
            Sign In Portals
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setView('landing')}
            onMouseEnter={() => setHoveredEl(true)}
            onMouseLeave={() => setHoveredEl(false)}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all active:scale-95 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        )}
      </header>

      {/* VIEWPORT CONTROLLER */}
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 space-y-24"
          >
            {/* SECTION 1: HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold animate-pulse-slow">
                  <Cpu className="w-4 h-4 text-blue-600 animate-spin-slow" />
                  Empowering Modern Supply Chains
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-900">
                  One Unified Console.<br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Infinite Scale.
                  </span>
                </h1>
                <p className="text-base text-slate-650 max-w-xl leading-relaxed">
                  Talentspark bridges the gap between administrators, stockists, and vendors. Automate multi-channel communications, optimize warehouse layouts, predict demand spikes, and monitor real-time distribution metrics in a beautiful glass dashboard.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setView('portals')}
                    onMouseEnter={() => setHoveredEl(true)}
                    onMouseLeave={() => setHoveredEl(false)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm hover:from-blue-50 hover:to-indigo-500 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:scale-95 flex items-center gap-3"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const featSec = document.getElementById('features-section');
                      featSec?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={() => setHoveredEl(true)}
                    onMouseLeave={() => setHoveredEl(false)}
                    className="px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Hero Interactive Mockup */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-10 pointer-events-none" />
                <div className="relative border border-slate-200 bg-white/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider">SECURE NODE: ACTIVE</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-700">Sales Forecast</h3>
                          <p className="text-[10px] text-slate-500">Predicted growth spike</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 font-mono">+18.4%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                          <Warehouse className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-700">Stock Thresholds</h3>
                          <p className="text-[10px] text-slate-500">Ethanol 99% Alert</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold border border-amber-200">LOW STOCK</span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-700">API Channels</h3>
                          <p className="text-[10px] text-slate-500">WhatsApp & SMS Status</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 font-mono">100% ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: VISION & CORE VALUES */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold uppercase tracking-widest text-violet-600">VISION & ROADMAP</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Distributed ERP Strategy</h2>
                <p className="text-sm text-slate-650">
                  Engineered to streamline modern enterprise supply distribution pipelines with complete state synchronization and localized node visibility.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-slate-200 bg-white/70 p-8 rounded-2xl hover:border-slate-300 transition-all hover:-translate-y-1 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-slate-800">Granular Isolation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enforce role parameters cleanly. Admins look at financial forecasting; Stockists manage storage map grids; Vendors process deliveries.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white/70 p-8 rounded-2xl hover:border-slate-300 transition-all hover:-translate-y-1 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-slate-800">Automated Pipelines</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Send notifications and updates dynamically on order approvals. Triggers notifications directly to WhatsApp and SMS templates.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white/70 p-8 rounded-2xl hover:border-slate-300 transition-all hover:-translate-y-1 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-slate-800">Predictive Logistics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Synthesize historical orders and warehouse allocations to calculate demand curves and flag low stock thresholds early.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: FEATURE HIGHLIGHTS */}
            <section id="features-section" className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">CORE CAPABILITIES</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    Intelligent features that scale with your operations.
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-slate-100 border border-slate-200 text-emerald-600 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Visual Warehouse Maps</h4>
                        <p className="text-xs text-slate-600">Locate, inspect, and update layout allocations using grid shelf positioning overlays.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-slate-100 border border-slate-200 text-emerald-600 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Interactive CRM Pipeline</h4>
                        <p className="text-xs text-slate-600">Organize and advance distribution contracts through dynamic kanban drag workflows.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-slate-100 border border-slate-200 text-emerald-600 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Automated Client Syncing</h4>
                        <p className="text-xs text-slate-600">Broadcast and reconcile dispatch states to multiple remote warehouse nodes with one click.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-slate-300 transition-colors shadow-sm">
                    <Package className="w-6 h-6 text-emerald-600" />
                    <h4 className="text-sm font-bold text-slate-850">Stock Audits</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Track batch codes, expiries, GST and reserves accurately.</p>
                  </div>
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-slate-300 transition-colors shadow-sm mt-6">
                    <Users className="w-6 h-6 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-850">Accounts Log</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Manage vendors and purchase records on a single page.</p>
                  </div>
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-slate-300 transition-colors shadow-sm">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <h4 className="text-sm font-bold text-slate-850">Recharts Engine</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Render interactive reports, revenue bars, and growth graphs.</p>
                  </div>
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-slate-300 transition-colors shadow-sm mt-6">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-850">SMS Gateways</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Configure API connection status indicators for messaging channels.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SIMULATED LIVE STATS */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="space-y-1">
                  <span className="block text-3xl font-black text-slate-800 font-mono">₹48.9L</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Vol</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-black text-slate-800 font-mono">1,400+</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Stockists</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-black text-slate-800 font-mono">3 Zones</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Connected Hubs</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-black text-slate-800 font-mono">&lt; 2.4s</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dispatch Sync</span>
                </div>
              </div>
            </section>

            {/* SECTION 5: ROLE PORTALS SELECTOR INVITATION */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Ready to configure your sandbox?</h3>
                  <p className="text-xs text-slate-650">Select your dedicated user portal interface to begin testing layout configurations.</p>
                </div>
                <button
                  onClick={() => setView('portals')}
                  className="px-8 py-4 rounded-xl bg-slate-900 text-white font-extrabold text-xs tracking-wider uppercase hover:bg-slate-800 active:scale-95 shadow-md flex items-center gap-2"
                >
                  Choose Portal
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* SECTION 6: CLIENT ECOSYSTEM */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="bg-white border border-slate-200 rounded-3xl p-10 relative overflow-hidden shadow-sm">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/5 skew-x-12 pointer-events-none" />
                <div className="max-w-2xl space-y-4">
                  <span className="text-xs font-bold text-indigo-650 uppercase tracking-widest">ENTERPRISE ECOSYSTEM</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">Adopted by Leading Retail Networks</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "Switching to Talentspark simplified our multi-tenant vendor structure. Our stockists report shelf occupancy levels directly from the floor, drastically reducing inventory discrepancies."
                  </p>
                  <p className="text-xs font-extrabold text-slate-800">— Regional Director, Sun Pharma Distribution</p>
                </div>
              </div>
            </section>

            {/* NEW ADDED SECTIONS (5 MORE SECTIONS FOR A TOTAL OF 12 SECTIONS) */}

            {/* SECTION 7: FEATURE PREVIEW AUTO CAROUSEL WITH IMAGES */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">PREVIEW SANDBOX</span>
                <h2 className="text-3xl font-black text-slate-900">Visual Operations Console</h2>
                <p className="text-sm text-slate-650">Experience the interface screens deployed across regional retail distribution channels.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="lg:col-span-5 space-y-4 z-10">
                  <div className="flex gap-1.5">
                    {carouselSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-blue-650' : 'w-2 bg-slate-200'}`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <h3 className="text-xl font-bold text-slate-900">{carouselSlides[currentSlide].title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{carouselSlides[currentSlide].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="lg:col-span-7 relative h-72 rounded-2xl overflow-hidden z-10 border border-slate-100 shadow-sm">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={carouselSlides[currentSlide].img}
                      alt={carouselSlides[currentSlide].title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* SECTION 8: LIVE INTEGRATION ECOSYSTEM */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">CONNECTED INFRASTRUCTURE</span>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight">Sync gateways and tools natively.</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connect communications and ERP structures. Enable SMS notifications, WhatsApp dispatch updates, email invoice generation, and custom storage logs.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <div className="text-[11px] font-bold text-slate-800">WhatsApp Gateway</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <div className="text-[11px] font-bold text-slate-800">SendGrid Integration</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <Server className="w-5 h-5 text-purple-500" />
                      <div className="text-[11px] font-bold text-slate-800">AWS Node Hosting</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <div className="text-[11px] font-bold text-slate-800">Shopify API Sync</div>
                    </div>
                  </div>
                </div>

                <div className="relative h-80 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white p-8 flex flex-col justify-center items-center">
                  <div className="absolute inset-0 bg-grid-slate-100 grid-bg opacity-40" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="w-48 h-48 border border-dashed border-slate-350 rounded-full flex items-center justify-center relative"
                  >
                    <div className="absolute top-0 w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm"><Globe className="w-4 h-4 text-blue-600" /></div>
                    <div className="absolute bottom-0 w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center shadow-sm"><MessageSquare className="w-4 h-4 text-green-600" /></div>
                    <div className="absolute right-0 w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm"><Server className="w-4 h-4 text-purple-600" /></div>
                    <div className="absolute left-0 w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shadow-sm"><TrendingUp className="w-4 h-4 text-amber-600" /></div>
                    
                    <div className="w-24 h-24 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-md text-white font-extrabold text-2xl z-10">
                      Ω
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SECTION 9: DATA SECURITY & SCOPES */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">COMPLIANCE & ENCRYPTION</span>
                <h2 className="text-3xl font-black text-slate-900">Secure Workspace Safeguards</h2>
                <p className="text-sm text-slate-650">We enforce strict tenant and role constraints so information remains sealed and safe.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Isolated Data Layers", desc: "Separate workspace state scopes prevent user role breaches." },
                  { title: "256-bit Key Locks", desc: "Dedicated authorization credential layers map login tokens." },
                  { title: "Audit Trail Feeds", desc: "Every transaction, return, and order logs activity in real-time." },
                  { title: "Secure CDN Backed", desc: "Static and dynamic page components load over edge CDN locations." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-slate-350 transition-colors">
                    <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check className="w-4.5 h-4.5" /></div>
                    <h4 className="text-sm font-bold text-slate-850">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: SIMPLE PRICING PLANS */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-650">PRICING PLAN</span>
                <h2 className="text-3xl font-black text-slate-900">Flexible Options for Teams</h2>
                <p className="text-sm text-slate-650">Simple plans built to support regional distributors and expanding vendor structures.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { name: "Starter", price: "₹4,999", desc: "Best for localized stockists and small vendors.", features: ["Single warehouse node", "Up to 500 SKUs", "Standard SMS alerts"] },
                  { name: "Professional", price: "₹14,999", desc: "Ideal for growing distribution networks.", features: ["3 warehouse nodes", "Interactive Maps", "WhatsApp gateway API", "Sales forecasting"] },
                  { name: "Enterprise", price: "Custom", desc: "Built for massive regional networks.", features: ["Unlimited warehouses", "Custom rack mappings", "Dedicated account support", "SLA uptime guarantees"] }
                ].map((plan, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:border-purple-500/30 transition-all hover:-translate-y-1">
                    <div>
                      <h4 className="text-md font-extrabold text-slate-800">{plan.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 mb-6 leading-relaxed">{plan.desc}</p>
                      
                      <div className="mb-6">
                        <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                        {plan.price !== "Custom" && <span className="text-xs text-slate-400">/mo</span>}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => setView('portals')} className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-800 transition-colors">
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: FAQ ACCORDION */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-650">COMMON INQUIRIES</span>
                <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
                <p className="text-sm text-slate-650">Quick answers to help understand the scope of the Sandbox command center.</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        {faq.q}
                      </span>
                      <span>{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: FINAL FOOTER & CTA */}
            <footer className="border-t border-slate-200 bg-white py-12 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="h-8.5 w-8.5 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm">
                    Ω
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 tracking-wider uppercase">Talentspark ERP</p>
                    <p className="text-[9px] text-slate-500">© 2026 Talentspark Technologies. All rights reserved.</p>
                  </div>
                </div>

                <div className="flex gap-6 text-xs text-slate-500">
                  <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-slate-850 transition-colors">Contact Support</a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="portals"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, type: 'spring', damping: 25 }}
            className="max-w-6xl mx-auto px-6 py-20 relative z-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">SANDBOX HUB</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Choose Your Console</h2>
              <p className="text-sm text-slate-650">
                Select a dedicated workspace hub. Each portal inherits unique colors, scopes, and tools optimized for that specific role.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Admin Card */}
              <motion.div 
                whileHover={{ y: -8 }}
                onClick={() => handleRoleCardClick('admin')}
                onMouseEnter={() => setHoveredEl(true)}
                onMouseLeave={() => setHoveredEl(false)}
                className="group relative border border-slate-200 bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between min-h-[380px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-200 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Admin Console</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Oversee the entire operation. Access CRM sales pipelines, run detailed financial reports, and inspect system audit feeds.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-600 group-hover:underline">Access Portal</span>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Stockist Card */}
              <motion.div 
                whileHover={{ y: -8 }}
                onClick={() => handleRoleCardClick('stockist')}
                onMouseEnter={() => setHoveredEl(true)}
                onMouseLeave={() => setHoveredEl(false)}
                className="group relative border border-slate-200 bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between min-h-[380px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 border border-purple-200 group-hover:scale-110 transition-transform">
                    <Warehouse className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Stockist Hub</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Manage physical storage assets. Audit batch expiries, update current quantities, and optimize shelf mapping grids.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-xs font-bold text-purple-600 group-hover:underline">Access Portal</span>
                  <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Vendor Card */}
              <motion.div 
                whileHover={{ y: -8 }}
                onClick={() => handleRoleCardClick('vendor')}
                onMouseEnter={() => setHoveredEl(true)}
                onMouseLeave={() => setHoveredEl(false)}
                className="group relative border border-slate-200 bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between min-h-[380px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Vendor Console</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Fulfill regional orders, check live client queues, generate PDF invoices, and synchronize stock levels to regional hubs.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-600 group-hover:underline">Access Portal</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated Login Overlays matching user image specification exactly */}
      <AnimatePresence>
        {selectedRole && (() => {
          const theme = roleThemes[selectedRole];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[32px] p-6 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Side: Gradient Banner */}
                <div className={`md:col-span-5 rounded-[24px] bg-gradient-to-br ${theme.bgGradient} p-8 flex flex-col justify-between text-white relative overflow-hidden min-h-[360px] md:min-h-[460px]`}>
                  {/* Mesh Overlay */}
                  <div className="absolute inset-0 bg-white/5 skew-x-12 pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                  {/* Logo Asterisk (matching * logo) */}
                  <div className="text-3xl font-black font-serif tracking-tight select-none">
                    *
                  </div>

                  {/* Banner content */}
                  <div className="space-y-3 z-10">
                    <p className="text-xs text-white/80 font-semibold uppercase tracking-wider">You can easily</p>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                      {theme.avatarText}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Account credentials form matching user mockup */}
                <div className="md:col-span-7 flex flex-col justify-center px-4 py-2 relative text-slate-800">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedRole(null)}
                    onMouseEnter={() => setHoveredEl(true)}
                    onMouseLeave={() => setHoveredEl(false)}
                    className="absolute top-0 right-0 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    ✕
                  </button>

                  <div className="space-y-6">
                    {/* Asterisk Logo */}
                    <div className={`text-3xl font-black font-serif select-none ${theme.logoColor}`}>
                      *
                    </div>

                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
                      <p className="text-[11px] text-slate-500 leading-normal max-w-sm">
                        {theme.desc}
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Your email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            readOnly
                            value={theme.email}
                            className="w-full pl-10 pr-4 py-3 border border-slate-205 rounded-xl text-xs text-slate-800 font-medium focus:outline-none bg-slate-50/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            readOnly
                            value="testpassword123"
                            className="w-full pl-10 pr-10 py-3 border border-slate-205 rounded-xl text-xs text-slate-800 font-medium focus:outline-none bg-slate-50/50"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-700"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Login Launch Trigger */}
                      <button
                        onClick={() => triggerLogin(selectedRole)}
                        onMouseEnter={() => setHoveredEl(true)}
                        onMouseLeave={() => setHoveredEl(false)}
                        className={`w-full py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-95 shadow-md ${theme.btnColor}`}
                      >
                        Get Started
                      </button>

                      {/* continuation line */}
                      <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <span className="relative px-3 bg-white text-[9px] text-slate-400 font-bold uppercase tracking-wider">or continue with</span>
                      </div>

                      {/* social OAuth pills matching mockup */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <button onClick={() => triggerLogin(selectedRole)} className="py-2 px-4 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[11px] font-bold transition-all text-slate-700 text-center">
                          Bē
                        </button>
                        <button onClick={() => triggerLogin(selectedRole)} className="py-2 px-4 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[11px] font-bold transition-all text-slate-750 text-center flex items-center justify-center">
                          G
                        </button>
                        <button onClick={() => triggerLogin(selectedRole)} className="py-2 px-4 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[11px] font-bold transition-all text-slate-700 text-center">
                          f
                        </button>
                      </div>

                      <div className="text-center pt-2">
                        <span className="text-[10px] text-slate-500 font-semibold">Don't have an account? </span>
                        <button onClick={() => triggerLogin(selectedRole)} className="text-[10px] text-blue-600 font-bold hover:underline">Sign up</button>
                      </div>

                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
