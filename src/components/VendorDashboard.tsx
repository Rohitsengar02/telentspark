'use client';

import React, { useState } from 'react';
import { useAppState, Order } from '@/store/state';
import { 
  ShoppingBag, 
  Clock, 
  CreditCard, 
  Coins, 
  CheckCircle, 
  ArrowRightLeft, 
  Smartphone, 
  Globe, 
  FileText,
  DollarSign
} from 'lucide-react';

export default function VendorDashboard() {
  const { orders, addOrder, addActivity } = useAppState();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Net Banking' | 'Card'>('UPI');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-8942');

  // Filter vendor's active orders
  const vendorOrders = orders.filter(o => o.vendor === 'Apex Chem Co' || o.vendor === 'MedLife Ltd');

  // Calculate Vendor specific numbers
  const totalOrders = vendorOrders.length;
  const pendingOrders = vendorOrders.filter(o => o.status === 'Pending' || o.status === 'Approved').length;
  const outstandingAmount = 145000;
  const creditBalance = 420000;

  // Timeline step definitions
  const steps = [
    { title: 'Order Created', desc: 'Vendor logged order request' },
    { title: 'Approved', desc: 'Admin approved credit limit' },
    { title: 'Processing', desc: 'Stockist packing materials' },
    { title: 'Dispatched', desc: 'Shipped via regional courier' },
    { title: 'Delivered', desc: 'Receipt signed at warehouse' }
  ];

  // Ledger history mock data
  const ledgerData = [
    { date: '2026-06-19', desc: 'Order ORD-8942 Credit Settlement', type: 'Credit', amount: 345000, balance: 420000 },
    { date: '2026-06-17', desc: 'Goods Receipt ORD-8945 Charge', type: 'Debit', amount: 78000, balance: 75000 },
    { date: '2026-06-14', desc: 'Outstanding Invoice Ref #V89', type: 'Debit', amount: 120000, balance: 153000 },
    { date: '2026-06-10', desc: 'Direct UPI Bank Settlement', type: 'Credit', amount: 200000, balance: 273000 },
  ];

  // Selected Order for Timeline
  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  // Helper to determine active index of timeline based on order status
  const getStatusIndex = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Approved': return 1;
      case 'Processing': return 2;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = getStatusIndex(currentOrder.status);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Total Orders', value: totalOrders.toString(), desc: 'Historical submissions', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
          { title: 'Pending Dispatch', value: pendingOrders.toString(), desc: 'Awaiting shipping', icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { title: 'Outstanding Balance', value: `₹${outstandingAmount.toLocaleString('en-IN')}`, desc: 'Invoice cycle billing', icon: CreditCard, color: 'text-rose-600 bg-rose-50' },
          { title: 'Credit Limit Available', value: `₹${creditBalance.toLocaleString('en-IN')}`, desc: 'Active line of credit', icon: Coins, color: 'text-emerald-600 bg-emerald-50' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${kpi.color}`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-custom">{kpi.title}</p>
              <h3 className="text-xl font-bold text-text-custom mt-0.5">{kpi.value}</h3>
              <p className="text-[10px] text-muted-custom mt-0.5">{kpi.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline + Payment Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Beautiful Order Lifecycle Timeline */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-custom mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-custom">My Orders Timeline</h3>
              <p className="text-xs text-muted-custom">Visual tracking system for vendor order dispatch</p>
            </div>
            
            {/* Dropdown selector */}
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="border border-slate-200 rounded-xl text-xs px-3 py-1.5 bg-white font-semibold text-slate-700 focus:outline-none"
            >
              {vendorOrders.map(o => (
                <option key={o.id} value={o.id}>{o.id} - {o.customer} ({o.status})</option>
              ))}
            </select>
          </div>

          <div className="relative">
            {/* Line connector */}
            <div className="absolute left-4 top-1.5 bottom-1.5 w-0.5 bg-slate-100 hidden sm:block" />
            
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-4 relative">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={idx} className="relative flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-2">
                    {/* Circle badge */}
                    <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center border-4 text-xs font-bold transition-all ${
                      isCompleted 
                        ? 'bg-primary text-white border-blue-100 shadow-md scale-110' 
                        : 'bg-white text-muted-custom border-slate-100'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="mt-1 sm:mt-2">
                      <h4 className={`text-xs font-bold ${
                        isCurrent ? 'text-primary' : isCompleted ? 'text-text-custom' : 'text-muted-custom'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-muted-custom leading-normal mt-0.5 max-w-[120px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs font-bold text-text-custom">Request New Materials Order Dispatch</p>
              <p className="text-[10px] text-muted-custom">Orders are processed immediately depending on credit balance limits</p>
            </div>
            <button
              onClick={() => {
                addOrder({
                  customer: 'Apex Chem Co',
                  vendor: 'MedLife Ltd',
                  amount: 150000,
                  status: 'Pending'
                });
                alert('New order submitted successfully! Undergoing credit limits check.');
              }}
              className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Submit Order Request
            </button>
          </div>
        </div>

        {/* Payment Center */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-custom">Ledger & Payment Center</h3>
            <p className="text-xs text-muted-custom">Settle outstanding invoices securely</p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl my-4 text-xs font-semibold text-center">
            {[
              { id: 'UPI', label: 'UPI App', icon: Smartphone },
              { id: 'Net Banking', label: 'Net Bank', icon: Globe },
              { id: 'Card', label: 'Cards', icon: CreditCard },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPaymentMethod(tab.id as any)}
                className={`py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === tab.id 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-muted-custom hover:text-text-custom'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-[9px]">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Payment Details Container */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-custom">Payment Destination</span>
              <span className="font-bold text-text-custom">SaaS ERP Escrow</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-custom">Processing Fee</span>
              <span className="font-bold text-emerald-600">₹0.00 (Zero Fee)</span>
            </div>

            <div className="flex justify-between items-center border-t border-slate-200/60 pt-3 text-xs">
              <span className="font-semibold text-text-custom">Amount to settle</span>
              <span className="font-extrabold text-primary text-sm">₹{outstandingAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                alert(`Redirecting to secure gateway for ${paymentMethod} payment...`);
                addActivity(`Payment of ₹${outstandingAmount.toLocaleString('en-IN')} initiated by Vendor`, 'payment');
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Pay Now via {paymentMethod}
            </button>
          </div>

          <div className="text-center text-[10px] text-muted-custom">
            SSL Secured • Encrypted transaction hash logs
          </div>
        </div>
      </div>

      {/* Ledger Transaction History */}
      <div className="glass-card rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-border-custom mb-6">
          <div>
            <h3 className="text-lg font-bold text-text-custom">Ledger Statements</h3>
            <p className="text-xs text-muted-custom">Financial debit/credit account balances</p>
          </div>
          <button 
            onClick={() => alert('Downloading ledger statements...')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold hover:border-slate-300 transition-colors bg-white text-slate-700 cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-muted-custom" />
            Statements
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-muted-custom border-b border-slate-100">
                <th className="pb-3 font-semibold">Post Date</th>
                <th className="pb-3 font-semibold">Transaction Details</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold text-right">Debit</th>
                <th className="pb-3 font-semibold text-right">Credit</th>
                <th className="pb-3 font-semibold text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledgerData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 text-slate-600">{item.date}</td>
                  <td className="py-3 font-medium text-text-custom">{item.desc}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      item.type === 'Credit' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 text-right font-bold text-rose-600">
                    {item.type === 'Debit' ? `₹${item.amount.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="py-3 text-right font-bold text-emerald-600">
                    {item.type === 'Credit' ? `₹${item.amount.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="py-3 text-right font-bold text-text-custom">
                    ₹{item.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
