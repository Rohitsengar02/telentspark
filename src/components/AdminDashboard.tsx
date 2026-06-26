'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppState, CRMLead, Order, InventoryItem, Warehouse } from '@/store/state';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Package,
  FileSpreadsheet,
  CreditCard,
  Activity,
  Sliders,
  Settings as SettingsIcon,
  Check,
  Plus,
  Trash2,
  Edit,
  Save,
  ArrowRight,
  Star,
  RefreshCw,
  Send,
  Calendar as CalendarIcon,
  MessageSquare,
  Shield,
  Bell,
  FileText,
  CheckSquare,
  Zap,
  Clock,
  User,
  Phone,
  Mail,
  Award,
  MapPin,
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  Share2,
  Eye,
  Download,
  Info,
  Layers,
  DollarSign,
  PlusCircle,
  ArrowLeftRight,
  ChevronRight,
  ChevronDown,
  LogOut,
  BarChart,
  PieChart
} from 'lucide-react';

interface SubSection {
  name: string;
  badge?: string;
}

interface ERPSection {
  name: string;
  icon: any;
  subsections: SubSection[];
}

export default function AdminDashboard() {
  const {
    orders,
    updateOrderStatus,
    addOrder,
    crmLeads,
    updateLeadStage,
    addLead,
    inventory,
    addInventoryItem,
    updateInventoryStock,
    updateProductDiscount,
    warehouses,
    activities,
    addActivity,
    logout
  } = useAppState();

  // Navigation states
  const [activeSection, setActiveSection] = useState<string>('Dashboard');
  const [activeSubSection, setActiveSubSection] = useState<string>('Overview Dashboard');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'Dashboard': false,
    'Lead Management': false,
    'Customers': true,
    'Sales': true,
    'Billing & Invoices': true,
  });

  // State lists
  const [leadsList, setLeadsList] = useState<CRMLead[]>(crmLeads);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    company: '',
    contact: '',
    value: '450000',
    stage: 'Lead' as CRMLead['stage'],
    source: 'Google Ads',
    score: 85,
    email: '',
    phone: '',
    notes: ''
  });

  // Selected Team Member for Sidebar Details
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Detailed Team Member Data
  const teamMembers = [
    { 
      name: 'Amit Sharma', 
      role: 'Senior CRM Lead Director',
      deals: 14, 
      value: '₹4,50,000', 
      rating: 4.8, 
      badge: 'Top Closer', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'amit@talentspark.com',
      phone: '+91 98765 00112',
      target: '₹5,00,000',
      progress: 90,
      activeLeads: 5,
      performance: 'Outstanding',
      bio: 'Enterprise CRM lead specialist focusing on large pharmaceutical distributors across North India.',
      region: 'North India',
      status: 'Active',
      recentDeals: ['Pizer Pharma Ltd', 'Cipla Distribs']
    },
    { 
      name: 'Neha Gupta', 
      role: 'Enterprise Account Manager',
      deals: 9, 
      value: '₹2,80,000', 
      rating: 4.6, 
      badge: 'Rising Star', 
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'neha@talentspark.com',
      phone: '+91 98765 00113',
      target: '₹3,00,000',
      progress: 93,
      activeLeads: 3,
      performance: 'High Performance',
      bio: 'B2B key account coordinator specializing in medical chemicals and logistics coordination.',
      region: 'Western Region',
      status: 'Active',
      recentDeals: ['Lupin Chemicals', 'Sun Agro Food Co']
    },
    { 
      name: 'Rohan Verma', 
      role: 'Inside Sales Executive',
      deals: 11, 
      value: '₹3,90,000', 
      rating: 4.5, 
      badge: 'High Volume', 
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      email: 'rohan@talentspark.com',
      phone: '+91 98765 00114',
      target: '₹4,00,000',
      progress: 97,
      activeLeads: 4,
      performance: 'Superb',
      bio: 'Cold campaign expert driving conversions via WhatsApp API integration and bulk email followups.',
      region: 'South Territory',
      status: 'In Meeting',
      recentDeals: ['Dr. Reddys Labs', 'Local Chem Agency']
    },
    { 
      name: 'Priya Nair', 
      role: 'Key Growth Consultant',
      deals: 16, 
      value: '₹5,20,000', 
      rating: 4.9, 
      badge: 'Elite Consultant', 
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'priya.nair@talentspark.com',
      phone: '+91 98765 00115',
      target: '₹5,00,000',
      progress: 104,
      activeLeads: 8,
      performance: 'Overachiever',
      bio: 'Customer loyalty specialist and corporate strategic partnerships manager with 5+ years experience.',
      region: 'Western Region',
      status: 'Active',
      recentDeals: ['Aurobindo Biotech', 'Cipla Distribs']
    },
    { 
      name: 'Vikram Rathore', 
      role: 'Sales Representative',
      deals: 8, 
      value: '₹2,10,000', 
      rating: 4.2, 
      badge: 'On Track', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      email: 'vikram.r@talentspark.com',
      phone: '+91 98765 00116',
      target: '₹2,50,000',
      progress: 84,
      activeLeads: 6,
      performance: 'On Track',
      bio: 'Specialist in chemical product demos, focusing on localized laboratory logistics.',
      region: 'East Territory',
      status: 'On Break',
      recentDeals: ['Sun Agro Food Co']
    },
    { 
      name: 'Shalini Sen', 
      role: 'Strategic Partnerships Lead',
      deals: 12, 
      value: '₹4,10,000', 
      rating: 4.7, 
      badge: 'President\'s Club', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'shalini.s@talentspark.com',
      phone: '+91 98765 00117',
      target: '₹4,00,000',
      progress: 102,
      activeLeads: 5,
      performance: 'Outstanding',
      bio: 'Oversees tier-1 distributor negotiations, proforma invoice confirmations, and billing disputes.',
      region: 'North India',
      status: 'Active',
      recentDeals: ['Dr. Reddys Labs', 'Pizer Pharma Ltd']
    }
  ];

  // Additional rich mock data for leads & sub-pages
  const extendedLeads = [
    { 
      id: 'LD-201', 
      company: 'Pizer Pharma Ltd', 
      value: 1850000, 
      stage: 'Lead', 
      contact: 'Dr. Alok Nath', 
      email: 'alok@pizer.com', 
      phone: '+91 99887 76655', 
      source: 'Google Ads', 
      score: 92,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-202', 
      company: 'Dr. Reddys Labs', 
      value: 2900000, 
      stage: 'Qualified', 
      contact: 'Sandeep Varma', 
      email: 'sandeep.v@drreddy.com', 
      phone: '+91 98761 12345', 
      source: 'Cold Email', 
      score: 88,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-203', 
      company: 'Cipla Distribs', 
      value: 1250000, 
      stage: 'Proposal', 
      contact: 'Meena Iyer', 
      email: 'meena@cipla.com', 
      phone: '+91 91234 56789', 
      source: 'Website', 
      score: 76,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-204', 
      company: 'Aurobindo Biotech', 
      value: 950000, 
      stage: 'Negotiation', 
      contact: 'Rajesh Sen', 
      email: 'rajesh@aurobindo.com', 
      phone: '+91 93344 55667', 
      source: 'WhatsApp', 
      score: 81,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-205', 
      company: 'Lupin Chemicals', 
      value: 3400000, 
      stage: 'Won', 
      contact: 'Karan Malhotra', 
      email: 'karan@lupin.com', 
      phone: '+91 94455 66778', 
      source: 'Google Ads', 
      score: 98,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-206', 
      company: 'Sun Agro Food Co', 
      value: 650000, 
      stage: 'Lost', 
      contact: 'Vikram Seth', 
      email: 'vikram@sunagro.com', 
      phone: '+91 95566 77889', 
      source: 'Cold Call', 
      score: 45,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&auto=format&fit=crop&q=60'
    },
    { 
      id: 'LD-207', 
      company: 'Local Chem Agency', 
      value: 150000, 
      stage: 'Junk', 
      contact: 'Unknown Buyer', 
      email: 'info@chemagency.com', 
      phone: '+91 90000 00000', 
      source: 'Spam Form', 
      score: 12,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=60'
    }
  ];

  const [allLeadsData, setAllLeadsData] = useState<any[]>(() => {
    return [
      ...leadsList.map((l, i) => ({ 
        ...l, 
        source: 'Website', 
        score: 85 - i * 5, 
        email: 'buyer@corporate.com', 
        phone: '+91 99999 88888',
        avatar: i % 2 === 0 
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=60' 
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
        banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&auto=format&fit=crop&q=60'
      })), 
      ...extendedLeads
    ];
  });

  // Customer & Sales specific states
  const [freightSurcharge, setFreightSurcharge] = useState<number>(1850);
  const [bulkDiscountRate, setBulkDiscountRate] = useState<number>(8);
  const [selectedCustomerForDoc, setSelectedCustomerForDoc] = useState<string>('CUST-101');
  const [proformaAdvancePct, setProformaAdvancePct] = useState<number>(30);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState<string>('');
  const [invoicesList, setInvoicesList] = useState([
    { id: 'INV-2026-001', customer: 'Global Distribs', amount: 53100, date: '2026-06-19', status: 'Paid', items: [{ name: 'Premium Grade Silica', qty: 100, rate: 450, gst: 18 }] },
    { id: 'INV-2026-002', customer: 'Nexus Pharma', amount: 8496, date: '2026-06-18', status: 'Pending', items: [{ name: 'Pure Stearic Acid Powder', qty: 40, rate: 180, gst: 18 }] },
    { id: 'INV-2026-003', customer: 'Alpha Traders', amount: 8024, date: '2026-06-20', status: 'Paid', items: [{ name: 'Industrial Grade Ethanol 99%', qty: 20, rate: 340, gst: 18 }] },
    { id: 'INV-2026-004', customer: 'Lotus Laboratories', amount: 218300, date: '2026-06-15', status: 'Overdue', items: [{ name: 'Premium Grade Silica', qty: 370, rate: 500, gst: 18 }] },
    { id: 'INV-2026-005', customer: 'Jupiter Agri Foods', amount: 18486, date: '2026-06-10', status: 'Draft', items: [{ name: 'Pure Stearic Acid Powder', qty: 87, rate: 180, gst: 18 }] }
  ]);

  const mockCustomersList = [
    {
      id: 'CUST-101',
      name: 'Global Distribs',
      contact: 'Anil Mehta',
      title: 'Procurement Director',
      gst: '27AAAAA1111A1Z1',
      segment: 'Premium VIP',
      sales: '₹14,50,000',
      email: 'anil@globaldist.com',
      phone: '+91 98222 11100',
      address: 'Industrial Sector 5, Mumbai',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      status: 'Active',
      ordersCount: 38,
      lastOrderDate: '2026-06-19'
    },
    {
      id: 'CUST-102',
      name: 'Nexus Pharma',
      contact: 'Dr. Sarah Joseph',
      title: 'Chief Medical Officer',
      gst: '24BBBBB2222B2Z2',
      segment: 'Active Partner',
      sales: '₹8,90,000',
      email: 'sarah.j@nexuspharma.co.in',
      phone: '+91 91112 22334',
      address: 'BioPark Phase II, Hyderabad',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      status: 'Active',
      ordersCount: 22,
      lastOrderDate: '2026-06-18'
    },
    {
      id: 'CUST-103',
      name: 'Alpha Traders',
      contact: 'Suresh Kumar',
      title: 'Managing Director',
      gst: '19CCCCC3333C3Z3',
      segment: 'Premium VIP',
      sales: '₹22,40,000',
      email: 'suresh@alphatraders.org',
      phone: '+91 93333 44455',
      address: 'Salt Lake Sector V, Kolkata',
      banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      status: 'Active',
      ordersCount: 54,
      lastOrderDate: '2026-06-20'
    },
    {
      id: 'CUST-104',
      name: 'Jupiter Agri Foods',
      contact: 'Manpreet Singh',
      title: 'Supply Chain Manager',
      gst: '03DDDDD4444D4Z4',
      segment: 'Retail Partner',
      sales: '₹3,40,000',
      email: 'manpreet@jupiteragri.com',
      phone: '+91 94444 55566',
      address: 'Grain Market Road, Ludhiana',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      status: 'Idle',
      ordersCount: 8,
      lastOrderDate: '2026-05-12'
    },
    {
      id: 'CUST-105',
      name: 'Lotus Laboratories',
      contact: 'Rashmi Sen',
      title: 'Lead Lab Coordinator',
      gst: '33EEEEE5555E5Z5',
      segment: 'Churn Risk',
      sales: '₹1,20,000',
      email: 'rashmi@lotuslabs.com',
      phone: '+91 95555 66677',
      address: 'Guindy Industrial Area, Chennai',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'Churn Risk',
      ordersCount: 4,
      lastOrderDate: '2026-03-04'
    }
  ];

  // Sync back new state additions
  useEffect(() => {
    const missing = crmLeads.filter(l => !allLeadsData.some(ad => ad.id === l.id));
    if (missing.length > 0) {
      setAllLeadsData(prev => [
        ...missing.map(l => ({ 
          ...l, 
          source: 'Website', 
          score: 80, 
          email: 'buyer@corporate.com', 
          phone: '+91 99999 88888',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=60',
          banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=60'
        })), 
        ...prev
      ]);
    }
  }, [crmLeads]);

  // Invoice builder state
  const [invoiceItems, setInvoiceItems] = useState<{ name: string; qty: number; rate: number; gst: number }[]>([
    { name: 'Premium Grade Silica', qty: 10, rate: 450, gst: 18 }
  ]);
  const [invoiceClient, setInvoiceClient] = useState('Global Distribs');
  const [invoiceCurrency, setInvoiceCurrency] = useState('INR');
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [signature, setSignature] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [showInvoicePdf, setShowInvoicePdf] = useState(false);

  // Quote builder state
  const [quoteItems, setQuoteItems] = useState<{ name: string; qty: number; rate: number }[]>([
    { name: 'Pure Stearic Acid Powder', qty: 20, rate: 180 }
  ]);
  const [quoteClient, setQuoteClient] = useState('Jupiter Agri Foods');
  const [quoteStatus, setQuoteStatus] = useState<'Draft' | 'Sent' | 'Approved'>('Draft');

  // AI scoring / generation states
  const [aiScoreFeedback, setAiScoreFeedback] = useState<string>('');
  const [aiQuotePrompt, setAiQuotePrompt] = useState('');
  const [aiGeneratedText, setAiGeneratedText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Filter states for Product Intelligence
  const [intelDateRange, setIntelDateRange] = useState('30days');
  const [intelCategory, setIntelCategory] = useState('All');
  const [intelBrand, setIntelBrand] = useState('All');
  const [intelRegion, setIntelRegion] = useState('All');
  const [intelExecutive, setIntelExecutive] = useState('All');

  // Product Intelligence Dataset of 30 items
  const productIntelligenceData = useMemo(() => {
    return [
      // Category: Industrial Chemicals (10 items)
      { id: '1', sku: 'TS-ETH-99', category: 'Industrial Chemicals', name: 'Ethanol 99%', brand: 'Talentspark Chem', purchasePrice: 400, sellingPrice: 700, stock: 8, reorderLevel: 100, unitsSold: 450, revenue: 315000, demandScore: 95, salesVelocity: 15.0, lastSale: '2026-06-25', region: 'North India', supplier: 'Punjab Chemical Corp', rating: 5, status: '🔥 Fast Seller', growth: 34, leads: 150, quotes: 80, repeatOrders: 45, interest: 95, exec: 'Amit Sharma' },
      { id: '2', sku: 'TS-IPA-100', category: 'Industrial Chemicals', name: 'Isopropyl Alcohol', brand: 'IPA India', purchasePrice: 500, sellingPrice: 700, stock: 40, reorderLevel: 100, unitsSold: 420, revenue: 294000, demandScore: 92, salesVelocity: 14.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Gujarat Petrochem', rating: 5, status: '🔥 Fast Seller', growth: 18, leads: 120, quotes: 60, repeatOrders: 30, interest: 85, exec: 'Neha Gupta' },
      { id: '3', sku: 'TS-ACE-02', category: 'Industrial Chemicals', name: 'Acetone', brand: 'Talentspark Chem', purchasePrice: 500, sellingPrice: 700, stock: 55, reorderLevel: 80, unitsSold: 300, revenue: 210000, demandScore: 88, salesVelocity: 10.0, lastSale: '2026-06-24', region: 'North India', supplier: 'Punjab Chemical Corp', rating: 5, status: '🔥 Fast Seller', growth: 45, leads: 220, quotes: 30, repeatOrders: 60, interest: 99, exec: 'Amit Sharma' },
      { id: '4', sku: 'TS-STR-01', category: 'Industrial Chemicals', name: 'Stearic Acid', brand: 'Talentspark Chem', purchasePrice: 150, sellingPrice: 250, stock: 60, reorderLevel: 50, unitsSold: 210, revenue: 52500, demandScore: 78, salesVelocity: 7.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Gujarat Petrochem', rating: 4, status: '🔥 Fast Seller', growth: 12, leads: 90, quotes: 45, repeatOrders: 20, interest: 70, exec: 'Neha Gupta' },
      { id: '5', sku: 'TS-CIT-001', category: 'Industrial Chemicals', name: 'Citric Acid', brand: 'CitraGlobal', purchasePrice: 280, sellingPrice: 400, stock: 12, reorderLevel: 80, unitsSold: 390, revenue: 156000, demandScore: 90, salesVelocity: 13.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Apex Food Ingredients', rating: 5, status: '🔥 Fast Seller', growth: 22, leads: 110, quotes: 50, repeatOrders: 25, interest: 80, exec: 'Neha Gupta' },
      { id: '6', sku: 'TS-SUL-01', category: 'Industrial Chemicals', name: 'Sulphuric Acid', brand: 'SodaCorp', purchasePrice: 180, sellingPrice: 300, stock: 35, reorderLevel: 50, unitsSold: 240, revenue: 72000, demandScore: 82, salesVelocity: 8.0, lastSale: '2026-06-24', region: 'East India', supplier: 'Assam Petrochemicals', rating: 4, status: '🔥 Fast Seller', growth: 16, leads: 85, quotes: 40, repeatOrders: 15, interest: 60, exec: 'Vikram Rathore' },
      { id: '7', sku: 'TS-SODA-01', category: 'Industrial Chemicals', name: 'Caustic Soda', brand: 'SodaCorp', purchasePrice: 250, sellingPrice: 400, stock: 25, reorderLevel: 80, unitsSold: 330, revenue: 132000, demandScore: 86, salesVelocity: 11.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Gujarat Alkalies', rating: 4, status: '🔥 Fast Seller', growth: 40, leads: 180, quotes: 85, repeatOrders: 40, interest: 92, exec: 'Shalini Sen' },
      { id: '8', sku: 'TS-H2O2-09', category: 'Industrial Chemicals', name: 'Hydrogen Peroxide', brand: 'SodaCorp', purchasePrice: 480, sellingPrice: 700, stock: 30, reorderLevel: 60, unitsSold: 230, revenue: 161000, demandScore: 80, salesVelocity: 7.6, lastSale: '2026-06-25', region: 'East India', supplier: 'Assam Petrochemicals', rating: 4, status: '🔥 Fast Seller', growth: 15, leads: 70, quotes: 10, repeatOrders: 15, interest: 50, exec: 'Vikram Rathore' },
      { id: '9', sku: 'TS-GLY-01', category: 'Industrial Chemicals', name: 'Glycerin', brand: 'Talentspark Chem', purchasePrice: 200, sellingPrice: 350, stock: 45, reorderLevel: 40, unitsSold: 180, revenue: 63000, demandScore: 75, salesVelocity: 6.0, lastSale: '2026-06-23', region: 'South India', supplier: 'Chennai Works', rating: 4, status: '🔥 Fast Seller', growth: 8, leads: 65, quotes: 30, repeatOrders: 10, interest: 55, exec: 'Rohan Verma' },
      { id: '10', sku: 'TS-MET-01', category: 'Industrial Chemicals', name: 'Methanol', brand: 'Talentspark Chem', purchasePrice: 150, sellingPrice: 250, stock: 50, reorderLevel: 60, unitsSold: 200, revenue: 50000, demandScore: 77, salesVelocity: 6.6, lastSale: '2026-06-22', region: 'North India', supplier: 'Punjab Chemical Corp', rating: 4, status: '🔥 Fast Seller', growth: 10, leads: 70, quotes: 35, repeatOrders: 12, interest: 58, exec: 'Amit Sharma' },

      // Category: Laboratory Chemicals (8 items)
      { id: '11', sku: 'TS-SACL-03', category: 'Laboratory Chemicals', name: 'Sodium Chloride', brand: 'LabEssentials', purchasePrice: 130, sellingPrice: 200, stock: 65, reorderLevel: 90, unitsSold: 290, revenue: 58000, demandScore: 84, salesVelocity: 9.6, lastSale: '2026-06-25', region: 'South India', supplier: 'Tata Chemicals Ltd', rating: 4, status: '🔥 Fast Seller', growth: 5, leads: 130, quotes: 65, repeatOrders: 20, interest: 75, exec: 'Rohan Verma' },
      { id: '12', sku: 'TS-KNO3', category: 'Laboratory Chemicals', name: 'Potassium Nitrate', brand: 'LabEssentials', purchasePrice: 600, sellingPrice: 800, stock: 130, reorderLevel: 15, unitsSold: 16, revenue: 12800, demandScore: 32, salesVelocity: 0.5, lastSale: '2026-06-11', region: 'East India', supplier: 'Kolkata Chemicals', rating: 4, status: '⚠ Slow Moving', growth: -6, leads: 14, quotes: 4, repeatOrders: 1, interest: 10, exec: 'Vikram Rathore' },
      { id: '13', sku: 'TS-AGNO3', category: 'Laboratory Chemicals', name: 'Silver Nitrate', brand: 'LabEssentials', purchasePrice: 2000, sellingPrice: 2500, stock: 300, reorderLevel: 10, unitsSold: 15, revenue: 37500, demandScore: 25, salesVelocity: 0.5, lastSale: '2026-06-10', region: 'West India', supplier: 'Gujarat Petrochem', rating: 4, status: '⚠ Slow Moving', growth: -28, leads: 12, quotes: 8, repeatOrders: 2, interest: 15, exec: 'Neha Gupta' },
      { id: '14', sku: 'TS-HCL-01', category: 'Laboratory Chemicals', name: 'Hydrochloric Acid', brand: 'LabEssentials', purchasePrice: 100, sellingPrice: 180, stock: 80, reorderLevel: 30, unitsSold: 160, revenue: 28800, demandScore: 68, salesVelocity: 5.3, lastSale: '2026-06-24', region: 'North India', supplier: 'Delhi Chemical Hub', rating: 4, status: 'Normal', growth: 5, leads: 45, quotes: 20, repeatOrders: 10, interest: 40, exec: 'Amit Sharma' },
      { id: '15', sku: 'TS-NH4CL', category: 'Laboratory Chemicals', name: 'Ammonium Chloride', brand: 'LabEssentials', purchasePrice: 400, sellingPrice: 500, stock: 140, reorderLevel: 20, unitsSold: 30, revenue: 15000, demandScore: 38, salesVelocity: 1.0, lastSale: '2026-06-20', region: 'North India', supplier: 'Delhi Chemical Hub', rating: 4, status: '⚠ Slow Moving', growth: 2, leads: 28, quotes: 12, repeatOrders: 4, interest: 25, exec: 'Amit Sharma' },
      { id: '16', sku: 'TS-BORIC', category: 'Laboratory Chemicals', name: 'Boric Acid', brand: 'LabEssentials', purchasePrice: 400, sellingPrice: 500, stock: 150, reorderLevel: 15, unitsSold: 20, revenue: 10000, demandScore: 30, salesVelocity: 0.7, lastSale: '2026-06-15', region: 'South India', supplier: 'Tata Chemicals Ltd', rating: 3, status: '⚠ Slow Moving', growth: -8, leads: 18, quotes: 5, repeatOrders: 1, interest: 12, exec: 'Rohan Verma' },
      { id: '17', sku: 'TS-COP-01', category: 'Laboratory Chemicals', name: 'Copper Sulphate', brand: 'LabEssentials', purchasePrice: 350, sellingPrice: 500, stock: 120, reorderLevel: 25, unitsSold: 22, revenue: 11000, demandScore: 35, salesVelocity: 0.7, lastSale: '2026-06-14', region: 'East India', supplier: 'Kolkata Chemicals', rating: 4, status: '⚠ Slow Moving', growth: -4, leads: 20, quotes: 8, repeatOrders: 2, interest: 15, exec: 'Vikram Rathore' },
      { id: '18', sku: 'TS-ZNO', category: 'Laboratory Chemicals', name: 'Zinc Oxide', brand: 'LabEssentials', purchasePrice: 400, sellingPrice: 500, stock: 110, reorderLevel: 20, unitsSold: 22, revenue: 11000, demandScore: 36, salesVelocity: 0.7, lastSale: '2026-06-15', region: 'West India', supplier: 'Gujarat Petrochem', rating: 4, status: '⚠ Slow Moving', growth: -4, leads: 25, quotes: 9, repeatOrders: 2, interest: 18, exec: 'Neha Gupta' },

      // Category: Pharmaceuticals Raw Materials (7 items)
      { id: '19', sku: 'TS-LACT-05', category: 'Pharmaceuticals Raw Materials', name: 'Lactose Monohydrate', brand: 'PharmaGrade', purchasePrice: 550, sellingPrice: 800, stock: 85, reorderLevel: 90, unitsSold: 270, revenue: 216000, demandScore: 88, salesVelocity: 9.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Sun Pharma Sourcing', rating: 5, status: '🔥 Fast Seller', growth: 25, leads: 105, quotes: 40, repeatOrders: 35, interest: 80, exec: 'Neha Gupta' },
      { id: '20', sku: 'TS-MCC-01', category: 'Pharmaceuticals Raw Materials', name: 'Microcrystalline Cellulose', brand: 'PharmaGrade', purchasePrice: 450, sellingPrice: 600, stock: 95, reorderLevel: 50, unitsSold: 150, revenue: 90000, demandScore: 76, salesVelocity: 5.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Sun Pharma Sourcing', rating: 4, status: 'Normal', growth: 22, leads: 82, quotes: 35, repeatOrders: 15, interest: 60, exec: 'Neha Gupta' },
      { id: '21', sku: 'TS-MST-01', category: 'Pharmaceuticals Raw Materials', name: 'Magnesium Stearate', brand: 'PharmaGrade', purchasePrice: 300, sellingPrice: 450, stock: 110, reorderLevel: 40, unitsSold: 140, revenue: 63000, demandScore: 74, salesVelocity: 4.6, lastSale: '2026-06-25', region: 'West India', supplier: 'Sun Pharma Sourcing', rating: 4, status: 'Normal', growth: 12, leads: 70, quotes: 28, repeatOrders: 11, interest: 52, exec: 'Neha Gupta' },
      { id: '22', sku: 'TS-POV-30', category: 'Pharmaceuticals Raw Materials', name: 'Povidone K30', brand: 'PharmaGrade', purchasePrice: 800, sellingPrice: 1200, stock: 40, reorderLevel: 20, unitsSold: 85, revenue: 102000, demandScore: 68, salesVelocity: 2.8, lastSale: '2026-06-24', region: 'North India', supplier: 'Delhi Pharma Labs', rating: 4, status: 'Normal', growth: 15, leads: 40, quotes: 15, repeatOrders: 5, interest: 35, exec: 'Amit Sharma' },
      { id: '23', sku: 'TS-TALC-10', category: 'Pharmaceuticals Raw Materials', name: 'Talc Powder', brand: 'PharmaGrade', purchasePrice: 180, sellingPrice: 300, stock: 130, reorderLevel: 50, unitsSold: 220, revenue: 66000, demandScore: 82, salesVelocity: 7.3, lastSale: '2026-06-25', region: 'South India', supplier: 'Hyderabad Minerals', rating: 4, status: '🔥 Fast Seller', growth: 4, leads: 60, quotes: 30, repeatOrders: 8, interest: 55, exec: 'Rohan Verma' },
      { id: '24', sku: 'TS-CALC-08', category: 'Pharmaceuticals Raw Materials', name: 'Calcium Carbonate', brand: 'PharmaGrade', purchasePrice: 380, sellingPrice: 500, stock: 70, reorderLevel: 80, unitsSold: 240, revenue: 120000, demandScore: 81, salesVelocity: 8.0, lastSale: '2026-06-25', region: 'North India', supplier: 'Delhi Pharma Labs', rating: 4, status: '🔥 Fast Seller', growth: -12, leads: 35, quotes: 20, repeatOrders: 2, interest: 30, exec: 'Amit Sharma' },
      { id: '25', sku: 'TS-GEL-01', category: 'Pharmaceuticals Raw Materials', name: 'Gelatin Powder', brand: 'PharmaGrade', purchasePrice: 600, sellingPrice: 900, stock: 45, reorderLevel: 30, unitsSold: 90, revenue: 81000, demandScore: 70, salesVelocity: 3.0, lastSale: '2026-06-22', region: 'South India', supplier: 'Hyderabad Minerals', rating: 4, status: 'Normal', growth: 8, leads: 38, quotes: 12, repeatOrders: 6, interest: 32, exec: 'Rohan Verma' },

      // Category: Food Ingredients (7 items)
      { id: '26', sku: 'TS-CITFG-04', category: 'Food Ingredients', name: 'Citric Acid Food Grade', brand: 'CitraGlobal', purchasePrice: 300, sellingPrice: 400, stock: 45, reorderLevel: 70, unitsSold: 280, revenue: 112000, demandScore: 82, salesVelocity: 9.3, lastSale: '2026-06-25', region: 'West India', supplier: 'Apex Food Ingredients', rating: 4, status: '🔥 Fast Seller', growth: -5, leads: 40, quotes: 25, repeatOrders: 10, interest: 35, exec: 'Neha Gupta' },
      { id: '27', sku: 'TS-XAN-01', category: 'Food Ingredients', name: 'Xanthan Gum', brand: 'CitraGlobal', purchasePrice: 300, sellingPrice: 400, stock: 85, reorderLevel: 30, unitsSold: 120, revenue: 48000, demandScore: 89, salesVelocity: 4.0, lastSale: '2026-06-25', region: 'West India', supplier: 'Apex Food Ingredients', rating: 5, status: 'Normal', growth: 32, leads: 92, quotes: 45, repeatOrders: 20, interest: 70, exec: 'Neha Gupta' },
      { id: '28', sku: 'TS-SBE-01', category: 'Food Ingredients', name: 'Sodium Benzoate', brand: 'CitraGlobal', purchasePrice: 200, sellingPrice: 300, stock: 120, reorderLevel: 40, unitsSold: 130, revenue: 39000, demandScore: 72, salesVelocity: 4.3, lastSale: '2026-06-25', region: 'West India', supplier: 'Apex Food Ingredients', rating: 4, status: 'Normal', growth: 18, leads: 75, quotes: 30, repeatOrders: 12, interest: 58, exec: 'Neha Gupta' },
      { id: '29', sku: 'TS-KSO-01', category: 'Food Ingredients', name: 'Potassium Sorbate', brand: 'CitraGlobal', purchasePrice: 300, sellingPrice: 400, stock: 90, reorderLevel: 30, unitsSold: 110, revenue: 44000, demandScore: 88, salesVelocity: 3.6, lastSale: '2026-06-24', region: 'South India', supplier: 'Apex Food Ingredients', rating: 4, status: 'Normal', growth: 14, leads: 89, quotes: 40, repeatOrders: 18, interest: 68, exec: 'Rohan Verma' },
      { id: '30', sku: 'TS-MAL-01', category: 'Food Ingredients', name: 'Maltodextrin', brand: 'CitraGlobal', purchasePrice: 180, sellingPrice: 280, stock: 110, reorderLevel: 40, unitsSold: 150, revenue: 42000, demandScore: 75, salesVelocity: 5.0, lastSale: '2026-06-23', region: 'North India', supplier: 'Delhi Chemical Hub', rating: 4, status: 'Normal', growth: 10, leads: 50, quotes: 18, repeatOrders: 8, interest: 42, exec: 'Amit Sharma' },
      { id: '31', sku: 'TS-BAK-01', category: 'Food Ingredients', name: 'Baking Powder', brand: 'CitraGlobal', purchasePrice: 120, sellingPrice: 200, stock: 160, reorderLevel: 50, unitsSold: 170, revenue: 34000, demandScore: 78, salesVelocity: 5.6, lastSale: '2026-06-24', region: 'South India', supplier: 'Chennai Works', rating: 4, status: 'Normal', growth: 6, leads: 55, quotes: 22, repeatOrders: 10, interest: 48, exec: 'Rohan Verma' },
      { id: '32', sku: 'TS-CORN-01', category: 'Food Ingredients', name: 'Corn Starch', brand: 'CitraGlobal', purchasePrice: 100, sellingPrice: 160, stock: 200, reorderLevel: 60, unitsSold: 190, revenue: 30400, demandScore: 80, salesVelocity: 6.3, lastSale: '2026-06-25', region: 'East India', supplier: 'Kolkata Chemicals', rating: 4, status: 'Normal', growth: 8, leads: 60, quotes: 25, repeatOrders: 12, interest: 50, exec: 'Vikram Rathore' },

      // Category: Packaging Materials (6 items)
      { id: '33', sku: 'TS-HDP-200', category: 'Packaging Materials', name: 'HDPE Drums', brand: 'PackEnterprise', purchasePrice: 380, sellingPrice: 500, stock: 20, reorderLevel: 50, unitsSold: 350, revenue: 175000, demandScore: 98, salesVelocity: 11.6, lastSale: '2026-06-24', region: 'North India', supplier: 'Ludhiana Plastics Ltd', rating: 4, status: '🔥 Fast Seller', growth: 12, leads: 30, quotes: 95, repeatOrders: 50, interest: 25, exec: 'Amit Sharma' },
      { id: '34', sku: 'TS-BOT-100', category: 'Packaging Materials', name: 'Chemical Bottles', brand: 'PackEnterprise', purchasePrice: 120, sellingPrice: 200, stock: 35, reorderLevel: 70, unitsSold: 340, revenue: 68000, demandScore: 90, salesVelocity: 11.3, lastSale: '2026-06-25', region: 'South India', supplier: 'Chennai Bottle Works', rating: 4, status: '🔥 Fast Seller', growth: 15, leads: 40, quotes: 70, repeatOrders: 35, interest: 35, exec: 'Rohan Verma' },
      { id: '35', sku: 'TS-PCON-07', category: 'Packaging Materials', name: 'Plastic Containers', brand: 'PackEnterprise', purchasePrice: 200, sellingPrice: 300, stock: 95, reorderLevel: 70, unitsSold: 260, revenue: 78000, demandScore: 84, salesVelocity: 8.6, lastSale: '2026-06-24', region: 'South India', supplier: 'Chennai Bottle Works', rating: 4, status: '🔥 Fast Seller', growth: 8, leads: 50, quotes: 15, repeatOrders: 10, interest: 45, exec: 'Rohan Verma' },
      { id: '36', sku: 'TS-BOX-06', category: 'Packaging Materials', name: 'Corrugated Boxes', brand: 'PackEnterprise', purchasePrice: 120, sellingPrice: 200, stock: 110, reorderLevel: 60, unitsSold: 250, revenue: 50000, demandScore: 81, salesVelocity: 8.3, lastSale: '2026-06-23', region: 'East India', supplier: 'Kolkata Box Co', rating: 4, status: '🔥 Fast Seller', growth: 10, leads: 85, quotes: 35, repeatOrders: 15, interest: 65, exec: 'Vikram Rathore' },
      { id: '37', sku: 'TS-LAB-01', category: 'Packaging Materials', name: 'Labels & Stickers', brand: 'PackEnterprise', purchasePrice: 10, sellingPrice: 20, stock: 1000, reorderLevel: 200, unitsSold: 500, revenue: 10000, demandScore: 75, salesVelocity: 16.6, lastSale: '2026-06-25', region: 'North India', supplier: 'Delhi Printers', rating: 4, status: '🔥 Fast Seller', growth: 5, leads: 30, quotes: 10, repeatOrders: 5, interest: 20, exec: 'Amit Sharma' },
      { id: '38', sku: 'TS-TAP-01', category: 'Packaging Materials', name: 'Packaging Tapes', brand: 'PackEnterprise', purchasePrice: 30, sellingPrice: 50, stock: 400, reorderLevel: 100, unitsSold: 300, revenue: 15000, demandScore: 70, salesVelocity: 10.0, lastSale: '2026-06-24', region: 'West India', supplier: 'Gujarat Petrochem', rating: 4, status: '🔥 Fast Seller', growth: 8, leads: 25, quotes: 8, repeatOrders: 4, interest: 15, exec: 'Neha Gupta' },

      // Category: Industrial Equipment (6 items)
      { id: '39', sku: 'TS-PUMP-01', category: 'Industrial Equipment', name: 'Chemical Pumps', brand: 'EquipTech', purchasePrice: 6000, sellingPrice: 8000, stock: 70, reorderLevel: 5, unitsSold: 18, revenue: 144000, demandScore: 35, salesVelocity: 0.6, lastSale: '2026-06-14', region: 'South India', supplier: 'Coimbatore Pump Works', rating: 4, status: '⚠ Slow Moving', growth: -12, leads: 16, quotes: 4, repeatOrders: 1, interest: 15, exec: 'Rohan Verma' },
      { id: '40', sku: 'TS-SCALE-01', category: 'Industrial Equipment', name: 'Digital Weighing Scale', brand: 'EquipTech', purchasePrice: 3000, sellingPrice: 4500, stock: 45, reorderLevel: 8, unitsSold: 14, revenue: 63000, demandScore: 38, salesVelocity: 0.5, lastSale: '2026-06-12', region: 'North India', supplier: 'Delhi Electronics', rating: 4, status: '⚠ Slow Moving', growth: -5, leads: 18, quotes: 5, repeatOrders: 2, interest: 15, exec: 'Amit Sharma' },
      { id: '41', sku: 'TS-PH-01', category: 'Industrial Equipment', name: 'pH Meter', brand: 'EquipTech', purchasePrice: 2000, sellingPrice: 2500, stock: 90, reorderLevel: 10, unitsSold: 25, revenue: 62500, demandScore: 36, salesVelocity: 0.8, lastSale: '2026-06-18', region: 'North India', supplier: 'Delhi Electronics', rating: 4, status: '⚠ Slow Moving', growth: -5, leads: 22, quotes: 10, repeatOrders: 3, interest: 20, exec: 'Amit Sharma' },
      { id: '42', sku: 'TS-FLOW-01', category: 'Industrial Equipment', name: 'Flow Meter', brand: 'EquipTech', purchasePrice: 12000, sellingPrice: 15000, stock: 80, reorderLevel: 5, unitsSold: 12, revenue: 180000, demandScore: 22, salesVelocity: 0.4, lastSale: '2026-06-12', region: 'East India', supplier: 'Kolkata Equipments', rating: 4, status: '⚠ Slow Moving', growth: -18, leads: 15, quotes: 6, repeatOrders: 1, interest: 10, exec: 'Vikram Rathore' },
      { id: '43', sku: 'TS-MIX-01', category: 'Industrial Equipment', name: 'Industrial Mixers', brand: 'EquipTech', purchasePrice: 25000, sellingPrice: 30000, stock: 15, reorderLevel: 2, unitsSold: 10, revenue: 300000, demandScore: 20, salesVelocity: 0.3, lastSale: '2026-06-08', region: 'West India', supplier: 'Mumbai Heavy Machinery', rating: 4, status: '⚠ Slow Moving', growth: -10, leads: 9, quotes: 3, repeatOrders: 1, interest: 7, exec: 'Neha Gupta' },
      { id: '44', sku: 'TS-TANK-01', category: 'Industrial Equipment', name: 'Storage Tanks', brand: 'EquipTech', purchasePrice: 40000, sellingPrice: 50000, stock: 20, reorderLevel: 2, unitsSold: 8, revenue: 400000, demandScore: 18, salesVelocity: 0.3, lastSale: '2026-06-05', region: 'North India', supplier: 'Punjab Heavy Engg', rating: 5, status: '⚠ Slow Moving', growth: -15, leads: 8, quotes: 2, repeatOrders: 0, interest: 5, exec: 'Amit Sharma' }
    ];
  }, []);

  const filteredIntelData = useMemo(() => {
    return productIntelligenceData.filter((item: any) => {
      const matchCat = intelCategory === 'All' || item.category === intelCategory;
      const matchBrand = intelBrand === 'All' || item.brand === intelBrand;
      const matchRegion = intelRegion === 'All' || item.region === intelRegion;
      const matchExec = intelExecutive === 'All' || item.exec === intelExecutive;
      return matchCat && matchBrand && matchRegion && matchExec;
    });
  }, [productIntelligenceData, intelCategory, intelBrand, intelRegion, intelExecutive]);

  // Expense states
  const [expenses, setExpenses] = useState([
    { id: 'EXP-001', category: 'Logistics', vendor: 'BlueDart Express', amount: 45000, date: '2026-06-18', status: 'Approved' },
    { id: 'EXP-002', category: 'Marketing', vendor: 'Google Ads', amount: 120000, date: '2026-06-15', status: 'Pending' },
    { id: 'EXP-003', category: 'Rent', vendor: 'Assetz Infra Ltd', amount: 350000, date: '2026-06-01', status: 'Approved' },
  ]);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ category: 'Logistics', vendor: '', amount: '', date: new Date().toISOString().split('T')[0] });

  // Tasks states
  const [tasks, setTasks] = useState([
    { id: 'T-1', title: 'Verify GST invoice filing', stage: 'My Tasks', deadline: 'Today', priority: 'High', done: false },
    { id: 'T-2', title: 'Call back Sun Pharma lead', stage: 'My Tasks', deadline: 'Today', priority: 'High', done: false },
    { id: 'T-3', title: 'Approve vendor payments', stage: 'Team Tasks', deadline: 'Tomorrow', priority: 'Medium', done: false },
    { id: 'T-4', title: 'Update warehouse capacity threshold', stage: 'Completed Tasks', deadline: 'Yesterday', priority: 'Low', done: true }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Subscriptions & Rewards states
  const [userWallets, setUserWallets] = useState([
    { id: 'CUST-101', name: 'Global Distribs (Anil Mehta)', balance: 1250, segment: 'Premium VIP' },
    { id: 'CUST-102', name: 'Nexus Pharma (Dr. Sarah Joseph)', balance: 300, segment: 'Active Partner' },
    { id: 'CUST-103', name: 'Alpha Traders (Suresh Kumar)', balance: 1500, segment: 'Premium VIP' },
    { id: 'CUST-104', name: 'Jupiter Agri Foods (Manpreet Singh)', balance: 0, segment: 'Retail Partner' },
    { id: 'CUST-105', name: 'Lotus Laboratories (Rashmi Sen)', balance: 50, segment: 'Churn Risk' }
  ]);
  const [customerSubscriptions, setCustomerSubscriptions] = useState([
    { id: 'SUB-101', name: 'Global Distribs (Anil Mehta)', tier: 'Gold Elite', status: 'Active', renewalDate: '2026-07-24', price: 599 },
    { id: 'SUB-102', name: 'Nexus Pharma (Dr. Sarah Joseph)', tier: 'Platinum VIP', status: 'Active', renewalDate: '2026-07-19', price: 999 },
    { id: 'SUB-103', name: 'Alpha Traders (Suresh Kumar)', tier: 'Silver Pro', status: 'Active', renewalDate: '2026-07-02', price: 299 },
    { id: 'SUB-104', name: 'Lotus Laboratories (Rashmi Sen)', tier: 'Bronze Standard', status: 'Active', renewalDate: '2026-07-11', price: 0 }
  ]);
  const [selectedWalletUser, setSelectedWalletUser] = useState('CUST-101');
  const [walletAdjustType, setWalletAdjustType] = useState<'credit' | 'debit'>('credit');
  const [walletAdjustAmount, setWalletAdjustAmount] = useState('');
  const [walletAdjustReason, setWalletAdjustReason] = useState('');

  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: 'SUB-BRONZE', name: 'Bronze Standard', price: 0, cashback: 1, shipping: 'Standard (Charged)', subscribers: 145 },
    { id: 'SUB-SILVER', name: 'Silver Pro', price: 299, cashback: 3, shipping: 'Free over ₹500', subscribers: 84 },
    { id: 'SUB-GOLD', name: 'Gold Elite', price: 599, cashback: 5, shipping: 'Free Priority', subscribers: 112 },
    { id: 'SUB-PLATINUM', name: 'Platinum VIP', price: 999, cashback: 10, shipping: 'Free Instant', subscribers: 39 }
  ]);
  const [showSubModal, setShowSubModal] = useState(false);
  const [subForm, setSubForm] = useState({ name: '', price: '', cashback: '5', shipping: 'Free Priority' });
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Sales Orders states
  const [selectedOrderVendorFilter, setSelectedOrderVendorFilter] = useState('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

  const [coupons, setCoupons] = useState([
    { code: 'WELCOME100', reward: 100, status: 'Active', redemptions: 142, expiry: '2026-12-31' },
    { code: 'FESTIVE250', reward: 250, status: 'Active', redemptions: 64, expiry: '2026-09-30' },
    { code: 'SUPER500', reward: 500, status: 'Inactive', redemptions: 12, expiry: '2026-06-01' }
  ]);
  const [couponForm, setCouponForm] = useState({ code: '', reward: '', status: 'Active', expiry: '' });

  const [rewardConfig, setRewardConfig] = useState({
    cashbackRate: 5,
    welcomeBonus: 400,
    referralBonus: 150,
    pointValueInInr: 1
  });

  // Sidebar structures
  const erpSections: ERPSection[] = [
    {
      name: 'Dashboard',
      icon: TrendingUp,
      subsections: [
        { name: 'Overview Dashboard' },
        { name: 'Business Analytics' },
        { name: 'Revenue Dashboard' },
        { name: 'Team Performance' },
        { name: 'Daily Activity' }
      ]
    },
    {
      name: 'Order Management',
      icon: ShoppingBag,
      subsections: [
        { name: 'Sales Orders' }
      ]
    },
    {
      name: 'Subscriptions & Rewards',
      icon: Award,
      subsections: [
        { name: 'User Wallets' },
        { name: 'Subscription Plans' },
        { name: 'User Subscriptions' },
        { name: 'Coupons & Promos' },
        { name: 'Reward Policies' }
      ]
    },
    {
      name: 'Product Intelligence',
      icon: Package,
      subsections: [
        { name: 'Product Overview' },
        { name: 'Demand Analytics' },
        { name: 'Sales Velocity' },
        { name: 'Product Performance' },
        { name: 'Product Forecasting' },
        { name: 'Inventory Insights' },
        { name: 'Product Reports' }
      ]
    },
    {
      name: 'Billing & Invoices',
      icon: FileSpreadsheet,
      subsections: [
        { name: 'All Invoices' },
        { name: 'Draft Invoices' },
        { name: 'Paid Invoices' },
        { name: 'Pending Invoices' },
        { name: 'Overdue Invoices' },
        { name: 'Recurring Invoices' }
      ]
    },
    {
      name: 'Lead Management',
      icon: Users,
      subsections: [
        { name: 'All Leads' },
        { name: 'New Leads' },
        { name: 'Follow-Up Leads' },
        { name: 'Qualified Leads' },
        { name: 'Converted Leads' },
        { name: 'Lost Leads' },
        { name: 'Junk Leads' }
      ]
    },
    {
      name: 'Customers',
      icon: Award,
      subsections: [
        { name: 'All Customers' },
        { name: 'Active Customers' },
        { name: 'Premium Customers' },
        { name: 'Customer Groups' },
        { name: 'Customer Documents' }
      ]
    },
    {
      name: 'Sales',
      icon: DollarSign,
      subsections: [
        { name: 'Quotations' },
        { name: 'Estimates' },
        { name: 'Sales Orders' },
        { name: 'Proforma Invoice' }
      ]
    },
    {
      name: 'Payments',
      icon: CreditCard,
      subsections: [
        { name: 'Received Payments' },
        { name: 'Pending Payments' },
        { name: 'Refunds' },
        { name: 'Payment Requests' }
      ]
    },
    {
      name: 'Products & Services',
      icon: Package,
      subsections: [
        { name: 'Products' },
        { name: 'Services' },
        { name: 'Categories' },
        { name: 'Brands' },
        { name: 'Units' }
      ]
    },
    {
      name: 'Inventory',
      icon: Layers,
      subsections: [
        { name: 'Stock Overview' },
        { name: 'Purchase Entries' },
        { name: 'Stock In' },
        { name: 'Stock Out' },
        { name: 'Low Stock Alerts' },
        { name: 'Stock Transfer' }
      ]
    },
    {
      name: 'Expense Management',
      icon: DollarSign,
      subsections: [
        { name: 'All Expenses' },
        { name: 'Categories' },
        { name: 'Vendors' },
        { name: 'Recurring Expenses' }
      ]
    },
    {
      name: 'Vendor Management',
      icon: Shield,
      subsections: [
        { name: 'All Vendors' },
        { name: 'Purchase Orders' },
        { name: 'Vendor Payments' }
      ]
    },
    {
      name: 'Reports & Analytics',
      icon: Activity,
      subsections: [
        { name: 'Sales Reports' },
        { name: 'Invoice Reports' },
        { name: 'Payment Reports' },
        { name: 'Customer Reports' },
        { name: 'Lead Reports' },
        { name: 'Expense Reports' },
        { name: 'Tax Reports' }
      ]
    },
    {
      name: 'Marketing',
      icon: Sliders,
      subsections: [
        { name: 'Email Campaigns' },
        { name: 'SMS Campaigns' },
        { name: 'WhatsApp Campaigns' }
      ]
    },
    {
      name: 'Employee Management',
      icon: Users,
      subsections: [
        { name: 'Employees' },
        { name: 'Roles & Permissions' },
        { name: 'Attendance' },
        { name: 'Activity Logs' }
      ]
    },
    {
      name: 'Tasks & Projects',
      icon: CheckSquare,
      subsections: [
        { name: 'My Tasks' },
        { name: 'Team Tasks' },
        { name: 'Completed Tasks' }
      ]
    }
  ];

  // Helper toggle collapse
  const toggleSection = (secName: string) => {
    setCollapsedSections(prev => ({ ...prev, [secName]: !prev[secName] }));
  };

  // Quick action: Add Lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLd = {
      id: `LD-${allLeadsData.length + 201}`,
      company: leadForm.company,
      contact: leadForm.contact,
      value: parseFloat(leadForm.value) || 0,
      stage: leadForm.stage,
      email: leadForm.email || 'info@leadcorp.com',
      phone: leadForm.phone || '+91 98888 77777',
      source: leadForm.source,
      score: leadForm.score,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
      banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&auto=format&fit=crop&q=60'
    };
    setAllLeadsData([newLd, ...allLeadsData]);
    addLead({ company: leadForm.company, contact: leadForm.contact, value: parseFloat(leadForm.value), stage: leadForm.stage });
    addActivity(`New lead captured: ${leadForm.company} (₹${parseFloat(leadForm.value).toLocaleString()})`, 'vendor');
    setShowLeadModal(false);
    setLeadForm({
      company: '',
      contact: '',
      value: '450005',
      stage: 'Lead',
      source: 'Google Ads',
      score: 85,
      email: '',
      phone: '',
      notes: ''
    });
  };

  // Subscriptions & Rewards Handlers
  const handleAdjustWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(walletAdjustAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setUserWallets(prev => prev.map(w => {
      if (w.id === selectedWalletUser) {
        const newBal = walletAdjustType === 'credit' ? w.balance + amt : Math.max(0, w.balance - amt);
        return { ...w, balance: newBal };
      }
      return w;
    }));
    addActivity(`${walletAdjustType === 'credit' ? 'Credited' : 'Debited'} ₹${amt} for customer wallet: ${selectedWalletUser}`, 'payment');
    alert(`Successfully ${walletAdjustType === 'credit' ? 'credited' : 'debited'} ₹${amt} for selected user wallet.`);
    setWalletAdjustAmount('');
    setWalletAdjustReason('');
  };

  const handleAddSubscriptionPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.name || !subForm.price) {
      alert("Please enter plan name and price");
      return;
    }
    if (editingPlanId) {
      setSubscriptionPlans(prev => prev.map(plan => {
        if (plan.id === editingPlanId) {
          return {
            ...plan,
            name: subForm.name,
            price: parseFloat(subForm.price) || 0,
            cashback: parseFloat(subForm.cashback) || 0,
            shipping: subForm.shipping
          };
        }
        return plan;
      }));
      addActivity(`Subscription Plan Updated: ${subForm.name} (₹${subForm.price}/mo)`, 'payment');
      alert("Subscription plan updated successfully!");
    } else {
      setSubscriptionPlans(prev => [
        ...prev,
        {
          id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
          name: subForm.name,
          price: parseFloat(subForm.price) || 0,
          cashback: parseFloat(subForm.cashback) || 0,
          shipping: subForm.shipping,
          subscribers: 0
        }
      ]);
      addActivity(`New Subscription Plan Created: ${subForm.name} (₹${subForm.price}/mo)`, 'payment');
      alert("Subscription plan created successfully!");
    }
    setShowSubModal(false);
    setEditingPlanId(null);
    setSubForm({ name: '', price: '', cashback: '5', shipping: 'Free Priority' });
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.reward) {
      alert("Please fill in code and reward amount");
      return;
    }
    setCoupons(prev => [
      ...prev,
      {
        code: couponForm.code.toUpperCase().trim(),
        reward: parseFloat(couponForm.reward) || 0,
        status: couponForm.status,
        redemptions: 0,
        expiry: couponForm.expiry || '2026-12-31'
      }
    ]);
    addActivity(`New coupon generated: ${couponForm.code} (Value: ₹${couponForm.reward})`, 'payment');
    setCouponForm({ code: '', reward: '', status: 'Active', expiry: '' });
    alert("Promo code generated successfully!");
  };

  const handleSaveRewardConfig = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity(`Loyalty points rule updated: Welcome reward ₹${rewardConfig.welcomeBonus}, Cashback: ${rewardConfig.cashbackRate}%`, 'payment');
    alert("Loyalty and Reward Policies updated successfully!");
  };

  // AI Lead Scorer logic
  const handleAiLeadScore = (leadId: string) => {
    const leadObj = allLeadsData.find(l => l.id === leadId);
    if (!leadObj) return;
    setIsAiLoading(true);
    setTimeout(() => {
      const score = Math.floor(72 + Math.random() * 25);
      setAiScoreFeedback(`AI Lead Score for ${leadObj.company}: ${score}/100. Key drivers: high email engagement velocity, direct phone connect, and verified corporate registry data.`);
      setIsAiLoading(false);
    }, 700);
  };

  // AI Quotation Generator simulation
  const handleAiQuoteGenerate = () => {
    if (!aiQuotePrompt) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiGeneratedText(`--- AI-GENERATED QUOTATION ---\nPrepared for: ${quoteClient}\nGenerated based on: "${aiQuotePrompt}"\n\n1. Industrial Grade Ethanol 99% - 20 drums @ ₹340/drum\n2. Stearic Acid Powder - 50 bags @ ₹180/bag\n\nSubtotal: ₹15,800\nEstimated GST (18%): ₹2,844\nTotal: ₹18,644\nTerms: Net 15 days.`);
      setIsAiLoading(false);
    }, 1000);
  };

  // Convert Quote to Invoice
  const convertQuoteToInvoice = () => {
    alert(`Successfully converted quotation for ${quoteClient} into invoice ledger.`);
    setInvoiceClient(quoteClient);
    setInvoiceItems(quoteItems.map(item => ({ name: item.name, qty: item.qty, rate: item.rate, gst: 18 })));
    setActiveSection('Billing & Invoices');
    setActiveSubSection('All Invoices');
  };

  // Quick Action: Add Expense
  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expObj = {
      id: `EXP-00${expenses.length + 1}`,
      category: expenseForm.category,
      vendor: expenseForm.vendor,
      amount: parseFloat(expenseForm.amount) || 0,
      date: expenseForm.date,
      status: 'Pending'
    };
    setExpenses([expObj, ...expenses]);
    addActivity(`New expense logged: ₹${expObj.amount.toLocaleString()} for ${expObj.category}`, 'payment');
    setShowExpenseModal(false);
    setExpenseForm({ category: 'Logistics', vendor: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  // Task Toggle
  const handleTaskCheck = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  // Create Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const t = {
      id: `T-${tasks.length + 1}`,
      title: newTaskTitle,
      stage: 'My Tasks',
      deadline: 'Today',
      priority: 'Medium',
      done: false
    };
    setTasks([t, ...tasks]);
    setNewTaskTitle('');
  };

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.amount, 0) + 1245000;
  const totalLeadsVal = allLeadsData.reduce((sum, l) => sum + l.value, 0);
  const totalPaymentsReceived = totalRevenue - 235000;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Lead stages mapper to subsections
  const getStageFromSubSection = (subName: string): CRMLead['stage'] | 'All' => {
    if (subName === 'New Leads') return 'Lead';
    if (subName === 'Follow-Up Leads') return 'Lead';
    if (subName === 'Qualified Leads') return 'Qualified';
    if (subName === 'Converted Leads') return 'Won';
    if (subName === 'Lost Leads') return 'Lost' as any;
    if (subName === 'Junk Leads') return 'Junk' as any;
    return 'All';
  };

  const currentStageFilter = getStageFromSubSection(activeSubSection);
  const filteredLeads = currentStageFilter === 'All' 
    ? allLeadsData 
    : allLeadsData.filter(l => l.stage === currentStageFilter);

  // Kanban Pipeline stages
  const pipelineStages: { title: string; stage: CRMLead['stage']; color: string }[] = [
    { title: 'New Leads', stage: 'Lead', color: 'border-t-blue-500 bg-gradient-to-b from-blue-50/10 to-transparent' },
    { title: 'Qualified', stage: 'Qualified', color: 'border-t-violet-500 bg-gradient-to-b from-violet-50/10 to-transparent' },
    { title: 'Proposal Sent', stage: 'Proposal' as any, color: 'border-t-amber-500 bg-gradient-to-b from-amber-50/10 to-transparent' },
    { title: 'Negotiating', stage: 'Negotiation' as any, color: 'border-t-rose-500 bg-gradient-to-b from-rose-50/10 to-transparent' },
    { title: 'Won / Closed', stage: 'Won', color: 'border-t-emerald-500 bg-gradient-to-b from-emerald-50/10 to-transparent' }
  ];

  return (
    <div className="flex bg-slate-50 text-slate-800 min-h-screen font-sans" style={{ zoom: '1' }}>
      
      {/* 1. STICKY FULL HEIGHT LEFT SIDEBAR */}
      <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0 z-20">
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
          <div className="flex items-center gap-3 px-2 pb-5 mb-4 border-b border-slate-100">
            <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              Ω
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase text-slate-800">Talentspark</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">CRM + Billing ERP</p>
            </div>
          </div>

          <div className="space-y-1">
            {erpSections.map((sec) => {
              const isCurrentSec = activeSection === sec.name;
              const isCollapsed = collapsedSections[sec.name];
              return (
                <div key={sec.name} className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveSection(sec.name);
                      toggleSection(sec.name);
                      if (sec.subsections.length > 0) {
                        setActiveSubSection(sec.subsections[0].name);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isCurrentSec
                        ? 'bg-blue-50 text-blue-650 shadow-sm font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <sec.icon className={`h-4 w-4 ${isCurrentSec ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{sec.name}</span>
                    </div>
                    {sec.subsections.length > 0 && (
                      isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>

                  {!isCollapsed && sec.subsections.length > 0 && (
                    <div className="pl-4 border-l border-slate-150 ml-4 space-y-0.5 py-0.5">
                      {sec.subsections.map((sub) => {
                        const isCurrentSub = activeSubSection === sub.name;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => {
                              setActiveSection(sec.name);
                              setActiveSubSection(sub.name);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all flex justify-between items-center ${
                              isCurrentSub
                                ? 'bg-slate-100 text-blue-600 font-bold'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                            }`}
                          >
                            <span>{sub.name}</span>
                            {sub.badge && (
                              <span className="bg-red-500 text-white text-[7px] font-bold px-1 py-0.2 rounded-full">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer profile & logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              RP
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <p className="font-bold text-slate-800 truncate leading-snug">Rohit Patel</p>
              <p className="text-[9px] text-slate-500 font-medium truncate uppercase">Admin</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-655 text-[10px] font-bold transition-all active:scale-95 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Switch Workspace
          </button>
        </div>
      </aside>

      {/* 2. MAIN CENTER CONTENT & RIGHT SIDEBAR SECTION */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto h-screen">
        
        {/* CENTER VIEW PANEL */}
        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                {activeSection}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2 tracking-tight">{activeSubSection}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Synced ERP state indexes successfully.')}
                className="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all border border-slate-200 shadow-sm"
                title="Force Cloud Sync"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* DYNAMIC SECTION ROUTER */}

          {/* DASHBOARD -> OVERVIEW */}
          {activeSection === 'Dashboard' && activeSubSection === 'Overview Dashboard' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              {/* Promo Banner Card */}
              <div className="relative rounded-2xl overflow-hidden h-40 flex items-center p-6 bg-white border border-slate-200 shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60"
                  alt="Business Intelligence Dashboard banner"
                  className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[9px] font-black uppercase bg-blue-600 text-white px-2 py-0.5 rounded shadow-sm animate-pulse">Live Insights</span>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Business Intelligence & CRM Cloud</h3>
                  <p className="text-xs text-slate-600 max-w-sm">Empowering enterprise scale product distribution, live tax audits, and smart quotation conversions.</p>
                </div>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '+14.2% MoM', icon: DollarSign, color: 'text-blue-600', border: 'border-blue-100' },
                  { label: 'Active Leads', value: allLeadsData.length, change: '+5.6% MoM', icon: Users, color: 'text-violet-600', border: 'border-violet-100' },
                  { label: 'Converted Leads', value: allLeadsData.filter(l => l.stage === 'Won').length, change: '64% Win Rate', icon: CheckCircle2, color: 'text-emerald-655', border: 'border-emerald-100' },
                  { label: 'Pending Invoices', value: '4 Invoices', change: 'Outstanding: 2.3L', icon: FileText, color: 'text-rose-600', border: 'border-rose-100' },
                ].map((stat, i) => (
                  <div key={i} className={`bg-white border ${stat.border} rounded-2xl p-5 hover:border-slate-355 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-28`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[9px] text-slate-455 uppercase font-black tracking-wider">{stat.label}</p>
                        <h4 className={`text-lg font-black mt-1 ${stat.color}`}>{stat.value}</h4>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                        <stat.icon className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* 6 GRAPHS & CHARTS SECTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Monthly Revenue Growth */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart className="h-4 w-4 text-blue-500" />
                    Monthly Revenue Outflow
                  </h4>
                  <div className="h-32 flex items-end justify-between gap-1 pt-4 px-2">
                    {[
                      { month: 'Jan', val: 40, label: '4L' },
                      { month: 'Feb', val: 65, label: '6.5L' },
                      { month: 'Mar', val: 50, label: '5L' },
                      { month: 'Apr', val: 85, label: '8.5L' },
                      { month: 'May', val: 110, label: '11L' },
                      { month: 'Jun', val: 95, label: '9.5L' }
                    ].map((m, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-md transition-all relative" style={{ height: `${m.val}px` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {m.label}
                          </span>
                        </div>
                        <span className="text-[8px] text-slate-400 font-bold">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Customer Acquisition Trend */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-violet-500" />
                    Customer Growth Velocity
                  </h4>
                  <div className="h-32 w-full pt-2">
                    <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
                      <path
                        d="M 10,70 Q 50,30 90,50 T 170,10 L 170,80 L 10,80 Z"
                        fill="rgba(139, 92, 246, 0.1)"
                      />
                      <path
                        d="M 10,70 Q 50,30 90,50 T 170,10"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="70" r="2.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                      <circle cx="90" cy="50" r="2.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                      <circle cx="170" cy="10" r="2.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* 3. Regional Sales */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <PieChart className="h-4 w-4 text-emerald-500" />
                    Regional Sales Share
                  </h4>
                  <div className="h-32 flex items-center justify-around">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 transform -rotate-90">
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#2563EB" strokeWidth="12" strokeDasharray="130 220" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="60 220" strokeDashoffset="-130" />
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="30 220" strokeDashoffset="-190" />
                    </svg>
                    <div className="text-[8px] font-bold text-slate-655 space-y-1.5">
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-600 rounded" /> West (59%)</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded" /> South (27%)</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded" /> North (14%)</div>
                    </div>
                  </div>
                </div>

                {/* 4. Top Performing Products */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-amber-500" />
                    Top Products (Units Sold)
                  </h4>
                  <div className="space-y-2.5 pt-1 text-[9px] font-bold">
                    {[
                      { name: 'Ethanol 99%', sold: 450, pct: '90%', color: 'bg-blue-500' },
                      { name: 'Grade Silica', sold: 320, pct: '64%', color: 'bg-violet-500' },
                      { name: 'Stearic Acid', sold: 180, pct: '36%', color: 'bg-emerald-500' }
                    ].map((p, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">{p.name}</span>
                          <span className="text-slate-455">{p.sold} units</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color}`} style={{ width: p.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Funnel Lead Stage Progression */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-indigo-500" />
                    Conversion Pipeline Steps
                  </h4>
                  <div className="flex flex-col gap-2 pt-1">
                    {[
                      { stage: 'Captures', rate: '88%', fill: 'w-11/12 bg-blue-400' },
                      { stage: 'Proposals', rate: '56%', fill: 'w-7/12 bg-indigo-400' },
                      { stage: 'Contracts', rate: '28%', fill: 'w-3/12 bg-emerald-400' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700">{step.stage}</span>
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mx-2">
                          <div className={`h-full ${step.fill}`} />
                        </div>
                        <span className="font-extrabold text-blue-600">{step.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Invoice Status Splits */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all duration-300">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileSpreadsheet className="h-4 w-4 text-rose-500" />
                    Invoicing Status Split
                  </h4>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[9px] font-bold">
                    <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-center">
                      <span className="block text-slate-450">Paid Invoices</span>
                      <span className="text-emerald-700 text-sm font-black">12 (₹4.2L)</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 p-2 rounded-xl text-center">
                      <span className="block text-slate-455">Pending</span>
                      <span className="text-amber-700 text-sm font-black">4 (₹2.3L)</span>
                    </div>
                    <div className="bg-red-50 border border-red-100 p-2 rounded-xl text-center">
                      <span className="block text-slate-450">Overdue</span>
                      <span className="text-red-700 text-sm font-black">2 (₹95K)</span>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 p-2 rounded-xl text-center">
                      <span className="block text-slate-450">Disputed</span>
                      <span className="text-slate-700 text-sm font-black">1 (₹82K)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* TIMELINES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="border border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-slate-855 uppercase tracking-wider">Recent Active Leads</h4>
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="text-[10px] bg-primary text-white rounded-lg px-2.5 py-1 font-bold flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" /> Capture Lead
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {allLeadsData.slice(0, 4).map(lead => (
                      <div key={lead.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <img src={lead.avatar} alt={lead.contact} className="h-7 w-7 rounded-full object-cover shadow-sm" />
                          <div>
                            <p className="font-bold text-slate-855">{lead.company}</p>
                            <p className="text-[10px] text-slate-455 font-medium">Contact: {lead.contact}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-slate-800 block">₹{lead.value.toLocaleString()}</span>
                          <span className={`inline-block px-1.5 py-0.2 rounded-full text-[8.5px] font-bold ${
                            lead.stage === 'Won' ? 'bg-emerald-50 text-emerald-755' : 'bg-blue-50 text-blue-755'
                          }`}>{lead.stage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Invoices */}
                <div className="border border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-slate-855 uppercase tracking-wider">Recent Invoices</h4>
                    <button
                      onClick={() => {
                        setActiveSection('Billing & Invoices');
                        setActiveSubSection('All Invoices');
                      }}
                      className="text-[10px] border border-slate-250 rounded-lg px-2.5 py-1 font-semibold hover:bg-slate-50"
                    >
                      Build Invoice
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map(ord => (
                      <div key={ord.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-850">{ord.customer}</p>
                          <p className="text-[10px] text-slate-455 font-medium">ID: {ord.id} • {ord.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-slate-800 block">₹{ord.amount.toLocaleString()}</span>
                          <span className="text-[9px] font-black text-emerald-600">Reconciled</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD -> BUSINESS ANALYTICS */}
          {activeSection === 'Dashboard' && activeSubSection === 'Business Analytics' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: 'Corporate Traffic Rate', val: '78.4%', count: '1,200 leads/mo', color: 'text-blue-600' },
                  { title: 'Quotation Conversion Velocity', val: '34.2 days', count: 'Sales cycle term', color: 'text-violet-600' },
                  { title: 'Reconciliation Accuracies', val: '99.8%', count: 'GST balance ledger', color: 'text-emerald-655' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-xs space-y-2 hover:shadow-md transition-all duration-300">
                    <span className="text-slate-455 font-bold block uppercase tracking-wider">{stat.title}</span>
                    <h4 className={`text-2xl font-black ${stat.color}`}>{stat.val}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{stat.count}</p>
                  </div>
                ))}
              </div>

              {/* Acquisition Channels Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lead Acquisition Source Share</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { source: 'Google Ads', pct: '45%', leads: 54 },
                    { source: 'Website Forms', pct: '28%', leads: 33 },
                    { source: 'WhatsApp API', pct: '18%', leads: 22 },
                    { source: 'Direct/Cold Call', pct: '9%', leads: 11 }
                  ].map((src, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl hover:bg-slate-100 transition-colors">
                      <span className="text-[9px] uppercase font-bold text-slate-450 block">{src.source}</span>
                      <span className="text-base font-black text-slate-800 block mt-1">{src.pct}</span>
                      <span className="text-[8px] text-slate-400 font-semibold">{src.leads} active leads</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistics Warehouse Hubs */}
              <div className="border border-slate-200 bg-white rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Performing Logistics Hubs</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {warehouses.map((wh, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl items-center hover:bg-slate-100 transition-colors">
                      <div className="h-10 w-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                        WH-{wh.id.split('-')[1] || idx + 1}
                      </div>
                      <div className="text-xs flex-1">
                        <p className="font-bold text-slate-800">{wh.name.split(' ')[0]}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">Occupancy: {wh.used} / {wh.capacity} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD -> REVENUE DASHBOARD */}
          {activeSection === 'Dashboard' && activeSubSection === 'Revenue Dashboard' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tax Slab & Ledger Disbursements</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                    <span className="text-[8px] uppercase font-bold text-slate-400">Total CGST collected</span>
                    <h5 className="text-sm font-black text-blue-700 mt-1">₹32,450</h5>
                  </div>
                  <div className="bg-violet-50/50 border border-violet-100 p-4 rounded-xl">
                    <span className="text-[8px] uppercase font-bold text-slate-400">Total SGST collected</span>
                    <h5 className="text-sm font-black text-violet-700 mt-1">₹32,450</h5>
                  </div>
                  <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                    <span className="text-[8px] uppercase font-bold text-slate-400">Total IGST collected</span>
                    <h5 className="text-sm font-black text-amber-700 mt-1">₹88,920</h5>
                  </div>
                </div>
              </div>

              {/* Project Cashflow matrix */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Q3 Cashflow Timeline Forecast</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Confirmed Inflow Recoupment', val: '₹9,45,000', pct: '75%', color: 'bg-emerald-500' },
                    { label: 'Committed Vendor Payouts', val: '₹2,35,000', pct: '20%', color: 'bg-amber-500' },
                    { label: 'Disputed Invoice holds', val: '₹82,000', pct: '5%', color: 'bg-red-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{item.label}</span>
                        <span className="text-slate-900">{item.val}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD -> TEAM PERFORMANCE */}
          {activeSection === 'Dashboard' && activeSubSection === 'Team Performance' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Team Performance & KPI Metrics</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Click any card to load detailed performance trends and pipeline summaries in the right sidebar.</p>
                </div>
                <div className="text-[10px] text-slate-450 font-bold bg-slate-100 px-3 py-1 rounded-full">
                  Total Active: {teamMembers.length} Executives
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {teamMembers.map((member, i) => {
                  const isSelected = selectedMember?.name === member.name;
                  const statusColors: Record<string, string> = {
                    Active: 'bg-emerald-500',
                    'In Meeting': 'bg-amber-500',
                    'On Break': 'bg-slate-400'
                  };
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedMember(member)}
                      className={`w-full text-left bg-white border rounded-2xl p-5 shadow-sm space-y-3.5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer block focus:outline-none ${
                        isSelected 
                          ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-blue-50/50' 
                          : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">
                          Selected
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={member.avatar} alt={member.name} className="h-11 w-11 rounded-full object-cover shadow-sm border border-slate-100" />
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[member.status] || 'bg-slate-400'}`} />
                        </div>
                        <div className="text-xs min-w-0 flex-1">
                          <p className="font-extrabold text-slate-800 truncate">{member.name}</p>
                          <p className="text-[9px] text-slate-500 font-medium truncate">{member.role}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-100 rounded px-1.5 py-0.2 font-bold">{member.badge}</span>
                            <span className="text-[9px] text-amber-600 font-bold flex items-center">★ {member.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 text-[10px] text-slate-500 font-semibold gap-2">
                        <div>
                          <span>Closed Deals</span>
                          <p className="text-xs font-black text-slate-800 mt-0.5">{member.deals} deals</p>
                        </div>
                        <div>
                          <span>Sales Value</span>
                          <p className="text-xs font-black text-slate-800 mt-0.5">{member.value}</p>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-400 italic line-clamp-1 border-t border-slate-50 pt-2">
                        "{member.bio}"
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* DASHBOARD -> DAILY ACTIVITY */}
          {activeSection === 'Dashboard' && activeSubSection === 'Daily Activity' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-855 uppercase tracking-wider">Live Audit Timelines</h4>
                <div className="space-y-4 pt-2">
                  {activities.map((act, idx) => (
                    <div key={idx} className="flex gap-3 text-xs items-start">
                      <div className="p-1.5 bg-blue-50 text-blue-655 rounded-lg">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-normal">{act.message}</p>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{act.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT DEMAND & SALES INTELLIGENCE MODULE */}
          {activeSection === 'Product Intelligence' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              {/* Header with Title and Filters */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase bg-blue-600 text-white px-2 py-0.5 rounded shadow-sm">
                      ERP Intel
                    </span>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                      Product Demand & Sales Intelligence Panel
                    </h2>
                    <p className="text-xs text-slate-500">
                      Submenu: <span className="font-extrabold text-blue-600 uppercase">{activeSubSection}</span>
                    </p>
                  </div>
                  
                  {/* Real-time Data indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Sync Enabled
                  </div>
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Date Range</label>
                    <select 
                      value={intelDateRange} 
                      onChange={(e) => setIntelDateRange(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="ytd">Year to Date (YTD)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Category</label>
                    <select 
                      value={intelCategory} 
                      onChange={(e) => setIntelCategory(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Categories</option>
                      <option value="Industrial Chemicals">Industrial Chemicals</option>
                      <option value="Laboratory Chemicals">Laboratory Chemicals</option>
                      <option value="Pharmaceuticals Raw Materials">Pharmaceuticals Raw Materials</option>
                      <option value="Food Ingredients">Food Ingredients</option>
                      <option value="Packaging Materials">Packaging Materials</option>
                      <option value="Industrial Equipment">Industrial Equipment</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Brand</label>
                    <select 
                      value={intelBrand} 
                      onChange={(e) => setIntelBrand(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Brands</option>
                      <option value="Talentspark Chem">Talentspark Chem</option>
                      <option value="IPA India">IPA India</option>
                      <option value="CitraGlobal">CitraGlobal</option>
                      <option value="PackEnterprise">PackEnterprise</option>
                      <option value="SodaCorp">SodaCorp</option>
                      <option value="LabEssentials">LabEssentials</option>
                      <option value="PharmaGrade">PharmaGrade</option>
                      <option value="EquipTech">EquipTech</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455">Sales Region</label>
                    <select 
                      value={intelRegion} 
                      onChange={(e) => setIntelRegion(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Regions</option>
                      <option value="North">North India</option>
                      <option value="South">South Territory</option>
                      <option value="East">East Territory</option>
                      <option value="West">Western Region</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Sales Executive</label>
                    <select 
                      value={intelExecutive} 
                      onChange={(e) => setIntelExecutive(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Executives</option>
                      <option value="Amit Sharma">Amit Sharma</option>
                      <option value="Neha Gupta">Neha Gupta</option>
                      <option value="Rohan Verma">Rohan Verma</option>
                      <option value="Priya Nair">Priya Nair</option>
                      <option value="Vikram Rathore">Vikram Rathore</option>
                      <option value="Shalini Sen">Shalini Sen</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PRODUCT OVERVIEW DASHBOARD */}
              {activeSubSection === 'Product Overview' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Products', value: filteredIntelData.length, desc: 'Active SKU list', color: 'text-blue-600' },
                      { label: 'Fast Selling Products', value: filteredIntelData.filter((p: any) => p.salesVelocity >= 10).length, desc: 'Velocity >= 10/day', color: 'text-emerald-600' },
                      { label: 'Slow Moving Products', value: filteredIntelData.filter((p: any) => p.salesVelocity < 4).length, desc: 'Velocity < 4/day', color: 'text-amber-600' },
                      { label: 'Most Demanded Product', value: filteredIntelData.reduce((max: any, p: any) => (p.leads + p.interest > max.leads + max.interest ? p : max), { name: 'None', leads: 0, interest: 0 }).name, desc: 'Highest Lead Count', color: 'text-violet-600', truncate: true },
                      { label: 'Lowest Demanded Product', value: filteredIntelData.reduce((min: any, p: any) => (p.leads + p.interest < min.leads + min.interest ? p : min), filteredIntelData[0] || { name: 'None' }).name, desc: 'Lowest Interest', color: 'text-slate-500', truncate: true },
                      { label: 'Total Product Revenue', value: `₹${filteredIntelData.reduce((sum: number, p: any) => sum + p.revenue, 0).toLocaleString()}`, desc: 'Selected Period Total', color: 'text-rose-600' },
                      { label: 'Average Product Sales', value: `${(filteredIntelData.reduce((sum: number, p: any) => sum + p.unitsSold, 0) / (filteredIntelData.length || 1)).toFixed(0)} Units`, desc: 'Average Units Sold per SKU', color: 'text-cyan-600' },
                      { label: 'Inventory Turnover Rate', value: '4.8x', desc: 'Healthy benchmark (4-6x)', color: 'text-indigo-600' }
                    ].map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[105px]">
                        <div>
                          <p className="text-[9px] text-slate-455 uppercase font-bold tracking-wider">{kpi.label}</p>
                          <h4 className={`text-sm md:text-base font-black mt-1.5 ${kpi.color} ${kpi.truncate ? 'truncate max-w-[200px]' : ''}`}>
                            {kpi.value}
                          </h4>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1">{kpi.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Fast Selling Products Widget & Slow Selling Products Widget */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Fast Selling Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Activity className="h-4.5 w-4.5 text-red-500 animate-pulse" />
                          Fast Selling Products Widget
                        </h3>
                        <span className="text-[9px] font-extrabold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                          Velocity Profile
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-bold">
                              <th className="py-2.5">Product Name</th>
                              <th className="py-2.5">Units</th>
                              <th className="py-2.5">Revenue</th>
                              <th className="py-2.5">Velocity</th>
                              <th className="py-2.5">Growth</th>
                              <th className="py-2.5">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700">
                            {filteredIntelData
                              .filter((p: any) => p.salesVelocity >= 7)
                              .sort((a: any, b: any) => b.unitsSold - a.unitsSold)
                              .slice(0, 5)
                              .map((p: any) => (
                                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                  <td className="py-3 font-bold text-slate-800 truncate max-w-[150px]">{p.name}</td>
                                  <td className="py-3">{p.unitsSold}</td>
                                  <td className="py-3">₹{p.revenue.toLocaleString()}</td>
                                  <td className="py-3 font-bold text-emerald-600">{p.salesVelocity}/d</td>
                                  <td className="py-3 text-emerald-600 font-extrabold">+{p.growth}%</td>
                                  <td className="py-3">
                                    <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[9px] font-black uppercase">
                                      🔥 Fast Seller
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Slow Selling Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Activity className="h-4.5 w-4.5 text-amber-500" />
                          Slow Selling Products Widget
                        </h3>
                        <span className="text-[9px] font-extrabold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded">
                          Action Required
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-bold">
                              <th className="py-2.5">Product Name</th>
                              <th className="py-2.5">Stock</th>
                              <th className="py-2.5">Units</th>
                              <th className="py-2.5">Age</th>
                              <th className="py-2.5">Demand</th>
                              <th className="py-2.5">Risk Pill</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700">
                            {filteredIntelData
                              .filter((p: any) => p.salesVelocity < 7)
                              .sort((a: any, b: any) => a.salesVelocity - b.salesVelocity)
                              .slice(0, 5)
                              .map((p: any) => (
                                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                  <td className="py-3 font-bold text-slate-800 truncate max-w-[150px]">{p.name}</td>
                                  <td className="py-3 font-semibold text-slate-700">{p.stock}</td>
                                  <td className="py-3">{p.unitsSold}</td>
                                  <td className="py-3">{p.age}d</td>
                                  <td className="py-3 text-amber-600 font-bold">{p.leads + p.interest}</td>
                                  <td className="py-3">
                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[9px] font-black uppercase">
                                      ⚠ Slow Moving
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Recharts Analytics Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top 10 Fast Selling Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        Top 10 Fast Selling Products (Units Sold)
                      </h4>
                      <div className="h-64 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={filteredIntelData
                              .sort((a, b) => b.unitsSold - a.unitsSold)
                              .slice(0, 10)}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <XAxis dataKey="brand" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} />
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                            <Bar dataKey="unitsSold" fill="#2563EB" radius={[4, 4, 0, 0]} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Slow Moving Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sliders className="h-4 w-4 text-amber-500" />
                        Slow Moving Products (Sales Velocity Distribution)
                      </h4>
                      <div className="h-64 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={filteredIntelData
                              .sort((a, b) => a.salesVelocity - b.salesVelocity)
                              .slice(0, 10)}
                            layout="vertical"
                            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                          >
                            <XAxis type="number" tick={{ fontSize: 9 }} />
                            <YAxis dataKey="brand" type="category" tick={{ fontSize: 9 }} />
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                            <Bar dataKey="salesVelocity" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMAND ANALYTICS */}
              {activeSubSection === 'Demand Analytics' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Leaderboard */}
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Top 10 Most Demanded Leaderboard
                      </h3>
                      <div className="space-y-3 text-xs">
                        {filteredIntelData
                          .map(p => ({
                            ...p,
                            demandScore: p.unitsSold + p.leads + p.quotes + p.repeatOrders + p.interest
                          }))
                          .sort((a, b) => b.demandScore - a.demandScore)
                          .slice(0, 8)
                          .map((p, idx) => (
                            <div key={p.id} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                                  idx === 0 ? 'bg-amber-100 text-amber-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-500'
                                }`}>
                                  {idx + 1}
                                </span>
                                <span className="font-extrabold text-slate-800 truncate max-w-[130px]">{p.name}</span>
                              </div>
                              <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                                {p.demandScore} pts
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Product Demand Trend */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-violet-500" />
                        Product Demand Trend (Leads + Quotation Activity)
                      </h4>
                      <div className="h-72 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={filteredIntelData
                              .sort((a, b) => b.leads - a.leads)
                              .slice(0, 10)}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <XAxis dataKey="brand" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} />
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                            <Legend wrapperStyle={{ fontSize: 10 }} />
                            <Line type="monotone" dataKey="leads" stroke="#8B5CF6" strokeWidth={2.5} />
                            <Line type="monotone" dataKey="quotes" stroke="#10B981" strokeWidth={2} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Most Demanded and Least Demanded Widgets */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Most Demanded Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <TrendingUp className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                          Most Demanded Products (Score 85–100)
                        </h3>
                        <span className="text-[9px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase">
                          🔥 High Demand
                        </span>
                      </div>
                      <div className="overflow-x-auto text-[11px]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-bold">
                              <th className="py-2">Product</th>
                              <th className="py-2 text-center">Demand Score</th>
                              <th className="py-2 text-center">Growth %</th>
                              <th className="py-2 text-center">Lead Requests</th>
                              <th className="py-2 text-center">Repeat Orders</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700 font-semibold">
                            {filteredIntelData
                              .filter((p: any) => p.demandScore >= 85 && p.demandScore <= 100)
                              .sort((a: any, b: any) => b.demandScore - a.demandScore)
                              .map((p: any) => (
                                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="py-2.5 font-bold text-slate-800">{p.name}</td>
                                  <td className="py-2.5 text-center"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black">{p.demandScore}</span></td>
                                  <td className="py-2.5 text-center text-emerald-600 font-extrabold">+{p.growth}%</td>
                                  <td className="py-2.5 text-center">{p.leads}</td>
                                  <td className="py-2.5 text-center font-bold text-slate-900">{p.repeatOrders}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Least Demanded Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                          Least Demanded Products (Score 10–40)
                        </h3>
                        <span className="text-[9px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded uppercase">
                          ⚠️ Low Traction
                        </span>
                      </div>
                      <div className="overflow-x-auto text-[11px]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-bold">
                              <th className="py-2">Product</th>
                              <th className="py-2 text-center">Demand Score</th>
                              <th className="py-2 text-center">Growth %</th>
                              <th className="py-2 text-center">Lead Requests</th>
                              <th className="py-2 text-center">Repeat Orders</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700 font-semibold">
                            {filteredIntelData
                              .filter((p: any) => p.demandScore >= 10 && p.demandScore <= 40)
                              .sort((a: any, b: any) => a.demandScore - b.demandScore)
                              .map((p: any) => (
                                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="py-2.5 font-bold text-slate-800">{p.name}</td>
                                  <td className="py-2.5 text-center"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black">{p.demandScore}</span></td>
                                  <td className={`py-2.5 text-center font-extrabold ${p.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {p.growth >= 0 ? `+${p.growth}` : p.growth}%
                                  </td>
                                  <td className="py-2.5 text-center">{p.leads}</td>
                                  <td className="py-2.5 text-center">{p.repeatOrders}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Contribution & regional demand */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        Revenue Contribution by Product Brand
                      </h4>
                      <div className="h-64 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={filteredIntelData.slice(0, 6)}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="revenue"
                              nameKey="brand"
                              label={{ fontSize: 9 }}
                            >
                              {filteredIntelData.slice(0, 6).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#2563EB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][index % 6]} />
                              ))}
                            </Pie>
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Regional Demand details */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Territory-wise Product Interest Score
                      </h3>
                      <div className="space-y-4 text-xs pt-2">
                        {['North India', 'South Territory', 'East Territory', 'Western Region'].map((reg, idx) => {
                          const simpleName = reg.split(' ')[0];
                          const regTotal = filteredIntelData
                            .filter(p => p.region.toLowerCase().includes(simpleName.toLowerCase()) || simpleName.toLowerCase().includes(p.region.toLowerCase()))
                            .reduce((sum, p) => sum + p.unitsSold, 0);
                          const progress = Math.min(100, (regTotal / 1000) * 100);
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between font-bold text-slate-700">
                                <span>{reg}</span>
                                <span>{regTotal} Units</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-600 rounded-full" 
                                  style={{ width: `${progress}%` }} 
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SALES VELOCITY ANALYTICS */}
              {activeSubSection === 'Sales Velocity' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* Sales Velocity curves */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Monthly Sales Velocity Growth Trends
                      </h3>
                      <span className="text-[10px] text-slate-500 font-bold">Units / Day (MoM Comparison)</span>
                    </div>

                    <div className="h-80 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart
                          data={filteredIntelData.slice(0, 12)}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="brand" tick={{ fontSize: 9 }} />
                          <YAxis tick={{ fontSize: 9 }} />
                          <Tooltip wrapperStyle={{ fontSize: 10 }} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Area type="monotone" dataKey="salesVelocity" stroke="#2563EB" fillOpacity={1} fill="url(#colorVelocity)" name="Velocity (U/d)" />
                          <Area type="monotone" dataKey="growth" stroke="#10B981" fillOpacity={1} fill="url(#colorGrowth)" name="Growth %" />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Velocity distribution lists */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Velocity Profile Log (Daily Run Rates)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold">
                            <th className="py-2.5">Product SKU</th>
                            <th className="py-2.5">Daily Velocity</th>
                            <th className="py-2.5">Weekly Proj.</th>
                            <th className="py-2.5">Monthly Proj.</th>
                            <th className="py-2.5">Trend Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-slate-700">
                          {filteredIntelData.slice(0, 6).map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-3 font-bold text-slate-800">{p.name}</td>
                              <td className="py-3 font-extrabold text-blue-600">{(p.salesVelocity).toFixed(1)} / day</td>
                              <td className="py-3">{(p.salesVelocity * 7).toFixed(0)} units</td>
                              <td className="py-3">{(p.salesVelocity * 30).toFixed(0)} units</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                  p.growth > 20 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-50 text-slate-700 border border-slate-200'
                                }`}>
                                  {p.growth > 20 ? '📈 Accelerating' : '⏳ Stable'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCT PERFORMANCE MATRIX */}
              {activeSubSection === 'Product Performance' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      BCG Demand-Revenue Performance Matrix
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Products are grouped into quadrants based on dynamic demand score (threshold: 120 pts) and revenue contribution (threshold: ₹50,000).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stars */}
                    <div className="bg-emerald-50/30 border border-emerald-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                        <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                          Stars (High Demand, High Revenue)
                        </h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          ⭐ Lead Drivers
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs max-h-60 overflow-y-auto">
                        {filteredIntelData
                          .filter(p => (p.leads + p.interest >= 120) && p.revenue >= 50000)
                          .map(p => (
                            <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-xs">
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{p.name}</span>
                              <div className="text-[10px] text-right">
                                <p className="font-black text-slate-900">₹{p.revenue.toLocaleString()}</p>
                                <p className="text-emerald-700 font-bold">Demand: {p.leads + p.interest}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Growth Products */}
                    <div className="bg-blue-50/30 border border-blue-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                        <h4 className="text-xs font-black text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          Growth Products (High Demand, Low Revenue)
                        </h4>
                        <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          🚀 High Potential
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs max-h-60 overflow-y-auto">
                        {filteredIntelData
                          .filter(p => (p.leads + p.interest >= 120) && p.revenue < 50000)
                          .map(p => (
                            <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-xs">
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{p.name}</span>
                              <div className="text-[10px] text-right">
                                <p className="font-black text-slate-900">₹{p.revenue.toLocaleString()}</p>
                                <p className="text-blue-600 font-bold">Demand: {p.leads + p.interest}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Cash Cows */}
                    <div className="bg-violet-50/30 border border-violet-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-violet-100 pb-2">
                        <h4 className="text-xs font-black text-violet-800 uppercase tracking-wider flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-violet-600" />
                          Cash Cows (Low Demand, High Revenue)
                        </h4>
                        <span className="text-[10px] bg-violet-100 text-violet-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          💰 Profit Centers
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs max-h-60 overflow-y-auto">
                        {filteredIntelData
                          .filter(p => (p.leads + p.interest < 120) && p.revenue >= 50000)
                          .map(p => (
                            <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-xs">
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{p.name}</span>
                              <div className="text-[10px] text-right">
                                <p className="font-black text-slate-900">₹{p.revenue.toLocaleString()}</p>
                                <p className="text-violet-600 font-bold">Demand: {p.leads + p.interest}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Weak Products */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 text-slate-500" />
                          Weak Products (Low Demand, Low Revenue)
                        </h4>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2.5 py-0.5 rounded-full">
                          ⚠ Clean Up Risk
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs max-h-60 overflow-y-auto">
                        {filteredIntelData
                          .filter(p => (p.leads + p.interest < 120) && p.revenue < 50000)
                          .map(p => (
                            <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-xs">
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{p.name}</span>
                              <div className="text-[10px] text-right">
                                <p className="font-black text-slate-900">₹{p.revenue.toLocaleString()}</p>
                                <p className="text-amber-700 font-bold">Demand: {p.leads + p.interest}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCT FORECASTING */}
              {activeSubSection === 'Product Forecasting' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* Forecasting AI Input & Config */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white space-y-4 shadow-md">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-yellow-300 animate-bounce" />
                      <h3 className="text-base font-black tracking-tight">Enterprise Forecasting AI Engine</h3>
                    </div>
                    <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                      Predict next month demand, future sales run-rates, inventory replenishment thresholds, and seasonal index shifts with ML scoring logic.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-xs">
                        <p className="text-[10px] text-blue-200 uppercase font-bold">AI Prediction Confidence</p>
                        <p className="text-sm font-black mt-0.5">94.8% Confidence Limit</p>
                      </div>
                      <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-xs">
                        <p className="text-[10px] text-blue-200 uppercase font-bold">Forecast Horizon</p>
                        <p className="text-sm font-black mt-0.5">3 Months Outflow</p>
                      </div>
                    </div>
                  </div>

                  {/* Future Sales Forecast Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Predicted Demand VS Safe Stock Requirements
                      </h3>
                      <div className="h-72 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={filteredIntelData.slice(0, 10).map(p => ({
                              brand: p.brand,
                              nextMonth: Math.round(p.unitsSold * 1.15),
                              safeStock: Math.round(p.unitsSold * 1.3)
                            }))}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <XAxis dataKey="brand" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} />
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                            <Legend wrapperStyle={{ fontSize: 10 }} />
                            <Line type="monotone" dataKey="nextMonth" stroke="#2563EB" strokeWidth={2} name="Forecasted Sales" />
                            <Line type="monotone" dataKey="safeStock" stroke="#EF4444" strokeWidth={2} name="Required Buffer" />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* AI Insights Widget */}
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-violet-500" />
                        AI Smart Action Alerts
                      </h3>
                      <div className="space-y-3.5 text-xs text-slate-700 pt-2">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                          <p className="font-extrabold text-blue-800">🔥 Demand Spike</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            Ethanol 99% demand increased by 34% this month.
                          </p>
                        </div>

                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                          <p className="font-extrabold text-emerald-800">💰 Revenue Leader</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            Citric Acid generated ₹4.8L revenue in the last 30 days.
                          </p>
                        </div>

                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl space-y-1">
                          <p className="font-extrabold text-rose-800">⏳ Stock Exhaustion Alert</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            HDPE Drums stock will be exhausted within 6 days.
                          </p>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <p className="font-extrabold text-slate-700">📉 Sales Decline</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            Silver Nitrate sales declined by 28% compared to last month.
                          </p>
                        </div>

                        <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl space-y-1">
                          <p className="font-extrabold text-indigo-850">🔄 Customer Loyalty</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            Isopropyl Alcohol has the highest repeat customer rate.
                          </p>
                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-150 rounded-xl space-y-1">
                          <p className="font-extrabold text-amber-800">📦 Packaging Contrib.</p>
                          <p className="text-[11px] text-slate-655 leading-normal">
                            Packaging Bottles contributed 14% of total sales revenue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INVENTORY INSIGHTS */}
              {activeSubSection === 'Inventory Insights' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* Stock Levels Alerts & Healthy status */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sourcing Levels */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 lg:col-span-1">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Inventory Sourcing Health
                      </h3>

                      <div className="space-y-4 text-xs pt-2">
                        <div className="p-3 bg-red-50 border border-red-150 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-black text-red-800 text-xs">🔴 Critical Stock Items</p>
                            <p className="text-[10px] text-slate-550 mt-0.5">Below buffer reserve safety limit</p>
                          </div>
                          <span className="text-base font-black text-red-800">
                            {filteredIntelData.filter(p => p.stock <= 5).length} SKU
                          </span>
                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-150 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-black text-amber-800 text-xs">🟠 Low Stock Indicators</p>
                            <p className="text-[10px] text-slate-550 mt-0.5">Need purchase reorder confirmation</p>
                          </div>
                          <span className="text-base font-black text-amber-800">
                            {filteredIntelData.filter(p => p.stock > 5 && p.stock <= 20).length} SKU
                          </span>
                        </div>

                        <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-black text-emerald-800 text-xs">🟢 Healthy Stock Index</p>
                            <p className="text-[10px] text-slate-550 mt-0.5">SKUs with standard safety buffer</p>
                          </div>
                          <span className="text-base font-black text-emerald-800">
                            {filteredIntelData.filter(p => p.stock > 20).length} SKU
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recharts Pie Chart */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 lg:col-span-2">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        SKU Stock Index Share (Warehouse Allocations)
                      </h4>
                      <div className="h-64 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={[
                                { name: 'Critical Stock', value: filteredIntelData.filter(p => p.stock <= 5).reduce((sum, p) => sum + p.stock, 0) },
                                { name: 'Low Stock', value: filteredIntelData.filter(p => p.stock > 5 && p.stock <= 20).reduce((sum, p) => sum + p.stock, 0) },
                                { name: 'Healthy Stock', value: filteredIntelData.filter(p => p.stock > 20).reduce((sum, p) => sum + p.stock, 0) }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={{ fontSize: 9 }}
                            >
                              <Cell fill="#EF4444" />
                              <Cell fill="#F59E0B" />
                              <Cell fill="#10B981" />
                            </Pie>
                            <Tooltip wrapperStyle={{ fontSize: 10 }} />
                            <Legend wrapperStyle={{ fontSize: 10 }} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Regional demand map simulation */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="h-4.5 w-4.5 text-blue-500" />
                      Regional Demand Map (India Sourcing Nodes)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                      {[
                        { region: 'North Zone', state: 'North India Sourcing', revenue: '₹22,50,000', units: 710, status: 'Healthy' },
                        { region: 'West Zone', state: 'West India Sourcing', revenue: '₹35,00,000', units: 1160, status: 'Peak Demand' },
                        { region: 'South Zone', state: 'South India Sourcing', revenue: '₹18,00,000', units: 820, status: 'Accelerating' },
                        { region: 'East Zone', state: 'East India Sourcing', revenue: '₹9,50,000', units: 310, status: 'Low Activity' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <p className="text-[10px] text-slate-450 uppercase font-black">{item.region}</p>
                          <h4 className="font-extrabold text-xs text-slate-800">{item.state}</h4>
                          <div className="text-[11px] pt-1 text-slate-650">
                            <p>Revenue: <span className="font-bold text-slate-900">{item.revenue}</span></p>
                            <p>Sourcing: <span className="font-bold text-slate-900">{item.units} Units</span></p>
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            idx === 1 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inventory Alerts details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Low Stock Alerts */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider text-red-650 flex items-center gap-1">
                        🔴 Low Stock Alerts
                      </h4>
                      <div className="space-y-2 text-xs pt-1">
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Ethanol 99% Pure</span>
                          <span className="font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">8 units left</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Citric Acid Anhydrous</span>
                          <span className="font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">12 units left</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">HDPE Drums 200L</span>
                          <span className="font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">20 units left</span>
                        </div>
                      </div>
                    </div>

                    {/* Overstocked Products */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-1">
                        🟠 Overstocked Products
                      </h4>
                      <div className="space-y-2 text-xs pt-1">
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Storage Tanks 5000L</span>
                          <span className="font-bold text-slate-500">Stock: 20 units</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Silver Nitrate AR</span>
                          <span className="font-bold text-slate-500">Stock: 300 units</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Industrial Mixers 500L</span>
                          <span className="font-bold text-slate-500">Stock: 15 units</span>
                        </div>
                      </div>
                    </div>

                    {/* Dead Inventory */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider text-slate-655 flex items-center gap-1">
                        🛑 Dead Inventory
                      </h4>
                      <div className="space-y-2 text-xs pt-1">
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Flow Meter Digital</span>
                          <span className="font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded">No sales in 50d</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between">
                          <span className="font-extrabold text-slate-800">Boric Acid Powder</span>
                          <span className="font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded">No sales in 45d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCT REPORTS */}
              {activeSubSection === 'Product Reports' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* Download Reports Grid */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Generate Downloadable Intelligence Reports
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xl">
                      Select a report category below to export compiled CSV, Excel spreadsheet, or PDF invoice ledgers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
                      {[
                        { title: 'Product Sales Report', desc: 'Compiled units, revenue, and daily velocity run-rates.' },
                        { title: 'Demand Report', desc: 'Calculation metrics of lead interest and repeat order conversions.' },
                        { title: 'Revenue Report', desc: 'Net billing, margins, and profit contribution margins.' },
                        { title: 'Inventory Report', desc: 'SKU counts, aging days, and warehouse stock buffers.' },
                        { title: 'Forecast Report', desc: 'ML predicted next month demand levels and target buffer values.' }
                      ].map((rep, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-800">{rep.title}</h4>
                            <p className="text-[10px] text-slate-500 leading-normal mt-1">{rep.desc}</p>
                          </div>
                          <div className="flex gap-2 pt-2 text-[10px]">
                            <button 
                              onClick={() => alert(`Generating Excel export for ${rep.title}`)}
                              className="flex-grow py-1.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors text-center"
                            >
                              XLSX
                            </button>
                            <button 
                              onClick={() => alert(`Generating CSV export for ${rep.title}`)}
                              className="flex-grow py-1.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors text-center"
                            >
                              CSV
                            </button>
                            <button 
                              onClick={() => alert(`Generating PDF export for ${rep.title}`)}
                              className="flex-grow py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors text-center"
                            >
                              PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* LEAD MANAGEMENT -> ALL LEADS (KANBAN PIPELINE BOARD) */}
          {activeSection === 'Lead Management' && activeSubSection === 'All Leads' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Lead Pipeline Board</h3>
                  <p className="text-xs text-slate-500 mt-1">Review conversion stages. Click arrow to shift pipeline step.</p>
                </div>
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="bg-blue-600 text-white rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-500 shadow-md"
                >
                  <Plus className="h-4.5 w-4.5" /> Capture Lead Form
                </button>
              </div>

              {/* Kanban columns grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {pipelineStages.map((col) => {
                  const stageLeads = allLeadsData.filter(l => l.stage === col.stage);
                  const stageSum = stageLeads.reduce((acc, curr) => acc + curr.value, 0);

                  return (
                    <div key={col.stage} className={`border border-slate-200 border-t-4 rounded-2xl p-4 flex flex-col min-h-[380px] ${col.color}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 mb-4">
                        <div>
                          <h5 className="text-[10px] font-bold text-slate-800 uppercase">{col.title}</h5>
                          <span className="text-[9px] text-slate-455 font-extrabold">₹{stageSum.toLocaleString()}</span>
                        </div>
                        <span className="text-[9px] bg-white border border-slate-200 px-2 py-0.2 rounded-full font-bold">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3 overflow-y-auto">
                        {stageLeads.map(lead => (
                          <div key={lead.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-355 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-xs flex flex-col justify-between h-44">
                            <div className="relative h-14 w-full bg-slate-100 flex-shrink-0">
                              <img src={lead.banner} alt={lead.company} className="w-full h-full object-cover opacity-60" />
                              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                              <img src={lead.avatar} alt={lead.contact} className="absolute bottom-1 right-3 h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" />
                            </div>
                            
                            <div className="px-3.5 pb-3.5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-[8px] font-mono text-slate-400">{lead.id}</span>
                                  <span className="font-extrabold text-blue-655 text-[11px]">₹{lead.value.toLocaleString()}</span>
                                </div>
                                <h6 className="font-extrabold text-slate-800 truncate mt-1">{lead.company}</h6>
                                <p className="text-[9px] text-slate-450 mt-0.5">{lead.contact}</p>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-slate-50 mt-2.5">
                                <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">Score: {lead.score}</span>
                                <button
                                  onClick={() => {
                                    const nextStages: Record<CRMLead['stage'], CRMLead['stage']> = {
                                      'Lead': 'Qualified',
                                      'Qualified': 'Proposal' as any,
                                      'Proposal': 'Negotiation' as any,
                                      'Negotiation': 'Won',
                                      'Won': 'Lead'
                                    };
                                    const next = nextStages[lead.stage as CRMLead['stage']] || 'Lead';
                                    setAllLeadsData(allLeadsData.map(l => l.id === lead.id ? { ...l, stage: next } : l));
                                    updateLeadStage(lead.id, next);
                                    addActivity(`Shifted pipeline step for ${lead.company} directly to ${next}`, 'vendor');
                                  }}
                                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
                                  title="Move next step"
                                >
                                  <ArrowRight className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEAD MANAGEMENT -> SPECIFIC STAGE SUB-PAGES */}
          {activeSection === 'Lead Management' && activeSubSection !== 'All Leads' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-450 font-bold">Filtered count: {filteredLeads.length} leads</span>
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-1.5 text-[10px] font-bold shadow-sm"
                >
                  + Capture Lead
                </button>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
                  <Info className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">No leads currently in this stage category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLeads.map(lead => (
                    <div key={lead.id} className="bg-white border border-slate-200 hover:border-slate-355 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-48">
                      <div className="relative h-16 w-full bg-slate-100 flex-shrink-0">
                        <img src={lead.banner} alt={lead.company} className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                        <img src={lead.avatar} alt={lead.contact} className="absolute bottom-1 right-4 h-9 w-9 rounded-full border-2 border-white object-cover shadow" />
                      </div>

                      <div className="px-4.5 pb-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mt-2">
                            <span className="text-[9px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded">{lead.id}</span>
                            <span className="font-extrabold text-blue-660 text-xs">₹{lead.value.toLocaleString()}</span>
                          </div>
                          <h4 className="font-extrabold text-slate-800 mt-2 truncate">{lead.company}</h4>
                          <p className="text-[10px] text-slate-450 mt-0.5">{lead.contact} • {lead.email}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-3">
                          <select
                            value={lead.stage}
                            onChange={(e) => {
                              const newStage = e.target.value as CRMLead['stage'];
                              setAllLeadsData(allLeadsData.map(l => l.id === lead.id ? { ...l, stage: newStage } : l));
                              updateLeadStage(lead.id, newStage);
                            }}
                            className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] font-bold text-slate-655 focus:outline-none cursor-pointer"
                          >
                            <option value="Lead">Lead</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Won">Won</option>
                          </select>

                          <span className="text-[8px] uppercase font-black bg-slate-100 text-slate-500 px-2 py-1 rounded">
                            Score: {lead.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CUSTOMERS */}
          {activeSection === 'Customers' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {/* CUSTOMERS TAB ROUTER */}
              
              {/* Tab 1, 2, 3: Customer Cards List (All, Active, Premium) */}
              {(activeSubSection === 'All Customers' || activeSubSection === 'Active Customers' || activeSubSection === 'Premium Customers') && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{activeSubSection} Directory</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Review accounts, billing targets, and location coordinates.</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                      Count: {
                        activeSubSection === 'Active Customers' 
                          ? mockCustomersList.filter(c => c.status === 'Active').length 
                          : activeSubSection === 'Premium Customers' 
                            ? mockCustomersList.filter(c => c.segment === 'Premium VIP').length 
                            : mockCustomersList.length
                      } Clients
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mockCustomersList
                      .filter(c => {
                        if (activeSubSection === 'Active Customers') return c.status === 'Active';
                        if (activeSubSection === 'Premium Customers') return c.segment === 'Premium VIP';
                        return true;
                      })
                      .map((cust) => (
                        <div key={cust.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-64 group">
                          {/* Banner & Headshot */}
                          <div className="relative h-20 w-full bg-slate-100 flex-shrink-0">
                            <img src={cust.banner} alt={cust.name} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                            <img src={cust.avatar} alt={cust.contact} className="absolute -bottom-4 left-4 h-12 w-12 rounded-full border-2 border-white object-cover shadow" />
                          </div>

                          <div className="px-5 pt-5 pb-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-black text-sm text-slate-800 truncate max-w-[150px]">{cust.name}</h4>
                                <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded-full ${
                                  cust.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                  {cust.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-semibold">{cust.contact} • {cust.title}</p>
                              
                              <div className="mt-3.5 space-y-1 text-[10px] text-slate-600 font-medium">
                                <p className="flex justify-between"><span>GSTIN:</span> <strong className="font-mono text-slate-800">{cust.gst}</strong></p>
                                <p className="flex justify-between"><span>Location:</span> <span className="text-slate-850 truncate max-w-[120px]">{cust.address}</span></p>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-3 text-[10px]">
                              <div>
                                <span className="text-slate-400 block text-[8px] uppercase font-bold">LTV Sales</span>
                                <strong className="text-blue-600 text-xs font-black">{cust.sales}</strong>
                              </div>
                              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-bold">
                                {cust.ordersCount} Orders
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Customer Groups */}
              {activeSubSection === 'Customer Groups' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">Segmented Client Directories</h3>
                    <p className="text-xs text-slate-500 mt-1">Review bulk pricing rules and groups classification.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                    {[
                      { name: 'Pharma Wholesalers', count: 3, discount: '12% Flat Tier', banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=80', description: 'Bulk buyers of pharmaceutical grade compounds and storage containers.' },
                      { name: 'Chemical Distributors', count: 5, discount: '8% Tier', banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80', description: 'Logistics agents moving industrial raw solvents.' },
                      { name: 'Agro Retailers', count: 2, discount: '5% Tier', banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&auto=format&fit=crop&q=80', description: 'Local seed, soil amendment, and fertilizer dealerships.' }
                    ].map((grp, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img src={grp.banner} alt={grp.name} className="h-24 w-full object-cover opacity-60" />
                        <div className="p-4 space-y-2.5">
                          <h4 className="font-extrabold text-sm text-slate-800">{grp.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-normal">{grp.description}</p>
                          <div className="pt-2 border-t border-slate-100 flex justify-between text-[10px] font-bold text-slate-600">
                            <span>{grp.count} Members</span>
                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{grp.discount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Customer Documents */}
              {activeSubSection === 'Customer Documents' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Compliance & Document Vault</h3>
                      <p className="text-xs text-slate-500 mt-1">Access signed partner agreements, drug license credentials, and tax clearances.</p>
                    </div>
                    <select
                      value={selectedCustomerForDoc}
                      onChange={(e) => setSelectedCustomerForDoc(e.target.value)}
                      className="border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                    >
                      {mockCustomersList.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {[
                      { name: 'Corporate Sales Contract.pdf', size: '1.2 MB', type: 'Agreement', date: '2026-04-12' },
                      { name: 'State Drug License Copy.pdf', size: '840 KB', type: 'Compliance License', date: '2026-01-10' },
                      { name: 'GSTIN Registration Copy.pdf', size: '410 KB', type: 'Tax Clearance', date: '2025-11-20' }
                    ].map((doc, dIdx) => (
                      <div key={dIdx} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-slate-350 transition-colors flex items-start gap-3">
                        <div className="h-10 w-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-600 font-extrabold text-xs">
                          PDF
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate" title={doc.name}>{doc.name}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">{doc.type} • {doc.size}</p>
                          <span className="text-[8px] text-slate-400 block mt-2">Uploaded: {doc.date}</span>
                        </div>
                        <button
                          onClick={() => alert(`Simulating file download request for: ${doc.name}`)}
                          className="p-1 hover:bg-slate-100 rounded border border-slate-200 text-slate-500 hover:text-blue-600 transition-colors self-center"
                          title="Download document"
                        >
                          ↓
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SALES */}
          {(activeSection === 'Sales' || activeSection === 'Order Management') && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {/* Tab 1: Quotations */}
              {activeSubSection === 'Quotations' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">Create Quotation Estimate</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-550">Target Client</label>
                        <select
                          value={quoteClient}
                          onChange={(e) => setQuoteClient(e.target.value)}
                          className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Global Distribs">Global Distribs</option>
                          <option value="Nexus Pharma">Nexus Pharma</option>
                          <option value="Jupiter Agri Foods">Jupiter Agri Foods</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-555">Estimate Term Status</label>
                        <select
                          value={quoteStatus}
                          onChange={(e) => setQuoteStatus(e.target.value as any)}
                          className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Draft">Draft Mode</option>
                          <option value="Sent">Sent to Client</option>
                          <option value="Approved">Approved / Signed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={convertQuoteToInvoice}
                        className="text-xs bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-500 shadow-md"
                      >
                        Convert Quote to Invoice
                      </button>
                    </div>
                  </div>

                  {/* AI generator widget */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                      AI Quotation Generator Engine
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiQuotePrompt}
                        onChange={(e) => setAiQuotePrompt(e.target.value)}
                        placeholder="e.g. 50 drums chemical for Global Distribs with 10% discount..."
                        className="flex-1 border border-slate-200 bg-white text-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleAiQuoteGenerate}
                        className="bg-slate-900 text-white rounded-xl px-4 py-2.5 text-xs font-bold hover:bg-slate-850"
                      >
                        AI Generate
                      </button>
                    </div>
                    {isAiLoading && <p className="text-xs text-slate-400 animate-pulse">Running AI estimation metrics...</p>}
                    {aiGeneratedText && (
                      <pre className="p-4 bg-slate-900 text-emerald-300 border border-slate-200 rounded-xl text-[10px] font-mono whitespace-pre-wrap leading-relaxed">
                        {aiGeneratedText}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Estimates */}
              {activeSubSection === 'Estimates' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Advanced Freight & Surcharge Estimator</h3>
                      <p className="text-xs text-slate-500 mt-1">Adjust shipping surcharges and volume discounts to recalculate total estimate balances.</p>
                    </div>

                    <div className="space-y-4 text-xs border-t border-slate-100 pt-4">
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>Freight Surcharge (₹)</span>
                          <span className="text-blue-600">₹{freightSurcharge.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="10000"
                          step="250"
                          value={freightSurcharge}
                          onChange={(e) => setFreightSurcharge(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>Volume Bulk Discount Rate (%)</span>
                          <span className="text-blue-600">{bulkDiscountRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="25"
                          step="1"
                          value={bulkDiscountRate}
                          onChange={(e) => setBulkDiscountRate(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 space-y-2">
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Cargo Subtotal:</span>
                          <span>₹1,50,000</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Freight Add-on:</span>
                          <span>+ ₹{freightSurcharge.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Bulk Discount ({bulkDiscountRate}%):</span>
                          <span className="text-emerald-650">- ₹{((150000 * bulkDiscountRate) / 100).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                          <span>Total Calculated Estimate:</span>
                          <span className="text-blue-600">₹{(150000 + freightSurcharge - (150000 * bulkDiscountRate) / 100).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Sales Orders */}
              {activeSubSection === 'Sales Orders' && (
                <div className="space-y-6">
                  {/* Top Bar with Filter Dropdown */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Sales Orders Ledger</h3>
                      <p className="text-xs text-slate-500 mt-1">Track customer distribution orders, supplier links, and fulfillment status.</p>
                    </div>
                    
                    {/* Orders Dropdown Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-bold">Vendor Filter:</span>
                      <select
                        value={selectedOrderVendorFilter}
                        onChange={(e) => setSelectedOrderVendorFilter(e.target.value)}
                        className="border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-1.5 text-xs focus:outline-none font-semibold shadow-sm"
                      >
                        <option value="All">All Vendors</option>
                        <option value="Apex Chem Co">Apex Chem Co</option>
                        <option value="MedLife Ltd">MedLife Ltd</option>
                        <option value="Hindustan Inc">Hindustan Inc</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid Listing matching store orders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                    {orders
                      .filter(o => selectedOrderVendorFilter === 'All' ? true : o.vendor === selectedOrderVendorFilter)
                      .map((ord) => {
                        return (
                          <div 
                            key={ord.id} 
                            onClick={() => {
                              setSelectedOrderDetails(ord);
                              setShowOrderDetailModal(true);
                            }}
                            className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer space-y-3.5"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-bold">{ord.id}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                ord.status === 'Delivered' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : ord.status === 'Processing' || ord.status === 'Approved'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                    : ord.status === 'Cancelled'
                                      ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                      : 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                              }`}>{ord.status}</span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="font-extrabold text-sm text-slate-800">{ord.customer}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vendor: <span className="text-slate-700 font-extrabold">{ord.vendor}</span></p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 font-medium">
                              <div>
                                <span>Order Date</span>
                                <p className="font-bold text-slate-800 mt-0.5">{ord.date}</p>
                              </div>
                              <div className="text-right">
                                <span>Order Value</span>
                                <p className="font-black text-sm text-slate-900 mt-0.5">₹{ord.amount.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Tab 4: Proforma Invoice */}
              {activeSubSection === 'Proforma Invoice' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Proforma Advance Invoice Builder</h3>
                      <p className="text-xs text-slate-500 mt-1">Generate pre-shipping wire transfer invoices to secure initial payment deposits.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-t border-slate-100 pt-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Advance Deposit percentage ({proformaAdvancePct}%)</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={proformaAdvancePct}
                          onChange={(e) => setProformaAdvancePct(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Authorized Banking Partner</label>
                        <select className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2 focus:outline-none">
                          <option>HDFC Corporate Bank (A/C: ...9912)</option>
                          <option>ICICI Trade Finance (A/C: ...4410)</option>
                          <option>State Bank of India (A/C: ...0815)</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4.5 text-xs text-slate-700 space-y-3">
                      <h4 className="font-bold text-blue-800 flex items-center gap-1.5">
                        <span>ℹ</span> Proforma Deposit Calculation Summary
                      </h4>
                      <p className="leading-relaxed">
                        Total Order estimation value stands at <strong>₹3,50,000</strong>. A <strong>{proformaAdvancePct}% advance</strong> is required to initiate logistics packaging, amounting to a wire request of <strong className="text-blue-600 text-sm">₹{((350000 * proformaAdvancePct) / 100).toLocaleString()}</strong>.
                      </p>
                      <button
                        onClick={() => alert(`Generated Proforma PDF receipt with banking code for ₹${((350000 * proformaAdvancePct) / 100).toLocaleString()}`)}
                        className="bg-blue-600 text-white font-bold rounded-lg px-4.5 py-1.5 hover:bg-blue-500 shadow-sm border-none cursor-pointer"
                      >
                        Generate Wire Receipt
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BILLING & INVOICES */}
          {activeSection === 'Billing & Invoices' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              
              {/* Header section with Create trigger */}
              <div className="flex justify-between items-center bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{activeSubSection} Overview</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage billing records, drafts, tax compliance, and client ledger sheets.</p>
                </div>
                <button
                  onClick={() => {
                    // Reset invoice builder states for new draft
                    setInvoiceClient('Global Distribs');
                    setInvoiceItems([{ name: 'Premium Grade Silica', qty: 10, rate: 450, gst: 18 }]);
                    setInvoiceDiscount(0);
                    setSignature('');
                    setIsSigned(false);
                    setShowCreateInvoiceModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4.5 py-2 text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  + Create Invoice
                </button>
              </div>

              {/* Search Bar */}
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search invoice by unique ID (e.g. INV-2026-001) or customer name..."
                  value={invoiceSearchQuery}
                  onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 focus:outline-none focus:ring-0 placeholder-slate-400 text-xs py-1"
                />
                {invoiceSearchQuery && (
                  <button
                    onClick={() => setInvoiceSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Invoices List Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Date Issued</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Invoice Total</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-700">
                    {invoicesList
                      .filter(inv => {
                        if (activeSubSection === 'Draft Invoices') return inv.status === 'Draft';
                        if (activeSubSection === 'Paid Invoices') return inv.status === 'Paid';
                        if (activeSubSection === 'Pending Invoices') return inv.status === 'Pending';
                        if (activeSubSection === 'Overdue Invoices') return inv.status === 'Overdue';
                        if (activeSubSection === 'Recurring Invoices') return inv.status === 'Paid'; // Mock recurrence
                        return true;
                      })
                      .filter(inv => {
                        if (!invoiceSearchQuery) return true;
                        const query = invoiceSearchQuery.toLowerCase();
                        return inv.id.toLowerCase().includes(query) || inv.customer.toLowerCase().includes(query);
                      })
                      .map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-slate-500">{inv.id}</td>
                          <td className="p-4 font-bold text-slate-800">{inv.customer}</td>
                          <td className="p-4 font-medium text-slate-450">{inv.date}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                              inv.status === 'Paid' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : inv.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : inv.status === 'Overdue'
                                    ? 'bg-red-50 text-red-700 border border-red-100 animate-pulse'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>{inv.status}</span>
                          </td>
                          <td className="p-4 text-right font-black text-slate-900">₹{inv.amount.toLocaleString()}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setInvoiceClient(inv.customer);
                                setInvoiceItems(inv.items);
                                setShowInvoicePdf(true);
                              }}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-500 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              👁 View PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Create Invoice Popup Modal Overlay */}
              {showCreateInvoiceModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                    
                    {/* Modal Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                      <h4 className="font-extrabold text-slate-800 text-sm">Dynamic Invoice Compiler Workspace</h4>
                      <button
                        onClick={() => setShowCreateInvoiceModal(false)}
                        className="bg-white border border-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-5 flex-1">
                      
                      {/* Auto Generation inside Popup */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Auto Generate from Order</span>
                          <span className="text-[8px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-black">Sync Ready</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { id: 'SO-901', client: 'Global Distribs', items: [{ name: 'Premium Grade Silica', qty: 100, rate: 450, gst: 18 }] },
                            { id: 'SO-902', client: 'Nexus Pharma', items: [{ name: 'Pure Stearic Acid Powder', qty: 40, rate: 180, gst: 18 }] },
                            { id: 'SO-903', client: 'Alpha Traders', items: [{ name: 'Industrial Grade Ethanol 99%', qty: 20, rate: 340, gst: 18 }] }
                          ].map((soOpt) => (
                            <button
                              key={soOpt.id}
                              onClick={() => {
                                setInvoiceClient(soOpt.client);
                                setInvoiceItems(soOpt.items);
                              }}
                              className="bg-white hover:bg-slate-100 border border-slate-250 rounded-lg px-2.5 py-1 text-[9px] font-bold text-slate-655 transition-colors cursor-pointer"
                            >
                              ⚡ Load {soOpt.id}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Builder Form Inputs */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-550">Billing Client Name</label>
                          <input
                            type="text"
                            value={invoiceClient}
                            onChange={(e) => setInvoiceClient(e.target.value)}
                            className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3.5 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-555">Discount Flat (%)</label>
                          <input
                            type="number"
                            value={invoiceDiscount}
                            onChange={(e) => setInvoiceDiscount(parseFloat(e.target.value) || 0)}
                            className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3.5 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Items Row Editor */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-slate-455">Invoice Item Entries</span>
                          <button
                            onClick={() => {
                              setInvoiceItems([...invoiceItems, { name: 'New Chemical Compound', qty: 1, rate: 1000, gst: 18 }]);
                            }}
                            className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            + Add Item Row
                          </button>
                        </div>
                        
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {invoiceItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200/60 text-xs">
                              <div className="col-span-5 space-y-0.5">
                                <span className="text-[8px] text-slate-400 font-bold block">Item Name</span>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => {
                                    const newItms = [...invoiceItems];
                                    newItms[index].name = e.target.value;
                                    setInvoiceItems(newItms);
                                  }}
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-0.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="col-span-2 space-y-0.5">
                                <span className="text-[8px] text-slate-400 font-bold block text-center">Qty</span>
                                <input
                                  type="number"
                                  value={item.qty}
                                  onChange={(e) => {
                                    const newItms = [...invoiceItems];
                                    newItms[index].qty = parseInt(e.target.value) || 0;
                                    setInvoiceItems(newItms);
                                  }}
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-0.5 text-xs focus:outline-none text-center"
                                />
                              </div>
                              <div className="col-span-2 space-y-0.5">
                                <span className="text-[8px] text-slate-400 font-bold block text-center">Rate (₹)</span>
                                <input
                                  type="number"
                                  value={item.rate}
                                  onChange={(e) => {
                                    const newItms = [...invoiceItems];
                                    newItms[index].rate = parseFloat(e.target.value) || 0;
                                    setInvoiceItems(newItms);
                                  }}
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-0.5 text-xs focus:outline-none text-center"
                                />
                              </div>
                              <div className="col-span-2 space-y-0.5">
                                <span className="text-[8px] text-slate-400 font-bold block text-center">GST (%)</span>
                                <input
                                  type="number"
                                  value={item.gst}
                                  onChange={(e) => {
                                    const newItms = [...invoiceItems];
                                    newItms[index].gst = parseInt(e.target.value) || 0;
                                    setInvoiceItems(newItms);
                                  }}
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-0.5 text-xs focus:outline-none text-center"
                                />
                              </div>
                              <div className="col-span-1 text-center pt-2">
                                <button
                                  onClick={() => {
                                    if (invoiceItems.length > 1) {
                                      setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
                                    }
                                  }}
                                  className="text-red-500 hover:text-red-700 font-bold text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calculations Details */}
                      {(() => {
                        const subtotal = invoiceItems.reduce((acc, curr) => acc + (curr.qty * curr.rate), 0);
                        const gstTotal = invoiceItems.reduce((acc, curr) => acc + ((curr.qty * curr.rate) * (curr.gst / 100)), 0);
                        const discountVal = subtotal * (invoiceDiscount / 100);
                        const total = (subtotal + gstTotal) - discountVal;

                        return (
                          <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 space-y-3.5 text-xs">
                            <div className="flex justify-between text-slate-550 font-semibold">
                              <span>Subtotal</span>
                              <strong className="text-slate-800">₹{subtotal.toLocaleString()}</strong>
                            </div>
                            <div className="flex justify-between text-slate-550 font-semibold">
                              <span>GST Liability Tax</span>
                              <strong className="text-slate-800">₹{gstTotal.toLocaleString()}</strong>
                            </div>
                            <div className="flex justify-between text-sm border-t border-slate-200 pt-2 font-black text-slate-900">
                              <span>Total Calculated Amount</span>
                              <span className="text-blue-600">₹{total.toLocaleString()}</span>
                            </div>

                            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                              <input
                                type="text"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                placeholder="Type authorized sign name..."
                                className="border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                              />
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (signature.trim()) {
                                      setIsSigned(true);
                                      alert('Signature locked.');
                                    } else {
                                      alert('Please enter signature name first.');
                                    }
                                  }}
                                  className="bg-slate-950 text-white rounded-xl px-3.5 py-2 font-bold hover:bg-slate-850 text-[10px]"
                                >
                                  Lock E-Sign
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newInv = {
                                      id: `INV-2026-00${invoicesList.length + 1}`,
                                      customer: invoiceClient,
                                      amount: total,
                                      date: new Date().toISOString().split('T')[0],
                                      status: 'Pending',
                                      items: [...invoiceItems]
                                    };
                                    setInvoicesList([newInv, ...invoicesList]);
                                    setShowCreateInvoiceModal(false);
                                    addActivity(`Generated new invoice ledger ${newInv.id} for ${invoiceClient}`, 'payment');
                                    alert(`Successfully created and logged invoice ${newInv.id}!`);
                                  }}
                                  className="bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-550 shadow-md text-[10px]"
                                >
                                  Generate & Save Invoice
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  </div>
                </div>
              )}

              {/* Printable PDF Modal Overlay */}
              {showInvoicePdf && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                    
                    {/* Modal Control Bar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center print:hidden">
                      <h4 className="font-extrabold text-slate-800 text-sm">Invoice Printable PDF Preview</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.print()}
                          className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-500 shadow transition-colors cursor-pointer"
                        >
                          Print / Save PDF
                        </button>
                        <button
                          onClick={() => {
                            setShowInvoicePdf(false);
                            setSelectedInvoice(null);
                          }}
                          className="bg-white border border-slate-200 font-bold text-xs px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          ✕ Close
                        </button>
                      </div>
                    </div>

                    {/* PDF Sheet Layout (A4 format representation) */}
                    <div className="p-8 space-y-6 text-slate-800 bg-white" id="invoice-pdf-sheet">
                      
                      {/* Brand Header */}
                      <div className="flex justify-between items-start border-b border-slate-100 pb-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">Ω</span>
                            <span className="font-black text-base text-slate-900 tracking-tight uppercase">Talentspark</span>
                          </div>
                          <p className="text-[10px] text-slate-450 font-bold tracking-wider uppercase">CRM + Billing ERP Suite</p>
                        </div>
                        <div className="text-right text-xs">
                          <h2 className="text-lg font-black text-slate-900">INVOICE</h2>
                          <p className="font-mono text-slate-400 text-[10px] mt-0.5">{selectedInvoice?.id || 'INV-2026-TEMP'}</p>
                          <p className="text-[9px] text-slate-450 mt-1">Date: {selectedInvoice?.date || new Date().toISOString().split('T')[0]}</p>
                        </div>
                      </div>

                      {/* Party Info */}
                      <div className="grid grid-cols-2 gap-6 text-[10px] leading-relaxed">
                        <div>
                          <span className="text-slate-400 block uppercase font-bold text-[8px] tracking-wide mb-1">Bill From</span>
                          <strong className="text-slate-900 block text-xs mb-0.5">Talentspark Ventures</strong>
                          <p>Gst Road, Guindy, Chennai - 600032</p>
                          <p className="font-semibold text-slate-700 mt-1">GSTIN: 33AAACT9920K1Z1</p>
                        </div>
                        <div>
                          <span className="text-slate-400 block uppercase font-bold text-[8px] tracking-wide mb-1">Bill To (Client)</span>
                          <strong className="text-slate-900 block text-xs mb-0.5">{invoiceClient || 'Corporate Partner'}</strong>
                          <p>Registered Corporate Office Address</p>
                          <p className="font-semibold text-slate-700 mt-1">GSTIN: 27BBBCY8810M2Z2 (Simulated)</p>
                        </div>
                      </div>

                      {/* Line Items Table */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden mt-4">
                        <table className="w-full text-left text-[10px] border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                              <th className="p-3">Item Description</th>
                              <th className="p-3 text-center">Qty</th>
                              <th className="p-3 text-right">Unit Rate (₹)</th>
                              <th className="p-3 text-center">GST %</th>
                              <th className="p-3 text-right">Net Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {invoiceItems.map((itm, idx) => (
                              <tr key={idx}>
                                <td className="p-3 font-bold text-slate-800">{itm.name}</td>
                                <td className="p-3 text-center">{itm.qty}</td>
                                <td className="p-3 text-right">₹{itm.rate.toLocaleString()}</td>
                                <td className="p-3 text-center">{itm.gst}%</td>
                                <td className="p-3 text-right font-bold text-slate-900">₹{(itm.qty * itm.rate).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Calculations Details */}
                      {(() => {
                        const subtotal = invoiceItems.reduce((acc, curr) => acc + (curr.qty * curr.rate), 0);
                        const gstVal = invoiceItems.reduce((acc, curr) => acc + ((curr.qty * curr.rate) * (curr.gst / 100)), 0);
                        const disc = subtotal * (invoiceDiscount / 100);
                        const grandTotal = (subtotal + gstVal) - disc;

                        return (
                          <div className="flex justify-between items-start pt-2">
                            <div className="w-1/2 text-[9px] text-slate-500 leading-normal">
                              <p className="font-bold text-slate-700 uppercase text-[8px] tracking-wide mb-1">Terms & Banking Wire</p>
                              <p>Bank Name: HDFC Corporate Bank</p>
                              <p>Account No: 50200088129910</p>
                              <p>IFSC Code: HDFC0000125</p>
                              <p className="mt-1 font-semibold text-slate-600">Please settle invoice within 15 working days.</p>
                            </div>
                            <div className="w-1/3 text-[10px] space-y-1.5 text-right font-medium">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Subtotal:</span>
                                <strong>₹{subtotal.toLocaleString()}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">GST Collected:</span>
                                <strong>₹{gstVal.toLocaleString()}</strong>
                              </div>
                              {invoiceDiscount > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Discount ({invoiceDiscount}%):</span>
                                  <strong className="text-emerald-700">- ₹{disc.toLocaleString()}</strong>
                                </div>
                              )}
                              <div className="flex justify-between border-t border-slate-200 pt-2 text-xs font-black text-slate-900">
                                <span>Grand Total:</span>
                                <span className="text-blue-600">₹{grandTotal.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Signature block */}
                      <div className="pt-8 flex justify-between items-end border-t border-slate-100 text-[10px]">
                        <div>
                          <p className="text-slate-400 text-[8px] uppercase font-bold tracking-wide">Verification QR</p>
                          <div className="h-12 w-12 border border-slate-200 rounded-lg flex items-center justify-center text-[7px] text-slate-400 text-center font-bold font-mono bg-slate-50 mt-1">
                            SECURE<br/>QR-CODE
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-[8px] uppercase font-bold tracking-wide mb-3">Authorized Signatory</p>
                          {isSigned || selectedInvoice ? (
                            <p className="font-serif italic text-base text-blue-800 font-bold border-b border-dashed border-slate-400 pb-0.5 inline-block">{signature || 'Talentspark Corp'}</p>
                          ) : (
                            <span className="text-slate-300 italic">E-Signature Pending</span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* PAYMENTS */}
          {activeSection === 'Payments' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {(activeSubSection === 'Received Payments' || activeSubSection === 'Pending Payments') && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{activeSubSection} Transaction Logs</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time ledger updates for gateway and wire settlements.</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">Txn Hash</th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Method</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-right">Settled Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700">
                        {[
                          { id: 'TXN-90112', customer: 'Global Distribs', method: 'RTGS / Bank Transfer', amount: 53100, date: '2026-06-19', status: 'Settled' },
                          { id: 'TXN-90113', customer: 'Nexus Pharma', method: 'Razorpay UPI', amount: 8496, date: '2026-06-18', status: 'Pending' },
                          { id: 'TXN-90114', customer: 'Alpha Traders', method: 'NEFT Transfer', amount: 8024, date: '2026-06-20', status: 'Settled' }
                        ].filter(txn => activeSubSection === 'Received Payments' ? txn.status === 'Settled' : txn.status === 'Pending').map((txn, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono text-[10px] text-slate-400">{txn.id}</td>
                            <td className="p-4 font-bold text-slate-800">{txn.customer}</td>
                            <td className="p-4 font-medium text-slate-500">{txn.method}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                txn.status === 'Settled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}>{txn.status}</span>
                            </td>
                            <td className="p-4 text-right font-black text-slate-900">₹{txn.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubSection === 'Refunds' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">Refund Claims Ledger</h3>
                    <p className="text-xs text-slate-500 mt-1">Review chargebacks, damaged product returns, and dispute reversals.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {[
                      { id: 'REF-201', customer: 'Lotus Laboratories', reason: 'Defective batch replacement', amount: 15800, status: 'Approved' },
                      { id: 'REF-202', customer: 'Jupiter Agri Foods', reason: 'Freight surcharge correction', amount: 2350, status: 'Processing' }
                    ].map((ref, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between h-36">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-slate-400">{ref.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                            ref.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>{ref.status}</span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-800 mt-1">{ref.customer}</h4>
                        <p className="text-[10px] text-slate-500 italic">"{ref.reason}"</p>
                        <div className="pt-2 border-t border-slate-100 text-right mt-2">
                          <strong className="text-red-650 text-xs font-black">₹{ref.amount.toLocaleString()}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubSection === 'Payment Requests' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Generate Payment Settle Link</h3>
                      <p className="text-xs text-slate-500 mt-1">Create gateway links to collect deposits or pending dues immediately.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-t border-slate-100 pt-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Client Partner</label>
                        <select className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2.5 focus:outline-none">
                          <option>Global Distribs</option>
                          <option>Nexus Pharma</option>
                          <option>Alpha Traders</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Dues Settle Amount (₹)</label>
                        <input type="number" defaultValue="25000" className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2.5 focus:outline-none" />
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Razorpay payment API request link generated successfully.')}
                      className="bg-blue-600 text-white font-bold text-xs rounded-xl px-4 py-2.5 hover:bg-blue-500 shadow transition-colors cursor-pointer"
                    >
                      Generate Secure Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS & SERVICES */}
          {activeSection === 'Products & Services' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {activeSubSection === 'Products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Active SKUs catalog</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage industrial grade solvents, compounds, and bulk packaging profiles.</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">{inventory.length} SKUs Listed</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {inventory.map((item, idx) => (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group min-h-[19rem]">
                        <div className="relative h-24 w-full bg-slate-100 flex-shrink-0">
                          <img 
                            src={idx % 2 === 0 ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80'} 
                            alt={item.name} 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                          <span className="absolute bottom-2 left-4 text-[9px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-bold">{item.sku}</span>
                          {item.discount && item.discount > 0 ? (
                            <span className="absolute top-2 right-4 text-[9px] font-black bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded shadow-sm">
                              {item.discount}% OFF
                            </span>
                          ) : null}
                        </div>

                        <div className="px-5 pt-3 pb-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-800 truncate">{item.name}</h4>
                            <p className="text-[9px] text-slate-450 uppercase font-bold mt-0.5">{item.category}</p>
                            
                            <div className="mt-2.5 space-y-2">
                              <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                                <span>Available Stock:</span>
                                <strong className={`font-bold ${item.stock < 20 ? 'text-red-600' : 'text-slate-800'}`}>{item.stock} units</strong>
                              </div>
                              
                              <div className="pt-2 border-t border-slate-50 space-y-1">
                                <div className="flex justify-between items-center text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">
                                  <span>Manage Discount</span>
                                  <span className="text-red-600 font-black text-xs">{item.discount || 0}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={item.discount || 0}
                                  onChange={(e) => updateProductDiscount(item.id, parseInt(e.target.value) || 0)}
                                  className="w-full accent-red-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-3 text-xs">
                            <div className="flex flex-col">
                              {item.discount && item.discount > 0 ? (
                                <>
                                  <span className="text-[9px] line-through text-slate-400">₹{item.price.toLocaleString()}</span>
                                  <strong className="text-blue-600 text-sm font-black">₹{Math.round(item.price * (1 - item.discount / 100)).toLocaleString()}</strong>
                                </>
                              ) : (
                                <strong className="text-blue-650 text-sm font-black">₹{item.price.toLocaleString()}</strong>
                              )}
                            </div>
                            <span className="text-[8.5px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">GST: {item.gst}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeSubSection === 'Services' || activeSubSection === 'Categories' || activeSubSection === 'Brands' || activeSubSection === 'Units') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                  {[
                    { title: 'Warehouse Logistics Consulting', detail: 'On-site chemical safety auditing and warehouse space planning services.', type: 'Service contract' },
                    { title: 'Silicate Compounds', detail: 'High-purity industrial dust and solid binding chemicals category.', type: 'Chemical Category' },
                    { title: 'Talentspark Chemicals', detail: 'In-house enterprise brand registered for distribution certification.', type: 'Core Brand' }
                  ].map((srv, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-2 flex flex-col justify-between">
                      <span className="text-[9px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold uppercase inline-block self-start">{srv.type}</span>
                      <h4 className="font-extrabold text-sm text-slate-800 mt-1">{srv.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{srv.detail}</p>
                      <button onClick={() => alert('API configurations template requested.')} className="text-[9px] font-black text-blue-650 hover:underline text-left pt-2">Manage Configs →</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INVENTORY */}
          {activeSection === 'Inventory' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              
              {activeSubSection === 'Stock Overview' && (
                <div className="space-y-6">
                  {/* Warehouse Occupancies */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {warehouses.map((wh, idx) => (
                      <div key={wh.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-xs text-slate-800">{wh.name}</h4>
                          <span className="text-[8.5px] bg-blue-50 text-blue-750 px-2 py-0.5 rounded font-mono font-bold">{wh.id}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: `${(wh.used / wh.capacity) * 100}%` }} />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Used: {wh.used} units</span>
                            <span>Cap: {wh.capacity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stock Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">SKU Code</th>
                          <th className="p-4">Product Name</th>
                          <th className="p-4">Available Stock</th>
                          <th className="p-4">Expiry Date</th>
                          <th className="p-4 text-center">Alerts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {inventory.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono text-slate-400">{item.sku}</td>
                            <td className="p-4 font-bold text-slate-800">{item.name}</td>
                            <td className={`p-4 font-bold ${item.stock < 20 ? 'text-red-600' : 'text-slate-800'}`}>{item.stock} units</td>
                            <td className="p-4 text-slate-500">{item.expiry}</td>
                            <td className="p-4 text-center">
                              {item.stock < 20 ? (
                                <span className="bg-red-50 text-red-700 border border-red-100 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">Low Stock</span>
                              ) : (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-black px-2 py-0.5 rounded-full">Good Stock</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {(activeSubSection === 'Purchase Entries' || activeSubSection === 'Stock In' || activeSubSection === 'Stock Out' || activeSubSection === 'Low Stock Alerts') && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-800">{activeSubSection} Ledgers</h3>
                    <p className="text-xs text-slate-500 mt-1">Audit log representations for inbound product receipts and outbound cargo consignments.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {inventory.filter(item => activeSubSection === 'Low Stock Alerts' ? item.stock < 20 : true).slice(0, 4).map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                        <div>
                          <h4 className="font-extrabold text-slate-800">{item.name}</h4>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Batch: {item.batch} • Expiry: {item.expiry}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] font-black ${
                          item.stock < 20 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          Qty: {item.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubSection === 'Stock Transfer' && (
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4 text-xs">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Initiate Warehouse Stock Transfer</h3>
                    <p className="text-xs text-slate-500 mt-1">Transfer compound inventories between regional storage logistics hubs securely.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">From Logistics Hub</label>
                      <select className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2.5 focus:outline-none">
                        <option>Mumbai WH-1</option>
                        <option>Hyderabad WH-2</option>
                        <option>Kolkata WH-3</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">To Logistics Hub</label>
                      <select className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2.5 focus:outline-none">
                        <option>Hyderabad WH-2</option>
                        <option>Mumbai WH-1</option>
                        <option>Kolkata WH-3</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-655">Quantity Units</label>
                      <input type="number" defaultValue="50" className="w-full border border-slate-200 bg-white text-slate-850 rounded-xl px-3 py-2.5 focus:outline-none" />
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Stock transfer ledger approved and dispatched to transport manager.')}
                    className="bg-blue-600 text-white font-bold text-xs rounded-xl px-4.5 py-2.5 hover:bg-blue-500 shadow transition-colors cursor-pointer"
                  >
                    Confirm Transfer
                  </button>
                </div>
              )}
            </div>
          )}

          {/* EXPENSE MANAGEMENT */}
          {activeSection === 'Expense Management' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Monthly Expenses</span>
                    <strong className="text-xl font-black text-slate-900 mt-1 block">₹8,24,190</strong>
                    <span className="text-[9px] text-emerald-600 font-bold mt-1 inline-block">↓ 4.2% vs last month</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl text-red-650">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Claims Approval</span>
                    <strong className="text-xl font-black text-slate-900 mt-1 block">₹45,300</strong>
                    <span className="text-[9px] text-amber-600 font-bold mt-1 inline-block">3 Claims awaiting audit</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Budget Allocated Remaining</span>
                    <strong className="text-xl font-black text-slate-900 mt-1 block">28% Remaining</strong>
                    <span className="text-[9px] text-blue-600 font-bold mt-1 inline-block">Limit: ₹11,50,000</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {activeSubSection === 'All Expenses' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Expenditure Ledger</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time tracking of team cash outflows and direct operations costs.</p>
                    </div>
                    <button onClick={() => alert('Expense creation model active.')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow-md">
                      + File Expense Claim
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">Ref Code</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Requested By</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { id: 'EXP-8812', title: 'AWS Cloud Infrastructure Cluster', cat: 'Software & Utilities', date: '2026-06-19', author: 'Vikram Seth', status: 'Approved', val: 78200 },
                          { id: 'EXP-8813', title: 'Mumbai Warehousing Safety Masks', cat: 'Raw Materials', date: '2026-06-18', author: 'Neha Sen', status: 'Pending', val: 12500 },
                          { id: 'EXP-8814', title: 'Travel reimbursement - Delhi Client meet', cat: 'Travel & Food', date: '2026-06-17', author: 'Rahul Shah', status: 'Approved', val: 9400 },
                          { id: 'EXP-8815', title: 'Office Stationery & Printing consumables', cat: 'Operations', date: '2026-06-15', author: 'Vijay Dev', status: 'Rejected', val: 3200 }
                        ].map((exp, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono text-slate-400 text-[10px]">{exp.id}</td>
                            <td className="p-4 font-bold text-slate-800">{exp.title}</td>
                            <td className="p-4 text-slate-500">{exp.cat}</td>
                            <td className="p-4 text-slate-500">{exp.date}</td>
                            <td className="p-4 text-slate-600">{exp.author}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                exp.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                exp.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                'bg-red-50 text-red-700 border border-red-100'
                              }`}>{exp.status}</span>
                            </td>
                            <td className="p-4 text-right font-black text-slate-900">₹{exp.val.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubSection === 'Categories' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { name: 'Raw Materials & Chemical Stock', allocated: 500000, spent: 420000, color: 'bg-emerald-500' },
                    { name: 'Logistics & Carriage Outward', allocated: 300000, spent: 215000, color: 'bg-blue-600' },
                    { name: 'Travel & Client Entertainment', allocated: 150000, spent: 145000, color: 'bg-amber-500' },
                    { name: 'Operations & Office Rental', allocated: 200000, spent: 180000, color: 'bg-red-500' }
                  ].map((cat, i) => {
                    const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
                    return (
                      <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-800 min-h-[32px]">{cat.name}</h4>
                          <span className="text-[9px] text-slate-400 block mt-1 font-bold">Budget Allocated: ₹{cat.allocated.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1 pt-2">
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`${cat.color} h-full`} style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                            <span>₹{cat.spent.toLocaleString()} spent</span>
                            <span>{pct}% Used</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeSubSection === 'Vendors' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { name: 'BASF India Pvt Ltd', category: 'Raw Materials Supplier', totalInvoiced: 1240000, pendingPay: 150000 },
                    { name: 'Dow Chemicals Corp', category: 'Industrial Solvents', totalInvoiced: 850000, pendingPay: 0 },
                    { name: 'Spot Cargo Transport', category: 'Freight Forwarding', totalInvoiced: 320000, pendingPay: 45000 },
                    { name: 'AWS Cloud India', category: 'Utilities & Software hosting', totalInvoiced: 780000, pendingPay: 78200 }
                  ].map((vn, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] bg-slate-150 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{vn.category}</span>
                        <h4 className="font-extrabold text-sm text-slate-850 mt-2">{vn.name}</h4>
                      </div>
                      <div className="pt-2 border-t border-slate-100 space-y-1 text-[10px]">
                        <p className="flex justify-between text-slate-500"><span>Total Billed:</span> <strong className="text-slate-800">₹{vn.totalInvoiced.toLocaleString()}</strong></p>
                        <p className="flex justify-between text-slate-500"><span>Pending Settlement:</span> <strong className={`${vn.pendingPay > 0 ? 'text-amber-700' : 'text-emerald-700'} font-extrabold`}>₹{vn.pendingPay.toLocaleString()}</strong></p>
                      </div>
                      <button onClick={() => alert(`Showing ledger for ${vn.name}`)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[9px] py-1.5 rounded-xl mt-2 w-full">
                        View Balance Statement
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeSubSection === 'Recurring Expenses' && (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                        <th className="p-4">Subscription Name</th>
                        <th className="p-4">Vendor Partner</th>
                        <th className="p-4">Frequency</th>
                        <th className="p-4">Next Billing Date</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                      {[
                        { name: 'AWS Production Cluster Hosting', vendor: 'AWS Cloud India', freq: 'Monthly', nextDate: '2026-07-01', status: 'Active', val: 78200 },
                        { name: 'Office Leased Premises Rent', vendor: 'DLF Realty Ltd', freq: 'Monthly', nextDate: '2026-07-05', status: 'Active', val: 120000 },
                        { name: 'Enterprise GSuite Email licenses', vendor: 'Google Workspace', freq: 'Yearly', nextDate: '2027-01-15', status: 'Active', val: 34500 },
                        { name: 'Courier Logistics Retainer service', vendor: 'Spot Cargo Transport', freq: 'Monthly', nextDate: '2026-06-30', status: 'Paused', val: 45000 }
                      ].map((sub, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-800">{sub.name}</td>
                          <td className="p-4 text-slate-500">{sub.vendor}</td>
                          <td className="p-4 text-slate-500">{sub.freq}</td>
                          <td className="p-4 text-slate-500">{sub.nextDate}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                              sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                            }`}>{sub.status}</span>
                          </td>
                          <td className="p-4 text-right font-black text-slate-950">₹{sub.val.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VENDOR MANAGEMENT */}
          {activeSection === 'Vendor Management' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {activeSubSection === 'All Vendors' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Vendor Directory</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage credentials, contact partners, and set credit lines for verified suppliers.</p>
                    </div>
                    <button onClick={() => alert('New vendor enrollment dashboard')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow-md">
                      + Register Vendor Partner
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { name: 'BASF India Chemicals', manager: 'Amit Roy', phone: '+91 99201 88402', email: 'amit.roy@basf-corp.com', credit: '30 Days Net', rate: '4.8', trust: 'High' },
                      { name: 'Dow Solvents Distributing', manager: 'Sandra Lopez', phone: '+1 408 551 0922', email: 's.lopez@dow.com', credit: '45 Days Net', rate: '4.7', trust: 'High' },
                      { name: 'Reliance Petro compounds', manager: 'Dinesh Ambani', phone: '+91 22 2844 9110', email: 'dinesh.a@ril.com', credit: '15 Days Net', rate: '4.5', trust: 'Medium' },
                      { name: 'Spot Cargo Dispatchers', manager: 'Rishi Patel', phone: '+91 88203 11920', email: 'operations@spotcargo.in', credit: 'Immediate', rate: '4.9', trust: 'High' }
                    ].map((vn, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative group hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{vn.name}</h4>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Contact: {vn.manager}</span>
                          </div>
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                            vn.trust === 'High' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>{vn.trust} Trust</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] text-slate-600 pt-2 border-t border-slate-100">
                          <p className="flex justify-between"><span>Phone:</span> <strong className="text-slate-850">{vn.phone}</strong></p>
                          <p className="flex justify-between"><span>Email:</span> <strong className="text-slate-850 truncate max-w-[150px]">{vn.email}</strong></p>
                          <p className="flex justify-between"><span>Credit Terms:</span> <strong className="text-slate-850">{vn.credit}</strong></p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                          <span className="text-amber-500 font-bold">★ {vn.rate} Rating</span>
                          <button onClick={() => alert(`Email ping sent to ${vn.manager}`)} className="text-blue-600 hover:underline font-bold text-[9px]">Contact Vendor →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubSection === 'Purchase Orders' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Inbound Purchase Orders (POs)</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Approve and trace status of procurement drafts sent to suppliers.</p>
                    </div>
                    <button onClick={() => alert('New PO template initialization')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow-md">
                      + Create Purchase Order
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">PO Ref</th>
                          <th className="p-4">Vendor Partner</th>
                          <th className="p-4">Date Issued</th>
                          <th className="p-4">Delivery SLA</th>
                          <th className="p-4 text-center">Dispatch Status</th>
                          <th className="p-4 text-right">Estimated Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { ref: 'PO-2026-001', vendor: 'BASF India Chemicals', date: '2026-06-19', SLA: 'Within 7 Days', status: 'Dispatched', amount: 350000 },
                          { ref: 'PO-2026-002', vendor: 'Dow Solvents Distributing', date: '2026-06-18', SLA: 'Immediate Delivery', status: 'Draft', amount: 80000 },
                          { ref: 'PO-2026-003', vendor: 'Spot Cargo Dispatchers', date: '2026-06-20', SLA: 'Scheduled (25 June)', status: 'Approved', amount: 15000 },
                          { ref: 'PO-2026-004', vendor: 'Reliance Petro compounds', date: '2026-06-15', SLA: 'Within 15 Days', status: 'Cargo Received', amount: 480000 }
                        ].map((po, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono text-[10px] text-blue-600 font-bold">{po.ref}</td>
                            <td className="p-4 font-bold text-slate-850">{po.vendor}</td>
                            <td className="p-4 text-slate-500">{po.date}</td>
                            <td className="p-4 text-slate-500">{po.SLA}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                                po.status === 'Cargo Received' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                po.status === 'Dispatched' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                po.status === 'Approved' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                'bg-slate-100 text-slate-600'
                              }`}>{po.status}</span>
                            </td>
                            <td className="p-4 text-right font-black text-slate-900">₹{po.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubSection === 'Vendor Payments' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">Accounts Payable Release</h3>
                    <p className="text-xs text-slate-500 mt-1">Review approved PO invoices pending treasury payment release.</p>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">Invoice No</th>
                          <th className="p-4">Vendor Partner</th>
                          <th className="p-4">PO Reference</th>
                          <th className="p-4">Due Date</th>
                          <th className="p-4 text-center">Action Required</th>
                          <th className="p-4 text-right">Unpaid Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { inv: 'BASF-IN-90812', vendor: 'BASF India Chemicals', po: 'PO-2026-001', due: '2026-07-19', amount: 150000 },
                          { inv: 'SPOT-38291', vendor: 'Spot Cargo Dispatchers', po: 'PO-2026-003', due: '2026-06-30', amount: 45000 },
                          { inv: 'AWS-BILL-8821', vendor: 'AWS Cloud India', po: 'EXP-8812', due: '2026-07-01', amount: 78200 }
                        ].map((pay, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono text-[10px] text-slate-450">{pay.inv}</td>
                            <td className="p-4 font-bold text-slate-850">{pay.vendor}</td>
                            <td className="p-4 font-mono text-slate-400 text-[10px]">{pay.po}</td>
                            <td className="p-4 text-slate-500">{pay.due}</td>
                            <td className="p-4 text-center">
                              <button onClick={() => alert(`Disbursing money to ${pay.vendor}`)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-2.5 py-1 text-[9px] font-bold shadow-sm cursor-pointer">
                                Release Wire (₹{pay.amount.toLocaleString()})
                              </button>
                            </td>
                            <td className="p-4 text-right font-black text-slate-900">₹{pay.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REPORTS & ANALYTICS */}
          {activeSection === 'Reports & Analytics' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Enterprise Reports: {activeSubSection}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Analytic data aggregation, custom reporting layouts, and statistics summary.</p>
                </div>
                <button onClick={() => alert(`Exporting ${activeSubSection} as CSV/PDF`)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export Data
                </button>
              </div>

              {/* Data visualization placeholder widget */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-extrabold text-xs text-slate-850">Performance Timeline (Q2 2026)</h4>
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wide">Historical logs</span>
                </div>
                <div className="h-44 flex items-end gap-3.5 pt-6 justify-between max-w-lg mx-auto">
                  {[
                    { label: 'Jan', val: 40, color: 'bg-blue-400' },
                    { label: 'Feb', val: 55, color: 'bg-blue-500' },
                    { label: 'Mar', val: 48, color: 'bg-indigo-400' },
                    { label: 'Apr', val: 75, color: 'bg-indigo-500' },
                    { label: 'May', val: 92, color: 'bg-blue-600' },
                    { label: 'Jun', val: 110, color: 'bg-blue-700' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full relative bg-slate-100 rounded-lg h-36 flex items-end overflow-hidden">
                        <div className={`${bar.color} w-full rounded-t-md group-hover:opacity-90 transition-all duration-300`} style={{ height: `${(bar.val / 120) * 100}%` }} />
                      </div>
                      <span className="text-[9px] text-slate-450 font-bold uppercase">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-bold text-xs text-slate-800">Aggregate Summary Metrics</h4>
                  <div className="space-y-2.5 text-[10px] text-slate-650 pt-2 font-medium">
                    <p className="flex justify-between"><span>Revenue Realization Rate:</span> <strong className="text-emerald-700">92.4%</strong></p>
                    <p className="flex justify-between"><span>Year-on-Year Growth:</span> <strong className="text-slate-900">+18.4%</strong></p>
                    <p className="flex justify-between"><span>Average Client Ticket Size:</span> <strong className="text-slate-900">₹1,45,200</strong></p>
                    <p className="flex justify-between"><span>Operational Cost Ratio:</span> <strong className="text-slate-900">22.1%</strong></p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-bold text-xs text-slate-800">Report Metadata</h4>
                  <div className="space-y-2.5 text-[10px] text-slate-650 pt-2 font-medium">
                    <p className="flex justify-between"><span>Report Generator:</span> <strong className="text-slate-900">Automated Scheduler</strong></p>
                    <p className="flex justify-between"><span>Active Subsection Filter:</span> <strong className="text-blue-600 font-bold">{activeSubSection}</strong></p>
                    <p className="flex justify-between"><span>Last Batch Run:</span> <strong className="text-slate-900">2026-06-20 14:00</strong></p>
                    <p className="flex justify-between"><span>Data Source Integrity Check:</span> <strong className="text-emerald-700 font-bold">Verified OK</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MARKETING */}
          {activeSection === 'Marketing' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { title: 'Total Campaigns Scheduled', val: '24', detail: 'Across all vectors' },
                  { title: 'SLA Delivery rate', val: '99.2%', detail: 'API gateway verification' },
                  { title: 'Average Click-Through', val: '5.4%', detail: 'Industry Avg: 3.2%' },
                  { title: 'Estimated Leads Generated', val: '1,420', detail: 'Converted this quarter' }
                ].map((st, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block leading-none">{st.title}</span>
                    <strong className="text-lg font-black text-slate-850 mt-1 block leading-tight">{st.val}</strong>
                    <span className="text-[8px] text-slate-500 block mt-0.5 font-medium">{st.detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Campaign Dispatch Terminal ({activeSubSection})</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Publish templates, manage target groups, and monitor engagement dashboards.</p>
                </div>
                <button onClick={() => alert('Launching campaign design console')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow-md">
                  + Create New Campaign
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <th className="p-4">Campaign Title</th>
                      <th className="p-4">Target Audience Segment</th>
                      <th className="p-4">Delivery Rate</th>
                      <th className="p-4 text-center">Open Rate</th>
                      <th className="p-4 text-center">CTR</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                    {[
                      { title: 'Talentspark Chemicals Q3 Solvents launch', audience: 'All Organic Solvent buyers', delivered: '1,200/1,200', open: '34.2%', ctr: '6.1%', status: 'Sending' },
                      { title: 'Bulk Polymer Discount Reminder', audience: 'Dormant clients (90 days)', delivered: '450/450', open: '28.5%', ctr: '4.2%', status: 'Completed' },
                      { title: 'Import Brokerage compliance guidance info', audience: 'Logistics importers list', delivered: '800/800', open: '42.1%', ctr: '8.3%', status: 'Completed' },
                      { title: 'Refrigerated transit capability announcement', audience: 'Cold-chain category targets', delivered: '0/320', open: '0%', ctr: '0%', status: 'Draft' }
                    ].map((cmp, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold text-slate-800">{cmp.title}</td>
                        <td className="p-4 text-slate-500">{cmp.audience}</td>
                        <td className="p-4 text-slate-500">{cmp.delivered}</td>
                        <td className="p-4 text-center text-slate-600">{cmp.open}</td>
                        <td className="p-4 text-center text-slate-600">{cmp.ctr}</td>
                        <td className="p-4 text-right">
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                            cmp.status === 'Sending' ? 'bg-blue-50 text-blue-700 border border-blue-100 animate-pulse' :
                            cmp.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            'bg-slate-100 text-slate-600'
                          }`}>{cmp.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EMPLOYEE MANAGEMENT */}
          {activeSection === 'Employee Management' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              {activeSubSection === 'Employees' && (
                <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Directory & Access Roles</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage and track roles, performance metrics, and activity logs. Select a member card to view insights in the sidebar.</p>
                    </div>
                    <button
                      onClick={() => alert('New employee invite template requested.')}
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold shadow-md animate-bounce"
                    >
                      + Add Employee
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {teamMembers.map((member, i) => {
                      const isSelected = selectedMember?.name === member.name;
                      const statusColors: Record<string, string> = {
                        Active: 'bg-emerald-500',
                        'In Meeting': 'bg-amber-500',
                        'On Break': 'bg-slate-400'
                      };
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedMember(member)}
                          className={`w-full text-left bg-white border rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer block focus:outline-none ${
                            isSelected 
                              ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-blue-50/50' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg animate-pulse">
                              Selected
                            </div>
                          )}
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover shadow-sm border border-slate-100" />
                              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColors[member.status] || 'bg-slate-400'}`} />
                            </div>
                            <div className="text-xs min-w-0 flex-1">
                              <p className="font-extrabold text-slate-800 truncate">{member.name}</p>
                              <p className="text-[9px] text-slate-550 font-medium truncate">{member.role}</p>
                              <span className="text-[9px] bg-slate-100 text-slate-650 px-1.5 py-0.2 rounded mt-1 inline-block font-semibold">{member.region}</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-500 font-semibold">
                            <span>Status: <strong className="text-slate-700">{member.status}</strong></span>
                            <span className="text-blue-600 font-bold">{member.value} generated</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeSubSection === 'Roles & Permissions' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">RBAC Matrix Configuration</h3>
                    <p className="text-xs text-slate-500 mt-1">Configure functional page authorization flags based on internal directory categories.</p>
                  </div>
                  <div className="overflow-x-auto border-t border-slate-100 pt-3">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                          <th className="p-4">Functional Role</th>
                          <th className="p-4 text-center">Lead Manager</th>
                          <th className="p-4 text-center">Accounts Payable</th>
                          <th className="p-4 text-center">Inventory Stock control</th>
                          <th className="p-4 text-center">RBAC Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                        {[
                          { role: 'Administrator / Director', leads: true, payables: true, stock: true, admin: true },
                          { role: 'Accountant Manager', leads: false, payables: true, stock: false, admin: false },
                          { role: 'Logistics Supervisor', leads: false, payables: false, stock: true, admin: false },
                          { role: 'Sales Account Manager', leads: true, payables: false, stock: false, admin: false }
                        ].map((rb, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-bold text-slate-850">{rb.role}</td>
                            <td className="p-4 text-center">
                              <span className={`w-3.5 h-3.5 rounded-full inline-block ${rb.leads ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                            </td>
                            <td className="p-4 text-center">
                              <span className={`w-3.5 h-3.5 rounded-full inline-block ${rb.payables ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                            </td>
                            <td className="p-4 text-center">
                              <span className={`w-3.5 h-3.5 rounded-full inline-block ${rb.stock ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                            </td>
                            <td className="p-4 text-center">
                              <span className={`w-3.5 h-3.5 rounded-full inline-block ${rb.admin ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubSection === 'Attendance' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">Daily Punch In register</h3>
                    <p className="text-xs text-slate-500 mt-1">Real-time attendance checkpoints for corporate offices and warehouse facilities.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
                    {[
                      { name: 'Vijay Dev', status: 'On Time', punchIn: '08:58 AM', warehouse: 'Mumbai HQ' },
                      { name: 'Vikram Seth', status: 'On Leave', punchIn: 'N/A', warehouse: 'Out of Office' },
                      { name: 'Neha Sen', status: 'On Time', punchIn: '09:02 AM', warehouse: 'Kolkata WH-3' },
                      { name: 'Rahul Shah', status: 'Late (15 min)', punchIn: '09:20 AM', warehouse: 'Hyderabad WH-2' }
                    ].map((att, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-extrabold text-slate-800 text-xs">{att.name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${
                            att.status === 'On Time' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            att.status === 'On Leave' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                            'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>{att.status}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 space-y-0.5 pt-1.5 border-t border-slate-100">
                          <p>Punch-in: <strong>{att.punchIn}</strong></p>
                          <p>Location: <strong>{att.warehouse}</strong></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubSection === 'Activity Logs' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800">System Admin Audit Trail</h3>
                  <p className="text-xs text-slate-500 mt-1">Immutable session log tracing data modification events on inventory, payments, and client records.</p>
                  
                  <div className="space-y-3.5 border-t border-slate-100 pt-4 text-xs">
                    {[
                      { actor: 'admin@talentspark.com', action: 'Approved wire transfer PO-2026-004 to Reliance Petro', time: '14 mins ago', ip: '103.281.82.9' },
                      { actor: 'accounts@talentspark.com', action: 'Created draft tax invoice for Nexus Pharma', time: '3 hours ago', ip: '192.168.1.12' },
                      { actor: 'logistics_mumbai@talentspark.com', action: 'Initiated stock transfer from WH-1 to WH-2', time: '5 hours ago', ip: '103.111.45.22' }
                    ].map((log, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-slate-50 pb-3 last:border-0">
                        <div>
                          <strong className="text-slate-800 font-bold block">{log.action}</strong>
                          <span className="text-[9px] text-slate-400 block mt-0.5">IP Target: {log.ip} • Session actor: {log.actor}</span>
                        </div>
                        <span className="text-[9px] text-slate-450 italic font-bold">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TASKS & PROJECTS */}
          {activeSection === 'Tasks & Projects' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Operational Taskboard ({activeSubSection})</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Assign, complete, and review operational metrics across chemical logistics pipelines.</p>
                </div>
                <button onClick={() => alert('Adding task record')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-md">
                  + Create Project Task
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Urgent Backlog',
                    color: 'border-red-500',
                    items: [
                      { code: 'T-102', task: 'Review chemical purity safety batch Dow-9921', due: 'Today', owner: 'Neha Sen' },
                      { code: 'T-103', task: 'Verify tax compliance signature on Nexus Pharma invoice', due: 'Today', owner: 'Vijay Dev' }
                    ]
                  },
                  {
                    title: 'Active Work In Progress',
                    color: 'border-blue-600',
                    items: [
                      { code: 'T-104', task: 'Initiate transport clearance for Mumbai delivery truck', due: 'Tomorrow', owner: 'Rishi Patel' },
                      { code: 'T-105', task: 'Generate custom performance reports for board', due: 'In 2 days', owner: 'Vikram Seth' }
                    ]
                  },
                  {
                    title: 'Under Verification / Review',
                    color: 'border-amber-500',
                    items: [
                      { code: 'T-101', task: 'Reconcile HDFC wire accounts logs for Q1', due: 'Completed check', owner: 'Rahul Shah' }
                    ]
                  }
                ].map((col, i) => (
                  <div key={i} className={`bg-white border-t-2 ${col.color} border-x border-b border-slate-200 rounded-2xl p-5 shadow-sm space-y-4`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <h4 className="font-extrabold text-sm text-slate-800">{col.title}</h4>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{col.items.length}</span>
                    </div>

                    <div className="space-y-3.5">
                      {col.items.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2.5 hover:border-slate-350 transition-colors">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-slate-400 font-bold">{item.code}</span>
                            <span className="text-xs bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded font-bold">{item.due}</span>
                          </div>
                          <p className="text-sm font-extrabold text-slate-850 leading-relaxed">{item.task}</p>
                          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-bold">
                            <span>Owner: {item.owner}</span>
                            <button onClick={() => alert(`Task ${item.code} checked`)} className="text-blue-600 hover:underline">Complete →</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS & REWARDS */}
          {activeSection === 'Subscriptions & Rewards' && (
            <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
              
              {/* User Wallets */}
              {activeSubSection === 'User Wallets' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Customer Wallet & Balance Control</h3>
                      <p className="text-xs text-slate-500 mt-0.5">View and adjust user reward wallets, audit ledger transaction values.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Wallets List */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Active Wallets Table</h4>
                      <div className="overflow-x-auto border border-slate-100 rounded-xl">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-600 border-b border-slate-150 font-bold">
                              <th className="p-3">User ID</th>
                              <th className="p-3">Customer Name</th>
                              <th className="p-3">Segment</th>
                              <th className="p-3 text-right">Balance</th>
                              <th className="p-3 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {userWallets.map((wallet) => (
                              <tr key={wallet.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 font-mono text-[10px] text-slate-400 font-bold">{wallet.id}</td>
                                <td className="p-3 text-slate-900 font-bold">{wallet.name}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                                    wallet.segment === 'Premium VIP' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                                    wallet.segment === 'Active Partner' ? 'bg-blue-50 text-blue-650 border border-blue-200' :
                                    wallet.segment === 'Churn Risk' ? 'bg-red-50 text-red-600 border border-red-200' :
                                    'bg-slate-50 text-slate-600 border border-slate-200'
                                  }`}>
                                    {wallet.segment}
                                  </span>
                                </td>
                                <td className="p-3 text-right font-black text-slate-900">₹{wallet.balance}</td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      setSelectedWalletUser(wallet.id);
                                    }}
                                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                                      selectedWalletUser === wallet.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    Adjust
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Balance Adjuster Form */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Adjust Selected Wallet</h4>
                      
                      {(() => {
                        const activeWallet = userWallets.find(w => w.id === selectedWalletUser);
                        if (!activeWallet) return <p className="text-xs text-slate-400 italic">Select a user to adjust balance.</p>;
                        return (
                          <form onSubmit={handleAdjustWallet} className="space-y-4 text-xs">
                            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">Selected Customer</span>
                              <strong className="text-sm font-bold text-slate-800 block">{activeWallet.name}</strong>
                              <span className="text-xs text-slate-500 block">Current Balance: <strong className="text-slate-950 font-extrabold">₹{activeWallet.balance}</strong></span>
                            </div>

                            <div className="space-y-1">
                              <label className="font-bold text-slate-700">Adjustment Type</label>
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => setWalletAdjustType('credit')}
                                  className={`py-2 rounded-xl font-bold border transition-all ${
                                    walletAdjustType === 'credit'
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-350 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  Credit (+)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setWalletAdjustType('debit')}
                                  className={`py-2 rounded-xl font-bold border transition-all ${
                                    walletAdjustType === 'debit'
                                      ? 'bg-red-50 text-red-600 border-red-350 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  Debit (-)
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="font-bold text-slate-700">Amount (₹)</label>
                              <input
                                type="number"
                                required
                                min="1"
                                value={walletAdjustAmount}
                                onChange={(e) => setWalletAdjustAmount(e.target.value)}
                                placeholder="e.g. 250"
                                className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-bold text-slate-700">Adjustment Reason</label>
                              <input
                                type="text"
                                required
                                value={walletAdjustReason}
                                onChange={(e) => setWalletAdjustReason(e.target.value)}
                                placeholder="e.g. Goodwill gesture bonus"
                                className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                              />
                            </div>

                            <button
                              type="submit"
                              className={`w-full py-2.5 rounded-xl font-bold text-white shadow-md transition-colors ${
                                walletAdjustType === 'credit'
                                  ? 'bg-emerald-600 hover:bg-emerald-500'
                                  : 'bg-red-600 hover:bg-red-500'
                              }`}
                            >
                              Apply Adjustment
                            </button>
                          </form>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Plans */}
              {activeSubSection === 'Subscription Plans' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">VIP Subscription Configuration</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Control pricing tiers, custom loyalty cashback rates, and special shipping options.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingPlanId(null);
                        setSubForm({ name: '', price: '', cashback: '5', shipping: 'Free Priority' });
                        setShowSubModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3.5 py-2 text-xs font-bold shadow-md"
                    >
                      + Create Subscription Tier
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {subscriptionPlans.map((plan) => (
                      <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-350 transition-colors flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono text-slate-400 font-bold">{plan.id}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPlanId(plan.id);
                                  setSubForm({
                                    name: plan.name,
                                    price: plan.price.toString(),
                                    cashback: plan.cashback.toString(),
                                    shipping: plan.shipping
                                  });
                                  setShowSubModal(true);
                                }}
                                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                                title="Edit subscription plan"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-lg">
                                {plan.subscribers} Subs
                              </span>
                            </div>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 mt-2">{plan.name}</h4>
                          <div className="mt-3.5 border-t border-slate-50 pt-3 space-y-2 text-xs text-slate-600">
                            <div className="flex justify-between">
                              <span>Monthly Cost</span>
                              <strong className="text-slate-900">₹{plan.price}/mo</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Earn Rate</span>
                              <strong className="text-emerald-600">{plan.cashback}% Cashback</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping Perk</span>
                              <strong className="text-slate-900 truncate max-w-[120px]" title={plan.shipping}>{plan.shipping}</strong>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`Active subscriptions count: ${plan.subscribers} customers`)}
                          className="w-full mt-4 py-2 border border-slate-150 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all"
                        >
                          Auditing Subscribers
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Subscriptions */}
              {activeSubSection === 'User Subscriptions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Customer Memberships Audit Ledger</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Audit customer VIP tiers, billing status, renewal schedules, and apply admin overrides.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subscriber Directory</h4>
                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 border-b border-slate-150 font-bold">
                            <th className="p-3">Ref ID</th>
                            <th className="p-3">Customer Account</th>
                            <th className="p-3">Active Tier</th>
                            <th className="p-3">Renewal Date</th>
                            <th className="p-3">Cost Rate</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions / Admin Overrides</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                          {customerSubscriptions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 font-mono text-[10px] text-slate-400 font-bold">{sub.id}</td>
                              <td className="p-3 text-slate-900 font-bold">{sub.name}</td>
                              <td className="p-3">
                                <span className={`px-2.5 py-0.5 text-[9px] rounded font-extrabold ${
                                  sub.tier === 'Platinum VIP' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                  sub.tier === 'Gold Elite' ? 'bg-amber-50 text-amber-600 border border-amber-250' :
                                  sub.tier === 'Silver Pro' ? 'bg-blue-50 text-blue-650 border border-blue-200' :
                                  'bg-slate-50 text-slate-600 border border-slate-200'
                                }`}>
                                  {sub.tier}
                                </span>
                              </td>
                              <td className="p-3 text-slate-500 font-mono text-[10px]">{sub.renewalDate}</td>
                              <td className="p-3 font-bold text-slate-900">₹{sub.price}/mo</td>
                              <td className="p-3 text-center">
                                <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                                  sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {sub.status}
                                </span>
                              </td>
                              <td className="p-3 text-center flex justify-center items-center gap-2">
                                <select
                                  value={sub.tier}
                                  onChange={(e) => {
                                    const nextTier = e.target.value;
                                    const matchedPlan = subscriptionPlans.find(p => p.name === nextTier);
                                    const nextPrice = matchedPlan ? matchedPlan.price : 0;
                                    
                                    setCustomerSubscriptions(prev => prev.map(item => {
                                      if (item.id === sub.id) {
                                        return { ...item, tier: nextTier, price: nextPrice };
                                      }
                                      return item;
                                    }));
                                    addActivity(`Admin modified subscription tier for ${sub.name} to ${nextTier}`, 'payment');
                                    alert(`Successfully updated subscription tier for ${sub.name} to ${nextTier}`);
                                  }}
                                  className="border border-slate-200 bg-white text-slate-800 rounded px-2 py-1 text-[10px] focus:outline-none"
                                >
                                  {subscriptionPlans.map(p => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomerSubscriptions(prev => prev.map(item => {
                                      if (item.id === sub.id) {
                                        const nextStatus = item.status === 'Active' ? 'Cancelled' : 'Active';
                                        return { ...item, status: nextStatus };
                                      }
                                      return item;
                                    }));
                                    const nextAct = sub.status === 'Active' ? 'cancelled' : 're-activated';
                                    addActivity(`Admin ${nextAct} subscription for ${sub.name}`, 'payment');
                                  }}
                                  className={`px-2 py-1 text-[10px] font-bold rounded ${
                                    sub.status === 'Active'
                                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
                                  }`}
                                >
                                  {sub.status === 'Active' ? 'Cancel' : 'Activate'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Coupons & Promos */}
              {activeSubSection === 'Coupons & Promos' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Coupon Code Management</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Generate, audit, and activate/deactivate promotional codes for wallet rewards.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coupons Ledger */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Promotional Codes Ledger</h4>
                      <div className="overflow-x-auto border border-slate-100 rounded-xl">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-600 border-b border-slate-150 font-bold">
                              <th className="p-3">Coupon Code</th>
                              <th className="p-3">Reward Value</th>
                              <th className="p-3">Expiry Date</th>
                              <th className="p-3 text-center">Redemptions</th>
                              <th className="p-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {coupons.map((c) => (
                              <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 font-mono font-bold text-slate-900">{c.code}</td>
                                <td className="p-3 font-extrabold text-emerald-600">₹{c.reward} Wallet Bal</td>
                                <td className="p-3 text-slate-500">{c.expiry}</td>
                                <td className="p-3 text-center font-bold text-slate-700">{c.redemptions}</td>
                                <td className="p-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCoupons(prev => prev.map(item => {
                                        if (item.code === c.code) {
                                          const nextStatus = item.status === 'Active' ? 'Inactive' : 'Active';
                                          addActivity(`Coupon code status changed: ${c.code} is now ${nextStatus}`, 'payment');
                                          return { ...item, status: nextStatus };
                                        }
                                        return item;
                                      }));
                                    }}
                                    className={`px-2.5 py-0.5 text-[9px] rounded font-bold border transition-all ${
                                      c.status === 'Active'
                                        ? 'bg-emerald-50 text-emerald-655 border-emerald-250 hover:bg-emerald-100'
                                        : 'bg-slate-50 text-slate-455 border-slate-255 hover:bg-slate-100'
                                    }`}
                                  >
                                    {c.status}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Generator Form */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Generate Promo Coupon</h4>
                      <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Coupon Code</label>
                          <input
                            type="text"
                            required
                            value={couponForm.code}
                            onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                            placeholder="e.g. MONSOON300"
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Wallet Bonus Value (₹)</label>
                          <input
                            type="number"
                            required
                            min="10"
                            value={couponForm.reward}
                            onChange={(e) => setCouponForm({ ...couponForm, reward: e.target.value })}
                            placeholder="e.g. 300"
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Expiry Date</label>
                          <input
                            type="date"
                            required
                            value={couponForm.expiry}
                            onChange={(e) => setCouponForm({ ...couponForm, expiry: e.target.value })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Initial Status</label>
                          <select
                            value={couponForm.status}
                            onChange={(e) => setCouponForm({ ...couponForm, status: e.target.value })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md transition-colors"
                        >
                          Generate Code
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Reward Policies */}
              {activeSubSection === 'Reward Policies' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Reward Policy & Conversion Settings</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Fine-tune signup credits, purchase cashback multiplier, and points valuation.</p>
                    </div>
                  </div>

                  <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSaveRewardConfig} className="space-y-5 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Default Purchase Cashback (%)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            value={rewardConfig.cashbackRate}
                            onChange={(e) => setRewardConfig({ ...rewardConfig, cashbackRate: parseInt(e.target.value) || 0 })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Welcome Signup Bonus (points)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={rewardConfig.welcomeBonus}
                            onChange={(e) => setRewardConfig({ ...rewardConfig, welcomeBonus: parseInt(e.target.value) || 0 })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Referral Bounty Bonus (points)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={rewardConfig.referralBonus}
                            onChange={(e) => setRewardConfig({ ...rewardConfig, referralBonus: parseInt(e.target.value) || 0 })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">1 Reward Point Value (in INR)</label>
                          <input
                            type="number"
                            required
                            min="0.1"
                            step="0.1"
                            value={rewardConfig.pointValueInInr}
                            onChange={(e) => setRewardConfig({ ...rewardConfig, pointValueInInr: parseFloat(e.target.value) || 1 })}
                            className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 py-2 font-bold shadow-md transition-colors"
                        >
                          Save Policies Configurations
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* 3. STICKY RIGHT SIDEBAR */}
        <aside className="w-64 h-screen sticky top-0 bg-white border-l border-slate-200 p-5 flex flex-col gap-6 overflow-y-auto flex-shrink-0 z-20">
          
          {selectedMember ? (
            <div className="space-y-4 animate-[fadeIn_0.25s_ease-out]">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="text-[10px] uppercase font-black text-blue-600 tracking-wider">Member Profile Insights</h4>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="text-[9px] hover:bg-slate-100 rounded px-2 py-1 text-slate-400 hover:text-slate-700 font-bold border border-slate-200 transition-colors"
                >
                  ✕ Close
                </button>
              </div>
              
              <div className="text-center space-y-2.5 pb-2">
                <div className="relative inline-block">
                  <img src={selectedMember.avatar} alt={selectedMember.name} className="h-16 w-16 rounded-full object-cover mx-auto shadow-md border border-slate-150" />
                  <span className={`absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    selectedMember.status === 'Active' ? 'bg-emerald-500' : selectedMember.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-800 leading-snug">{selectedMember.name}</h5>
                  <p className="text-[10px] text-slate-500 font-semibold">{selectedMember.role}</p>
                </div>
                <div className="flex justify-center gap-1.5">
                  <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5 font-bold uppercase">{selectedMember.badge}</span>
                  <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-100 rounded px-2 py-0.5 font-bold">★ {selectedMember.rating}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3 leading-relaxed">
                <p className="font-semibold text-slate-700 mb-1">Professional Bio</p>
                <p className="italic">"{selectedMember.bio}"</p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3.5 text-slate-600 font-medium">
                <p className="flex justify-between"><span>Status:</span> <strong className="text-slate-900">{selectedMember.status}</strong></p>
                <p className="flex justify-between"><span>Region Territory:</span> <strong className="text-slate-900">{selectedMember.region}</strong></p>
                <p className="flex justify-between"><span>Performance Score:</span> <strong className="text-emerald-700 font-extrabold">{selectedMember.performance}</strong></p>
                <p className="flex justify-between"><span>Deals Closed:</span> <strong className="text-slate-900">{selectedMember.deals} deals</strong></p>
                <p className="flex justify-between"><span>Sales Revenue:</span> <strong className="text-blue-600">{selectedMember.value}</strong></p>
                <p className="flex justify-between"><span>Quota Target:</span> <strong className="text-slate-900">{selectedMember.target}</strong></p>
                <p className="flex justify-between"><span>Active Leads:</span> <strong className="text-slate-900">{selectedMember.activeLeads} leads</strong></p>
                <p className="flex justify-between"><span>Phone Connect:</span> <strong className="text-slate-900 font-mono text-[10px]">{selectedMember.phone}</strong></p>
                <p className="flex justify-between"><span>Email Address:</span> <strong className="text-slate-900 truncate max-w-[120px] font-mono text-[10px]" title={selectedMember.email}>{selectedMember.email}</strong></p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-450 block">Target Progress</span>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${selectedMember.progress}%` }} />
                </div>
                <p className="text-[9px] text-slate-500 text-right">{selectedMember.progress}% Target met</p>
              </div>

              {selectedMember.recentDeals && selectedMember.recentDeals.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-455 block">Recent Deals</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedMember.recentDeals.map((dl: string, dIdx: number) => (
                      <span key={dIdx} className="text-[9px] bg-slate-100 text-slate-655 px-2 py-0.5 rounded-lg border border-slate-200/60 font-semibold">{dl}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => alert(`Broadcasting message request directly to ${selectedMember.name}`)}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-2 font-bold text-[11px] hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                >
                  Ping Member
                </button>
                <button
                  onClick={() => window.open(`mailto:${selectedMember.email}`)}
                  className="px-3 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl py-2 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Send Email"
                >
                  ✉
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-blue-600 tracking-wider mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveSection('Sales');
                      setActiveSubSection('Quotations');
                    }}
                    className="p-3 bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700 rounded-xl font-bold text-left transition-colors"
                  >
                    + Create Quote
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection('Billing & Invoices');
                      setActiveSubSection('All Invoices');
                    }}
                    className="p-3 bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700 rounded-xl font-bold text-left transition-colors"
                  >
                    + Build Invoice
                  </button>
                  <button
                    onClick={() => setShowLeadModal(true)}
                    className="p-3 bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700 rounded-xl font-bold text-left transition-colors col-span-2"
                  >
                    + Capture Lead Profile
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-455 tracking-wider mb-3">Today's Tasks</h4>
                <div className="space-y-2.5">
                  {tasks.filter(t => t.stage === 'My Tasks' && !t.done).map(t => (
                    <label key={t.id} className="flex items-start gap-2.5 text-xs text-slate-655 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => handleTaskCheck(t.id)}
                        className="mt-0.5 rounded border-slate-300 bg-white text-blue-600 focus:ring-0"
                      />
                      <span>{t.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-455 tracking-wider mb-3">Recent Notifications</h4>
                <div className="space-y-2 text-xs">
                  {activities.slice(0, 3).map(act => (
                    <div key={act.id} className="flex gap-2 text-slate-550 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <p className="leading-snug">{act.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>

      </div>

      {/* LEAD MODAL */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-800">Capture Lead Profile Form</h3>
              <button
                onClick={() => setShowLeadModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  required
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  placeholder="e.g. Sun Pharma Distrib"
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={leadForm.contact}
                  onChange={(e) => setLeadForm({ ...leadForm, contact: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lead Value (₹)</label>
                  <input
                    type="number"
                    value={leadForm.value}
                    onChange={(e) => setLeadForm({ ...leadForm, value: e.target.value })}
                    className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Stage</label>
                  <select
                    value={leadForm.stage}
                    onChange={(e) => setLeadForm({ ...leadForm, stage: e.target.value as any })}
                    className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="flex-1 border border-slate-200 rounded-xl py-2 text-slate-655"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2 font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBSCRIPTION PLAN MODAL */}
      {showSubModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-800">{editingPlanId ? 'Edit Subscription Plan' : 'Create Subscription Plan'}</h3>
              <button
                onClick={() => setShowSubModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubscriptionPlan} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Plan Name</label>
                <input
                  type="text"
                  required
                  value={subForm.name}
                  onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                  placeholder="e.g. Diamond Elite"
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Monthly Price (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={subForm.price}
                  onChange={(e) => setSubForm({ ...subForm, price: e.target.value })}
                  placeholder="e.g. 799"
                  className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Cashback Earning (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={subForm.cashback}
                    onChange={(e) => setSubForm({ ...subForm, cashback: e.target.value })}
                    className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Shipping Perk</label>
                  <select
                    value={subForm.shipping}
                    onChange={(e) => setSubForm({ ...subForm, shipping: e.target.value })}
                    className="w-full border border-slate-200 bg-white text-slate-800 rounded-xl px-3 py-2"
                  >
                    <option value="Standard (Charged)">Standard (Charged)</option>
                    <option value="Free over ₹500">Free over ₹500</option>
                    <option value="Free Priority">Free Priority</option>
                    <option value="Free Instant">Free Instant</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSubModal(false)}
                  className="flex-1 border border-slate-200 rounded-xl py-2 text-slate-655"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2 font-bold"
                >
                  {editingPlanId ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ORDER DETAIL MODAL */}
      {showOrderDetailModal && selectedOrderDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span>Order Details:</span>
                  <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{selectedOrderDetails.id}</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Complete fulfillment parameters, vendor info, and status overrides</p>
              </div>
              <button
                onClick={() => {
                  setShowOrderDetailModal(false);
                  setSelectedOrderDetails(null);
                }}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-slate-600">
              {/* Grid info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Customer Client</span>
                  <p className="font-extrabold text-sm text-slate-800">{selectedOrderDetails.customer}</p>
                  <span className="text-[9px] block text-slate-400 font-semibold mt-1">B2B Distribution Account</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Vendor Partner</span>
                  <p className="font-extrabold text-sm text-slate-800">{selectedOrderDetails.vendor}</p>
                  <span className="text-[9px] block text-slate-400 font-semibold mt-1">Apex Chem, MedLife, or Hindustan</span>
                </div>
              </div>

              {/* Order Parameters */}
              <div className="border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-100">
                <div className="flex justify-between items-center p-3">
                  <span className="font-bold text-slate-700">Date Issued</span>
                  <span className="font-mono text-slate-800">{selectedOrderDetails.date}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <span className="font-bold text-slate-700">Estimated Delivery SLA</span>
                  <span className="font-semibold text-slate-800">Within 7-10 Days (Standard)</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <span className="font-bold text-slate-700">Total Purchase Value</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹{selectedOrderDetails.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50/20">
                  <span className="font-bold text-slate-850">Fulfillment Status</span>
                  
                  {/* Status Dropdown to Edit status */}
                  <select
                    value={selectedOrderDetails.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as any;
                      updateOrderStatus(selectedOrderDetails.id, nextStatus);
                      setSelectedOrderDetails({ ...selectedOrderDetails, status: nextStatus });
                      addActivity(`Admin changed Order ${selectedOrderDetails.id} status to ${nextStatus}`, 'order');
                    }}
                    className="border border-slate-200 bg-white text-slate-800 rounded-lg px-3 py-1 font-bold focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Logistics tracking info */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[9px]">Fulfillment Logistics</h4>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 block font-bold">Courier Routing / Waybill</span>
                    <span className="font-mono font-bold text-slate-700">WAYBILL-{selectedOrderDetails.id}-IND</span>
                  </div>
                  <span className="text-[10px] bg-slate-200/60 font-bold px-2 py-0.5 rounded text-slate-650">BlueDart Ground</span>
                </div>
              </div>

              <div className="flex pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowOrderDetailModal(false);
                    setSelectedOrderDetails(null);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white rounded-xl py-3 font-bold shadow-md transition-all cursor-pointer"
                >
                  Close Detailed View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
