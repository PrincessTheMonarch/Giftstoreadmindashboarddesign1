import { Package, ShoppingCart, DollarSign, Star, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statsData = [
  {
    title: 'Total Products',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: Package,
    color: 'orange',
  },
  {
    title: 'Orders This Month',
    value: '456',
    change: '+23%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'sky',
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Featured Sections',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: Star,
    color: 'purple',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const ordersData = [
  { day: 'Mon', orders: 45 },
  { day: 'Tue', orders: 52 },
  { day: 'Wed', orders: 38 },
  { day: 'Thu', orders: 65 },
  { day: 'Fri', orders: 78 },
  { day: 'Sat', orders: 82 },
  { day: 'Sun', orders: 58 },
];

const recentActivities = [
  { type: 'product', action: 'New product added: "Luxury Gift Box"', time: '5 min ago', badge: 'New' },
  { type: 'order', action: 'Bulk order #2314 received (250 items)', time: '15 min ago', badge: 'Bulk' },
  { type: 'product', action: 'Product updated: "Birthday Candles"', time: '1 hour ago', badge: 'Update' },
  { type: 'order', action: 'Order #2313 shipped', time: '2 hours ago', badge: 'Shipped' },
  { type: 'category', action: 'New category created: "Valentine\'s Day"', time: '3 hours ago', badge: 'New' },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Section
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="text-slate-900">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`w-3 h-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-slate-400">from last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders This Week</CardTitle>
            <CardDescription>Daily order count for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="orders" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates and changes to your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div>
                    <p className="text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{activity.badge}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
