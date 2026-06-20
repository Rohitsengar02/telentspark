'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Receipt, 
  CreditCard, 
  Users, 
  Settings as SettingsIcon,
  ShieldAlert,
  Save,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function Settings() {
  const [activePanel, setActivePanel] = useState<'profile' | 'gst' | 'invoice' | 'gateway' | 'plans' | 'users'>('profile');

  // Save feedback state
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:w-1/4 glass-card rounded-2xl p-5 shadow-sm space-y-2">
          <div>
            <h3 className="text-sm font-bold text-text-custom uppercase tracking-wider">System Settings</h3>
            <p className="text-[10px] text-muted-custom">Configure organizational profiles</p>
          </div>

          <div className="space-y-1.5 pt-3">
            {[
              { id: 'profile', label: 'Company Profile', icon: Building2 },
              { id: 'gst', label: 'GST & Tax Settings', icon: ShieldAlert },
              { id: 'invoice', label: 'Invoice Templates', icon: Receipt },
              { id: 'gateway', label: 'Payment Gateway', icon: CreditCard },
              { id: 'plans', label: 'Subscription Plans', icon: SettingsIcon },
              { id: 'users', label: 'Users & Roles Control', icon: Users },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
                  activePanel === item.id 
                    ? 'bg-primary text-white shadow-sm font-bold' 
                    : 'bg-white hover:bg-slate-50 border border-transparent text-slate-700'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <div className="flex-1 glass-card rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
            
            {activePanel === 'profile' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">Company Profile</h4>
                  <p className="text-[11px] text-muted-custom">Manage corporate identity details</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Company Name</label>
                    <input type="text" defaultValue="Talentspark Enterprises Ltd" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Contact Number</label>
                    <input type="text" defaultValue="+91 22 8934 8923" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Corporate Office Address</label>
                  <input type="text" defaultValue="Plot 45-B, Bandra Kurla Complex, Mumbai, MH - 400051" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary" />
                </div>
              </div>
            )}

            {activePanel === 'gst' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">GST & Taxation Configurations</h4>
                  <p className="text-[11px] text-muted-custom">Setup CGST, SGST, IGST tax structures and HSN mapping</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">GSTIN Registration Number</label>
                    <input type="text" defaultValue="27AAAAA1111A1Z1" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary uppercase font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Filing Periodicity</label>
                    <select className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary">
                      <option>Monthly (GSTR-1, GSTR-3B)</option>
                      <option>Quarterly (QRMP)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Default CGST %</label>
                    <input type="number" defaultValue="9" className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Default SGST %</label>
                    <input type="number" defaultValue="9" className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">E-Way Bill Threshold (₹)</label>
                    <input type="number" defaultValue="50000" className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'invoice' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">Invoice Templates</h4>
                  <p className="text-[11px] text-muted-custom">Configure headers, terms, and branding logo for generated invoices</p>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Invoice Number Prefix</label>
                  <input type="text" defaultValue="TS-ERP-" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Terms & Conditions Summary</label>
                  <textarea rows={3} className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary resize-none" defaultValue="Payment is due within 15 days of invoice date. All chemical materials are subject to standard warehouse liability protection guidelines." />
                </div>
              </div>
            )}

            {activePanel === 'gateway' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">Payment Gateway Integration</h4>
                  <p className="text-[11px] text-muted-custom">Link Razorpay, Cashfree, or Stripe keys to settle invoices automatically</p>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Active Aggregator</label>
                  <select className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary">
                    <option>Razorpay India (Active)</option>
                    <option>Cashfree Payments</option>
                    <option>Stripe Connect</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Merchant API Key ID</label>
                  <input type="password" value="rzp_live_89348923489234" readOnly className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none bg-slate-50 font-mono" />
                </div>
              </div>
            )}

            {activePanel === 'plans' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">Subscription & License Model</h4>
                  <p className="text-[11px] text-muted-custom">Manage active tenant seat limits and feature toggles</p>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-primary">Enterprise ERP Premium Plan</p>
                    <p className="text-[10px] text-muted-custom mt-0.5">Renews on August 24, 2026. Limit: Unlimited seats.</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                    Active
                  </span>
                </div>
              </div>
            )}

            {activePanel === 'users' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text-custom">Users & Roles Authorization</h4>
                  <p className="text-[11px] text-muted-custom">Assign security privileges to system admins and stockists</p>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[
                    { name: 'Rohit Patel (You)', role: 'Admin / Owner', email: 'rohit@talentspark.com' },
                    { name: 'Amit Sharma', role: 'Super Stockist', email: 'amit@talentspark.com' },
                    { name: 'Sanjay Rawat', role: 'Billing Operator', email: 'sanjay@talentspark.com' },
                  ].map((usr, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-800">{usr.name}</p>
                        <p className="text-[9px] text-muted-custom">{usr.email}</p>
                      </div>
                      <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[9.5px] font-semibold text-slate-600">
                        {usr.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white rounded-xl px-5 py-2.5 font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              {isSaved && (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle className="h-4 w-4" />
                  Settings saved successfully!
                </span>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
