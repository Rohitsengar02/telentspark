'use client';

import React, { useState } from 'react';
import { useAppState, UserRole } from '@/store/state';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  UserCheck, 
  Bot,
  LayoutDashboard, 
  LineChart, 
  Users, 
  ShoppingBag, 
  Package, 
  FileSpreadsheet, 
  CreditCard, 
  Activity, 
  RefreshCw, 
  Warehouse, 
  MessageSquare, 
  Sliders,
  Settings as SettingsIcon,
  Globe,
  DollarSign,
  LogOut
} from 'lucide-react';


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    activities,
    logout
  } = useAppState();


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(true);

  // Define sidebar menu options
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Analytics', icon: LineChart, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Products', icon: ShoppingBag, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Inventory', icon: Package, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Warehouse', icon: Warehouse, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'CRM', icon: Users, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Reports', icon: FileSpreadsheet, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Notifications', icon: MessageSquare, roles: ['admin', 'stockist', 'vendor'] },
    { label: 'Settings', icon: SettingsIcon, roles: ['admin', 'stockist', 'vendor'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(role));

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // Auto reset tab to avoid mismatch
    setActiveTab('Dashboard');
  };

  const getRoleBadgeColor = (r: UserRole) => {
    switch (r) {
      case 'admin': return 'bg-blue-50/10 text-blue-400 border-blue-500/20';
      case 'stockist': return 'bg-violet-50/10 text-violet-400 border-violet-500/20';
      case 'vendor': return 'bg-emerald-50/10 text-emerald-400 border-emerald-500/20';
    }
  };


  return (
    <div className="flex h-screen overflow-hidden bg-bg-custom text-text-custom">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-border-custom transform lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out flex flex-col justify-between ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border-custom bg-white">
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 bg-primary rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-200">
                Ω
              </div>
              <div>
                <h1 className="text-xs font-black tracking-wider uppercase text-text-custom">Talentspark</h1>
                <p className="text-[9px] text-muted-custom font-bold uppercase tracking-wider">Enterprise ERP</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-muted-custom transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Role Header indicator */}
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-custom uppercase tracking-wider">Active Portal</span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider ${getRoleBadgeColor(role)}`}>
              {role}
            </span>
          </div>


          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-1.5">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveTab(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all relative group ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm font-bold' 
                      : 'text-slate-600 hover:text-text-custom hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <item.icon className={`h-4.5 w-4.5 transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-400 group-hover:text-text-custom'
                  }`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  
                  {/* Glow active bar indicator */}
                  {isActive && (
                    <span className="absolute right-0 inset-y-3.5 w-1 bg-primary rounded-l-full" />
                  )}
                </button>

              );
            })}
          </nav>
        </div>

        {/* Footer Tenant seat Info */}
        <div className="p-4 border-t border-border-custom bg-slate-50/50 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8.5 w-8.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              RP
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-text-custom truncate leading-snug">Rohit Patel</p>
              <p className="text-[10px] text-muted-custom truncate capitalize">{role} level</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200/50 hover:bg-red-50 text-red-600 text-xs font-bold transition-all active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            Switch Workspace
          </button>
        </div>

      </aside>

      {/* 2. MAIN CENTER CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-border-custom flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Global Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-custom" />
              <input
                type="text"
                placeholder="Search ERP index (e.g. order ID, SKU, client)..."
                className="w-full pl-10 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>
          </div>

          {/* Right Header actions */}
          <div className="flex items-center gap-4">
            {/* Context Badge */}
            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider hidden md:inline-block ${getRoleBadgeColor(role)}`}>
              {role} Workspace
            </span>

            {/* Sync trigger */}
            <button 
              onClick={() => alert('Data sync request broadcasted to all regional warehouses')}
              className="p-2 hover:bg-slate-100 rounded-xl text-muted-custom hover:text-text-custom transition-colors"
              title="Sync state data"
            >
              <RefreshCw className="h-4.5 w-4.5" />
            </button>

            {/* Activity Switch */}
            <button 
              onClick={() => setIsActivityFeedOpen(!isActivityFeedOpen)}
              className={`p-2 rounded-xl transition-all relative ${
                isActivityFeedOpen ? 'bg-blue-50 text-primary border border-blue-100' : 'hover:bg-slate-100 text-muted-custom hover:text-text-custom'
              }`}
              title="Toggle Live Activity Feed"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
          </div>
        </header>

        {/* Dynamic content scrollable viewport */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Banner info */}
            <div className="flex justify-between items-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="z-10 relative space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary-light bg-white/10 px-2 py-0.5 rounded-full">
                  System Live Context
                </span>
                <h2 className="text-xl font-extrabold tracking-tight">SaaS Distribution ERP Portal</h2>
                <p className="text-xs text-slate-100 leading-normal max-w-md">
                  Active workspace session optimized for regional distribution logs, order tracking, and stock predictions.
                </p>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-light rounded-full blur-3xl opacity-40 pointer-events-none" />
            </div>


            {/* Main view container injection */}
            {children}
          </div>
        </main>
      </div>

      {/* 3. RIGHT PANEL - LIVE ACTIVITY FEED */}
      {isActivityFeedOpen && (
        <aside className="w-80 bg-white border-l border-border-custom hidden xl:flex flex-col h-screen">
          <div className="h-16 flex items-center justify-between px-5 border-b border-border-custom">
            <h3 className="text-xs font-black uppercase tracking-wider text-text-custom flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-primary" />
              Live Activity Feed
            </h3>
            <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              Real-time
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activities.map((act) => (
              <div 
                key={act.id} 
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:border-slate-200 transition-colors animate-in slide-in-from-right duration-300"
              >
                <div className={`p-2 rounded-lg ${
                  act.type === 'order' ? 'bg-blue-100 text-blue-700' :
                  act.type === 'invoice' ? 'bg-violet-100 text-violet-700' :
                  act.type === 'payment' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {act.type === 'order' ? <ShoppingBag className="h-4 w-4" /> :
                   act.type === 'invoice' ? <FileSpreadsheet className="h-4 w-4" /> :
                   act.type === 'payment' ? <DollarSign className="h-4 w-4" /> :
                   <Sliders className="h-4 w-4" />}
                </div>
                
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold text-slate-800 leading-normal">{act.message}</p>
                  <span className="block text-[8.5px] text-muted-custom mt-1 font-semibold">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border-custom text-center text-[10px] text-muted-custom font-semibold">
            Listening for socket broadcasts...
          </div>
        </aside>
      )}

    </div>
  );
}
