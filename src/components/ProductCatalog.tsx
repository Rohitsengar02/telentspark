'use client';

import React, { useState } from 'react';
import { useAppState, InventoryItem } from '@/store/state';
import { 
  Grid, 
  List, 
  Search, 
  Plus, 
  Tag, 
  Percent, 
  Layers, 
  Check, 
  AlertTriangle,
  X
} from 'lucide-react';

export default function ProductCatalog() {
  const { inventory, addInventoryItem } = useAppState();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State for adding new products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newSKU, setNewSKU] = useState('');
  const [newCategory, setNewCategory] = useState('Chemicals');
  const [newStock, setNewStock] = useState('1000');
  const [newPrice, setNewPrice] = useState('500');
  const [newGST, setNewGST] = useState('18');

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' ? true : item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newSKU) {
      alert('Please fill out essential name and SKU fields');
      return;
    }
    addInventoryItem({
      name: newProductName,
      sku: newSKU,
      category: newCategory,
      gst: parseFloat(newGST),
      stock: parseFloat(newStock) || 0,
      reserved: 0,
      price: parseFloat(newPrice) || 0,
      batch: `B-${newSKU.slice(0,3).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
      expiry: '2028-12-31'
    });
    // Reset Form
    setNewProductName('');
    setNewSKU('');
    setNewStock('1000');
    setNewPrice('500');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-custom" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product inventory name or SKU..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary w-64 bg-slate-50/50 font-medium"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-200 rounded-xl text-xs px-3 py-2 bg-white text-slate-700 focus:outline-none font-semibold"
          >
            <option value="All">All Categories</option>
            <option value="Chemicals">Chemicals</option>
            <option value="Plastics">Plastics</option>
            <option value="Solvents">Solvents</option>
            <option value="Organics">Organics</option>
          </select>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Layout Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                layoutMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-muted-custom hover:text-text-custom'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                layoutMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-muted-custom hover:text-text-custom'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Product
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const isLowStock = item.stock < 500;
            return (
              <div 
                key={item.id} 
                className="glass-card glass-card-hover rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-custom bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      {item.id}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-text-custom line-clamp-2 leading-snug">{item.name}</h4>
                  <p className="text-[10px] font-medium text-muted-custom mt-1">SKU: {item.sku} • Batch: {item.batch}</p>

                  <div className="grid grid-cols-2 gap-4 my-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <p className="text-[9px] text-muted-custom uppercase">Stock Level</p>
                      <p className={`font-bold mt-0.5 ${isLowStock ? 'text-rose-600' : 'text-slate-800'}`}>
                        {item.stock.toLocaleString()} units
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-custom uppercase">GST Rate</p>
                      <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-0.5">
                        <Percent className="h-3 w-3 text-muted-custom" />
                        {item.gst}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3.5 mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-muted-custom uppercase">Distributor Price</p>
                    <p className="text-base font-extrabold text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isLowStock ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-muted-custom border-b border-slate-200">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Product Name</th>
                  <th className="p-4 font-semibold">SKU / Batch</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold text-right">GST</th>
                  <th className="p-4 font-semibold text-right">Available Stock</th>
                  <th className="p-4 font-semibold text-right">Price per Unit</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-text-custom">{item.id}</td>
                    <td className="p-4 font-bold text-text-custom max-w-xs truncate">{item.name}</td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700">{item.sku}</p>
                      <p className="text-[9px] font-mono text-muted-custom">{item.batch}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-semibold text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-slate-700">{item.gst}%</td>
                    <td className="p-4 text-right font-bold text-text-custom">{item.stock.toLocaleString()}</td>
                    <td className="p-4 text-right font-bold text-primary">₹{item.price}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.stock < 500 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {item.stock < 500 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-text-custom">Catalog - New Product Entry</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-muted-custom transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Pure Zinc Stearate Crystals"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={newSKU}
                    onChange={(e) => setNewSKU(e.target.value)}
                    placeholder="e.g. ZINC-ST-50"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="Chemicals">Chemicals</option>
                    <option value="Plastics">Plastics</option>
                    <option value="Solvents">Solvents</option>
                    <option value="Organics">Organics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Stock Qty</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">GST %</label>
                  <select
                    value={newGST}
                    onChange={(e) => setNewGST(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
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
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
