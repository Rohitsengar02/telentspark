'use client';

import React, { useState } from 'react';
import { useAppState } from '@/store/state';
import { 
  MessageSquare, 
  Smartphone, 
  Mail, 
  Bell, 
  Send,
  CheckCircle,
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, addNotification } = useAppState();

  const [activeChannel, setActiveChannel] = useState<'WhatsApp' | 'SMS' | 'Email' | 'Push'>('WhatsApp');
  
  // Campaign creator states
  const [recipient, setRecipient] = useState('');
  const [msgBody, setMsgBody] = useState('');

  const filteredLogs = notifications.filter(n => n.channel === activeChannel);

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !msgBody) {
      alert('Recipient and message parameters are required');
      return;
    }
    addNotification({
      channel: activeChannel,
      recipient,
      message: msgBody,
      status: 'sent'
    });
    setRecipient('');
    setMsgBody('');
    alert(`Campaign log dispatched successfully via ${activeChannel}!`);
  };

  const getChannelIcon = (ch: typeof activeChannel) => {
    switch (ch) {
      case 'WhatsApp': return <MessageSquare className="h-4 w-4" />;
      case 'SMS': return <Smartphone className="h-4 w-4" />;
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'Push': return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top campaign stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { title: 'Total Campaigns Sent', value: '42,940', pct: '+12.4% vs last month', icon: Send, color: 'from-blue-500 to-indigo-600' },
          { title: 'Delivery Success Rate', value: '99.2%', pct: 'SLA target &gt; 98.0%', icon: CheckCircle, color: 'from-emerald-500 to-teal-600' },
          { title: 'Open Rate / Engagements', value: '84.6%', pct: 'Industry standard 42.0%', icon: TrendingUp, color: 'from-violet-500 to-purple-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-custom">{kpi.title}</p>
                <h3 className="text-xl font-bold text-text-custom mt-1">{kpi.value}</h3>
                <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">{kpi.pct}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${kpi.color} text-white shadow-md`}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Campaign Panel + Channel Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Campaign Launcher */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-text-custom">Trigger Notification</h3>
            <p className="text-xs text-muted-custom">Send transactional message templates instantly</p>
          </div>

          <form onSubmit={handleLaunchCampaign} className="space-y-4 my-5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Dispatch Channel</label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['WhatsApp', 'SMS', 'Email', 'Push'] as const).map(ch => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setActiveChannel(ch)}
                    className={`py-1.5 rounded-lg flex flex-col items-center gap-1 font-semibold transition-all ${
                      activeChannel === ch 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-muted-custom hover:text-text-custom'
                    }`}
                  >
                    {getChannelIcon(ch)}
                    <span className="text-[8px]">{ch}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Recipient Contact / Email</label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={activeChannel === 'Email' ? 'distributor@company.com' : '+91 98765 43210'}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Template / Message Body</label>
              <textarea
                required
                rows={3}
                value={msgBody}
                onChange={(e) => setMsgBody(e.target.value)}
                placeholder="Type transactional message detail..."
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary bg-slate-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              Launch template
            </button>
          </form>
        </div>

        {/* Logs */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
            <div>
              <h3 className="text-base font-bold text-text-custom">{activeChannel} Logs</h3>
              <p className="text-xs text-muted-custom">Transactional delivery audit trail logs</p>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredLogs.map(log => (
              <div 
                key={log.id} 
                className="bg-slate-50/60 border border-slate-100 rounded-xl p-3.5 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-custom">{log.recipient}</p>
                  <p className="text-[10px] text-slate-600 leading-normal">{log.message}</p>
                  <span className="block text-[8px] text-muted-custom font-medium">{log.timestamp}</span>
                </div>

                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  log.status === 'sent' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="text-center py-20 text-xs text-muted-custom">
                No logs recorded for {activeChannel} channel today.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
