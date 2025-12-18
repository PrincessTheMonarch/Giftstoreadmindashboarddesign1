import { useState } from 'react';
import { Search, Download, Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  isBulk: boolean;
}

const orders: Order[] = [
  {
    id: 'ORD-2314',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2025-10-29',
    items: 250,
    total: 3450.00,
    status: 'pending',
    isBulk: true,
  },
  {
    id: 'ORD-2313',
    customer: 'Michael Brown',
    email: 'michael.b@example.com',
    date: '2025-10-29',
    items: 3,
    total: 89.97,
    status: 'shipped',
    isBulk: false,
  },
  {
    id: 'ORD-2312',
    customer: 'Emily Davis',
    email: 'emily.d@example.com',
    date: '2025-10-28',
    items: 1,
    total: 45.99,
    status: 'delivered',
    isBulk: false,
  },
  {
    id: 'ORD-2311',
    customer: 'Corporate Client LLC',
    email: 'orders@corporate.com',
    date: '2025-10-28',
    items: 500,
    total: 6500.00,
    status: 'processing',
    isBulk: true,
  },
  {
    id: 'ORD-2310',
    customer: 'John Smith',
    email: 'john.s@example.com',
    date: '2025-10-27',
    items: 2,
    total: 67.98,
    status: 'delivered',
    isBulk: false,
  },
  {
    id: 'ORD-2309',
    customer: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    date: '2025-10-27',
    items: 5,
    total: 124.95,
    status: 'shipped',
    isBulk: false,
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Processing', color: 'bg-sky-100 text-sky-700', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
};

export function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesType = filterType === 'all' || 
      (filterType === 'bulk' && order.isBulk) ||
      (filterType === 'regular' && !order.isBulk);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Orders Management</h1>
          <p className="text-slate-500">Track and manage customer orders</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search orders or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="bulk">Bulk Orders</SelectItem>
                  <SelectItem value="regular">Regular Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{order.id}</span>
                        {order.isBulk && (
                          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                            Bulk
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-900">{order.customer}</p>
                        <p className="text-xs text-slate-500">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[order.status].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                            <DialogDescription>Complete order information and items</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-slate-500">Customer</p>
                                <p className="text-slate-900">{order.customer}</p>
                                <p className="text-sm text-slate-500">{order.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Order Date</p>
                                <p className="text-slate-900">{new Date(order.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <p className="text-sm text-slate-500 mb-2">Order Status</p>
                              <Badge className={statusConfig[order.status].color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[order.status].label}
                              </Badge>
                            </div>
                            <Separator />
                            <div>
                              <p className="text-sm text-slate-500 mb-3">Order Items</p>
                              <div className="space-y-2">
                                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-slate-900">Luxury Gift Box</span>
                                  <span className="text-slate-600">x{order.isBulk ? 100 : 1}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-slate-900">Personalized Mug</span>
                                  <span className="text-slate-600">x{order.isBulk ? 150 : 2}</span>
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-slate-900">
                              <span>Total Amount</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                Update Status
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Download Invoice
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
