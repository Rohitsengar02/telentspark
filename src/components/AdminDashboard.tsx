'use client';

import React, { useState, useEffect } from 'react';
import { useAppState, CRMLead, Order, InventoryItem, Warehouse } from '@/store/state';
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
          {activeSection === 'Sales' && (
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
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Sales Orders Ledger</h3>
                      <p className="text-xs text-slate-500 mt-1">Track warehouse shipping distributions, courier routing, and dispatch schedules.</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">4 Active Orders</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                    {[
                      { id: 'SO-901', client: 'Global Distribs', date: '2026-06-20', items: 'Silica Powder x100bags', warehouse: 'Mumbai WH-1', status: 'Dispatched', tracking: 'BLUEDART-8821' },
                      { id: 'SO-902', client: 'Nexus Pharma', date: '2026-06-19', items: 'Stearic Acid x40drums', warehouse: 'Hyderabad WH-2', status: 'Processing', tracking: 'Pending Dispatch' },
                      { id: 'SO-903', client: 'Alpha Traders', date: '2026-06-18', items: 'Industrial Ethanol x20drums', warehouse: 'Kolkata WH-3', status: 'Delivered', tracking: 'DELIVERED-091A' },
                      { id: 'SO-904', client: 'Lotus Laboratories', date: '2026-06-15', items: 'Premium Grade Silica x5bags', warehouse: 'Chennai WH-4', status: 'Dispatched', tracking: 'DELIVERY-BY-ROAD' }
                    ].map((ord) => (
                      <div key={ord.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-slate-350 transition-colors space-y-3.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-bold">{ord.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            ord.status === 'Delivered' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : ord.status === 'Dispatched'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100 animate-pulse'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>{ord.status}</span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-sm text-slate-800">{ord.client}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold">{ord.items}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 text-[10px] text-slate-600 font-medium">
                          <div>
                            <span>Logistics Hub</span>
                            <p className="font-bold text-slate-850 mt-0.5">{ord.warehouse}</p>
                          </div>
                          <div>
                            <span>Tracking/Waybill</span>
                            <p className="font-bold text-slate-850 mt-0.5">{ord.tracking}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
                      <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-64 group">
                        <div className="relative h-24 w-full bg-slate-100 flex-shrink-0">
                          <img 
                            src={idx % 2 === 0 ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80'} 
                            alt={item.name} 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                          <span className="absolute bottom-2 left-4 text-[9px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-bold">{item.sku}</span>
                        </div>

                        <div className="px-5 pt-3 pb-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-800 truncate">{item.name}</h4>
                            <p className="text-[9px] text-slate-450 uppercase font-bold mt-0.5">{item.category}</p>
                            <div className="mt-2.5 flex justify-between text-[10px] text-slate-600 font-medium">
                              <span>Available Stock:</span>
                              <strong className={`font-bold ${item.stock < 20 ? 'text-red-600' : 'text-slate-800'}`}>{item.stock} units</strong>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-3 text-xs">
                            <strong className="text-blue-600 text-sm font-black">₹{item.price.toLocaleString()}</strong>
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
    </div>
  );
}
