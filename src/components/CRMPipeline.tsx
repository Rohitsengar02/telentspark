'use client';

import React, { useState } from 'react';
import { useAppState, CRMLead } from '@/store/state';
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  User, 
  Phone, 
  Briefcase,
  X,
  ArrowRight
} from 'lucide-react';

export default function CRMPipeline() {
  const { crmLeads, updateLeadStage, addLead, addActivity } = useAppState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [leadVal, setLeadVal] = useState('500000');
  const [contactName, setContactName] = useState('');
  const [leadStage, setLeadStage] = useState<CRMLead['stage']>('Lead');

  const pipelineStages: { title: string; stage: CRMLead['stage']; color: string; hoverColor: string }[] = [
    { title: 'New Leads', stage: 'Lead', color: 'border-t-blue-500 bg-blue-50/20', hoverColor: 'hover:border-blue-300' },
    { title: 'Qualified', stage: 'Qualified', color: 'border-t-violet-500 bg-violet-50/20', hoverColor: 'hover:border-violet-300' },
    { title: 'Proposal Sent', stage: 'Proposal', color: 'border-t-amber-500 bg-amber-50/20', hoverColor: 'hover:border-amber-300' },
    { title: 'Negotiating', stage: 'Negotiation', color: 'border-t-rose-500 bg-rose-50/20', hoverColor: 'hover:border-rose-300' },
    { title: 'Won / Signed', stage: 'Won', color: 'border-t-emerald-500 bg-emerald-50/20', hoverColor: 'hover:border-emerald-300' },
  ];

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: CRMLead['stage']) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      updateLeadStage(leadId, targetStage);
      addActivity(`CRM Lead ${leadId} shifted to ${targetStage}`, 'vendor');
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName) {
      alert('Please fill out lead profile fields');
      return;
    }
    addLead({
      company: companyName,
      value: parseFloat(leadVal) || 0,
      stage: leadStage,
      contact: contactName,
    });
    setCompanyName('');
    setContactName('');
    setLeadVal('500000');
    setIsModalOpen(false);
  };

  // Calculate stats
  const totalPipelineValue = crmLeads.reduce((sum, lead) => sum + lead.value, 0);
  const averageWinRate = 64; // mock win pct

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-primary rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-custom">Interactive CRM Board</h3>
            <p className="text-xs text-muted-custom">Drag cards to progress sales negotiations</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-700">
          <div>
            <span className="text-[10px] text-muted-custom block font-bold uppercase">Pipeline Value</span>
            <span className="text-base font-extrabold text-primary">₹{totalPipelineValue.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-custom block font-bold uppercase">Win Probability</span>
            <span className="text-base font-extrabold text-emerald-600">{averageWinRate}% Win Rate</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2 font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* CRM Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pipelineStages.map((col) => {
          const colLeads = crmLeads.filter(lead => lead.stage === col.stage);
          const colSum = colLeads.reduce((acc, curr) => acc + curr.value, 0);
          
          return (
            <div
              key={col.stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.stage)}
              className={`rounded-2xl border border-slate-200 border-t-4 p-4 flex flex-col min-h-[420px] ${col.color} transition-all`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{col.title}</h4>
                  <p className="text-[9px] text-muted-custom font-semibold">₹{colSum.toLocaleString('en-IN')}</p>
                </div>
                <span className="text-[9px] bg-white border border-slate-200 px-2 py-0.5 rounded-full font-bold text-slate-600">
                  {colLeads.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className={`bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm ${col.hoverColor} transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-mono text-muted-custom">{lead.id}</span>
                      <span className="text-[10px] font-extrabold text-primary flex items-center">
                        <DollarSign className="h-3 w-3" />
                        {lead.value.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-text-custom group-hover:text-primary transition-colors truncate">
                      {lead.company}
                    </h5>

                    <div className="space-y-1 mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500">
                      <p className="flex items-center gap-1.5 font-medium">
                        <User className="h-3 w-3 text-muted-custom" />
                        {lead.contact}
                      </p>
                    </div>

                    {/* Transition helper button for mobile/click accessibility */}
                    <div className="flex justify-end mt-3.5 pt-1">
                      <button
                        onClick={() => {
                          const nextStages: Record<CRMLead['stage'], CRMLead['stage']> = {
                            'Lead': 'Qualified',
                            'Qualified': 'Proposal',
                            'Proposal': 'Negotiation',
                            'Negotiation': 'Won',
                            'Won': 'Lead'
                          };
                          updateLeadStage(lead.id, nextStages[lead.stage]);
                        }}
                        className="p-1 hover:bg-slate-100 rounded text-muted-custom hover:text-primary transition-colors"
                        title="Move to next stage"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 opacity-50">
                    <Briefcase className="h-6 w-6 text-slate-300 mb-1" />
                    <span className="text-[9px] text-muted-custom font-semibold">No active deals</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-text-custom">CRM Pipeline - New Deal Entry</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-muted-custom transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Novartis Distribution"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Arvind Mehta"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lead Value (₹)</label>
                  <input
                    type="number"
                    value={leadVal}
                    onChange={(e) => setLeadVal(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pipeline Stage</label>
                  <select
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value as any)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-slate-200 rounded-xl py-2 font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-2 font-bold transition-colors shadow-md cursor-pointer"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
