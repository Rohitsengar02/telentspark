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
  X,
  Pencil,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';

export default function ProductCatalog() {
  const { inventory, addInventoryItem, updateInventoryItem } = useAppState();

  const [view, setView] = useState<'catalog' | 'create' | 'edit'>('catalog');
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Chemicals',
    stock: '1000',
    price: '500',
    gst: '18',
    image: '',
    discount: '0',
    batch: '',
    expiry: '2028-12-31'
  });

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' ? true : item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleNewProductClick = () => {
    setFormData({
      name: '',
      sku: '',
      category: 'Chemicals',
      stock: '1000',
      price: '500',
      gst: '18',
      image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=400&auto=format&fit=crop&q=60',
      discount: '0',
      batch: `B-${Math.floor(100 + Math.random() * 900)}`,
      expiry: '2028-12-31'
    });
    setView('create');
  };

  const handleEditProductClick = (item: InventoryItem) => {
    setEditingProduct(item);
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      stock: item.stock.toString(),
      price: item.price.toString(),
      gst: item.gst.toString(),
      image: item.image || '',
      discount: (item.discount || 0).toString(),
      batch: item.batch,
      expiry: item.expiry
    });
    setView('edit');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      alert('Please fill out Name and SKU fields');
      return;
    }

    const payload = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      gst: parseFloat(formData.gst) || 18,
      stock: parseFloat(formData.stock) || 0,
      price: parseFloat(formData.price) || 0,
      image: formData.image || undefined,
      discount: parseFloat(formData.discount) || 0,
      batch: formData.batch || `B-${formData.sku.slice(0,3).toUpperCase()}`,
      expiry: formData.expiry || '2028-12-31',
      reserved: editingProduct ? editingProduct.reserved : 0
    };

    if (view === 'create') {
      addInventoryItem(payload);
      alert('Product created successfully!');
    } else if (view === 'edit' && editingProduct) {
      updateInventoryItem(editingProduct.id, payload);
      alert('Product updated successfully!');
    }

    setView('catalog');
    setEditingProduct(null);
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Page Header */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setView('catalog')}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors border border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-text-custom">
              {view === 'create' ? 'Create New Product' : `Edit Product: ${editingProduct?.id}`}
            </h2>
            <p className="text-xs text-muted-custom">
              {view === 'create' ? 'Configure a new product entry for the warehouse catalog' : 'Update the characteristics and parameters of the product'}
            </p>
          </div>
        </div>

        {/* Create/Edit Form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium Grade Silica"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. SIL-PREM-50"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  >
                    <option value="Chemicals">Chemicals</option>
                    <option value="Plastics">Plastics</option>
                    <option value="Solvents">Solvents</option>
                    <option value="Organics">Organics</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Product Image</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Paste image URL..."
                    className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <button
                      type="button"
                      className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-colors text-xs font-bold whitespace-nowrap cursor-pointer"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-muted-custom">Paste a web link or upload a local image file directly</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Distributor Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">GST Rate (%)</label>
                  <select
                    value={formData.gst}
                    onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  >
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Discount (%)</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Batch Code</label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setView('catalog')}
                  className="flex-1 border border-slate-200 rounded-xl py-3 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-3 font-bold transition-colors shadow-md"
                >
                  {view === 'create' ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Real-time Preview */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-muted-custom tracking-wider">Live Preview</h3>
            
            <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200">
              <div>
                <div className="h-44 w-full rounded-xl overflow-hidden mb-4 relative bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-400">
                      <ImageIcon className="h-7 w-7 stroke-[1.5]" />
                      <span className="text-[10px] font-semibold">Image Preview</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/75 text-white font-semibold text-[9px] backdrop-blur-sm">
                    {formData.category}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-text-custom line-clamp-2 leading-snug">
                  {formData.name || 'Product Title Placeholder'}
                </h4>
                <p className="text-[10px] font-medium text-muted-custom mt-1">
                  SKU: {formData.sku || 'SKU-XXXX'} • Batch: {formData.batch || 'B-XX'}
                </p>

                <div className="grid grid-cols-2 gap-4 my-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <p className="text-[9px] text-muted-custom uppercase">Stock Qty</p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      {parseFloat(formData.stock).toLocaleString() || 0} units
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-custom uppercase">GST Rate</p>
                    <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-0.5">
                      <Percent className="h-3 w-3 text-muted-custom" />
                      {formData.gst}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5 mt-auto flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-muted-custom uppercase">Distributor Price</p>
                  <p className="text-base font-extrabold text-primary">
                    ₹{(parseFloat(formData.price) || 0).toLocaleString('en-IN')}
                  </p>
                </div>
                {parseFloat(formData.discount) > 0 && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                    <Tag className="h-2.5 w-2.5" />
                    {formData.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={handleNewProductClick}
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
                className="glass-card glass-card-hover rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditProductClick(item)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-colors"
                        title="Edit product"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[10px] font-mono text-muted-custom bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* Product Card Image */}
                  <div className="h-36 w-full rounded-xl overflow-hidden mb-4 relative bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400">
                        <ImageIcon className="h-6 w-6 stroke-[1.5]" />
                        <span className="text-[9px] font-semibold">No Image</span>
                      </div>
                    )}
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
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isLowStock ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {isLowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                    {item.discount && item.discount > 0 ? (
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        {item.discount}% OFF
                      </span>
                    ) : null}
                  </div>
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
                  <th className="p-4 font-semibold">Thumbnail</th>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Product Name</th>
                  <th className="p-4 font-semibold">SKU / Batch</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold text-right">GST</th>
                  <th className="p-4 font-semibold text-right">Available Stock</th>
                  <th className="p-4 font-semibold text-right">Price per Unit</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                    </td>
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
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEditProductClick(item)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-all"
                        title="Edit product info"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
