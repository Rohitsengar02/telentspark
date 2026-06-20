'use client';

import React, { useState } from 'react';
import { useAppState } from '@/store/state';
import { 
  Warehouse as WHIcon, 
  Layers, 
  Maximize2, 
  Info, 
  Compass, 
  MapPin, 
  Activity,
  Plus
} from 'lucide-react';

export default function WarehouseMap() {
  const { warehouses } = useAppState();

  const [activeWHId, setActiveWHId] = useState('WH-A');
  const [selectedCell, setSelectedCell] = useState<{ rackId: string; shelfId: string; productName: string; qty: number } | null>(
    warehouses[0].racks[0]
  );

  const activeWH = warehouses.find(w => w.id === activeWHId) || warehouses[0];

  // Grid layout mockup definitions (12 storage slots per warehouse layout)
  const gridCells = [
    { cellId: 'R1-S1', rackId: 'Rack-01', shelfId: 'Shelf-01' },
    { cellId: 'R1-S2', rackId: 'Rack-01', shelfId: 'Shelf-02' },
    { cellId: 'R1-S3', rackId: 'Rack-01', shelfId: 'Shelf-03' },
    
    { cellId: 'R2-S1', rackId: 'Rack-02', shelfId: 'Shelf-01' },
    { cellId: 'R2-S2', rackId: 'Rack-02', shelfId: 'Shelf-02' },
    { cellId: 'R2-S3', rackId: 'Rack-02', shelfId: 'Shelf-03' },

    { cellId: 'R3-S1', rackId: 'Rack-03', shelfId: 'Shelf-01' },
    { cellId: 'R3-S2', rackId: 'Rack-03', shelfId: 'Shelf-02' },
    { cellId: 'R3-S3', rackId: 'Rack-03', shelfId: 'Shelf-03' },

    { cellId: 'R4-S1', rackId: 'Rack-04', shelfId: 'Shelf-01' },
    { cellId: 'R4-S2', rackId: 'Rack-04', shelfId: 'Shelf-02' },
    { cellId: 'R4-S3', rackId: 'Rack-04', shelfId: 'Shelf-03' },
  ];

  return (
    <div className="space-y-6">
      {/* Selector Tabs & Overall Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Warehouse Switcher */}
        <div className="lg:w-1/3 glass-card rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-text-custom uppercase tracking-wider">Select Warehouse</h3>
            <p className="text-[10px] text-muted-custom">Interactive structural maps</p>
          </div>

          <div className="space-y-3">
            {warehouses.map((wh) => (
              <button
                key={wh.id}
                onClick={() => {
                  setActiveWHId(wh.id);
                  setSelectedCell(wh.racks[0] || null);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 group ${
                  activeWHId === wh.id 
                    ? 'bg-blue-50/70 border-primary text-primary shadow-sm' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className={`p-2.5 rounded-lg transition-colors ${
                  activeWHId === wh.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <WHIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate leading-snug">{wh.name}</p>
                  <p className={`text-[10px] ${activeWHId === wh.id ? 'text-primary-light' : 'text-muted-custom'} mt-0.5`}>
                    Used: {wh.used.toLocaleString()} / {wh.capacity.toLocaleString()} units
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2D Visual Grid */}
        <div className="flex-1 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border-custom mb-5">
              <div>
                <h3 className="text-base font-bold text-text-custom">{activeWH.name} Grid</h3>
                <p className="text-xs text-muted-custom">Click cells to inspect Rack storage allocation details</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                <Compass className="h-3.5 w-3.5" />
                Real-Time Map Layout
              </span>
            </div>

            {/* 2D Structural Map representation */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              {gridCells.map((cell) => {
                // Find if this cell contains a product
                const placement = activeWH.racks.find(
                  r => r.rackId === cell.rackId && r.shelfId === cell.shelfId
                );
                
                const isSelected = selectedCell?.rackId === cell.rackId && selectedCell?.shelfId === cell.shelfId;
                const hasProduct = !!placement;
                
                // Set color density based on quantity
                const fillClass = !hasProduct ? 'bg-slate-100/50 hover:bg-slate-200/50 text-slate-400' :
                                  placement.qty > 1000 ? 'bg-blue-600 text-white shadow-sm' :
                                  placement.qty > 500 ? 'bg-blue-400 text-white shadow-sm' :
                                  'bg-blue-100 text-blue-700 border border-blue-200';

                return (
                  <button
                    key={cell.cellId}
                    onClick={() => placement && setSelectedCell(placement)}
                    disabled={!hasProduct}
                    className={`h-20 rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all ${fillClass} ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2 scale-95 font-semibold' : ''
                    } ${!hasProduct ? 'cursor-not-allowed border border-dashed border-slate-200' : 'cursor-pointer hover:scale-105'}`}
                  >
                    <span className="text-[10px] font-bold tracking-tight">{cell.rackId.split('-')[1]}-{cell.shelfId.split('-')[1]}</span>
                    {hasProduct ? (
                      <>
                        <span className="text-[9px] truncate w-full mt-1.5 opacity-90">{placement.productName.split(' ')[0]}</span>
                        <span className="text-[9px] font-extrabold mt-0.5">{placement.qty}u</span>
                      </>
                    ) : (
                      <span className="text-[8px] mt-1.5 text-slate-400">Empty</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-border-custom text-[10px] text-muted-custom">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /> High Density (&gt;1000)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-400 inline-block" /> Med Density (500-1000)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-200 inline-block" /> Low Density (&lt;500)</span>
            </div>
            <span>Layout: Grid Area matrix</span>
          </div>
        </div>
      </div>

      {/* Selected Cell Inspect Card */}
      {selectedCell ? (
        <div className="glass-card rounded-2xl p-6 shadow-sm border border-blue-100 bg-gradient-to-r from-white via-white to-blue-50/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-primary rounded-xl">
              <Layers className="h-6 w-6" />
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-xs">
              <div>
                <p className="text-[10px] text-muted-custom uppercase font-bold">Bay Placement</p>
                <p className="text-sm font-extrabold text-text-custom mt-1 flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-primary-light" />
                  {selectedCell.rackId} • {selectedCell.shelfId}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-muted-custom uppercase font-bold">Allocated Material</p>
                <p className="text-sm font-extrabold text-text-custom mt-1">{selectedCell.productName}</p>
              </div>

              <div>
                <p className="text-[10px] text-muted-custom uppercase font-bold">Current Quantity</p>
                <p className="text-sm font-extrabold text-primary mt-1">{selectedCell.qty.toLocaleString()} Units</p>
              </div>

              <div>
                <p className="text-[10px] text-muted-custom uppercase font-bold">Rack Status</p>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                  <Activity className="h-3 w-3" />
                  Optimal Heat Temp
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-6 text-center text-xs text-muted-custom">
          Select an occupied rack cell above to inspect batch allocation details.
        </div>
      )}
    </div>
  );
}
