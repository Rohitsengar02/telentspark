'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState, UserRole } from '@/store/state';
import { 
  Phone, 
  Search, 
  Heart, 
  ShoppingCart, 
  GitCompare, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  Star, 
  Clock, 
  Truck, 
  CreditCard, 
  HelpCircle,
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ThumbsUp, 
  Headphones, 
  ChevronLeft,
  X,
  User,
  Activity,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle,
  RefreshCw,
  ShoppingBag,
  Share2,
  Trash2,
  MapPin,
  Check,
  CreditCard as CardIcon
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  img: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  gallery: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export default function LandingPage() {
  const { login } = useAppState();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // E-commerce Views: 'home' | 'categories' | 'shop' | 'product-detail' | 'checkout' | 'thank-you' | 'orders' | 'wishlist' | 'category-detail'
  const [view, setView] = useState<'home' | 'categories' | 'shop' | 'product-detail' | 'checkout' | 'thank-you' | 'orders' | 'wishlist' | 'category-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [detailTab, setDetailTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [detailQty, setDetailQty] = useState(1);
  const [detailMainImage, setDetailMainImage] = useState('');

  // Cart & Wishlist & Orders State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Checkout Wizard States
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [paymentCardName, setPaymentCardName] = useState('');
  const [paymentCardNumber, setPaymentCardNumber] = useState('');
  const [paymentCardExpiry, setPaymentCardExpiry] = useState('');
  const [paymentCardCVV, setPaymentCardCVV] = useState('');
  const [placedOrderInfo, setPlacedOrderInfo] = useState<Order | null>(null);

  // Scroll Refs and Bundle States for Product Detail Page
  const relatedScrollRef = useRef<HTMLDivElement>(null);
  const sponsoredScrollRef = useRef<HTMLDivElement>(null);
  const [includeBundleItem1, setIncludeBundleItem1] = useState(true);
  const [includeBundleItem2, setIncludeBundleItem2] = useState(true);

  useEffect(() => {
    setIncludeBundleItem1(true);
    setIncludeBundleItem2(true);
  }, [selectedProduct]);

  // Filtering states for Shop and Categories
  const [shopFilterBrand, setShopFilterBrand] = useState<string>('All');
  const [shopFilterPrice, setShopFilterPrice] = useState<number>(1000);
  const [shopFilterRating, setShopFilterRating] = useState<number>(0);
  const [shopSortOrder, setShopSortOrder] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Countdown timer for Flash Deals
  const [timeLeft, setTimeLeft] = useState({ days: 965, hours: 5, minutes: 28, seconds: 25 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      subtitle: "BEST CHOICE OF THE YEAR",
      title: "HIGH-END PHONE",
      desc: "RAM 6-256GB / Full Accessories",
      bg: "bg-emerald-700",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    },
    {
      subtitle: "NEW SEASON ARRIVALS",
      title: "SMART HOME HUB",
      desc: "Connect your space seamlessly",
      bg: "bg-teal-800",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // Auth Portal details
  const triggerLogin = (role: UserRole) => {
    login(role);
  };

  const roleThemes = {
    admin: {
      name: 'Super Admin Portal',
      desc: 'Master orchestration, analytics, reports, and CRM control panel.',
      bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
      logoColor: 'text-blue-600',
      btnColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 text-white',
      email: 'admin@talentspark.com',
      avatarText: 'Get access to your administrative control center.',
    },
    stockist: {
      name: 'Stockist Hub',
      desc: 'Track warehouse inventory mapping, products, and incoming shipments.',
      bgGradient: 'from-purple-600 via-violet-650 to-pink-600',
      logoColor: 'text-purple-600',
      btnColor: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20 text-white',
      email: 'stockist@talentspark.com',
      avatarText: 'Monitor layouts, racks, and inventories instantly.',
    },
    vendor: {
      name: 'Vendor Console',
      desc: 'Fulfill customer orders, update dispatch logs, and monitor invoices.',
      bgGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      logoColor: 'text-emerald-600',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 text-white',
      email: 'vendor@talentspark.com',
      avatarText: 'Update orders, status levels, and invoices.',
    }
  };

  // Expanded Product Dataset to 21 Unique Items
  const productsDataset: Product[] = useMemo(() => [
    {
      id: 'p1',
      title: 'Apple 12.9" iPad Pro (Mid 2017, 512GB, Wi-Fi + 4G LTE, Gold) 2019',
      category: 'Laptop & Ipad',
      brand: 'Apple',
      price: 260.00,
      oldPrice: 362.00,
      rating: 5,
      reviewsCount: 32,
      badge: '-35%',
      img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80',
      description: 'The Apple iPad Pro delivers immersive experiences with its Retina display and A10X Fusion chip.',
      specifications: { 'Screen Size': '12.9 inches', 'Storage': '512 GB', 'Connectivity': 'Wi-Fi + 4G' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p2',
      title: 'Bluetooth Portable Speaker Waterproof 2019',
      category: 'Speaker & Audio',
      brand: 'Sony',
      price: 120.00,
      oldPrice: 185.00,
      rating: 4,
      reviewsCount: 15,
      badge: '-35%',
      img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80',
      description: 'Waterproof portable bluetooth speaker with deep clear signature bass.',
      specifications: { 'Battery Life': '24 Hours', 'Waterproof': 'IPX7' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p3',
      title: 'Samsung Galaxy S10 128 GB Midnight Blue',
      category: 'Smart Phones & Tablets',
      brand: 'Samsung',
      price: 260.00,
      oldPrice: 399.00,
      rating: 5,
      reviewsCount: 45,
      badge: 'HOT',
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      description: 'Premium flagship smartphone with dynamic AMOLED cinematic display.',
      specifications: { 'Storage': '128 GB', 'RAM': '8 GB' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p4',
      title: 'Minecraft Creeper Xbox 360 Console Special Edition',
      category: 'Computer & Desktop',
      brand: 'Microsoft',
      price: 320.00,
      oldPrice: 380.00,
      rating: 4,
      reviewsCount: 22,
      badge: 'NEW',
      img: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=400&q=80',
      description: 'Exclusive custom green console block structure with built-in sounds.',
      specifications: { 'Console Type': 'Xbox 360', 'Edition': 'Minecraft' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p5',
      title: 'Battery Fan, EasyAcc Rechargeable Desk Fan with LG Battery',
      category: 'Home & Kitchen',
      brand: 'EasyAcc',
      price: 45.00,
      oldPrice: 62.00,
      rating: 4,
      reviewsCount: 8,
      badge: '-15%',
      img: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=400&q=80',
      description: 'Compact personal portable desktop cooling fan with long life rechargeable battery.',
      specifications: { 'Battery Capacity': '2600mAh', 'Speed Levels': '3 speeds' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p6',
      title: 'Herschel Mochila Heritage Backpack Grey 10011-00006',
      category: 'Clothing & Fashion',
      brand: 'Herschel',
      price: 85.00,
      rating: 5,
      reviewsCount: 19,
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
      description: 'Classic backpack layout featuring Herschel signature striped fabric liner.',
      specifications: { 'Capacity': '21.5L', 'Material': 'Polyester' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p7',
      title: 'Monkey Portrait 40X56 cm Wall Painting Modern Canvas Art',
      category: 'Furniture & Decor',
      brand: 'Artisan',
      price: 55.00,
      oldPrice: 75.00,
      rating: 4,
      reviewsCount: 6,
      badge: '-25%',
      img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      description: 'Printed HD oil paint finish portrait on canvas sheet fabric.',
      specifications: { 'Dimensions': '40 x 56 cm', 'Frame': 'Unframed' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p8',
      title: 'Apple Watch Series 3 (GPS) Con Caja De 38 mm Aluminio',
      category: 'Smart Watch',
      brand: 'Apple',
      price: 199.00,
      rating: 5,
      reviewsCount: 54,
      badge: 'POPULAR',
      img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
      description: 'Tracks activity, heartbeat trends, and text notifications.',
      specifications: { 'Model': 'Series 3', 'Size': '38 mm' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p9',
      title: 'HP 8300 Elite Small Form Factor Desktop PC Intel Core i5',
      category: 'Computer & Desktop',
      brand: 'HP',
      price: 240.00,
      oldPrice: 320.00,
      rating: 4,
      reviewsCount: 11,
      badge: '-25%',
      img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      description: 'Compact business-class desktop computer featuring powerful Core i5 processing.',
      specifications: { 'Processor': 'Intel Core i5', 'RAM': '8 GB' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p10',
      title: 'Canon EOS Rebel T7 DSLR Camera Bundle',
      category: 'Cameras & Photography',
      brand: 'Canon',
      price: 449.00,
      oldPrice: 549.00,
      rating: 5,
      reviewsCount: 18,
      badge: 'PROMO',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
      description: 'Complete photography bundle with 18-55mm lens and high speed recording cards.',
      specifications: { 'Resolution': '24.1 MP', 'Sensor': 'APS-C CMOS' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p11',
      title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
      category: 'Speaker & Audio',
      brand: 'Sony',
      price: 348.00,
      rating: 5,
      reviewsCount: 120,
      badge: 'TOP',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      description: 'Industry leading active noise cancelling with dual microphones and Alexa control.',
      specifications: { 'Battery Life': '30 Hours', 'Weight': '254g' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p12',
      title: 'Apple MacBook Air 13" M1 Chip 256GB SSD',
      category: 'Laptop & Ipad',
      brand: 'Apple',
      price: 999.00,
      rating: 5,
      reviewsCount: 88,
      badge: 'BEST',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      description: 'Supercharged thin notebook with Apple M1 chip architecture.',
      specifications: { 'Processor': 'Apple M1', 'RAM': '8 GB', 'Storage': '256 GB SSD' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p13',
      title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
      category: 'Home & Kitchen',
      brand: 'Instant Pot',
      price: 89.00,
      oldPrice: 119.00,
      rating: 4,
      reviewsCount: 62,
      img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80',
      description: 'Multi-functional cooker cooks rice, steams, sautés, and warms food instantly.',
      specifications: { 'Capacity': '6 Quarts', 'Power': '1000W' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p14',
      title: 'Ergonomic Office Chair with Adjustable Lumbar Support',
      category: 'Furniture & Decor',
      brand: 'Steelcase',
      price: 189.00,
      oldPrice: 249.00,
      rating: 4,
      reviewsCount: 14,
      badge: '-25%',
      img: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=400&q=80',
      description: 'Breathable mesh back support office chair with gas lift height adjusts.',
      specifications: { 'Material': 'Mesh & Nylon', 'Max Weight': '300 lbs' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p15',
      title: 'Garmin Fenix 6 Pro Multisport GPS Watch',
      category: 'Smart Watch',
      brand: 'Garmin',
      price: 499.00,
      rating: 5,
      reviewsCount: 23,
      badge: 'ROBUST',
      img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80',
      description: 'Rugged GPS watch mapping maps, music tracks, and altitude gauges.',
      specifications: { 'GPS': 'GLONASS / Galileo', 'Battery': 'Up to 14 Days' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p16',
      title: 'Nintendo Switch Console Joy-Con Neon Blue/Red',
      category: 'Computer & Desktop',
      brand: 'Nintendo',
      price: 299.00,
      rating: 5,
      reviewsCount: 94,
      badge: 'SALE',
      img: 'https://images.unsplash.com/photo-1507457379470-08b800676767?auto=format&fit=crop&w=400&q=80',
      description: 'Play at home on the TV or on-the-go with handheld console capabilities.',
      specifications: { 'Screen Size': '6.2 inches', 'Storage': '32 GB' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1507457379470-08b800676767?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p17',
      title: 'Nike Air Max 270 Sneakers Black/White',
      category: 'Clothing & Fashion',
      brand: 'Nike',
      price: 150.00,
      rating: 5,
      reviewsCount: 38,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      description: 'Air Max heel unit delivers comfort you can feel in every step.',
      specifications: { 'Sole': 'Rubber Air Sole', 'Material': 'Mesh' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p18',
      title: 'Premium Leather Travel Duffle Bag',
      category: 'Clothing & Fashion',
      brand: 'LeatherCo',
      price: 135.00,
      oldPrice: 165.00,
      rating: 4,
      reviewsCount: 9,
      badge: 'CLASSIC',
      img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=400&q=80',
      description: 'Handcrafted full-grain leather overnight bag with adjustable shoulder strap.',
      specifications: { 'Length': '22 inches', 'Leather Type': 'Full Grain' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p19',
      title: 'GoPro HERO 8 Black Action Camera 4K',
      category: 'Cameras & Photography',
      brand: 'GoPro',
      price: 299.00,
      oldPrice: 349.00,
      rating: 5,
      reviewsCount: 42,
      badge: '-15%',
      img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80',
      description: 'Hypersmooth 2.0 stabilization for stable videos, waterproof design.',
      specifications: { 'Resolution': '4K Video', 'Waterproof': '33 ft' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p20',
      title: 'Dell 27" 4K UHD IPS UltraSharp Monitor',
      category: 'Computer & Desktop',
      brand: 'Dell',
      price: 399.00,
      rating: 5,
      reviewsCount: 31,
      badge: '4K IPS',
      img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
      description: 'Brilliant 4K UHD resolution display with 99% sRGB color coverage.',
      specifications: { 'Panel': 'IPS Panel', 'Aspect Ratio': '16:9' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80']
    },
    {
      id: 'p21',
      title: 'Logitech MX Master 3S Wireless Ergonomic Mouse',
      category: 'Computer & Desktop',
      brand: 'Logitech',
      price: 99.00,
      rating: 5,
      reviewsCount: 156,
      badge: 'BESTSELLER',
      img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80',
      description: 'Tactile quiet click scroll wheel wireless mouse for productivity.',
      specifications: { 'DPI': '8000 DPI', 'Battery': 'Up to 70 Days' } as Record<string, string>,
      inStock: true,
      gallery: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80']
    }
  ], []);

  // Random array shuffler function
  const shuffledProducts = useMemo(() => {
    return [...productsDataset].sort(() => 0.5 - Math.random());
  }, [productsDataset]);

  // Filtered products list based on selections with randomized fallback
  const filteredProducts = useMemo(() => {
    const list = productsDataset.filter(product => {
      const matchBrand = shopFilterBrand === 'All' || product.brand === shopFilterBrand;
      const matchPrice = product.price <= shopFilterPrice;
      const matchRating = product.rating >= shopFilterRating;
      const matchSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchPrice && matchRating && matchSearch;
    });
    // Shuffle the final list for randomized shop display as requested
    const shuffled = [...list].sort(() => 0.5 - Math.random());

    if (shopSortOrder === 'low-high') return shuffled.sort((a, b) => a.price - b.price);
    if (shopSortOrder === 'high-low') return shuffled.sort((a, b) => b.price - a.price);
    if (shopSortOrder === 'rating') return shuffled.sort((a, b) => b.rating - a.rating);
    return shuffled;
  }, [productsDataset, shopFilterBrand, shopFilterPrice, shopFilterRating, shopSortOrder, searchQuery]);

  // Filtered products list specifically for category-detail view
  const categoryFilteredProducts = useMemo(() => {
    const list = productsDataset.filter(product => {
      const matchCategory = product.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                            selectedCategory.toLowerCase().includes(product.category.toLowerCase());
      const matchBrand = shopFilterBrand === 'All' || product.brand === shopFilterBrand;
      const matchPrice = product.price <= shopFilterPrice;
      const matchRating = product.rating >= shopFilterRating;
      return matchCategory && matchBrand && matchPrice && matchRating;
    });
    // Shuffle lists for dynamic catalog feel
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    if (shopSortOrder === 'low-high') return shuffled.sort((a, b) => a.price - b.price);
    if (shopSortOrder === 'high-low') return shuffled.sort((a, b) => b.price - a.price);
    if (shopSortOrder === 'rating') return shuffled.sort((a, b) => b.rating - a.rating);
    return shuffled;
  }, [productsDataset, selectedCategory, shopFilterBrand, shopFilterPrice, shopFilterRating, shopSortOrder]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: string, newQty: number) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQty } : item));
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  // Computations for Product Detail Page Carousels & Vendor Info
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return productsDataset
      .filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.brand === selectedProduct.brand))
      .slice(0, 8);
  }, [selectedProduct, productsDataset]);

  const sponsoredProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return productsDataset
      .filter(p => p.id !== selectedProduct.id && p.rating >= 4)
      .slice(8, 16);
  }, [selectedProduct, productsDataset]);

  const bundleProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return productsDataset
      .filter(p => p.id !== selectedProduct.id)
      .slice(0, 2);
  }, [selectedProduct, productsDataset]);

  // Geolocation Handler
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setShippingAddress(`Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setShippingCity("Resolved via GPS");
        setLocating(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your current location. Simulating coordinate map lookup instead.");
        setCoords({ lat: 40.7128, lng: -74.0060 });
        setShippingAddress("Simulated Location: 350 5th Ave");
        setShippingCity("New York");
        setLocating(false);
      }
    );
  };

  // Submit Order Action
  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `AMR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cartTotal + 15,
      shippingAddress: `${shippingAddress}, ${shippingCity}`,
      paymentMethod: 'Sandbox Credit Card',
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    setPlacedOrderInfo(newOrder);
    setCart([]);
    setView('thank-you');
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailMainImage(product.img);
    setDetailQty(1);
    setDetailTab('desc');
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setView('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setView('home');
  };

  // Shared Product Card Component (image on top, then content below image)
  const ProductCard = ({ product }: { product: Product }) => {
    const isWished = wishlist.some(item => item.id === product.id);
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-yellow-500 hover:shadow-lg transition-all relative group h-full">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded z-10">
            {product.badge}
          </span>
        )}
        
        {/* Wishlist Indicator Button */}
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-1.5 rounded-full border transition-all z-10 bg-white cursor-pointer ${isWished ? 'text-red-500 border-red-200' : 'text-slate-400 border-slate-100 hover:text-red-500'}`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* 1. Image on TOP */}
        <div className="flex justify-center mb-4 overflow-hidden rounded-lg relative aspect-square bg-slate-50 p-2">
          <img 
            src={product.img} 
            alt={product.title} 
            className="max-h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => viewProductDetails(product)}
          />
        </div>
        
        {/* 2. Content DOWN to image */}
        <div className="space-y-2 flex-grow flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-[9px] text-slate-400 font-bold uppercase">{product.category}</p>
            <h4 
              onClick={() => viewProductDetails(product)}
              className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-yellow-500 cursor-pointer min-h-[32px]"
            >
              {product.title}
            </h4>
            
            <div className="flex items-center gap-0.5">
              {[...Array(product.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-[9px] text-slate-400 font-medium ml-1">({product.reviewsCount})</span>
            </div>

            <div className="flex items-baseline gap-1.5 pt-1">
              <span className="text-sm font-black text-slate-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && <span className="text-[10px] text-slate-455 line-through font-medium">${product.oldPrice.toFixed(2)}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
            <button 
              onClick={() => addToCart(product)}
              className="py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-[10px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Cart
            </button>
            <button 
              onClick={() => viewProductDetails(product)}
              className="py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
            >
              Specs
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-yellow-500 selection:text-slate-900">
      
      {/* SECTION 1: HEADER & NAVBAR */}
      {/* 1.1 Top Bar */}
      <div className="bg-white border-b border-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-500">Welcome to Worldwide Electronics Store</p>
          <div className="flex items-center gap-4 text-slate-600">
            <button onClick={() => setShowPortalModal(true)} className="hover:text-yellow-500 transition-colors cursor-pointer">My Account</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => setView('wishlist')} className="hover:text-yellow-500 transition-colors cursor-pointer font-semibold">Wishlist ({wishlist.length})</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => setShowPortalModal(true)} className="hover:text-yellow-500 transition-colors font-bold text-slate-800 cursor-pointer">Register or Sign in</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => setView('orders')} className="hover:text-yellow-500 transition-colors cursor-pointer">My Orders ({orders.length})</button>
          </div>
        </div>
      </div>

      {/* 1.2 Main Header */}
      <header className="bg-white py-6 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
            <span className="text-3xl font-black tracking-tighter text-slate-900">
              AMERA<span className="text-yellow-500">.</span>
            </span>
          </div>

          {/* Hotline */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="text-slate-400 font-medium">Hotline Free</p>
              <p className="font-bold text-slate-800">06-900-6789-00</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-xl flex items-center border-2 border-yellow-500 rounded-lg bg-white relative">
            <div className="relative">
              <button 
                onClick={() => setShowCatDropdown(!showCatDropdown)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border-r border-slate-200 hover:bg-slate-100 flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                {searchCategory} <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              {showCatDropdown && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 min-w-[160px] text-xs">
                  {['All Categories', 'Tablets & Ipad', 'Speaker & Audio', 'Smart Phones & Tablets', 'Computer & Desktop', 'Home & Kitchen'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSearchCategory(cat);
                        setShowCatDropdown(false);
                        if (cat !== 'All Categories') {
                          setSearchQuery(cat);
                        } else {
                          setSearchQuery('');
                        }
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <input 
              type="text" 
              placeholder="Search entire store here..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs focus:outline-none text-slate-800"
            />
            <button 
              onClick={() => setView('shop')}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 text-xs font-bold transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Header Action Badges */}
          <div className="flex items-center gap-5 text-slate-700">
            <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors">
              <div className="relative">
                <GitCompare className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-950 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">0</span>
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Compare</span>
            </div>

            <div onClick={() => setView('wishlist')} className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors">
              <div className="relative">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-950 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">{wishlist.length}</span>
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Favorites</span>
            </div>

            <div onClick={() => setCartOpen(true)} className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-955 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">{cart.length}</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] text-slate-400 uppercase font-bold leading-none">Your Cart</p>
                <p className="text-xs font-bold text-slate-800 leading-normal">${cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 1.3 Nav & Navigation links */}
      <nav className="bg-white border-b border-slate-100 py-3.5 px-4 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-xs font-bold text-slate-700">
            <button onClick={handleLogoClick} className={`hover:text-yellow-500 transition-colors cursor-pointer ${view === 'home' ? 'text-yellow-500 font-bold' : ''}`}>Home</button>
            <button onClick={() => setView('shop')} className={`hover:text-yellow-500 transition-colors cursor-pointer ${view === 'shop' ? 'text-yellow-500 font-bold' : ''}`}>Shop Catalog</button>
            <button onClick={() => setView('categories')} className={`hover:text-yellow-500 transition-colors cursor-pointer ${view === 'categories' ? 'text-yellow-500 font-bold' : ''}`}>Categories</button>
            <button onClick={() => setView('wishlist')} className={`hover:text-yellow-500 transition-colors cursor-pointer ${view === 'wishlist' ? 'text-yellow-500 font-bold' : ''}`}>Wishlist</button>
            <button onClick={() => setView('orders')} className={`hover:text-yellow-500 transition-colors cursor-pointer ${view === 'orders' ? 'text-yellow-500 font-bold' : ''}`}>Orders Page</button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-500 transition-colors">
              <span>US Dollar</span> <ChevronDown className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-yellow-500 transition-colors">
              <span>🇬🇧 English</span> <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </nav>

      {/* VIEW CONDITIONAL RENDERING */}
      {view === 'home' && (
        <>
          {/* SECTION 2: HERO & SIDEBAR */}
          <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Sidebar - Shop By Department */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hidden lg:block">
              <div className="bg-slate-900 text-white px-4 py-3.5 font-bold text-xs uppercase flex items-center gap-2">
                <Menu className="w-4 h-4" />
                Shop By Department
              </div>
              <div className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {[
                  'Computer & Desktop',
                  'Laptop & Ipad',
                  'Cameras & Photography',
                  'Smart Phones & Tablets',
                  'Home & Kitchen',
                  'Sport & Outdoors',
                  'Health & Beauty',
                  'Toys & Hobbies',
                  'Jewelry & Watches',
                  'Watches & Eyewear'
                ].map((cat, idx) => (
                  <button 
                    key={cat} 
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-55 transition-colors cursor-pointer text-left ${idx === 1 ? 'text-yellow-600 bg-yellow-50/30' : ''}`}
                  >
                    {cat}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
                <button onClick={() => setView('categories')} className="w-full flex items-center gap-1 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-500 font-bold cursor-pointer">
                  + More Categories
                </button>
              </div>
            </div>

            {/* Right Slider / Hero Banner */}
            <div className="lg:col-span-3 rounded-xl overflow-hidden relative min-h-[380px] sm:min-h-[440px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${heroSlides[currentHeroSlide].bg} flex items-center p-8 sm:p-12`}
                >
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full z-10">
                    <div className="text-white space-y-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider">
                        {heroSlides[currentHeroSlide].subtitle}
                      </span>
                      <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
                        {heroSlides[currentHeroSlide].title}
                      </h1>
                      <p className="text-sm text-white/80 font-medium max-w-xs">
                        {heroSlides[currentHeroSlide].desc}
                      </p>
                      <button 
                        onClick={() => setView('shop')}
                        className="px-6 py-3 bg-white text-slate-900 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors shadow-lg active:scale-95 duration-150 cursor-pointer"
                      >
                        DISCOVER NOW
                      </button>
                    </div>
                    
                    <div className="flex justify-center relative">
                      <div className="w-56 h-56 rounded-full bg-white/10 absolute blur-3xl" />
                      <img 
                        src={heroSlides[currentHeroSlide].img} 
                        alt={heroSlides[currentHeroSlide].title}
                        className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentHeroSlide === idx ? 'bg-white w-6' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>

          </section>

          {/* SECTION 3: KEY FEATURES BAR */}
          <section className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              {[
                { icon: Truck, title: "FREE DELIVERY", desc: "For all orders over $120" },
                { icon: CreditCard, title: "SAFE PAYMENT", desc: "100% secure payment" },
                { icon: ShieldCheck, title: "SHOP WITH CONFIDENCE", desc: "If goods have problems" },
                { icon: Headphones, title: "24/7 HELP CENTER", desc: "Dedicated 24/7 support" },
                { icon: ThumbsUp, title: "FRIENDLY SERVICES", desc: "30 day satisfaction guarantee" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 px-2 py-1">
                  <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: TRIPLE PROMO BANNERS GRID */}
          <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Banner 1 */}
            <div className="rounded-xl p-6 bg-slate-900 text-white relative overflow-hidden min-h-[180px] flex flex-col justify-between group shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-0" />
              <div className="space-y-1 z-10">
                <h3 className="text-base font-black tracking-tight leading-snug max-w-[200px]">
                  Smartphone Bestseller Products 2019
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">Price: $298.99</p>
              </div>
              <button onClick={() => setView('shop')} className="text-xs font-bold underline hover:text-yellow-300 transition-colors text-left z-10 cursor-pointer">
                Pre - Order Now
              </button>
            </div>

            {/* Banner 2 */}
            <div className="rounded-xl p-6 bg-slate-900 text-white relative overflow-hidden min-h-[180px] flex flex-col justify-between group shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-0" />
              <div className="space-y-1 z-10">
                <h3 className="text-base font-black tracking-tight leading-snug max-w-[200px]">
                  Big Sale 30% Trending Camera 2019
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">Price: $99.97</p>
              </div>
              <button onClick={() => setView('shop')} className="text-xs font-bold underline hover:text-yellow-300 transition-colors text-left z-10 cursor-pointer">
                Pre - Order Now
              </button>
            </div>

            {/* Banner 3 */}
            <div className="rounded-xl p-6 bg-slate-900 text-white relative overflow-hidden min-h-[180px] flex flex-col justify-between group shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-900/40 to-transparent z-0" />
              <div className="space-y-1 z-10">
                <h3 className="text-base font-black tracking-tight leading-snug max-w-[200px]">
                  Top Sale Fresh Orange Juice
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">Price: $26.99</p>
              </div>
              <button onClick={() => setView('shop')} className="text-xs font-bold underline hover:text-yellow-300 transition-colors text-left z-10 cursor-pointer">
                Pre - Order Now
              </button>
            </div>

          </section>

          {/* SECTION 5: TOP CATEGORIES OF THE MONTH */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              Top Categories <span className="text-slate-400 font-normal text-sm">Of The Month</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Speaker & Audio", count: "25 items", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=150&q=80" },
                { name: "Furniture & Decor", count: "14 items", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=150&q=80" },
                { name: "Backpacks & Bags", count: "12 items", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80" },
                { name: "Smart Watch", count: "18 items", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=150&q=80" },
                { name: "Tablets & Ipad", count: "22 items", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=150&q=80" },
                { name: "Smart Phones & Tablets", count: "30 items", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80" },
                { name: "Gamepad", count: "12 items", img: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=150&q=80" },
                { name: "Accessories", count: "16 items", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=150&q=80" },
                { name: "Television & Audio", count: "25 items", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=150&q=80" },
                { name: "Clothing & Fashion", count: "28 items", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80" }
              ].map((cat, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-yellow-500 hover:shadow-md transition-all group cursor-pointer" onClick={() => handleCategoryClick(cat.name)}>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-yellow-600 transition-colors">{cat.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cat.count}</p>
                    <button className="text-[10px] text-slate-500 font-bold hover:underline mt-4 block">
                      Shop Now
                    </button>
                  </div>
                  <img src={cat.img} alt={cat.name} className="w-14 h-14 object-cover rounded-lg bg-slate-50" />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: TOP FLASH DEALS */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200 pb-3">
              <h2 className="text-lg font-extrabold text-slate-800">
                Top Flash <span className="text-yellow-600 font-black">Deals</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Active Featured Deal Card */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm relative hover:border-yellow-500 transition-colors">
                <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">-35%</span>
                
                <img 
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" 
                  alt="Apple iPad Pro"
                  className="w-48 h-48 object-cover rounded-lg cursor-pointer"
                  onClick={() => viewProductDetails(productsDataset[0])}
                />
                
                <div className="space-y-3 w-full">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Audio Speakers</p>
                  <h3 
                    onClick={() => viewProductDetails(productsDataset[0])}
                    className="text-sm font-extrabold text-slate-800 leading-snug hover:text-yellow-500 cursor-pointer"
                  >
                    Apple 12.9" iPad Pro (Mid 2017, 512GB, Wi-Fi + 4G LTE, Gold) 2019
                  </h3>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-900">$260.00</span>
                    <span className="text-xs text-slate-400 line-through font-medium">$362.00</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Consuetudium lectorum mirum est notare quam littera gothica, quam nunc putamus parum claram...
                  </p>

                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-slate-700 mb-2 uppercase">Hurry Up! Offer Ends in:</p>
                    <div className="flex gap-2">
                      {[
                        { val: timeLeft.days, label: "Days" },
                        { val: timeLeft.hours, label: "Hours" },
                        { val: timeLeft.minutes, label: "Mins" },
                        { val: timeLeft.seconds, label: "Secs" }
                      ].map((unit, uIdx) => (
                        <div key={uIdx} className="bg-slate-100 rounded-lg px-2.5 py-1.5 text-center min-w-[50px]">
                          <span className="block text-xs font-black text-slate-800 font-mono">{String(unit.val).padStart(2, '0')}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">{unit.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right deals list (3 products) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {shuffledProducts.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>
          </section>

          {/* SECTION 7: DOUBLE PROMO BANNERS */}
          <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Banner 1 */}
            <div className="rounded-xl p-6 bg-slate-950 text-white relative overflow-hidden min-h-[140px] flex flex-col justify-between group shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565538810844-1e1194826c86?auto=format&fit=crop&w=600&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-0" />
              <div className="space-y-1 z-10">
                <h3 className="text-base font-black tracking-tight leading-snug max-w-[220px]">
                  Top Trending 2019 Lighting & Furniture Products
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">Price: $32.99</p>
              </div>
              <button onClick={() => setView('shop')} className="text-xs font-bold underline hover:text-yellow-300 transition-colors text-left z-10 cursor-pointer">
                Pre - Order Now
              </button>
            </div>

            {/* Banner 2 */}
            <div className="rounded-xl p-6 bg-slate-955 text-white relative overflow-hidden min-h-[140px] flex flex-col justify-between group shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-0" />
              <div className="space-y-1 z-10">
                <h3 className="text-base font-black tracking-tight leading-snug max-w-[220px]">
                  Big Sale Off Top Home Accessories
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">Price: $198.99</p>
              </div>
              <button onClick={() => setView('shop')} className="text-xs font-bold underline hover:text-yellow-300 transition-colors text-left z-10 cursor-pointer">
                Pre - Order Now
              </button>
            </div>

          </section>

          {/* SECTION 8: CATEGORY PRODUCTS GRID (COMPUTER & DESKTOP) */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200 pb-3">
              <h2 className="text-lg font-extrabold text-slate-800">
                Computer & Desktop <span className="text-slate-400 font-normal text-sm">Products</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Feature Box */}
              <div className="lg:col-span-3 bg-blue-600 rounded-xl p-6 text-white flex flex-col justify-between min-h-[340px] relative overflow-hidden group shadow-sm bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-blue-900/30 to-transparent z-0" />
                <div className="z-10">
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Gaming 4K</span>
                  <h3 className="text-xl font-black mt-2 leading-tight">Desktop & Case</h3>
                  <p className="text-xs text-blue-100 mt-1">Free Shipping Over $30</p>
                </div>
              </div>

              {/* Right Product Grid */}
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {shuffledProducts.slice(3, 9).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>
          </section>

          {/* SECTION 9: TRENDING ELECTRONICS CAROUSEL */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80')" }} />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Trending Now</span>
                  <h3 className="text-2xl font-black mt-1">Hottest Gadgets of the Season</h3>
                </div>
                <button onClick={() => setView('shop')} className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold rounded-lg text-xs transition-all flex items-center gap-2 shadow-lg cursor-pointer">
                  Shop Trending <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {shuffledProducts.slice(8, 12).map((p) => (
                  <div key={p.id} className="bg-slate-800/80 border border-slate-700/50 backdrop-blur-md rounded-xl p-4 flex flex-col justify-between hover:border-yellow-400/50 transition-all group">
                    <div>
                      <img src={p.img} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                      <h4 onClick={() => viewProductDetails(p)} className="text-xs font-bold text-white line-clamp-2 hover:text-yellow-400 cursor-pointer">{p.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{p.brand}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs font-black text-yellow-400">${p.price.toFixed(2)}</span>
                      <button onClick={() => viewProductDetails(p)} className="text-[10px] bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded font-bold transition-colors cursor-pointer">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10: BEST SELLERS LIST GRID */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-lg font-extrabold text-slate-800 mb-6">
              Best Sellers <span className="text-slate-400 font-normal text-sm">Rankings</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Top Smartphones", items: shuffledProducts.slice(0, 3) },
                { title: "Top Audio & Music", items: shuffledProducts.slice(3, 6) },
                { title: "Top Accessories", items: shuffledProducts.slice(6, 9) }
              ].map((column, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 uppercase tracking-wider">{column.title}</h3>
                  <div className="space-y-4">
                    {column.items.map((item, itemIdx) => (
                      <div key={item.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => viewProductDetails(item)}>
                        <span className="text-base font-black text-slate-300 group-hover:text-yellow-500 w-6">#{itemIdx + 1}</span>
                        <img src={item.img} alt={item.title} className="w-12 h-12 object-cover rounded-lg bg-slate-50 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-850 line-clamp-1 group-hover:text-yellow-600 transition-colors">{item.title}</h4>
                          <span className="text-xs font-black text-slate-900">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: SPECIAL CLEARANCE DEALS WITH METERS */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-gradient-to-r from-red-650 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80')" }} />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 space-y-4">
                  <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Limited Inventory</span>
                  <h3 className="text-3xl font-black leading-tight">Super Clearance Extravaganza</h3>
                  <p className="text-xs text-red-100">Stock is running out quickly. Grab your premium gadgets up to 70% off original retail values.</p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {shuffledProducts.slice(12, 14).map((p) => (
                    <div key={p.id} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-white truncate max-w-[180px]">{p.title}</h4>
                        <span className="bg-yellow-400 text-slate-955 font-black text-[9px] px-2 py-0.5 rounded">SAVE 35%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-white">${p.price.toFixed(2)}</span>
                        <div className="w-24 bg-white/20 h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full w-[45%]" />
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] text-red-100">
                        <span>Items Sold: 18/40</span>
                        <button onClick={() => viewProductDetails(p)} className="underline font-bold hover:text-yellow-300 cursor-pointer">Buy Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 12: TOP RATED PRODUCTS GRID */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-extrabold text-slate-800">
                Top Rated <span className="text-slate-400 font-normal text-sm">by Customers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shuffledProducts.slice(14, 18).map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{p.brand}</span>
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <img src={p.img} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h4 onClick={() => viewProductDetails(p)} className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-yellow-600 cursor-pointer">{p.title}</h4>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-sm font-black text-slate-900">${p.price.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{p.reviewsCount} Customer Reviews</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 13: PARTNER BRANDS */}
          <section className="max-w-7xl mx-auto px-4 py-6 border-t border-slate-200">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">Partner Brands</p>
              <div className="flex flex-wrap items-center justify-around gap-8 opacity-60">
                {['Apple', 'Samsung', 'Sony', 'Logitech', 'Microsoft', 'HP'].map((brand, idx) => (
                  <span key={idx} className="text-lg font-black tracking-widest text-slate-500 uppercase">{brand}</span>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14: CUSTOMER REVIEWS FEED */}
          <section className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-lg font-extrabold text-slate-800 mb-6 text-center">Loved by Shoppers Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Jessica M.", role: "Verified Buyer", rating: 5, comment: "Amera has the fastest dispatch system. My iPad arrived within two days flat! Incredible service." },
                { name: "Marcus T.", role: "Tech Enthusiast", rating: 5, comment: "Superb product selection. The deals page is always updated with genuine discounts." },
                { name: "Elena R.", role: "Loyal Customer", rating: 4, comment: "Great customer support response. They solved my order queries in minutes." }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{rev.name}</h4>
                      <p className="text-[9px] text-slate-400">{rev.role}</p>
                    </div>
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-655 italic leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === 'categories' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={handleLogoClick} className="hover:text-slate-850 cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-bold">Categories Catalog</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar filters */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Browse Categories</h3>
                <div className="space-y-2 text-xs font-medium text-slate-655 font-semibold">
                  {['Tablets & Ipad', 'Speaker & Audio', 'Smart Phones & Tablets', 'Computer & Desktop', 'Home & Kitchen', 'Furniture & Decor', 'Clothing & Fashion'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left hover:text-yellow-600 transition-colors py-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{cat}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="lg:col-span-9 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Laptop & Ipad", count: "14 Items", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" },
                  { title: "Speaker & Audio", count: "25 Items", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80" },
                  { title: "Smart Phones & Tablets", count: "30 Items", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all group relative overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-yellow-600 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{item.count}</p>
                    <button onClick={() => handleCategoryClick(item.title)} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs font-bold w-full hover:bg-yellow-500 hover:text-slate-955 transition-colors cursor-pointer">
                      Explore Catalog
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW VIEW: CATEGORY DETAIL PAGE */}
      {view === 'category-detail' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={handleLogoClick} className="hover:text-slate-855 cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => setView('categories')} className="hover:text-slate-855 cursor-pointer">Categories</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-bold">{selectedCategory} Detail</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Brands</h3>
                  <div className="space-y-2">
                    {['All', 'Apple', 'Samsung', 'Sony', 'HP', 'Herschel'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setShopFilterBrand(b)}
                        className={`w-full text-left text-xs py-1.5 px-2.5 rounded transition-all cursor-pointer ${shopFilterBrand === b ? 'bg-yellow-500 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Filter by Price</h3>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    value={shopFilterPrice}
                    onChange={(e) => setShopFilterPrice(Number(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold">
                    <span>Min: $10</span>
                    <span>Max: ${shopFilterPrice}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((r) => (
                      <button
                        key={r}
                        onClick={() => setShopFilterRating(r)}
                        className={`w-full text-left text-xs py-1 px-2 rounded flex items-center gap-1.5 cursor-pointer ${shopFilterRating === r ? 'bg-yellow-50 font-bold text-yellow-600 border border-yellow-200' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="flex text-yellow-400">
                          {[...Array(r)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </span>
                        <span>& Up</span>
                      </button>
                    ))}
                    {shopFilterRating > 0 && (
                      <button onClick={() => setShopFilterRating(0)} className="text-[10px] text-slate-400 hover:text-red-500 underline font-bold cursor-pointer">Clear Rating Filter</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Detail Product List Area */}
            <div className="lg:col-span-9 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm bg-cover bg-center relative min-h-[140px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent rounded-xl" />
                <div className="z-10 text-white space-y-1">
                  <h1 className="text-xl font-black uppercase tracking-wide">{selectedCategory} Catalog</h1>
                  <p className="text-xs text-yellow-300">Discover premium selections at discounted rates.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-800">{categoryFilteredProducts.length}</span> products in category</p>
                
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">Sort by:</span>
                  <select 
                    value={shopSortOrder}
                    onChange={(e) => setShopSortOrder(e.target.value)}
                    className="border border-slate-200 px-3 py-1.5 rounded focus:outline-none bg-slate-50 text-slate-700 font-bold text-xs"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {categoryFilteredProducts.length === 0 ? (
                <div className="bg-white border border-slate-205 rounded-xl p-12 text-center text-xs text-slate-400">
                  No products found matching filters in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {categoryFilteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {view === 'shop' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={handleLogoClick} className="hover:text-slate-855 cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-bold">Shop Catalog</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Brands</h3>
                  <div className="space-y-2">
                    {['All', 'Apple', 'Samsung', 'Sony', 'HP', 'Herschel'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setShopFilterBrand(b)}
                        className={`w-full text-left text-xs py-1.5 px-2.5 rounded transition-all cursor-pointer ${shopFilterBrand === b ? 'bg-yellow-500 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Filter by Price</h3>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    value={shopFilterPrice}
                    onChange={(e) => setShopFilterPrice(Number(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold">
                    <span>Min: $10</span>
                    <span>Max: ${shopFilterPrice}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase text-slate-855 tracking-wider mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((r) => (
                      <button
                        key={r}
                        onClick={() => setShopFilterRating(r)}
                        className={`w-full text-left text-xs py-1 px-2 rounded flex items-center gap-1.5 cursor-pointer ${shopFilterRating === r ? 'bg-yellow-50 font-bold text-yellow-600 border border-yellow-200' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="flex text-yellow-400">
                          {[...Array(r)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </span>
                        <span>& Up</span>
                      </button>
                    ))}
                    {shopFilterRating > 0 && (
                      <button onClick={() => setShopFilterRating(0)} className="text-[10px] text-slate-400 hover:text-red-500 underline font-bold cursor-pointer">Clear Rating Filter</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Catalog Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Sort & Stats Bar */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> products matching parameters</p>
                
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">Sort by:</span>
                  <select 
                    value={shopSortOrder}
                    onChange={(e) => setShopSortOrder(e.target.value)}
                    className="border border-slate-200 px-3 py-1.5 rounded focus:outline-none bg-slate-50 text-slate-700 font-bold text-xs"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Grid List with Image on Top */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'product-detail' && selectedProduct && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <button onClick={handleLogoClick} className="hover:text-slate-850 cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => setView('shop')} className="hover:text-slate-855 cursor-pointer">Shop Catalog</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-bold truncate max-w-[280px]">{selectedProduct.title}</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-6 h-96">
                <img 
                  src={detailMainImage || selectedProduct.img} 
                  alt={selectedProduct.title} 
                  className="max-h-full object-contain"
                />
              </div>
              
              <div className="flex gap-3 overflow-x-auto py-2">
                {selectedProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDetailMainImage(img)}
                    className={`w-20 h-20 border rounded-lg overflow-hidden bg-slate-50 p-1 flex-shrink-0 transition-all cursor-pointer ${detailMainImage === img ? 'border-yellow-500' : 'border-slate-200'}`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {selectedProduct.brand}
                </span>
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 leading-snug">
                  {selectedProduct.title}
                </h1>
                
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(selectedProduct.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">({selectedProduct.reviewsCount} Customer Reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3 border-t border-b border-slate-100 py-4">
                <span className="text-2xl font-black text-slate-900">${selectedProduct.price.toFixed(2)}</span>
                {selectedProduct.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">${selectedProduct.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded ml-auto">
                  {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <p className="text-xs text-slate-655 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Purchase Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button 
                    onClick={() => setDetailQty(prev => Math.max(1, prev - 1))}
                    className="px-3.5 py-2 font-bold hover:bg-slate-50 text-slate-500 border-r border-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-800">{detailQty}</span>
                  <button 
                    onClick={() => setDetailQty(prev => prev + 1)}
                    className="px-3.5 py-2 font-bold hover:bg-slate-50 text-slate-500 border-l border-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => addToCart(selectedProduct, detailQty)}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl flex items-center gap-2.5 transition-colors shadow-md cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              {/* Mini Ad Banner: Warranty Upsell */}
              <div className="border border-yellow-200 bg-yellow-50/45 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs mt-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Add Amera Care+ Extended Warranty</p>
                    <p className="text-[10px] text-slate-550 leading-normal">Full accidental coverage & 24/7 technical support lines.</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Warranty added to selection!')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-[10px] font-black rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  Add $19.99
                </button>
              </div>

              {/* Vendor Info Shop Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-600 font-bold uppercase text-sm">
                      {selectedProduct.brand.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{selectedProduct.brand} Official Store</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-550 font-bold">4.8 (1,249 Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-slate-450">
                    <span className="font-semibold text-slate-700">99% Positives</span>
                    <span>2.1k Followers</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 text-center text-[10px] border-b border-slate-200/60">
                  <div>
                    <p className="text-slate-450">Response Time</p>
                    <p className="font-bold text-slate-800 mt-0.5">Under 1 hour</p>
                  </div>
                  <div>
                    <p className="text-slate-450">Products</p>
                    <p className="font-bold text-slate-800 mt-0.5">142 Items</p>
                  </div>
                  <div>
                    <p className="text-slate-450">Shipping Speed</p>
                    <p className="font-bold text-green-600 mt-0.5">Fast Delivery</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-3">
                  <button 
                    onClick={() => {
                      setView('shop');
                    }} 
                    className="flex-grow py-1.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Visit Store
                  </button>
                  <button 
                    onClick={() => alert('Mock Live Chat: Connected to Vendor Support Agent')} 
                    className="flex-grow py-1.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Chat Vendor
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Horizontal Promo Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-955 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-yellow-500/10 to-transparent pointer-events-none" />
            
            <div className="space-y-1 text-center md:text-left z-10">
              <span className="inline-block px-2 py-0.5 bg-yellow-500 text-slate-955 rounded text-[9px] font-black uppercase tracking-wider">
                Limited Season Promo
              </span>
              <h3 className="text-sm md:text-base font-extrabold tracking-tight">
                Upgrade Your Setup & Save 20% on Matching Accessories
              </h3>
              <p className="text-[10px] text-slate-400">
                Bundle with chargers, bags, or audio devices to unlock premium automatic discounts at checkout.
              </p>
            </div>
            <button 
              onClick={() => setView('shop')}
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shrink-0 shadow-lg shadow-yellow-500/10 cursor-pointer z-10"
            >
              Explore Bundles
            </button>
          </div>

          {/* Details Tabs Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm mt-8 space-y-6">
            <div className="flex gap-6 border-b border-slate-100 pb-3 text-sm font-bold">
              {[
                { id: 'desc', label: 'Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id as any)}
                  className={`pb-1 transition-all cursor-pointer ${detailTab === tab.id ? 'text-yellow-600 border-b-2 border-yellow-500 font-black' : 'text-slate-455 hover:text-slate-800'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div>
              {detailTab === 'desc' && (
                <p className="text-xs text-slate-655 leading-relaxed max-w-3xl">
                  {selectedProduct.description} Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                </p>
              )}

              {detailTab === 'specs' && (
                <div className="border border-slate-150 rounded-lg overflow-hidden divide-y divide-slate-100 max-w-xl text-xs">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <div key={key} className="flex p-3">
                      <span className="w-1/3 text-slate-450 font-bold">{key}</span>
                      <span className="w-2/3 text-slate-800 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === 'reviews' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-850">Robert D.</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-normal">Outstanding build quality and robust design options. Really happy with the color accuracy on the screen panel.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together Section */}
          {bundleProducts.length >= 2 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm mt-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-yellow-600" />
                Frequently Bought Together (Upsell Bundle)
              </h3>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                <div className="flex flex-wrap items-center justify-center gap-4 flex-grow">
                  {/* Main Product Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-xs">
                    <img src={selectedProduct.img} alt={selectedProduct.title} className="w-14 h-14 object-cover rounded bg-white" />
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-800 truncate max-w-[150px]">{selectedProduct.title}</h4>
                      <p className="text-[10px] font-bold text-slate-900 mt-0.5">${selectedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <span className="text-xl font-bold text-slate-400">+</span>

                  {/* Bundle Item 1 */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-xs relative">
                    <input 
                      type="checkbox" 
                      checked={includeBundleItem1}
                      onChange={(e) => setIncludeBundleItem1(e.target.checked)}
                      className="absolute top-2 right-2 w-3.5 h-3.5 accent-yellow-500 cursor-pointer"
                    />
                    <img src={bundleProducts[0].img} alt={bundleProducts[0].title} className="w-14 h-14 object-cover rounded bg-white" />
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-800 truncate max-w-[150px]">{bundleProducts[0].title}</h4>
                      <p className="text-[10px] font-bold text-slate-900 mt-0.5">${bundleProducts[0].price.toFixed(2)}</p>
                    </div>
                  </div>

                  <span className="text-xl font-bold text-slate-400">+</span>

                  {/* Bundle Item 2 */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-xs relative">
                    <input 
                      type="checkbox" 
                      checked={includeBundleItem2}
                      onChange={(e) => setIncludeBundleItem2(e.target.checked)}
                      className="absolute top-2 right-2 w-3.5 h-3.5 accent-yellow-500 cursor-pointer"
                    />
                    <img src={bundleProducts[1].img} alt={bundleProducts[1].title} className="w-14 h-14 object-cover rounded bg-white" />
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-800 truncate max-w-[150px]">{bundleProducts[1].title}</h4>
                      <p className="text-[10px] font-bold text-slate-900 mt-0.5">${bundleProducts[1].price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Bundle pricing summary box */}
                <div className="w-full lg:w-72 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-2">Total Bundle Price</h4>
                    <p className="text-xl font-black text-slate-900">
                      ${(
                        selectedProduct.price +
                        (includeBundleItem1 ? bundleProducts[0].price : 0) +
                        (includeBundleItem2 ? bundleProducts[1].price : 0)
                      ).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Selected items: {1 + (includeBundleItem1 ? 1 : 0) + (includeBundleItem2 ? 1 : 0)} / 3
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, 1);
                      if (includeBundleItem1) addToCart(bundleProducts[0], 1);
                      if (includeBundleItem2) addToCart(bundleProducts[1], 1);
                      setCartOpen(true);
                    }}
                    className="mt-4 w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center uppercase tracking-wider"
                  >
                    Add Bundle to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Carousel Section: Customers Also Viewed */}
          {relatedProducts.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm mt-8 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-yellow-600" />
                  Customers Also Viewed (Related Recommendations)
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (relatedScrollRef.current) {
                        relatedScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                      }
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button 
                    onClick={() => {
                      if (relatedScrollRef.current) {
                        relatedScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                      }
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div 
                ref={relatedScrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-4"
              >
                {relatedProducts.map(p => (
                  <div 
                    key={p.id} 
                    className="min-w-[220px] max-w-[220px] bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between hover:border-yellow-500 transition-all cursor-pointer flex-shrink-0"
                    onClick={() => {
                      setSelectedProduct(p);
                      setDetailMainImage(p.img);
                      setDetailQty(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div>
                      <div className="h-32 rounded bg-slate-50 flex items-center justify-center p-2 mb-3">
                        <img src={p.img} alt={p.title} className="max-h-full object-contain" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{p.brand}</span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug">{p.title}</h4>
                      
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(p.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-450">({p.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                      <span className="text-xs font-black text-slate-900">${p.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1);
                        }}
                        className="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 rounded-lg transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Carousel Section: Sponsored & Hot Recommendations */}
          {sponsoredProducts.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm mt-8 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  Sponsored Recommendations (Marketplace Hot Items)
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (sponsoredScrollRef.current) {
                        sponsoredScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                      }
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button 
                    onClick={() => {
                      if (sponsoredScrollRef.current) {
                        sponsoredScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                      }
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div 
                ref={sponsoredScrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-4"
              >
                {sponsoredProducts.map(p => (
                  <div 
                    key={p.id} 
                    className="min-w-[220px] max-w-[220px] bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between hover:border-yellow-500 transition-all cursor-pointer flex-shrink-0"
                    onClick={() => {
                      setSelectedProduct(p);
                      setDetailMainImage(p.img);
                      setDetailQty(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div>
                      <div className="h-32 rounded bg-slate-50 flex items-center justify-center p-2 mb-3 relative">
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-yellow-500 text-slate-955 rounded-[4px] text-[8px] font-black uppercase tracking-wider">
                          Sponsored
                        </span>
                        <img src={p.img} alt={p.title} className="max-h-full object-contain" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{p.brand}</span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug">{p.title}</h4>
                      
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(p.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-450">({p.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                      <span className="text-xs font-black text-slate-900">${p.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1);
                        }}
                        className="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-slate-955 rounded-lg transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* VIEW: WISHLIST PAGE */}
      {view === 'wishlist' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">My Saved Wishlist</h2>
          {wishlist.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4 shadow-sm">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-xs font-bold text-slate-700">Wishlist is empty</h3>
              <button onClick={() => setView('shop')} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 font-bold text-xs rounded transition-colors text-slate-950">Go to Shop</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(p => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-yellow-500 transition-all relative">
                  <div>
                    <img src={p.img} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2">{p.title}</h4>
                    <p className="text-xs font-black text-slate-900 mt-2">${p.price.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button 
                      onClick={() => addToCart(p)}
                      className="py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-955 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(p)}
                      className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW: ORDERS PAGE */}
      {view === 'orders' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">My Transaction History</h2>
          {orders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4 shadow-sm">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-xs font-bold text-slate-700">No orders placed yet</h3>
              <button onClick={() => setView('shop')} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 font-bold text-xs rounded transition-colors text-slate-955">Shop Products</button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-xs text-slate-450 font-bold">Order ID: <span className="font-bold text-slate-800">{order.id}</span></p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Placed on: {order.date}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded text-[10px] font-bold uppercase">
                      {order.status}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center py-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.img} alt={item.product.title} className="w-10 h-10 object-cover rounded bg-slate-50" />
                          <div>
                            <h4 className="font-bold text-slate-800 line-clamp-1">{item.product.title}</h4>
                            <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold">Shipping Address:</p>
                      <p className="font-medium text-slate-700 mt-0.5">{order.shippingAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold">Grand Total:</p>
                      <p className="text-sm font-black text-slate-900 mt-0.5">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW: 3-STEP CHECKOUT PAGE */}
      {view === 'checkout' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4 text-xs font-bold text-slate-400">
            <button onClick={() => setCheckoutStep(1)} className={`pb-1 ${checkoutStep === 1 ? 'text-yellow-655 border-b-2 border-yellow-500 font-black' : ''}`}>1. Shipping Info</button>
            <button onClick={() => setCheckoutStep(2)} className={`pb-1 ${checkoutStep === 2 ? 'text-yellow-655 border-b-2 border-yellow-500 font-black' : ''}`} disabled={!shippingAddress}>2. Payment Method</button>
            <button onClick={() => setCheckoutStep(3)} className={`pb-1 ${checkoutStep === 3 ? 'text-yellow-655 border-b-2 border-yellow-500 font-black' : ''}`} disabled={!paymentCardNumber && checkoutStep < 3}>3. Review Order</button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            
            {checkoutStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Shipping Details</h3>
                  <p className="text-xs text-slate-400">Provide shipping details. Alternatively, click "Use Current Location" to lookup address coordinates via GPS.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-850"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">City / Region</label>
                    <input 
                      type="text" 
                      placeholder="California" 
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-850"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500 flex justify-between items-center">
                    <span>Street Address</span>
                    <button 
                      onClick={handleUseCurrentLocation}
                      className="text-[10px] text-yellow-600 hover:text-yellow-700 flex items-center gap-1 cursor-pointer font-extrabold"
                    >
                      <MapPin className="w-3.5 h-3.5" /> {locating ? 'Searching...' : 'Use Current Location'}
                    </button>
                  </label>
                  <input 
                    type="text" 
                    placeholder="123 Ocean Drive" 
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-850"
                  />
                </div>

                {coords && (
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1"><MapPin className="w-4 h-4 text-red-500" /> Active GPS Coordinate Lock</span>
                      <span className="font-mono text-slate-400">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</span>
                    </div>
                    
                    <div className="w-full h-36 bg-slate-200 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-300">
                      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] [background-size:20px_20px]" />
                      <div className="w-8 h-8 bg-red-500/20 rounded-full animate-ping absolute" />
                      <MapPin className="w-8 h-8 text-red-500 z-10 drop-shadow-md" />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white font-mono text-[9px] px-2 py-0.5 rounded">Map Node Locked</span>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setCheckoutStep(2)}
                  disabled={!shippingName || !shippingAddress}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-55 disabled:cursor-not-allowed text-slate-955 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Billing Details</h3>
                  <p className="text-xs text-slate-400">Fill in payment credentials below (Sandbox environment).</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Name on Card</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      value={paymentCardName}
                      onChange={(e) => setPaymentCardName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Card Number</label>
                    <div className="relative">
                      <CardIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="4111 2222 3333 4444" 
                        value={paymentCardNumber}
                        onChange={(e) => setPaymentCardNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none bg-slate-50 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Expiration</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        value={paymentCardExpiry}
                        onChange={(e) => setPaymentCardExpiry(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-500">CVV</label>
                      <input 
                        type="password" 
                        placeholder="***" 
                        value={paymentCardCVV}
                        onChange={(e) => setPaymentCardCVV(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none bg-slate-50 text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setCheckoutStep(1)}
                    className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setCheckoutStep(3)}
                    disabled={!paymentCardNumber || !paymentCardName}
                    className="w-2/3 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-55 disabled:cursor-not-allowed text-slate-955 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Final Review</h3>
                  <p className="text-xs text-slate-400">Please check shipping address, order items list, and billing totals before completing payment.</p>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs space-y-3 text-slate-700">
                  <p><span className="font-bold text-slate-450">Deliver to:</span> {shippingName}</p>
                  <p><span className="font-bold text-slate-455">Address:</span> {shippingAddress}, {shippingCity}</p>
                  <p><span className="font-bold text-slate-455">Payment method:</span> Sandbox Credit Card (Ending in {paymentCardNumber.slice(-4) || '4444'})</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 text-xs">
                      <span>{item.product.title} (x{item.quantity})</span>
                      <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 text-xs pt-3 font-semibold text-slate-500">
                    <span>Shipping Fee</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between py-2 text-xs font-semibold text-slate-500">
                    <span>GST Tax</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm font-black text-slate-900 pt-3">
                    <span>Total Sum</span>
                    <span>${(cartTotal + 15).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setCheckoutStep(2)}
                    className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-2/3 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Confirm & Place Order
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {view === 'thank-you' && placedOrderInfo && (
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">Thank You for your Order!</h2>
            <p className="text-xs text-slate-500">Your order has been placed successfully. Below are the details for your tracking logs.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 text-left text-xs space-y-3 shadow-sm text-slate-700">
            <p className="flex justify-between"><span>Order Number:</span> <span className="font-bold text-slate-900">{placedOrderInfo.id}</span></p>
            <p className="flex justify-between"><span>Date:</span> <span className="font-medium text-slate-800">{placedOrderInfo.date}</span></p>
            <p className="flex justify-between"><span>Shipping total paid:</span> <span className="font-bold text-slate-900">${placedOrderInfo.total.toFixed(2)}</span></p>
            <p className="flex justify-between"><span>Payment status:</span> <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">Paid</span></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setView('orders')}
              className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              View Orders
            </button>
            <button 
              onClick={handleLogoClick}
              className="py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white border-t-4 border-yellow-500 pt-12 pb-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-10 mb-10">
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight">Sign Up For Newsletters</h3>
              <p className="text-xs text-slate-400">Get e-mail updates about our latest shop and special offers.</p>
            </div>
            
            <div className="w-full lg:max-w-md flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-l text-xs focus:outline-none text-white"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold px-6 rounded-r text-xs transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-xs">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-2 text-slate-400 leading-relaxed">
                <li><span className="font-semibold text-white">Address:</span> 1234 Street Name, City, United States</li>
                <li><span className="font-semibold text-white">Phone:</span> (800) 123 4567</li>
                <li><span className="font-semibold text-white">Email:</span> support@amera.com</li>
                <li><span className="font-semibold text-white">Working Days/Hours:</span> Mon - Sun / 9:00 AM - 8:00 PM</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Customer Service</h4>
              <ul className="space-y-2 text-slate-400">
                {['Shipping Policy', 'Refund Policy', 'Contact Us', 'Help & FAQ', 'Store Locations'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-yellow-500 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Information</h4>
              <ul className="space-y-2 text-slate-400">
                {['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Sales Inquiries'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-yellow-500 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Sandbox Dashboard Portals</h4>
              <p className="text-slate-400 leading-normal mb-2">
                Simulated ERP backends for sandbox administration and warehousing nodes.
              </p>
              <button 
                onClick={() => setShowPortalModal(true)} 
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold rounded text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                Sign In Portals
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-6 text-[11px] text-slate-500">
            <p>© 2026 AMERA. All Rights Reserved. Built for Talentspark Enterprise.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>

      {/* CART SIDEBAR DRAWER LAYOUT */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-45"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-1.5">
                    <ShoppingCart className="w-4.5 h-4.5 text-yellow-600" /> Cart Sidebar
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 space-y-2 text-xs">
                    <ShoppingBag className="w-8 h-8 mx-auto text-slate-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-3 text-xs items-center justify-between border-b border-slate-50 pb-3">
                        <img src={item.product.img} alt={item.product.title} className="w-12 h-12 object-cover rounded bg-slate-50" />
                        <div className="flex-grow min-w-0 px-2">
                          <h4 className="font-bold text-slate-800 truncate">{item.product.title}</h4>
                          <p className="text-slate-450 mt-0.5">${item.product.price.toFixed(2)}</p>
                          
                          <div className="flex items-center mt-1 text-[10px]">
                            <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="px-1.5 py-0.5 border border-slate-200 hover:bg-slate-50 rounded cursor-pointer">-</button>
                            <span className="px-2 font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="px-1.5 py-0.5 border border-slate-200 hover:bg-slate-50 rounded cursor-pointer">+</button>
                          </div>
                        </div>

                        <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <div className="flex justify-between text-xs font-bold text-slate-850">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setCheckoutStep(1);
                      setCartOpen(false);
                      setView('checkout');
                    }}
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-md cursor-pointer"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PORTALS LOGIN DIALOG OVERLAY */}
      <AnimatePresence>
        {showPortalModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
            >
              
              <button 
                onClick={() => {
                  setSelectedRole(null);
                  setShowPortalModal(false);
                }}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:col-span-5 border-r border-slate-100 pr-0 md:pr-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">Sandbox Console Hub</h3>
                  <p className="text-xs text-slate-500 mb-6">Select a dashboard role instance to enter the active workspace.</p>
                  
                  <div className="space-y-3">
                    {(['admin', 'stockist', 'vendor'] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${selectedRole === role ? 'border-yellow-500 bg-yellow-50/20' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <h4 className="text-xs font-bold text-slate-900 uppercase">{role} Portal</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{roleThemes[role].desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 text-[10px] text-slate-400 font-medium">
                  Talentspark Enterprise Security Node
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-center min-h-[300px]">
                {selectedRole ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-slate-900">{roleThemes[selectedRole].name}</h3>
                      <p className="text-xs text-slate-500">{roleThemes[selectedRole].desc}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-450">Sandbox Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="email" 
                            readOnly 
                            value={roleThemes[selectedRole].email}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-xs font-medium bg-slate-50 text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-455">Sandbox Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            readOnly 
                            value="testpassword123"
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-xs font-medium bg-slate-50 text-slate-800 focus:outline-none"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerLogin(selectedRole)}
                        className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-bold text-xs rounded-xl transition-colors tracking-wide uppercase active:scale-95 shadow-md shadow-yellow-500/10 cursor-pointer"
                      >
                        Enter Sandbox
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <User className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-xs font-bold text-slate-700">Choose a console portal</h3>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">Please select a dashboard role on the left panel to load the credentials form.</p>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
