import { create } from 'zustand';

export type UserRole = 'admin' | 'stockist' | 'vendor';

export interface Order {
  id: string;
  customer: string;
  vendor: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Processing' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface CRMLead {
  id: string;
  company: string;
  value: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won';
  contact: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  gst: number;
  stock: number;
  reserved: number;
  price: number;
  batch: string;
  expiry: string;
  discount?: number; // discount percentage
  image?: string; // product image URL
}

export interface Warehouse {
  id: string;
  name: string;
  capacity: number; // in units
  used: number;
  racks: {
    rackId: string;
    shelfId: string;
    productName: string;
    qty: number;
  }[];
}

export interface NotificationLog {
  id: string;
  channel: 'WhatsApp' | 'SMS' | 'Email' | 'Push';
  recipient: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
}

export interface ActivityFeed {
  id: string;
  type: 'order' | 'invoice' | 'payment' | 'vendor' | 'return';
  message: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;

  
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  
  crmLeads: CRMLead[];
  updateLeadStage: (id: string, stage: CRMLead['stage']) => void;
  addLead: (lead: Omit<CRMLead, 'id'>) => void;
  
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, newStock: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  updateProductDiscount: (id: string, discount: number) => void;
  
  warehouses: Warehouse[];
  
  notifications: NotificationLog[];
  addNotification: (notification: Omit<NotificationLog, 'id' | 'timestamp'>) => void;
  
  activities: ActivityFeed[];
  addActivity: (message: string, type: ActivityFeed['type']) => void;
  
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
}

const initialOrders: Order[] = [
  { id: 'ORD-8942', customer: 'Global Distribs', vendor: 'Apex Chem Co', amount: 345000, status: 'Approved', date: '2026-06-19' },
  { id: 'ORD-8943', customer: 'Nexus Pharma', vendor: 'MedLife Ltd', amount: 125000, status: 'Pending', date: '2026-06-19' },
  { id: 'ORD-8944', customer: 'Alpha Traders', vendor: 'Apex Chem Co', amount: 489000, status: 'Processing', date: '2026-06-18' },
  { id: 'ORD-8945', customer: 'Vanguard Retail', vendor: 'Hindustan Inc', amount: 78000, status: 'Delivered', date: '2026-06-17' },
  { id: 'ORD-8946', customer: 'Zenith Logistics', vendor: 'MedLife Ltd', amount: 208000, status: 'Cancelled', date: '2026-06-16' },
  { id: 'ORD-8947', customer: 'Saraswati Agencies', vendor: 'Hindustan Inc', amount: 195000, status: 'Pending', date: '2026-06-15' },
];

const initialLeads: CRMLead[] = [
  { id: 'LD-101', company: 'Sun Pharma Distrib', value: 850000, stage: 'Lead', contact: 'Ramesh Sharma' },
  { id: 'LD-102', company: 'Jupiter Agri Foods', value: 1200000, stage: 'Qualified', contact: 'Anita Desai' },
  { id: 'LD-103', company: 'Tata Logistics Corp', value: 4500000, stage: 'Proposal', contact: 'Vijay Kadam' },
  { id: 'LD-104', company: 'Reliance Retail Sub', value: 2300000, stage: 'Negotiation', contact: 'Priya Iyer' },
  { id: 'LD-105', company: 'Kirloskar Dist', value: 650000, stage: 'Won', contact: 'Suresh Patel' },
];

const initialInventory: InventoryItem[] = [
  { id: 'PROD-001', name: 'Premium Grade Silica', sku: 'SIL-PREM-50', category: 'Chemicals', gst: 18, stock: 1200, reserved: 350, price: 450, batch: 'B-SIL23', expiry: '2028-12-31', discount: 10, image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=400&auto=format&fit=crop&q=60' },
  { id: 'PROD-002', name: 'High-Density Polymer Beads', sku: 'POLY-HD-100', category: 'Plastics', gst: 18, stock: 850, reserved: 120, price: 620, batch: 'B-POL99', expiry: '2029-06-15', discount: 5, image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&auto=format&fit=crop&q=60' },
  { id: 'PROD-003', name: 'Pure Stearic Acid Powder', sku: 'STE-ACID-25', category: 'Chemicals', gst: 12, stock: 2450, reserved: 800, price: 180, batch: 'B-STE45', expiry: '2027-10-20', discount: 12, image: 'https://images.unsplash.com/photo-1628164673634-03fa40858b9d?w=400&auto=format&fit=crop&q=60' },
  { id: 'PROD-004', name: 'Industrial Ethanol 99%', sku: 'ETH-IND-200', category: 'Solvents', gst: 18, stock: 4500, reserved: 1500, price: 340, batch: 'B-ETH11', expiry: '2030-01-01', discount: 8, image: 'https://images.unsplash.com/photo-1603123853880-a92fafb7809f?w=400&auto=format&fit=crop&q=60' },
  { id: 'PROD-005', name: 'Almond Carrier Oil Extra', sku: 'OIL-ALM-10', category: 'Organics', gst: 5, stock: 320, reserved: 50, price: 1250, batch: 'B-OIL55', expiry: '2027-04-12', discount: 15, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=60' },
];

const initialWarehouses: Warehouse[] = [
  {
    id: 'WH-A',
    name: 'Mumbai Central Warehouse',
    capacity: 10000,
    used: 7200,
    racks: [
      { rackId: 'Rack-01', shelfId: 'Shelf-01', productName: 'Premium Grade Silica', qty: 350 },
      { rackId: 'Rack-01', shelfId: 'Shelf-02', productName: 'Pure Stearic Acid Powder', qty: 800 },
      { rackId: 'Rack-02', shelfId: 'Shelf-01', productName: 'Industrial Ethanol 99%', qty: 1500 },
      { rackId: 'Rack-03', shelfId: 'Shelf-03', productName: 'Almond Carrier Oil Extra', qty: 270 },
    ],
  },
  {
    id: 'WH-B',
    name: 'Delhi NCR Logistics Hub',
    capacity: 8000,
    used: 4800,
    racks: [
      { rackId: 'Rack-01', shelfId: 'Shelf-01', productName: 'High-Density Polymer Beads', qty: 730 },
      { rackId: 'Rack-02', shelfId: 'Shelf-02', productName: 'Pure Stearic Acid Powder', qty: 1200 },
      { rackId: 'Rack-03', shelfId: 'Shelf-01', productName: 'Industrial Ethanol 99%', qty: 2000 },
    ],
  },
  {
    id: 'WH-C',
    name: 'Chennai Port Storage',
    capacity: 12000,
    used: 9100,
    racks: [
      { rackId: 'Rack-01', shelfId: 'Shelf-01', productName: 'Premium Grade Silica', qty: 850 },
      { rackId: 'Rack-02', shelfId: 'Shelf-01', productName: 'Industrial Ethanol 99%', qty: 1000 },
      { rackId: 'Rack-02', shelfId: 'Shelf-02', productName: 'High-Density Polymer Beads', qty: 120 },
      { rackId: 'Rack-03', shelfId: 'Shelf-01', productName: 'Pure Stearic Acid Powder', qty: 450 },
    ],
  },
];

const initialNotifications: NotificationLog[] = [
  { id: 'NT-001', channel: 'WhatsApp', recipient: '+91 98765 43210', message: 'Order ORD-8942 has been approved by Admin.', status: 'sent', timestamp: '12:05 PM' },
  { id: 'NT-002', channel: 'SMS', recipient: '+91 87654 32109', message: 'Low Stock Alert: Industrial Ethanol 99% is below threshold.', status: 'sent', timestamp: '11:42 AM' },
  { id: 'NT-003', channel: 'Email', recipient: 'vendor.apex@chemco.com', message: 'New Purchase order dispatch request generated.', status: 'sent', timestamp: '10:15 AM' },
  { id: 'NT-004', channel: 'Push', recipient: 'Super Stockist Portal', message: 'Alert: Pending Dispatch order count reached 15.', status: 'sent', timestamp: '09:00 AM' },
];

const initialActivities: ActivityFeed[] = [
  { id: 'ACT-001', type: 'order', message: 'New Order Received from Nexus Pharma (₹1,25,000)', timestamp: 'Just now' },
  { id: 'ACT-002', type: 'invoice', message: 'Invoice Generated for ORD-8942', timestamp: '5 mins ago' },
  { id: 'ACT-003', type: 'payment', message: 'Payment Success from Alpha Traders (₹4,89,000)', timestamp: '12 mins ago' },
  { id: 'ACT-004', type: 'vendor', message: 'Vendor Apex Chem Co updated dispatch status to "Dispatched"', timestamp: '24 mins ago' },
  { id: 'ACT-05', type: 'return', message: 'Return Request received for batch B-SIL23 (damaged packaging)', timestamp: '1 hour ago' },
];

const initialChatMessages: ChatMessage[] = [
  { id: 'CM-001', sender: 'assistant', text: 'Welcome to Talentspark AI Command Center. I have scanned the warehouse and recent sales. How can I help you today?', timestamp: '12:14 PM' },
];

export const useAppState = create<AppState>((set) => ({
  role: 'admin',
  setRole: (role) => set({ role }),
  isAuthenticated: false,
  login: (role) => set({ role, isAuthenticated: true, activeTab: 'Dashboard' }),
  logout: () => set({ isAuthenticated: false, role: 'admin', activeTab: 'Dashboard' }),

  
  activeTab: 'Dashboard',
  setActiveTab: (activeTab) => set({ activeTab }),
  
  orders: initialOrders,
  updateOrderStatus: (id, status) => set((state) => {
    const updatedOrders = state.orders.map((o) => o.id === id ? { ...o, status } : o);
    const order = state.orders.find((o) => o.id === id);
    let message = '';
    if (order) {
      message = `Order ${id} status updated to ${status}`;
    }
    return {
      orders: updatedOrders,
      activities: message ? [{ id: Math.random().toString(), type: 'order', message, timestamp: 'Just now' }, ...state.activities] : state.activities
    };
  }),
  addOrder: (order) => set((state) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    return {
      orders: [newOrder, ...state.orders],
      activities: [{ id: Math.random().toString(), type: 'order', message: `New Order Created: ${newOrder.id} for ₹${newOrder.amount.toLocaleString('en-IN')}`, timestamp: 'Just now' }, ...state.activities]
    };
  }),
  
  crmLeads: initialLeads,
  updateLeadStage: (id, stage) => set((state) => ({
    crmLeads: state.crmLeads.map((l) => l.id === id ? { ...l, stage } : l)
  })),
  addLead: (lead) => set((state) => ({
    crmLeads: [{ ...lead, id: `LD-${Math.floor(106 + Math.random() * 105)}` }, ...state.crmLeads]
  })),
  
  inventory: initialInventory,
  updateInventoryStock: (id, newStock) => set((state) => ({
    inventory: state.inventory.map((item) => item.id === id ? { ...item, stock: newStock } : item)
  })),
  addInventoryItem: (item) => set((state) => ({
    inventory: [{ ...item, id: `PROD-${Math.floor(100 + Math.random() * 900)}` }, ...state.inventory]
  })),
  updateInventoryItem: (id, updatedFields) => set((state) => ({
    inventory: state.inventory.map((item) => item.id === id ? { ...item, ...updatedFields } : item)
  })),
  updateProductDiscount: (id, discount) => set((state) => ({
    inventory: state.inventory.map((item) => item.id === id ? { ...item, discount } : item)
  })),
  
  warehouses: initialWarehouses,
  
  notifications: initialNotifications,
  addNotification: (notification) => set((state) => ({
    notifications: [{ ...notification, id: `NT-${Math.floor(100 + Math.random() * 900)}`, timestamp: 'Just now' }, ...state.notifications]
  })),
  
  activities: initialActivities,
  addActivity: (message, type) => set((state) => ({
    activities: [{ id: Math.random().toString(), message, type, timestamp: 'Just now' }, ...state.activities]
  })),
  
  chatMessages: initialChatMessages,
  sendChatMessage: (text) => set((state) => {
    const userMsg: ChatMessage = { id: Math.random().toString(), sender: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    // Simulate AI Forecast / prediction response based on prompt text
    let responseText = "I've checked the ledger and inventory. Let me run the optimization algorithms. Do you need a sales forecast report?";
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('forecast') || lowerText.includes('predict') || lowerText.includes('demand')) {
      responseText = "AI Prediction model run completed. Expected demand for Premium Grade Silica will spike by 24% next month. Recommendation: Increase Delhi WH capacity reserve by 150 units.";
    } else if (lowerText.includes('stock') || lowerText.includes('inventory')) {
      responseText = "Currently, Industrial Ethanol 99% is our highest inventory value (₹15,30,000). 3 batches of Pure Stearic Acid are nearing expiry in October 2027. Recommend pushing to Vendors.";
    } else if (lowerText.includes('sales') || lowerText.includes('revenue')) {
      responseText = "Sales forecast: Q3 projected revenue is ₹42,50,000 based on the current order rate (+18.4% YoY). Peak order distribution is concentrated around Maharashtra & Gujarat.";
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      responseText = "Hello! I am your SaaS B2B AI Assistant. Ask me about: Demand Forecasts, Stock Alerts, Sales Predictions, or Warehouse Optimization.";
    }

    const aiMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return {
      chatMessages: [...state.chatMessages, userMsg, aiMsg]
    };
  })
}));
