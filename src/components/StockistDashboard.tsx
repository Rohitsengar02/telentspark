'use client';

import React, { useState } from 'react';
import { useAppState, Order, InventoryItem } from '@/store/state';
import { 
  Package, 
  DollarSign, 
  Truck, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Inbox,
  CheckCircle,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

export default function StockistDashboard() {
  const { 
    inventory, 
    orders, 
    updateOrderStatus, 
    addActivity 
  } = useAppState();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Local state for stockist KPI counters (simulating dynamic totals)
  const availableStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const warehouseValue = inventory.reduce((sum, item) => sum + (item.stock * item.price), 0);
  const todaysOrdersCount = orders.length;
  const pendingDispatchCount = orders.filter(o => o.status === 'Processing' || o.status === 'Approved').length;

  // Filtered inventory list
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' ? true : item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Kanban status categories
  const kanbanColumns: { title: string; status: Order['status']; color: string }[] = [
    { title: 'Pending Approval', status: 'Pending', color: 'bg-amber-500' },
    { title: 'Approved / Packed', status: 'Approved', color: 'bg-indigo-500' },
    { title: 'In Processing', status: 'Processing', color: 'bg-blue-500' },
    { title: 'Dispatched / Delivered', status: 'Delivered', color: 'bg-emerald-500' },
  ];

  // Drag and Drop simulation handlers
  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData('text/plain', orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Order['status']) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('text/plain');
    if (orderId) {
      updateOrderStatus(orderId, targetStatus);
      addActivity(`Order ${orderId} updated to ${targetStatus} via Dispatch Board`, 'order');
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Available Stock', value: `${availableStock.toLocaleString()} Units`, desc: 'Across 3 regional WHs', icon: Package, color: 'text-blue-600 bg-blue-50' },
          { title: 'Warehouse Value', value: `₹${warehouseValue.toLocaleString('en-IN')}`, desc: 'Total inventory asset cost', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
          { title: "Today's Orders", value: todaysOrdersCount.toString(), desc: 'Received in last 24h', icon: Truck, color: 'text-violet-600 bg-violet-50' },
          { title: 'Pending Dispatch', value: pendingDispatchCount.toString(), desc: 'Require packaging/routing', icon: Clock, color: 'text-amber-600 bg-amber-50' },
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

      {/* Analytics + Catalog Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Movement Analytics */}
        <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-custom">Stock Movement</h3>
            <p className="text-xs text-muted-custom">Flow comparison index</p>
          </div>

          <div className="py-6 flex items-center justify-around">
            {[
              { label: 'Incoming', value: '4,500', pct: 68, color: 'bg-blue-500', trend: 'up' },
              { label: 'Outgoing', value: '3,200', pct: 48, color: 'bg-emerald-500', trend: 'up' },
              { label: 'Damaged', value: '120', pct: 15, color: 'bg-rose-500', trend: 'down' },
              { label: 'Returns', value: '340', pct: 28, color: 'bg-amber-500', trend: 'down' },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="w-10 h-36 bg-slate-50 border border-slate-100 rounded-lg flex items-end overflow-hidden p-1">
                  <div 
                    className={`w-full rounded ${bar.color} transition-all duration-1000`} 
                    style={{ height: `${bar.pct}%` }} 
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-custom">{bar.value}</p>
                  <p className="text-[9px] text-muted-custom">{bar.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border-custom pt-4 flex justify-between text-xs">
            <span className="text-muted-custom">Efficiency Index</span>
            <span className="text-emerald-600 font-bold">96.8% Optimized</span>
          </div>
        </div>

        {/* Dispatch Kanban Board */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-border-custom mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-custom">Dispatch Center</h3>
              <p className="text-xs text-muted-custom">Drag and drop orders between statuses to route dispatch logistics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {kanbanColumns.map((col) => {
              const colOrders = orders.filter(o => o.status === col.status);
              return (
                <div 
                  key={col.status}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.status)}
                  className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex flex-col min-h-60"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className={`w-2 h-2 rounded-full ${col.color}`} />
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{col.title}</span>
                    <span className="ml-auto text-[9px] bg-slate-200/60 px-1.5 py-0.5 rounded font-bold text-slate-600">
                      {colOrders.length}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2.5 overflow-y-auto">
                    {colOrders.map(order => (
                      <div
                        key={order.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, order.id)}
                        className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm hover:border-primary transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-text-custom">{order.id}</span>
                          <span className="text-[9px] text-muted-custom">{order.date}</span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-600 truncate">{order.customer}</p>
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-50">
                          <span className="text-[10px] font-bold text-primary">₹{order.amount.toLocaleString('en-IN')}</span>
                          <button 
                            onClick={() => {
                              const nextStatusMap: Record<Order['status'], Order['status']> = {
                                'Pending': 'Approved',
                                'Approved': 'Processing',
                                'Processing': 'Delivered',
                                'Delivered': 'Pending',
                                'Cancelled': 'Pending'
                              };
                              updateOrderStatus(order.id, nextStatusMap[order.status]);
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-muted-custom hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {colOrders.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center py-8">
                        <Inbox className="h-6 w-6 text-slate-300 mb-1" />
                        <span className="text-[9px] text-muted-custom">No Orders</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advanced Inventory Table */}
      <div className="glass-card rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-custom mb-6">
          <div>
            <h3 className="text-lg font-bold text-text-custom">Inventory Catalog Details</h3>
            <p className="text-xs text-muted-custom">Comprehensive batch control, thresholds, and allocation logs</p>
          </div>
          {/* Table Utilities */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-custom" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Product, SKU..."
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary w-48 bg-slate-50/50"
              />
            </div>
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-slate-200 rounded-xl text-xs px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Plastics">Plastics</option>
              <option value="Solvents">Solvents</option>
              <option value="Organics">Organics</option>
            </select>
            {/* Export Mockup */}
            <button
              onClick={() => alert('Exporting Catalog data... CSV generated successfully')}
              className="border border-slate-200 hover:border-slate-300 rounded-xl text-xs px-3 py-1.5 bg-white text-slate-700 focus:outline-none flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-muted-custom" />
              Export
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-muted-custom border-b border-slate-100">
                <th className="pb-3 font-semibold">Product Details</th>
                <th className="pb-3 font-semibold">SKU / Batch</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Expiry Date</th>
                <th className="pb-3 font-semibold text-right">Available Stock</th>
                <th className="pb-3 font-semibold text-right">Reserved</th>
                <th className="pb-3 font-semibold text-right">Price per Unit</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((item) => {
                const totalStock = item.stock;
                const isLow = totalStock < 500;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5">
                      <p className="font-bold text-text-custom text-xs">{item.name}</p>
                      <p className="text-[9px] text-muted-custom">{item.id}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-medium text-slate-700">{item.sku}</p>
                      <p className="text-[9px] font-mono text-muted-custom">{item.batch}</p>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-semibold text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600">{item.expiry}</td>
                    <td className="py-3.5 text-right font-bold text-text-custom">
                      {totalStock.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right text-muted-custom font-medium">
                      {item.reserved.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-bold text-text-custom">
                      ₹{item.price}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isLow ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isLow ? (
                          <>
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Healthy
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
