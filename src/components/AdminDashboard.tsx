'use client';

import React, { useState, useEffect } from 'react';
import { useAppState, Order } from '@/store/state';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertCircle,
  MapPin,
  Warehouse,
  Bot,
  Sparkles,
  Send,
  Calendar,
  Layers,
  ArrowUpRight,
  UserCheck,
  Maximize2,
  X
} from 'lucide-react';


export default function AdminDashboard() {
  const {
    orders,
    updateOrderStatus,
    chatMessages,
    sendChatMessage,
    warehouses
  } = useAppState();

  // Animated counters state
  const [revenue, setRevenue] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  // Chart interactivity states
  const [timeframe, setTimeframe] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
  const [metric, setMetric] = useState<'Revenue' | 'Orders' | 'Profit' | 'Growth'>('Revenue');

  // AI Chat text state
  const [chatInput, setChatInput] = useState('');

  // Selected city for heatmap details
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');

  // Modal map toggle
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Billing filter states
  const [billVendor, setBillVendor] = useState('all');
  const [billStatus, setBillStatus] = useState('all');
  const [billGst, setBillGst] = useState('all');
  const [billGateway, setBillGateway] = useState('all');
  const [billCycle, setBillCycle] = useState('30');
  const [billChartType, setBillChartType] = useState<'area' | 'bar' | 'pie'>('area');

  const getBillingChartPoints = () => {
    let base = [95, 75, 30, 15]; // base heights
    if (billVendor === 'apex') base = [80, 50, 45, 20];
    else if (billVendor === 'medlife') base = [90, 80, 60, 40];
    else if (billVendor === 'hindustan') base = [60, 40, 30, 10];

    if (billStatus === 'paid') base = base.map(val => Math.max(10, val - 15));
    else if (billStatus === 'pending') base = base.map(val => Math.min(105, val + 15));

    if (billGst === '18') base = base.map(val => Math.max(15, val - 8));
    else if (billGst === '12') base = base.map(val => Math.min(100, val + 8));

    return base;
  };



  // Count-up animation on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setRevenue(Math.floor((1245000 / steps) * currentStep));
      setOrderCount(Math.floor((1245 / steps) * currentStep));
      setProductCount(Math.floor((4500 / steps) * currentStep));
      setPendingPayments(Math.floor((235000 / steps) * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setRevenue(1245000);
        setOrderCount(1245);
        setProductCount(4500);
        setPendingPayments(235000);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // India cities metadata


  const regions = [
    { name: 'North Region', city: 'Delhi NCR', sales: '₹12,40,000', color: 'border-red-500 bg-red-50 text-red-700', badgeColor: 'bg-red-500' },
    { name: 'West Region', city: 'Mumbai', sales: '₹18,60,000', color: 'border-blue-500 bg-blue-50 text-blue-700', badgeColor: 'bg-blue-500' },
    { name: 'South Region', city: 'Bangalore', sales: '₹10,65,000', color: 'border-emerald-500 bg-emerald-50 text-emerald-700', badgeColor: 'bg-emerald-500' },
    { name: 'East Region', city: 'Kolkata', sales: '₹4,20,000', color: 'border-purple-500 bg-purple-50 text-purple-700', badgeColor: 'bg-purple-500' },
  ];

  const getActiveRegion = (city: string) => {
    if (city === 'Mumbai') return 'West Region';
    if (city === 'Delhi NCR') return 'North Region';
    if (city === 'Kolkata') return 'East Region';
    return 'South Region';
  };


  // Mock revenue chart coordinates generator based on metric & timeframe
  const getChartPath = () => {
    // Return different paths for premium SVG feel
    const seed = metric === 'Revenue' ? [120, 90, 140, 70, 110, 50, 40] :
      metric === 'Orders' ? [100, 110, 80, 95, 60, 75, 55] :
        metric === 'Profit' ? [130, 115, 125, 95, 80, 65, 45] :
          [140, 120, 130, 110, 105, 90, 85]; // Growth

    return `M 40,${seed[0]} L 120,${seed[1]} L 200,${seed[2]} L 280,${seed[3]} L 360,${seed[4]} L 440,${seed[5]} L 520,${seed[6]}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Total Revenue', value: `₹${revenue.toLocaleString('en-IN')}`, icon: TrendingUp, change: '+14.2% from last month', color: 'from-blue-500 to-indigo-600' },
          { title: 'Orders Placed', value: orderCount.toLocaleString('en-IN'), icon: ShoppingBag, change: '+8.4% since last week', color: 'from-emerald-500 to-teal-600' },
          { title: 'Products Managed', value: productCount.toLocaleString('en-IN'), icon: Package, change: '15 categories', color: 'from-violet-500 to-purple-600' },
          { title: 'Pending Payments', value: `₹${pendingPayments.toLocaleString('en-IN')}`, icon: AlertCircle, change: '12 accounts outstanding', color: 'from-amber-500 to-orange-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-custom mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-text-custom tracking-tight">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${kpi.color} text-white shadow-md`}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{kpi.change}</span>
            </div>
            {/* Soft background light orb */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Main Analytics + Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue Analytics Graph */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-custom">
            <div>
              <h3 className="text-lg font-bold text-text-custom">Revenue Analytics</h3>
              <p className="text-xs text-muted-custom">Interactive projection mapping</p>
            </div>
            {/* Metric Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {(['Revenue', 'Orders', 'Profit', 'Growth'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${metric === m
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-custom hover:text-text-custom'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>

          </div>

          <div className="py-6 relative h-64 w-full">
            <svg viewBox="0 0 560 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="520" y2="20" stroke="#E2E8F0" strokeDasharray="4 4" />
              <line x1="40" y1="70" x2="520" y2="70" stroke="#E2E8F0" strokeDasharray="4 4" />
              <line x1="40" y1="120" x2="520" y2="120" stroke="#E2E8F0" strokeDasharray="4 4" />
              <line x1="40" y1="150" x2="520" y2="150" stroke="#E2E8F0" />

              {/* Chart Line path */}
              <path
                d={getChartPath()}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Gradient Area path */}
              <path
                d={`${getChartPath()} L 520,150 L 40,150 Z`}
                fill="url(#chartGradient)"
                className="transition-all duration-500"
              />

              {/* Data points */}
              {[40, 120, 200, 280, 360, 440, 520].map((cx, i) => {
                const seed = metric === 'Revenue' ? [120, 90, 140, 70, 110, 50, 40] :
                  metric === 'Orders' ? [100, 110, 80, 95, 60, 75, 55] :
                    metric === 'Profit' ? [130, 115, 125, 95, 80, 65, 45] :
                      [140, 120, 130, 110, 105, 90, 85];
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={seed[i]}
                    r="5"
                    fill="#FFFFFF"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                    className="cursor-pointer hover:r-7 transition-all"
                  />
                );
              })}
            </svg>
            <div className="flex justify-between text-[10px] font-semibold text-muted-custom px-4 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-border-custom pt-4">
            <span className="text-muted-custom">Current Selection: <strong className="text-text-custom font-semibold">{metric} ({timeframe})</strong></span>
            <span className="text-emerald-600 font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.4% growth index
            </span>
          </div>
        </div>

        {/* Distribution Heatmap (Real Google Map Integration) */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between border-2 border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative group/map">
          {/* Highlight indicator tag */}
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-primary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
            Live Network
          </div>

          <div className="flex justify-between items-center pb-2 pt-2">
            <div>
              <h3 className="text-lg font-bold text-text-custom">Distribution Heatmap</h3>
              <p className="text-xs text-muted-custom">Real Google Map warehouse connectivity</p>
            </div>
            {/* City Selector Pills */}

          </div>

          <div className="relative h-64 bg-slate-100 border border-slate-150 rounded-2xl my-4 overflow-hidden shadow-inner group/iframe">
            {/* Real Interactive Google Maps iframe center query dynamically synced */}
            <iframe
              title="Talentspark distribution map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedCity === 'Delhi NCR' ? 'Delhi' : selectedCity
              )}+Warehouse+India&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              className="grayscale-[15%] contrast-[105%] opacity-90 transition-all duration-500 group-hover/iframe:grayscale-0"
            />

            {/* Large View Maximize Button */}
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg text-slate-700 hover:text-primary transition-all active:scale-95 z-10 flex items-center justify-center cursor-pointer"
              title="Expand Large View"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {/* Regions Overlay Sidebar on Map */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 max-w-[130px] pointer-events-auto">
              {regions.map((reg) => {
                const isActive = getActiveRegion(selectedCity) === reg.name;
                return (
                  <button
                    key={reg.name}
                    onClick={() => {
                      setSelectedCity(reg.city);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-left text-[9px] font-bold shadow-sm transition-all duration-300 ${isActive
                      ? `${reg.color} scale-105 border-opacity-100 font-black`
                      : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${reg.badgeColor}`} />
                      <span>{reg.name}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-[8px] opacity-80">Sales: {reg.sales}</p>
                  </button>
                );
              })}
            </div>


          </div>

          <div className="text-center text-[10px] text-slate-400 font-semibold">
            Select regional pills above to center interactive Google Map coordinates
          </div>
        </div>

      </div>

      {/* Warehouse Overview + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-custom">Recent Orders</h3>
              <p className="text-xs text-muted-custom">Real-time order workflow ledger</p>
            </div>
            <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
              View all orders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-muted-custom border-b border-slate-100">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Vendor</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 4).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 font-bold text-text-custom">{order.id}</td>
                    <td className="py-3 font-medium text-slate-700">{order.customer}</td>
                    <td className="py-3 text-muted-custom">{order.vendor}</td>
                    <td className="py-3 font-bold text-text-custom">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            order.status === 'Approved' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                              'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Warehouse Overview */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-custom">Warehouse Space Overview</h3>
            <p className="text-xs text-muted-custom">Storage and rack optimization</p>
          </div>

          <div className="space-y-4 my-4">
            {warehouses.map((wh) => {
              const utilPercent = Math.round((wh.used / wh.capacity) * 100);
              return (
                <div key={wh.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 flex items-center">
                      <Warehouse className="h-3.5 w-3.5 mr-1 text-primary-light" />
                      {wh.name.split(' ')[0]} Hub
                    </span>
                    <span className="text-text-custom">{utilPercent}% Used</span>
                  </div>
                  {/* Utilization bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${utilPercent > 85 ? 'bg-danger' :
                        utilPercent > 65 ? 'bg-warning' : 'bg-primary'
                        }`}
                      style={{ width: `${utilPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-custom">
                    <span>Used: {wh.used.toLocaleString()} units</span>
                    <span>Cap: {wh.capacity.toLocaleString()} units</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-custom leading-normal">
              Warning: <strong className="text-text-custom font-semibold">Chennai Port Storage</strong> is operating near safety capacity. Relocate batch orders to Delhi Hub.
            </p>
          </div>
        </div>
      </div>

      {/* Vendor Billing Hub Section */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200">

        {/* Hub Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-custom flex items-center gap-1.5">
                Vendor Billing & Accounts Hub
                <span className="inline-flex px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Billing Mode Active
                </span>
              </h3>
              <p className="text-xs text-muted-custom">Manage ledger records, GST, invoices, and payment cycles</p>
            </div>
          </div>
        </div>

        {/* 6 Select Customizers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {/* 1. Vendor Selection */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Vendor</label>
            <select
              value={billVendor}
              onChange={(e) => setBillVendor(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All Vendors</option>
              <option value="apex">Apex Chem Co</option>
              <option value="medlife">MedLife Ltd</option>
              <option value="hindustan">Hindustan Inc</option>
            </select>
          </div>

          {/* 2. Billing Status */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</label>
            <select
              value={billStatus}
              onChange={(e) => setBillStatus(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="disputed">Disputed</option>
            </select>
          </div>

          {/* 3. GST Rate */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">GST Slab</label>
            <select
              value={billGst}
              onChange={(e) => setBillGst(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All Rates</option>
              <option value="18">18% GST</option>
              <option value="12">12% GST</option>
              <option value="5">5% GST</option>
              <option value="exempt">Exempt</option>
            </select>
          </div>

          {/* 4. Payment Channel */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Gateway Mode</label>
            <select
              value={billGateway}
              onChange={(e) => setBillGateway(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All Methods</option>
              <option value="bank">Bank Transfer</option>
              <option value="upi">UPI/GPay</option>
              <option value="cc">Credit Card</option>
              <option value="cash">Cash/Cheque</option>
            </select>
          </div>

          {/* 5. Billing Cycle */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Cycle Term</label>
            <select
              value={billCycle}
              onChange={(e) => setBillCycle(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="30">Net 30</option>
              <option value="15">Net 15</option>
              <option value="weekly">Weekly Reconcile</option>
              <option value="monthly">Monthly Close</option>
            </select>
          </div>

          {/* 6. Export Format */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Export Ledger</label>
            <select
              onChange={(e) => {
                alert(`Exporting current filtered invoice ledger as ${e.target.value.toUpperCase()}...`);
                e.target.value = 'default';
              }}
              className="w-full bg-slate-900 text-white border border-transparent rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="default">Download Reports</option>
              <option value="pdf">PDF Ledger</option>
              <option value="excel">Excel Summary</option>
              <option value="csv">CSV Audit log</option>
              <option value="json">JSON Raw state</option>
            </select>
          </div>
        </div>

        {/* Dynamic Billing Chart with Area Gradient */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          <div className="lg:col-span-8 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between bg-slate-50/30">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Billing Growth Trend</h4>
                <p className="text-[10px] text-slate-500">Filtered invoice disbursements and cash outflows</p>
              </div>

              {/* Chart type toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[10px] font-bold">
                {(['area', 'bar', 'pie'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setBillChartType(t)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all ${billChartType === t
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-custom hover:text-text-custom'
                      }`}
                  >
                    {t} Chart
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4 h-48 w-full relative flex items-center justify-center">
              {(() => {
                const points = getBillingChartPoints();

                if (billChartType === 'area') {
                  return (
                    <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="billGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="20" y1="10" x2="480" y2="10" stroke="#F1F5F9" />
                      <line x1="20" y1="50" x2="480" y2="50" stroke="#F1F5F9" />
                      <line x1="20" y1="90" x2="480" y2="90" stroke="#F1F5F9" />
                      <line x1="20" y1="110" x2="480" y2="110" stroke="#E2E8F0" />

                      {/* SVG Curve */}
                      <path
                        d={`M 20,${points[0]} Q 100,${points[0] - 20} 180,${points[1]} T 340,${points[2]} T 480,${points[3]}`}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Area Gradient fill */}
                      <path
                        d={`M 20,${points[0]} Q 100,${points[0] - 20} 180,${points[1]} T 340,${points[2]} T 480,${points[3]} L 480,110 L 20,110 Z`}
                        fill="url(#billGradient)"
                      />

                      {/* Markers */}
                      <circle cx="20" cy={points[0]} r="4.5" fill="#FFFFFF" stroke="var(--color-primary)" strokeWidth="3" />
                      <circle cx="180" cy={points[1]} r="4.5" fill="#FFFFFF" stroke="var(--color-primary)" strokeWidth="3" />
                      <circle cx="340" cy={points[2]} r="4.5" fill="#FFFFFF" stroke="var(--color-primary)" strokeWidth="3" />
                      <circle cx="480" cy={points[3]} r="4.5" fill="#FFFFFF" stroke="var(--color-primary)" strokeWidth="3" />
                    </svg>
                  );
                } else if (billChartType === 'bar') {
                  return (
                    <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" />
                          <stop offset="100%" stopColor="var(--color-primary-light)" />
                        </linearGradient>
                      </defs>
                      <line x1="20" y1="10" x2="480" y2="10" stroke="#F1F5F9" />
                      <line x1="20" y1="50" x2="480" y2="50" stroke="#F1F5F9" />
                      <line x1="20" y1="90" x2="480" y2="90" stroke="#F1F5F9" />
                      <line x1="20" y1="110" x2="480" y2="110" stroke="#E2E8F0" />

                      {points.map((pt, i) => (
                        <rect
                          key={i}
                          x={35 + i * 125}
                          y={pt}
                          width="55"
                          height={110 - pt}
                          rx="8"
                          fill="url(#barGrad)"
                          className="transition-all duration-500 hover:opacity-90"
                        />
                      ))}
                    </svg>
                  );
                } else {
                  // Pie Chart
                  const total = points.reduce((a, b) => a + b, 0);
                  const p1 = Math.round((points[0] / total) * 360);
                  const p2 = Math.round((points[1] / total) * 360);
                  const p3 = Math.round((points[2] / total) * 360);
                  const p4 = 360 - (p1 + p2 + p3);

                  const d1 = Math.round((p1 / 360) * 440);
                  const d2 = Math.round((p2 / 360) * 440);
                  const d3 = Math.round((p3 / 360) * 440);
                  const d4 = Math.round((p4 / 360) * 440);

                  return (
                    <div className="flex items-center gap-12 w-full justify-center">
                      <svg viewBox="0 0 200 200" className="w-32 h-32 overflow-visible transform -rotate-90">
                        <circle cx="100" cy="100" r="70" fill="transparent" stroke="#2563EB" strokeWidth="24" strokeDasharray={`${d1} 440`} strokeDashoffset="0" />
                        <circle cx="100" cy="100" r="70" fill="transparent" stroke="#8B5CF6" strokeWidth="24" strokeDasharray={`${d2} 440`} strokeDashoffset={-d1} />
                        <circle cx="100" cy="100" r="70" fill="transparent" stroke="#10B981" strokeWidth="24" strokeDasharray={`${d3} 440`} strokeDashoffset={-(d1 + d2)} />
                        <circle cx="100" cy="100" r="70" fill="transparent" stroke="#EF4444" strokeWidth="24" strokeDasharray={`${d4} 440`} strokeDashoffset={-(d1 + d2 + d3)} />
                      </svg>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-bold text-slate-650">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-600 rounded" /> West ({Math.round(p1 / 3.6)}%)</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded" /> East ({Math.round(p2 / 3.6)}%)</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded" /> South ({Math.round(p3 / 3.6)}%)</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded" /> North ({Math.round(p4 / 3.6)}%)</div>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>

            {billChartType !== 'pie' && (
              <div className="flex justify-between text-[9px] text-slate-450 font-bold px-2 mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            )}
          </div>


          {/* Tax breakdowns and stats */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-2 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reconciliation Progress</span>
                <h4 className="text-xl font-bold text-slate-800 mt-1">94.2% Done</h4>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94.2%' }} />
              </div>
              <p className="text-[9px] text-slate-450 font-semibold">12 outstanding bills require manual matching</p>
            </div>

            <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Taxation (GST) splits</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">CGST</span>
                  <span className="text-[10px] font-bold text-slate-800">9% (₹32K)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">SGST</span>
                  <span className="text-[10px] font-bold text-slate-800">9% (₹32K)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">IGST</span>
                  <span className="text-[10px] font-bold text-slate-800">18% (₹88K)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Invoice Reconciliation Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Unreconciled Invoices Ledger</h4>
            <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded-full font-bold">12 Total Bills Pending</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-muted-custom border-b border-slate-100">
                  <th className="pb-3 font-semibold">Bill Reference</th>
                  <th className="pb-3 font-semibold">Vendor Name</th>
                  <th className="pb-3 font-semibold">Bill Date</th>
                  <th className="pb-3 font-semibold">Amount Due</th>
                  <th className="pb-3 font-semibold">Tax (GST)</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { ref: 'BILL-4921', vendor: 'Apex Chem Co', date: '2026-06-18', amount: 145000, tax: 26100, status: 'Unpaid' },
                  { ref: 'BILL-4922', vendor: 'MedLife Ltd', date: '2026-06-15', amount: 82000, tax: 9840, status: 'Pending' },
                  { ref: 'BILL-4923', vendor: 'Hindustan Inc', date: '2026-06-12', amount: 205000, tax: 36900, status: 'Disputed' },
                ].map((bill) => (
                  <tr key={bill.ref} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 font-bold text-text-custom">{bill.ref}</td>
                    <td className="py-3.5 font-medium text-slate-700">{bill.vendor}</td>
                    <td className="py-3.5 text-muted-custom">{bill.date}</td>
                    <td className="py-3.5 font-bold text-text-custom">₹{bill.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 font-semibold text-slate-550">₹{bill.tax.toLocaleString('en-IN')}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${bill.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        bill.status === 'Unpaid' ? 'bg-red-50 text-red-600 border border-red-200' :
                          'bg-violet-50 text-violet-650 border border-violet-200'
                        }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => alert(`Billing reference ${bill.ref} payment initiated.`)}
                          className="px-2.5 py-1 rounded bg-primary hover:bg-primary-dark text-white font-bold text-[9px] transition-colors"
                        >
                          Approve Payment
                        </button>
                        <button
                          onClick={() => alert(`Invoice ${bill.ref} marked as disputed.`)}
                          className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-[9px] transition-colors"
                        >
                          Flag Dispute
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Large Map View Modal Overlay */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-[28px] p-6 shadow-2xl overflow-hidden flex flex-col justify-between h-[85vh]">

            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-850 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Expanded Logistics Map
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Pan-India hub tracking and order matrices</p>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Grid content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 py-4 overflow-hidden">
              {/* Left Iframe Map View */}
              <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative h-full min-h-[300px]">
                <iframe
                  title="Large map view"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedCity === 'Delhi NCR' ? 'Delhi' : selectedCity
                  )}+Warehouse+India&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                />

                {/* Modal Regions Overlay Sidebar */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 max-w-[130px] pointer-events-auto">
                  {regions.map((reg) => {
                    const isActive = getActiveRegion(selectedCity) === reg.name;
                    return (
                      <button
                        key={reg.name}
                        onClick={() => {
                          setSelectedCity(reg.city);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-left text-[9px] font-bold shadow-sm transition-all duration-300 ${isActive
                          ? `${reg.color} scale-105 border-opacity-100 font-black`
                          : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-700 hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${reg.badgeColor}`} />
                          <span>{reg.name}</span>
                        </div>
                        <p className="mt-0.5 font-mono text-[8px] opacity-80">Sales: {reg.sales}</p>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Right Side City Index list */}
              <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Hubs</h4>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Active hub context: <strong className="text-primary">{selectedCity}</strong></span>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

