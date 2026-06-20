'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  Download,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState<'Revenue' | 'Profit' | 'Inventory' | 'Vendor'>('Revenue');

  const triggerExport = (format: 'PDF' | 'Excel' | 'CSV') => {
    alert(`Exporting ${reportType} report as ${format}. The download will start automatically in 2 seconds.`);
  };

  const getMetricData = () => {
    switch (reportType) {
      case 'Revenue':
        return {
          title: 'Revenue & Sales Recovery',
          total: '₹42,50,000',
          growth: '+18.4% YoY',
          desc: 'Monthly distribution revenue audit trail and payment collection indexes.',
          dataset: [
            { label: 'Q1 Sales', val: '₹12.4L', fill: 'w-[45%]' },
            { label: 'Q2 Sales', val: '₹18.9L', fill: 'w-[68%]' },
            { label: 'Q3 Forecast', val: '₹22.5L', fill: 'w-[85%]' },
          ]
        };
      case 'Profit':
        return {
          title: 'Gross Margin & Profit Optimization',
          total: '₹8,45,000',
          growth: '+12.6% YoY',
          desc: 'Net profitability after accounting for SGST, CGST, and logistics freight corridors.',
          dataset: [
            { label: 'Chemicals Profit', val: '₹4.2L', fill: 'w-[75%]' },
            { label: 'Plastics Margin', val: '₹2.8L', fill: 'w-[50%]' },
            { label: 'Solvents Return', val: '₹1.4L', fill: 'w-[25%]' },
          ]
        };
      case 'Inventory':
        return {
          title: 'Warehouse Valuation & Shelf Utilization',
          total: '₹24,80,000',
          growth: '9,320 Units Held',
          desc: 'Total capitalization value of physical inventory currently stored across all hubs.',
          dataset: [
            { label: 'Mumbai Hub', val: '₹12.5L', fill: 'w-[65%]' },
            { label: 'Delhi NCR Storage', val: '₹8.1L', fill: 'w-[45%]' },
            { label: 'Chennai Port', val: '₹4.2L', fill: 'w-[25%]' },
          ]
        };
      case 'Vendor':
        return {
          title: 'Vendor Fulfillment Index',
          total: '94.8% SLA Score',
          growth: '15 Active Suppliers',
          desc: 'Fulfillment accuracy tracking packing velocity and delay ratios.',
          dataset: [
            { label: 'Apex Chem Co', val: '98% SLA', fill: 'w-[98%]' },
            { label: 'MedLife Ltd', val: '92% SLA', fill: 'w-[92%]' },
            { label: 'Hindustan Inc', val: '88% SLA', fill: 'w-[88%]' },
          ]
        };
    }
  };

  const reportMeta = getMetricData();

  return (
    <div className="space-y-6">
      {/* Selector Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'Revenue', title: 'Revenue & Sales', desc: 'B2B billing metrics', icon: TrendingUp },
          { id: 'Profit', title: 'Margins & Profit', desc: 'SLA margin trackers', icon: Award },
          { id: 'Inventory', title: 'Inventory Valuation', desc: 'WH capitalization logs', icon: Layers },
          { id: 'Vendor', title: 'Vendor Fulfillment', desc: 'Logistics SLA tracking', icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id as any)}
            className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between h-32 group ${
              reportType === tab.id 
                ? 'bg-primary border-primary text-white shadow-md' 
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <div className={`p-2 rounded-lg ${
                reportType === tab.id ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
              }`}>
                <tab.icon className="h-4.5 w-4.5" />
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${
                reportType === tab.id ? 'text-blue-100' : 'text-muted-custom'
              }`}>
                {tab.id}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold truncate leading-snug">{tab.title}</h4>
              <p className={`text-[9px] ${reportType === tab.id ? 'text-blue-100/80' : 'text-muted-custom'} mt-0.5`}>
                {tab.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Main Graph/Sum details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric display details */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-start pb-3 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[9px] text-primary font-bold uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  Interactive Audit Log
                </span>
                <h3 className="text-base font-bold text-text-custom mt-2">{reportMeta.title}</h3>
                <p className="text-xs text-muted-custom mt-0.5">{reportMeta.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-primary">{reportMeta.total}</p>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center justify-end mt-0.5">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {reportMeta.growth}
                </span>
              </div>
            </div>

            {/* Custom SVG/Bar chart for report stats */}
            <div className="space-y-5 my-8">
              {reportMeta.dataset.map((row, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{row.label}</span>
                    <span className="text-primary">{row.val}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-primary rounded-full transition-all duration-1000 ${row.fill}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2.5 items-center justify-between text-xs text-muted-custom">
            <span>Audit parameters: FY 2026-27 Q3 intervals</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Generated: Live sync</span>
          </div>
        </div>

        {/* Download Actions Panel */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-text-custom">Executive Exports</h3>
            <p className="text-xs text-muted-custom">Generate offline summaries for stake holders</p>
          </div>

          <div className="space-y-3.5 my-6">
            <button
              onClick={() => triggerExport('PDF')}
              className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold">Export PDF Document</p>
                <p className="text-[9px] text-muted-custom mt-0.5">High fidelity formatting</p>
              </div>
              <Download className="h-4 w-4 text-muted-custom" />
            </button>

            <button
              onClick={() => triggerExport('Excel')}
              className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <FileSpreadsheet className="h-4.5 w-4.5" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold">Export Excel Spreadsheet</p>
                <p className="text-[9px] text-muted-custom mt-0.5">Raw transaction data columns</p>
              </div>
              <Download className="h-4 w-4 text-muted-custom" />
            </button>

            <button
              onClick={() => triggerExport('CSV')}
              className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileSpreadsheet className="h-4.5 w-4.5" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold">Export Flat CSV Logs</p>
                <p className="text-[9px] text-muted-custom mt-0.5">Comma separated structures</p>
              </div>
              <Download className="h-4 w-4 text-muted-custom" />
            </button>
          </div>

          <div className="text-center text-[10px] text-muted-custom">
            Exports contain SHA-256 integrity signature audits
          </div>
        </div>
      </div>
    </div>
  );
}
