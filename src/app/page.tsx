'use client';

import React from 'react';
import { useAppState } from '@/store/state';
import Layout from '@/components/Layout';
import AdminDashboard from '@/components/AdminDashboard';
import AdminAnalytics from '@/components/AdminAnalytics';
import StockistDashboard from '@/components/StockistDashboard';
import VendorDashboard from '@/components/VendorDashboard';
import ProductCatalog from '@/components/ProductCatalog';
import AdminInventory from '@/components/AdminInventory';
import WarehouseMap from '@/components/WarehouseMap';
import CRMPipeline from '@/components/CRMPipeline';
import Reports from '@/components/Reports';
import NotificationCenter from '@/components/NotificationCenter';
import Settings from '@/components/Settings';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const { role, activeTab, isAuthenticated } = useAppState();

  // If not authenticated, render the animated landing page & themed login portals
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Tab Dispatcher based on active tab and current selected user role
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        if (role === 'admin') return <AdminDashboard />;
        if (role === 'stockist') return <StockistDashboard />;
        return <VendorDashboard />;
      
      case 'Analytics':
        return <AdminAnalytics />; // renders the full 10-section analytics view
      
      case 'Products':
        return <ProductCatalog />;
      
      case 'Inventory':
        return <AdminInventory />;
      
      case 'Warehouse':
        return <WarehouseMap />;
      
      case 'CRM':
        return <CRMPipeline />;
      
      case 'Reports':
        return <Reports />;
      
      case 'Notifications':
        return <NotificationCenter />;
      
      case 'Settings':
        return <Settings />;
      
      default:
        return <div className="text-center py-20 text-xs text-muted-custom">Tab option under construction.</div>;
    }
  };

  // Determine portal theme wrapper class
  const themeClass = role === 'admin' ? 'theme-admin' : role === 'stockist' ? 'theme-stockist' : 'theme-vendor';

  return (
    <div className={themeClass}>
      {role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <Layout>
          {renderContent()}
        </Layout>
      )}
    </div>
  );
}

