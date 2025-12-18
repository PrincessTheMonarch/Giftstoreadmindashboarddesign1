import { TrendingUp, Users, ShoppingBag, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const receiverProfileData = [
  { profile: 'Female Boss', conversions: 145, revenue: 6523 },
  { profile: 'Teen Friend', conversions: 234, revenue: 4321 },
  { profile: 'Male Partner', conversions: 189, revenue: 8912 },
  { profile: 'Mom', conversions: 267, revenue: 7654 },
  { profile: 'Dad', conversions: 156, revenue: 5432 },
  { profile: 'Colleague', conversions: 123, revenue: 3456 },
];

const topProducts = [
  { name: 'Luxury Gift Box', sales: 456, revenue: 20972 },
  { name: 'Personalized Mug', sales: 789, revenue: 10247 },
  { name: 'Scented Candle Set', sales: 345, revenue: 10347 },
  { name: 'Photo Frame', sales: 567, revenue: 10764 },
  { name: 'Chocolate Basket', sales: 234, revenue: 12867 },
];

const categoryDistribution = [
  { name: 'Birthday', value: 35, color: '#f97316' },
  { name: 'Anniversary', value: 25, color: '#0ea5e9' },
  { name: 'Corporate', value: 20, color: '#8b5cf6' },
  { name: 'Holiday', value: 15, color: '#10b981' },
  { name: 'Other', value: 5, color: '#64748b' },
];

const userGrowth = [
  { month: 'May', users: 1200 },
  { month: 'Jun', users: 1450 },
  { month: 'Jul', users: 1680 },
  { month: 'Aug', users: 1920 },
  { month: 'Sep', users: 2340 },
  { month: 'Oct', users: 2780 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Gift Finder Analytics</h1>
        <p className="text-slate-500">Insights into customer behavior and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Total Conversions</p>
                <p className="text-slate-900">1,234</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+18%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Active Users</p>
                <p className="text-slate-900">2,780</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+24%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Avg. Order Value</p>
                <p className="text-slate-900">$87.50</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+12%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Conversion Rate</p>
                <p className="text-slate-900">44.3%</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receiver Profile Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Receiver Profiles</CardTitle>
            <CardDescription>Which receiver types convert the most</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receiverProfileData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="profile" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="conversions" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gift Category Distribution</CardTitle>
            <CardDescription>Breakdown of gift categories by orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best-selling items by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-500 hover:bg-orange-500">{index + 1}</Badge>
                    <div>
                      <p className="text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-slate-900">${product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>Monthly active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
