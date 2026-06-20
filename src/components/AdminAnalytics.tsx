'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign, 
  Percent, 
  Activity, 
  Clock, 
  Layers, 
  Compass, 
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle,
  TrendingDown,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function AdminAnalytics() {
  const [activeSegment, setActiveSegment] = useState<'all' | 'regional' | 'tax'>('all');
  const [liveTicks, setLiveTicks] = useState<{ id: string; msg: string; time: string; value: string }[]>([]);

  // States for interactive sliders/details
  const [selectedCohortMonth, setSelectedCohortMonth] = useState<string>('Jan');
  const [activeForecastItem, setActiveForecastItem] = useState<string>('Ethanol');

  // Animated numbers state
  const [kpiStats, setKpiStats] = useState({ revenue: 0, margin: 0, velocity: 0, collection: 0 });

  useEffect(() => {
    // Count-up stats animation on mount
    const timer = setTimeout(() => {
      setKpiStats({
        revenue: 4250000,
        margin: 68.4,
        velocity: 18.5,
        collection: 22
      });
    }, 100);

    // Live transaction logger simulation
    const interval = setInterval(() => {
      const logs = [
        { id: Math.random().toString(), msg: "Apex Chem billing approved", time: "Just now", value: "₹1,45,000" },
        { id: Math.random().toString(), msg: "SGST reconciliation completed Delhi", time: "1m ago", value: "Reconciled" },
        { id: Math.random().toString(), msg: "Hindustan Inc invoice issued", time: "3m ago", value: "₹2,05,000" },
        { id: Math.random().toString(), msg: "WhatsApp dispatch alert triggered", time: "5m ago", value: "Sent" }
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setLiveTicks(prev => [randomLog, ...prev.slice(0, 4)]);
    }, 4000);

    // Initial log state
    setLiveTicks([
      { id: '1', msg: "Mumbai warehouse dispatch log synced", time: "2m ago", value: "Synced" },
      { id: '2', msg: "MedLife payment cleared", time: "5m ago", value: "₹82,000" },
      { id: '3', msg: "IGST 18% slab auto-calculated", time: "8m ago", value: "₹88,000" }
    ]);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-8 pb-12">
      
      {/* SECTION 1: HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Executive Analytics</h2>
          <p className="text-xs text-slate-500 font-semibold">10-Section Animated Performance Dashboard</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['all', 'regional', 'tax'] as const).map(seg => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  activeSegment === seg 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {seg === 'all' ? 'Unified overview' : `${seg} index`}
              </button>
            ))}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm text-slate-500 hover:text-slate-800 transition-all active:scale-95"
            title="Refresh analytics data"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* SECTION 2: EXECUTIVE KPI SCORECARD GRID (4 Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Net Billed Revenue', value: `₹${(kpiStats.revenue / 100000).toFixed(1)}L`, change: '+18.4% YoY', desc: 'Total invoice volume generated', icon: DollarSign, color: 'from-blue-500 to-indigo-650' },
          { title: 'Gross Profit Margin', value: `${kpiStats.margin}%`, change: '+2.1% target', desc: 'Average vendor rebate ratio', icon: Percent, color: 'from-emerald-500 to-teal-650' },
          { title: 'Invoice Velocity', value: `${kpiStats.velocity} hrs`, change: '-3.2 hrs speedup', desc: 'Avg drafting to approval lag', icon: Clock, color: 'from-purple-500 to-violet-650' },
          { title: 'Days Sales Outstanding (DSO)', value: `${kpiStats.collection} Days`, change: '-4 days decrease', desc: 'Avg vendor credit collection time', icon: Activity, color: 'from-rose-500 to-pink-600' }
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{kpi.title}</p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</h3>
              </div>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${kpi.color} text-white shadow-sm group-hover:scale-105 transition-transform`}>
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{kpi.change}</span>
              <span className="text-[9px] text-slate-450 font-bold">{kpi.desc}</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-50 rounded-full blur-xl pointer-events-none" />
          </motion.div>
        ))}
      </section>

      {/* TWO COLUMN INTERACTIVE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 3: REVENUE OUTFLOW VS INFLOW GRAPH */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Inflow vs Outflow Cash Cycle</h3>
              <p className="text-[10px] text-slate-400 font-bold">Monthly cash flow and disbursement tracking</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
              <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded-full" /> Collections</div>
              <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> Disbursements</div>
            </div>
          </div>

          <div className="py-6 h-64 w-full relative">
            <svg viewBox="0 0 500 130" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="inGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="outGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="20" y1="10" x2="480" y2="10" stroke="#F8FAFC" />
              <line x1="20" y1="50" x2="480" y2="50" stroke="#F1F5F9" />
              <line x1="20" y1="90" x2="480" y2="90" stroke="#F1F5F9" />
              <line x1="20" y1="120" x2="480" y2="120" stroke="#E2E8F0" />
              
              {/* Inflow path */}
              <path
                d="M 20,95 Q 100,25 180,60 T 340,30 T 480,15"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M 20,95 Q 100,25 180,60 T 340,30 T 480,15 L 480,120 L 20,120 Z" fill="url(#inGradient)" />

              {/* Outflow path */}
              <path
                d="M 20,105 Q 100,75 180,85 T 340,55 T 480,40"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />
              <path d="M 20,105 Q 100,75 180,85 T 340,55 T 480,40 L 480,120 L 20,120 Z" fill="url(#outGradient)" />
            </svg>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold px-2 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRODUCT CATEGORY PERFORMANCE HUB */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Product Categories</h3>
            <p className="text-[10px] text-slate-400 font-bold">Distribution values and volume metrics</p>
          </div>

          <div className="space-y-4 my-6">
            {[
              { cat: 'Chemicals', val: '₹18,50,000', percentage: 74, color: 'bg-blue-600' },
              { cat: 'Solvents', val: '₹10,50,000', percentage: 48, color: 'bg-purple-500' },
              { cat: 'Plastics', val: '₹8,25,000', percentage: 38, color: 'bg-emerald-500' },
              { cat: 'Organics', val: '₹5,25,000', percentage: 22, color: 'bg-amber-500' }
            ].map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{p.cat}</span>
                  <span className="text-slate-800">{p.val} <span className="text-[10px] text-slate-400 font-normal">({p.percentage}%)</span></span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-[10px] text-slate-450 font-bold">
            Total active inventory categories: 15
          </div>
        </div>
      </div>

      {/* THREE CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SECTION 5: REGIONAL TARGET MATRIX */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4.5 h-4.5 text-primary" />
              Regional Target Matrix
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">Sales targets against current outputs</p>
          </div>

          <div className="space-y-3.5 my-4">
            {[
              { reg: 'West Zone', target: '₹20L', current: '₹18.6L', ratio: 93, color: 'bg-blue-600' },
              { reg: 'North Zone', target: '₹15L', current: '₹12.4L', ratio: 82, color: 'bg-red-500' },
              { reg: 'South Zone', target: '₹12L', current: '₹10.6L', ratio: 88, color: 'bg-emerald-500' }
            ].map((r, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{r.reg}</span>
                  <span className="text-slate-500">{r.current} / {r.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.ratio}%` }} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-800">{r.ratio}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[9px] text-slate-450 font-bold border-t border-slate-100 pt-3">
            Regional Close Ratio: <strong className="text-slate-750">87.5% average</strong>
          </div>
        </div>

        {/* SECTION 6: WAREHOUSE UTILIZATION INDEX */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              Warehouse Safety Limits
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">Utilized limits against maximum safety cap</p>
          </div>

          <div className="my-3 space-y-4">
            {[
              { name: 'Mumbai Central', limit: '7,200 / 10K', level: 'Near Cap', cap: 72, color: 'bg-blue-600' },
              { name: 'Delhi NCR', limit: '4,800 / 8K', level: 'Safe', cap: 60, color: 'bg-emerald-500' },
              { name: 'Chennai Port', limit: '9,100 / 12K', level: 'Critical Limit', cap: 91, color: 'bg-red-500' }
            ].map((w, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">{w.name}</p>
                  <p className="text-[9px] text-slate-450 font-semibold">{w.limit} units</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                  w.cap > 90 ? 'bg-red-100 text-red-700' :
                  w.cap > 70 ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                }`}>{w.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: TAX EXCLUSION COMPLIANCE (CGST, SGST, IGST) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4.5 h-4.5 text-primary" />
              Tax Compliance Splits
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">Monthly taxation slab reconciliations</p>
          </div>

          <div className="relative h-28 flex items-center justify-center my-2">
            <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#2563EB" strokeWidth="12" strokeDasharray="130 220" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray="60 220" strokeDashoffset="-130" />
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="30 220" strokeDashoffset="-190" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-slate-800">₹1.5L</span>
              <span className="text-[7.5px] uppercase font-bold text-slate-450 tracking-wider">Tax Billed</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] font-bold text-slate-500">
            <div className="flex flex-col"><span className="text-blue-600">₹88K</span><span>IGST (18%)</span></div>
            <div className="flex flex-col border-x border-slate-100"><span className="text-purple-600">₹32K</span><span>CGST (9%)</span></div>
            <div className="flex flex-col"><span className="text-red-500">₹32K</span><span>SGST (9%)</span></div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN DETAILS TAB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 8: CUSTOMER COHORT RETENTION */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Cohort Retention Ledger</h3>
              <p className="text-[10px] text-slate-400 font-bold">Month-on-month repeat vendor billing rates</p>
            </div>
            
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-[9px] font-bold">
              {['Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedCohortMonth(m)}
                  className={`px-2 py-1 rounded-lg transition-all ${selectedCohortMonth === m ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 flex-1 justify-center flex flex-col">
            {[
              { stage: 'Month 0 (Initial signup)', rate: 100, label: '34 accounts active' },
              { stage: 'Month 1 (First billing repeat)', rate: 82, label: '28 accounts repeating' },
              { stage: 'Month 2 (Consistent pipeline)', rate: 64, label: '22 accounts consistent' },
              { stage: 'Month 3 (Contract maturity)', rate: 58, label: '19 accounts contract' }
            ].map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{c.stage}</span>
                  <span className="text-slate-500">{c.rate}% retention <span className="text-[9px] font-normal">({c.label})</span></span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${c.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: REGRESSION DEMAND FORECASTING */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">AI Demand Regression</h3>
              <p className="text-[10px] text-slate-400 font-bold">Q3 predicted inventory volume needs</p>
            </div>
            
            <select 
              value={activeForecastItem} 
              onChange={(e) => setActiveForecastItem(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-bold text-slate-700 focus:outline-none"
            >
              <option value="Ethanol">Ethanol 99%</option>
              <option value="Silica">Silica Grade</option>
              <option value="Polymer">Polymer Beads</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-550">Target Stock:</span>
              <span className="text-xs font-black text-slate-800">
                {activeForecastItem === 'Ethanol' ? '4,500 units' : activeForecastItem === 'Silica' ? '1,200 units' : '850 units'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-550">AI Expected Spike (Q3):</span>
              <span className="text-xs font-black text-emerald-600">
                {activeForecastItem === 'Ethanol' ? '+24%' : activeForecastItem === 'Silica' ? '+18%' : '+12%'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-550">Confidence Rate:</span>
              <span className="text-xs font-mono font-black text-slate-800">
                {activeForecastItem === 'Ethanol' ? '91.4%' : activeForecastItem === 'Silica' ? '88.5%' : '84.2%'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-550">Safety Reserve Target:</span>
              <span className="text-xs font-black text-primary">
                {activeForecastItem === 'Ethanol' ? '+150 units' : activeForecastItem === 'Silica' ? '+80 units' : '+40 units'}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2 mt-4 text-[10px] text-primary font-bold">
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Recommendation: Automatically dispatch reserve batches based on Q3 predicted threshold.</span>
          </div>
        </div>
      </div>

      {/* SECTION 10: LIVE TRANSACTION STREAMING LOGS */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-slate-850/5 skew-x-12 pointer-events-none" />
        <div className="flex items-center justify-between pb-4 border-b border-slate-850 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Live Transaction Streaming Logs</h3>
          </div>
          <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">Reconciler Webhook</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {liveTicks.map((tick) => (
              <motion.div
                key={tick.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col justify-between h-24 text-[11px]"
              >
                <div className="flex justify-between items-start text-[9px] text-slate-500 font-bold">
                  <span>{tick.time}</span>
                  <span className="text-emerald-500 uppercase tracking-wide">{tick.value}</span>
                </div>
                <p className="font-bold text-slate-300 leading-snug mt-2 truncate">{tick.msg}</p>
                <div className="text-[8px] text-slate-600 font-mono tracking-wider mt-1">BROADCASTING NODE // 200 OK</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
