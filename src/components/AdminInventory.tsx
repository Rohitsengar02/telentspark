'use client';

import React, { useState, useEffect } from 'react';
import { useAppState, InventoryItem } from '@/store/state';
import { 
  Search, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Eye, 
  FileText, 
  CheckCircle, 
  Layers, 
  FileCheck,
  ChevronRight,
  ShoppingBag,
  Percent,
  X,
  MapPin,
  Scale
} from 'lucide-react';

interface InvoiceDraftItem {
  product: InventoryItem;
  quantity: number;
  customPrice: number;
}

export default function AdminInventory() {
  const { inventory, addInventoryItem } = useAppState();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Selected Invoice Items Draft
  const [draftItems, setDraftItems] = useState<InvoiceDraftItem[]>([]);
  
  // Invoice Recipient Details
  const [clientName, setClientName] = useState('Apex Chem Co');
  const [clientAddress, setClientAddress] = useState('402 Industrial Area, Phase II, Mumbai, MH');
  const [clientGstin, setClientGstin] = useState('27AAPCA8492K1Z9');
  
  // Invoice Metadata
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [poNumber, setPoNumber] = useState('PO-2026-9840');
  const [taxType, setTaxType] = useState<'GST' | 'IGST'>('GST'); // GST = CGST+SGST, IGST = Interstate GST
  const [discountPercent, setDiscountPercent] = useState(5);
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days');

  // Modal State for adding new products
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newSKU, setNewSKU] = useState('');
  const [newCategory, setNewCategory] = useState('Chemicals');
  const [newStock, setNewStock] = useState('1500');
  const [newPrice, setNewPrice] = useState('450');
  const [newGST, setNewGST] = useState('18');

  // Preview Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Generate invoice number on mount
  useEffect(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setInvoiceNumber(`INV-2026-${randomNum}`);
  }, []);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newSKU) {
      alert('Please fill out product name and SKU code');
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
    setNewProductName('');
    setNewSKU('');
    setNewStock('1500');
    setNewPrice('450');
    setIsAddModalOpen(false);
  };

  // Add Item to Invoice Draft
  const addToInvoice = (product: InventoryItem) => {
    const exists = draftItems.find(item => item.product.id === product.id);
    if (exists) {
      alert(`${product.name} is already added to invoice draft.`);
      return;
    }
    setDraftItems([...draftItems, { product, quantity: 10, customPrice: product.price }]);
  };

  // Remove Item from Draft
  const removeFromInvoice = (productId: string) => {
    setDraftItems(draftItems.filter(item => item.product.id !== productId));
  };

  // Update Qty
  const updateQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setDraftItems(draftItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(qty, item.product.stock) };
      }
      return item;
    }));
  };

  // Update Price
  const updatePrice = (productId: string, price: number) => {
    if (price < 0) return;
    setDraftItems(draftItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, customPrice: price };
      }
      return item;
    }));
  };

  // Preset Clients Info Sync
  const handleClientChange = (name: string) => {
    setClientName(name);
    if (name === 'Apex Chem Co') {
      setClientAddress('402 Industrial Area, Phase II, Mumbai, MH');
      setClientGstin('27AAPCA8492K1Z9');
    } else if (name === 'MedLife Ltd') {
      setClientAddress('G-12 Biotech Hub, Electronic City, Bangalore, KA');
      setClientGstin('29AAMCM4019M2Z8');
    } else if (name === 'Hindustan Inc') {
      setClientAddress('Block 3B, Sector V, Salt Lake City, Kolkata, WB');
      setClientGstin('19AAACH5088R1Z2');
    } else {
      setClientAddress('');
      setClientGstin('');
    }
  };

  // Calculations
  const getTotals = () => {
    let subtotal = 0;
    let totalGstAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    draftItems.forEach(item => {
      const lineCost = item.quantity * item.customPrice;
      const lineGst = (lineCost * item.product.gst) / 100;
      subtotal += lineCost;
      totalGstAmount += lineGst;
    });

    const discountAmount = (subtotal * discountPercent) / 100;
    const taxableSubtotal = subtotal - discountAmount;
    
    // Recalculating GST after discount proportionally
    const finalGstAmount = (taxableSubtotal * (totalGstAmount / (subtotal || 1)));

    if (taxType === 'GST') {
      cgst = finalGstAmount / 2;
      sgst = finalGstAmount / 2;
    } else {
      igst = finalGstAmount;
    }

    const grandTotal = taxableSubtotal + finalGstAmount;

    return {
      subtotal,
      discountAmount,
      taxableSubtotal,
      cgst,
      sgst,
      igst,
      totalGst: finalGstAmount,
      grandTotal
    };
  };

  const totals = getTotals();

  // Print PDF via iframe logic
  const handleDownloadPDF = () => {
    if (draftItems.length === 0) {
      alert('Please add at least one item to draft an invoice.');
      return;
    }

    // Build the print frame
    const iframeId = 'invoice-print-iframe';
    let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Rendered beautiful Invoice Template content
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 11px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
          }
          .invoice-box {
            max-width: 800px;
            margin: auto;
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .header-table td {
            vertical-align: top;
          }
          .logo {
            font-size: 26px;
            font-weight: 900;
            color: #2563eb;
            margin: 0 0 5px 0;
          }
          .subtitle {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #64748b;
            font-weight: 700;
          }
          .meta-title {
            font-size: 18px;
            font-weight: 900;
            text-align: right;
            color: #0f172a;
            margin: 0 0 5px 0;
          }
          .meta-details {
            text-align: right;
            font-size: 10px;
            color: #475569;
          }
          .meta-details strong {
            color: #0f172a;
          }
          .divider {
            border-top: 1.5px solid #e2e8f0;
            margin: 15px 0;
          }
          .addresses-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .addresses-table td {
            width: 50%;
            vertical-align: top;
            font-size: 10px;
          }
          .address-heading {
            font-size: 9px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          }
          .address-name {
            font-size: 12px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
          }
          .address-text {
            color: #475569;
            line-height: 1.4;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .items-table th {
            background-color: #f8fafc;
            color: #475569;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: 0.5px;
            padding: 8px 10px;
            border-bottom: 1.5px solid #cbd5e1;
            text-align: left;
          }
          .items-table td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          .items-table .text-right {
            text-align: right;
          }
          .product-name {
            font-weight: 700;
            color: #0f172a;
            font-size: 10.5px;
          }
          .product-meta {
            font-size: 8.5px;
            color: #64748b;
            margin-top: 2px;
          }
          .summary-container {
            width: 100%;
            margin-top: 15px;
          }
          .summary-table {
            width: 250px;
            margin-left: auto;
            border-collapse: collapse;
          }
          .summary-table td {
            padding: 5px 8px;
            font-size: 10px;
            color: #475569;
          }
          .summary-table .amount {
            text-align: right;
            font-weight: 700;
            color: #0f172a;
          }
          .summary-table .grand-row td {
            border-top: 1.5px solid #cbd5e1;
            padding-top: 8px;
            font-size: 13px;
            font-weight: 900;
            color: #2563eb;
          }
          .summary-table .grand-row .amount {
            color: #2563eb;
          }
          .footer-section {
            margin-top: 50px;
            font-size: 9px;
            color: #64748b;
            text-align: center;
            border-top: 1px dashed #cbd5e1;
            padding-top: 15px;
          }
          .stamp {
            display: inline-block;
            border: 2px solid #10b981;
            color: #10b981;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 4px 8px;
            border-radius: 4px;
            letter-spacing: 1px;
            transform: rotate(-5deg);
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <table class="header-table">
            <tr>
              <td>
                <div class="logo">TALENTSPARK</div>
                <div class="subtitle">Enterprise ERP Billing</div>
              </td>
              <td>
                <div class="meta-title">TAX INVOICE</div>
                <div class="meta-details">
                  Invoice No: <strong>${invoiceNumber}</strong><br/>
                  Date: <strong>${new Date().toLocaleDateString('en-IN')}</strong><br/>
                  Due Date: <strong>${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}</strong><br/>
                  PO Ref: <strong>${poNumber || 'N/A'}</strong>
                </div>
              </td>
            </tr>
          </table>

          <div class="divider"></div>

          <table class="addresses-table">
            <tr>
              <td>
                <div class="address-heading">Billed From</div>
                <div class="address-name">Talentspark Warehouse Corp</div>
                <div class="address-text">
                  Plot 15, Logistics Sector 4,<br/>
                  Navi Mumbai, Maharashtra, 400705<br/>
                  GSTIN: 27AAAAT2901F1Z8
                </div>
              </td>
              <td>
                <div class="address-heading">Billed To</div>
                <div class="address-name">${clientName}</div>
                <div class="address-text">
                  ${clientAddress || 'No Address Provided'}<br/>
                  GSTIN: ${clientGstin || 'N/A'}
                </div>
              </td>
            </tr>
          </table>

          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 45%;">Item / Product Description</th>
                <th class="text-right">Unit Rate</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Tax Slab</th>
                <th class="text-right">GST Amt</th>
                <th class="text-right" style="width: 15%;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${draftItems.map(item => {
                const lineVal = item.quantity * item.customPrice;
                const lineTax = (lineVal * item.product.gst) / 100;
                return `
                  <tr>
                    <td>
                      <div class="product-name">${item.product.name}</div>
                      <div class="product-meta">SKU: ${item.product.sku} • Batch: ${item.product.batch}</div>
                    </td>
                    <td class="text-right">₹${item.customPrice.toLocaleString('en-IN')}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">${item.product.gst}%</td>
                    <td class="text-right">₹${lineTax.toLocaleString('en-IN')}</td>
                    <td class="text-right">₹${(lineVal + lineTax).toLocaleString('en-IN')}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="divider"></div>

          <table style="width: 100%;">
            <tr>
              <td style="vertical-align: top; font-size: 9px; color: #64748b; line-height: 1.4;">
                <strong>Payment Instructions:</strong><br/>
                Beneficiary: Talentspark Corp<br/>
                Bank: HDFC Bank Ltd • A/c: 50200084920199<br/>
                IFSC: HDFC0000240 • Branch: Mumbai Fort<br/>
                Terms: ${paymentTerms}<br/>
                <div class="stamp">AUDITED & APPROVED</div>
              </td>
              <td style="vertical-align: top;">
                <table class="summary-table">
                  <tr>
                    <td>Subtotal (Gross):</td>
                    <td class="amount">₹${totals.subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  ${discountPercent > 0 ? `
                  <tr>
                    <td>Discount (${discountPercent}%):</td>
                    <td class="amount" style="color: #ef4444;">-₹${totals.discountAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td>Taxable Value:</td>
                    <td class="amount">₹${totals.taxableSubtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  ` : ''}
                  ${totals.cgst > 0 ? `
                  <tr>
                    <td>CGST:</td>
                    <td class="amount">₹${totals.cgst.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td>SGST:</td>
                    <td class="amount">₹${totals.sgst.toLocaleString('en-IN')}</td>
                  </tr>
                  ` : ''}
                  ${totals.igst > 0 ? `
                  <tr>
                    <td>IGST:</td>
                    <td class="amount">₹${totals.igst.toLocaleString('en-IN')}</td>
                  </tr>
                  ` : ''}
                  <tr class="grand-row">
                    <td>Grand Total:</td>
                    <td class="amount">₹${Math.round(totals.grandTotal).toLocaleString('en-IN')}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <div class="footer-section">
            Thank you for your business. For invoice disputes, contact support@talentspark.com<br/>
            This is a system-generated vector invoice and does not require a physical signature.
          </div>
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(invoiceHtml);
    doc.close();

    // Trigger iframe window printing
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 400);
  };

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' ? true : item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Enterprise Inventory Ledger</h2>
          <p className="text-xs text-slate-500 font-semibold">Generate corporate invoices, manage products, and audit stock levels</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Inventory Item
        </button>
      </div>

      {/* 2. Main content split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Product Selector Catalog */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-custom" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search inventory SKU or description..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary bg-slate-50/50 font-medium"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-slate-200 rounded-xl text-xs px-3.5 py-2 bg-white text-slate-700 focus:outline-none font-bold"
            >
              <option value="All">All Sectors</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Plastics">Plastics</option>
              <option value="Solvents">Solvents</option>
              <option value="Organics">Organics</option>
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-450 border-b border-slate-200">
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Product / Batch</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Available Stock</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Price per Unit</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredItems.map(item => {
                    const isAdded = draftItems.some(draft => draft.product.id === item.id);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-800 leading-snug">{item.name}</div>
                          <div className="text-[9px] font-mono text-slate-450 mt-1 flex items-center gap-1.5">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-[8px] text-slate-650">{item.category}</span>
                            <span>SKU: {item.sku}</span>
                            <span>•</span>
                            <span>Batch: {item.batch}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className={`font-black ${item.stock < 500 ? 'text-red-500' : 'text-slate-800'}`}>
                            {item.stock.toLocaleString()} units
                          </p>
                          <span className={`text-[8.5px] font-bold ${item.stock < 500 ? 'text-red-400' : 'text-slate-400'}`}>
                            {item.stock < 500 ? 'Low stock threshold' : 'Optimal capacity'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-extrabold text-slate-800">₹{item.price.toLocaleString('en-IN')}</p>
                          <p className="text-[8.5px] text-slate-400 font-bold">Excluding {item.gst}% GST</p>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => addToInvoice(item)}
                            disabled={isAdded}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide uppercase transition-all ${
                              isAdded 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                : 'bg-primary hover:bg-primary-dark text-white shadow-sm active:scale-95 cursor-pointer'
                            }`}
                          >
                            {isAdded ? 'Added to invoice' : 'Select item'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Invoice Draft Constructor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Tax Invoice Builder</h3>
                <p className="text-[10px] text-slate-400 font-bold">Draft invoices for stockists or clients</p>
              </div>
            </div>

            {draftItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 font-semibold space-y-3">
                <ShoppingBag className="h-10 w-10 mx-auto text-slate-300 stroke-[1.5]" />
                <p>No products selected for the invoice.</p>
                <p className="text-[10px] text-slate-450 font-normal max-w-xs mx-auto">
                  Click the "Select item" button next to any product on the left catalog table to populate details.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Client Information Form */}
                <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Billed To (Client)</label>
                    <select
                      value={clientName}
                      onChange={(e) => handleClientChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-primary"
                    >
                      <option value="Apex Chem Co">Apex Chem Co</option>
                      <option value="MedLife Ltd">MedLife Ltd</option>
                      <option value="Hindustan Inc">Hindustan Inc</option>
                      <option value="custom">Custom Recipient...</option>
                    </select>
                  </div>

                  {clientName === 'custom' && (
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Company Name"
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Client GSTIN</label>
                      <input
                        type="text"
                        value={clientGstin}
                        onChange={(e) => setClientGstin(e.target.value)}
                        placeholder="e.g. 27AAPCA8492K1Z9"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">PO Reference</label>
                      <input
                        type="text"
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Shipping Address</label>
                    <textarea
                      rows={2}
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Enter billing/shipping address..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 font-semibold resize-none"
                    />
                  </div>
                </div>

                {/* Draft Items Quantity and Price adjuster */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receipt Items</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {draftItems.map((item) => (
                      <div key={item.product.id} className="p-3 border border-slate-200 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-slate-800 truncate max-w-[200px]">{item.product.name}</p>
                            <p className="text-[9px] text-slate-400 font-semibold font-mono">{item.product.sku}</p>
                          </div>
                          <button
                            onClick={() => removeFromInvoice(item.product.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase text-slate-400 font-bold">Unit Price</span>
                            <input
                              type="number"
                              value={item.customPrice}
                              onChange={(e) => updatePrice(item.product.id, parseFloat(e.target.value) || 0)}
                              className="w-full border border-slate-200 rounded px-1.5 py-0.5 font-bold focus:outline-none focus:border-primary text-[11px]"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase text-slate-400 font-bold">Quantity</span>
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              max={item.product.stock}
                              onChange={(e) => updateQty(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-full border border-slate-200 rounded px-1.5 py-0.5 font-bold focus:outline-none focus:border-primary text-[11px]"
                            />
                          </div>
                          <div className="text-right flex flex-col justify-end">
                            <span className="text-[8px] uppercase text-slate-400 font-bold">Line Total</span>
                            <p className="font-black text-slate-850 py-0.5">₹{(item.quantity * item.customPrice).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[9px]">Tax Allocation</label>
                    <select
                      value={taxType}
                      onChange={(e) => setTaxType(e.target.value as 'GST' | 'IGST')}
                      className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1.5 font-semibold text-slate-700 focus:outline-none"
                    >
                      <option value="GST">CGST + SGST (MH)</option>
                      <option value="IGST">IGST (Interstate)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[9px] flex justify-between">
                      <span>Discount</span>
                      <span className="text-primary font-black">{discountPercent}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculation Summary Ledger */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Gross Subtotal:</span>
                    <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between font-medium text-red-500">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-₹{totals.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Taxable Net:</span>
                    <span>₹{totals.taxableSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {totals.cgst > 0 && (
                    <>
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>CGST Breakdown:</span>
                        <span>₹{totals.cgst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>SGST Breakdown:</span>
                        <span>₹{totals.sgst.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}

                  {totals.igst > 0 && (
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>IGST:</span>
                      <span>₹{totals.igst.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-slate-200 pt-2 font-black text-slate-800 text-sm">
                    <span>Total Invoice Value:</span>
                    <span className="text-primary text-base">₹{Math.round(totals.grandTotal).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Exporter Triggers */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Sheet
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-md cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* 3. Modal Add Product Catalog Entry */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Add Inventory Product Entry</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
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
                  placeholder="e.g. Purified Industrial Solvents"
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
                    placeholder="e.g. SLV-PURE-90"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category Sector</label>
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
                  <label className="font-bold text-slate-700">GST slab %</label>
                  <select
                    value={newGST}
                    onChange={(e) => setNewGST(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 focus:outline-none"
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
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 border border-slate-200 rounded-xl py-2.5 font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 font-bold transition-colors shadow-md cursor-pointer"
                >
                  Create Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Live Invoice Preview Overlay Sheet */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[24px] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col justify-between h-[90vh]">
            
            {/* Preview Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                  Tax Invoice Preview
                </h3>
                <p className="text-[10px] text-slate-500 font-bold">Standard PDF/A4 alignment blueprint</p>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Preview Sheet Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-100/50 flex justify-center">
              <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[15mm] shadow-lg border border-slate-200 rounded-lg text-[10px] text-slate-800 space-y-6">
                
                {/* Top header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-black text-primary tracking-tight">TALENTSPARK</h1>
                    <span className="text-[8px] uppercase tracking-wider text-slate-450 font-extrabold">Enterprise ERP Billing</span>
                  </div>
                  <div className="text-right">
                    <h2 className="text-sm font-black text-slate-900 uppercase">TAX INVOICE</h2>
                    <p className="text-slate-500 mt-1 leading-normal font-semibold">
                      Ref: <strong>{invoiceNumber}</strong><br/>
                      Date: <strong>{new Date().toLocaleDateString('en-IN')}</strong><br/>
                      Due: <strong>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-IN')}</strong><br/>
                      PO: <strong>{poNumber}</strong>
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100"/>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-8 text-[9.5px]">
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider mb-2">Billed From</p>
                    <p className="font-extrabold text-slate-800 text-xs">Talentspark Warehouse Corp</p>
                    <p className="text-slate-550 leading-relaxed mt-1 font-semibold">
                      Plot 15, Logistics Sector 4,<br/>
                      Navi Mumbai, Maharashtra, 400705<br/>
                      GSTIN: 27AAAAT2901F1Z8
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider mb-2">Billed To</p>
                    <p className="font-extrabold text-slate-800 text-xs">{clientName}</p>
                    <p className="text-slate-550 leading-relaxed mt-1 font-semibold">
                      {clientAddress || 'No Address Entered'}<br/>
                      GSTIN: {clientGstin || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full text-left text-[9.5px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <th className="p-2 font-bold uppercase">Item Description</th>
                      <th className="p-2 font-bold uppercase text-right">Rate</th>
                      <th className="p-2 font-bold uppercase text-right">Qty</th>
                      <th className="p-2 font-bold uppercase text-right">Tax Slab</th>
                      <th className="p-2 font-bold uppercase text-right">GST Amt</th>
                      <th className="p-2 font-bold uppercase text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {draftItems.map(item => {
                      const baseLine = item.quantity * item.customPrice;
                      const baseTax = (baseLine * item.product.gst) / 100;
                      return (
                        <tr key={item.product.id}>
                          <td className="p-2">
                            <p className="font-bold text-slate-850">{item.product.name}</p>
                            <p className="text-[8px] font-mono text-slate-400">SKU: {item.product.sku}</p>
                          </td>
                          <td className="p-2 text-right">₹{item.customPrice.toLocaleString('en-IN')}</td>
                          <td className="p-2 text-right">{item.quantity}</td>
                          <td className="p-2 text-right">{item.product.gst}%</td>
                          <td className="p-2 text-right">₹{baseTax.toLocaleString('en-IN')}</td>
                          <td className="p-2 text-right font-bold">₹{(baseLine + baseTax).toLocaleString('en-IN')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <hr className="border-slate-100"/>

                {/* Bottom summaries */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-7 text-[8.5px] text-slate-500 space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-100 self-start">
                    <p className="font-bold text-slate-700">Bank Details:</p>
                    <p className="font-semibold">
                      Beneficiary: Talentspark Corp<br/>
                      Bank: HDFC Bank Ltd • A/c: 50200084920199<br/>
                      IFSC: HDFC0000240 • Branch: Mumbai Fort
                    </p>
                    <p className="mt-2 font-semibold">Terms: {paymentTerms}</p>
                  </div>
                  
                  <div className="col-span-5">
                    <table className="w-full text-right text-[9.5px]">
                      <tbody>
                        <tr>
                          <td className="pb-1 text-slate-500">Gross Subtotal:</td>
                          <td className="pb-1 font-bold">₹{totals.subtotal.toLocaleString('en-IN')}</td>
                        </tr>
                        {discountPercent > 0 && (
                          <tr>
                            <td className="pb-1 text-red-500">Discount ({discountPercent}%):</td>
                            <td className="pb-1 font-bold text-red-500">-₹{totals.discountAmount.toLocaleString('en-IN')}</td>
                          </tr>
                        )}
                        <tr>
                          <td className="pb-1 text-slate-500">Taxable Net:</td>
                          <td className="pb-1 font-bold">₹{totals.taxableSubtotal.toLocaleString('en-IN')}</td>
                        </tr>
                        {totals.cgst > 0 && (
                          <>
                            <tr>
                              <td className="pb-1 text-slate-450">CGST:</td>
                              <td className="pb-1 font-bold text-slate-650">₹{totals.cgst.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                              <td className="pb-1 text-slate-450">SGST:</td>
                              <td className="pb-1 font-bold text-slate-650">₹{totals.sgst.toLocaleString('en-IN')}</td>
                            </tr>
                          </>
                        )}
                        {totals.igst > 0 && (
                          <tr>
                            <td className="pb-1 text-slate-450">IGST:</td>
                            <td className="pb-1 font-bold text-slate-650">₹{totals.igst.toLocaleString('en-IN')}</td>
                          </tr>
                        )}
                        <tr className="border-t border-slate-200">
                          <td className="pt-2 font-black text-primary text-xs">Grand Total:</td>
                          <td className="pt-2 font-black text-primary text-xs">₹{Math.round(totals.grandTotal).toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-[8px] text-center text-slate-400 pt-8 border-t border-slate-100">
                  Thank you for your business. Generated via Talentspark SaaS.
                </div>

              </div>
            </div>

            {/* Preview Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-bold">Verification: <strong>Approved by Admin</strong></span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    setIsPreviewOpen(false);
                    handleDownloadPDF();
                  }}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
