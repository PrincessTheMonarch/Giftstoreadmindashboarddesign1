import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ShoppingCart, 
  Users, 
  UserPlus, 
  Mail, 
  Target,
  Package,
  Eye,
  Clock,
  MousePointer,
  RefreshCw,
  Download,
  Calendar,
  Activity,
  BarChart3,
  Globe,
  Truck,
  Star,
  Gift,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample Data
const salesOverTime = [
  { date: 'Oct 1', sales: 45234, orders: 156 },
  { date: 'Oct 8', sales: 52341, orders: 178 },
  { date: 'Oct 15', sales: 48923, orders: 165 },
  { date: 'Oct 22', sales: 61234, orders: 198 },
  { date: 'Oct 29', sales: 58932, orders: 187 },
  { date: 'Nov 5', sales: 67845, orders: 212 },
  { date: 'Nov 12', sales: 72134, orders: 234 },
];

const revenueByCategory = [
  { category: 'Birthday', revenue: 125340, percentage: 28 },
  { category: 'Wedding', revenue: 98234, percentage: 22 },
  { category: 'Anniversary', revenue: 87654, percentage: 20 },
  { category: 'Corporate', revenue: 76543, percentage: 17 },
  { category: 'Graduation', revenue: 58432, percentage: 13 },
];

const topSellingProducts = [
  { id: '1', name: 'Luxury Gift Box Set', sales: 456, revenue: 45600, image: '🎁' },
  { id: '2', name: 'Premium Chocolate Collection', sales: 389, revenue: 38900, image: '🍫' },
  { id: '3', name: 'Personalized Photo Frame', sales: 367, revenue: 22020, image: '🖼️' },
  { id: '4', name: 'Scented Candle Set', sales: 345, revenue: 17250, image: '🕯️' },
  { id: '5', name: 'Wine & Cheese Basket', sales: 298, revenue: 29800, image: '🍷' },
  { id: '6', name: 'Spa Treatment Kit', sales: 276, revenue: 27600, image: '🧖' },
];

const giftFinderUsage = [
  { profile: 'Female + Partner + Birthday', uses: 456, conversions: 342, rate: 75 },
  { profile: 'Male + Boss + Anniversary', uses: 389, conversions: 265, rate: 68 },
  { profile: 'Female + Friend + Wedding', uses: 334, conversions: 237, rate: 71 },
  { profile: 'Male + Teen + Graduation', uses: 298, conversions: 202, rate: 68 },
  { profile: 'Female + Boss + Birthday', uses: 267, conversions: 216, rate: 81 },
];

const featuredSectionPerformance = [
  { section: 'Staff Picks', clicks: 2456, conversions: 892, ctr: 8.2, convRate: 36.3 },
  { section: 'Trending Gifts', clicks: 3234, conversions: 1234, ctr: 9.1, convRate: 38.2 },
  { section: 'New Arrivals', clicks: 1876, conversions: 567, ctr: 6.5, convRate: 30.2 },
  { section: 'Best Sellers', clicks: 2987, conversions: 1456, ctr: 8.8, convRate: 48.7 },
  { section: 'Seasonal', clicks: 2134, conversions: 876, ctr: 7.4, convRate: 41.1 },
];

const trafficSources = [
  { name: 'Direct', value: 35, color: '#f97316' },
  { name: 'Gift Finder', value: 28, color: '#0ea5e9' },
  { name: 'Newsletter', value: 18, color: '#8b5cf6' },
  { name: 'Social Media', value: 12, color: '#10b981' },
  { name: 'Search', value: 7, color: '#64748b' },
];

const userDemographics = {
  gender: [
    { name: 'Female', value: 58, color: '#f97316' },
    { name: 'Male', value: 38, color: '#0ea5e9' },
    { name: 'Other', value: 4, color: '#8b5cf6' },
  ],
  age: [
    { range: '18-24', count: 234 },
    { range: '25-34', count: 456 },
    { range: '35-44', count: 389 },
    { range: '45-54', count: 267 },
    { range: '55+', count: 198 },
  ],
};

const recentActivity = [
  { time: '2 mins ago', action: 'New product added: "Valentine Gift Box"', type: 'product' },
  { time: '15 mins ago', action: 'Featured section updated: Staff Picks', type: 'update' },
  { time: '1 hour ago', action: 'Bulk order processed: 45 units', type: 'order' },
  { time: '2 hours ago', action: 'New category created: "Tech Gifts"', type: 'category' },
  { time: '3 hours ago', action: '12 new newsletter subscribers', type: 'user' },
];

export function PlatformAnalytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [categoryFilter, setCategoryFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Platform Analytics</h1>
          <p className="text-slate-500">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Total Sales</p>
                <p className="text-slate-900">₦2,456,789</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+23.5% vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="text-slate-900">1,432</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+18.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Active Users</p>
                <p className="text-slate-900">12,456</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+31.4%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Conversion Rate</p>
                <p className="text-slate-900">42.8%</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">New Signups</p>
                <p className="text-slate-900">456</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Newsletter Subscribers</p>
                <p className="text-slate-900">8,932</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Avg. Order Value</p>
                <p className="text-slate-900">₦32,450</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+15.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Delivery Success</p>
                <p className="text-slate-900">96.8%</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                <Truck className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users & Traffic</TabsTrigger>
          <TabsTrigger value="giftfinder">Gift Finder</TabsTrigger>
          <TabsTrigger value="featured">Featured Sections</TabsTrigger>
        </TabsList>

        {/* Sales & Revenue Tab */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>Revenue and order trends for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={salesOverTime}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Top performing categories by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="category" type="category" stroke="#64748b" width={100} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Types Comparison</CardTitle>
                <CardDescription>Standard vs Bulk orders breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm text-slate-600">Standard Orders</span>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-900">1,234</p>
                        <p className="text-xs text-slate-500">86.2%</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '86.2%' }} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-sky-500" />
                        <span className="text-sm text-slate-600">Bulk Orders</span>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-900">198</p>
                        <p className="text-xs text-slate-500">13.8%</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: '13.8%' }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500">Avg. Standard</p>
                        <p className="text-slate-900">₦28,450</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Avg. Bulk</p>
                        <p className="text-slate-900">₦156,890</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing products by sales and revenue</CardDescription>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topSellingProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <Badge className="bg-orange-500 hover:bg-orange-500">{index + 1}</Badge>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900">₦{product.revenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+15.2%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Traffic Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">Avg. Time on Site</p>
                  </div>
                  <p className="text-slate-900">4m 32s</p>
                  <p className="text-xs text-green-600">+1m 12s vs last period</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <RefreshCw className="w-4 h-4" />
                    <p className="text-sm">Returning Visitors</p>
                  </div>
                  <p className="text-slate-900">34.2%</p>
                  <p className="text-xs text-green-600">+8.3%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Activity className="w-4 h-4" />
                    <p className="text-sm">Bounce Rate</p>
                  </div>
                  <p className="text-slate-900">28.6%</p>
                  <p className="text-xs text-green-600">-4.2%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics - Age Groups</CardTitle>
                <CardDescription>Customer age distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userDemographics.age}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="range" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
              <CardDescription>Customer gender breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDemographics.gender.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-slate-900">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gift Finder Tab */}
        <TabsContent value="giftfinder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gift Finder Effectiveness</CardTitle>
              <CardDescription>Top performing search combinations and conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {giftFinderUsage.map((combo, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-500 hover:bg-orange-500">{index + 1}</Badge>
                        <p className="text-sm text-slate-900">{combo.profile}</p>
                      </div>
                      <Badge className={combo.rate >= 75 ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-sky-100 text-sky-700 hover:bg-sky-100'}>
                        {combo.rate}% conversion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-slate-500">Total Uses</p>
                        <p className="text-slate-900">{combo.uses}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Conversions</p>
                        <p className="text-slate-900">{combo.conversions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Key Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations based on Gift Finder data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="text-sm text-green-900">
                    <strong>High Performer:</strong> "Female + Boss + Birthday" has 81% conversion rate - the highest across all combinations.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                  <p className="text-sm text-orange-900">
                    <strong>Opportunity:</strong> "Male + Partner" combinations show high usage but lower conversion. Consider adding more premium options.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-sky-500 bg-sky-50 rounded">
                  <p className="text-sm text-sky-900">
                    <strong>Trending:</strong> Wedding-related searches increased 34% this month. Expand wedding gift inventory.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Sections Tab */}
        <TabsContent value="featured" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Section Performance</CardTitle>
              <CardDescription>Click-through rates and conversions for featured sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredSectionPerformance.map((section) => (
                  <div key={section.section} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-orange-500" />
                        <p className="text-slate-900">{section.section}</p>
                      </div>
                      <Badge variant="outline">{section.clicks.toLocaleString()} clicks</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-500">CTR</p>
                        <p className="text-slate-900">{section.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Conversions</p>
                        <p className="text-slate-900">{section.conversions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Conv. Rate</p>
                        <Badge className={section.convRate >= 40 ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-sky-100 text-sky-700 hover:bg-sky-100'}>
                          {section.convRate}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Conversion rates across all featured sections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featuredSectionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="section" stroke="#64748b" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="convRate" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest admin actions and system updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'product' ? 'bg-orange-500' :
                  activity.type === 'order' ? 'bg-sky-500' :
                  activity.type === 'update' ? 'bg-purple-500' :
                  activity.type === 'category' ? 'bg-green-500' :
                  'bg-pink-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
