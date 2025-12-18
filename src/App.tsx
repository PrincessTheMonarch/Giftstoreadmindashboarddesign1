import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardOverview } from './components/DashboardOverview';
import { CategoryManagement } from './components/CategoryManagement';
import { ProductManagement } from './components/ProductManagement';
import { FeaturedSections } from './components/FeaturedSections';
import { OrdersManagement } from './components/OrdersManagement';
import { CustomerManagement } from './components/CustomerManagement';
import { ShoppingAssistant } from './components/ShoppingAssistant';
import { PlatformAnalytics } from './components/PlatformAnalytics';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'categories':
        return <CategoryManagement />;
      case 'products':
        return <ProductManagement />;
      case 'featured':
        return <FeaturedSections />;
      case 'orders':
        return <OrdersManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'shopping-assistant':
        return <ShoppingAssistant />;
      case 'platform-analytics':
        return <PlatformAnalytics />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  );
}