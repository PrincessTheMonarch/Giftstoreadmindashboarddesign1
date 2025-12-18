import { useState } from 'react';
import { Search, Mail, UserCheck, Send, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
  subscribed: boolean;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    orders: 12,
    totalSpent: 1245.60,
    joinDate: '2024-01-15',
    subscribed: true,
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    orders: 5,
    totalSpent: 432.50,
    joinDate: '2024-03-22',
    subscribed: true,
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    orders: 8,
    totalSpent: 876.30,
    joinDate: '2023-11-08',
    subscribed: false,
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.s@example.com',
    orders: 3,
    totalSpent: 189.90,
    joinDate: '2024-06-10',
    subscribed: true,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    orders: 15,
    totalSpent: 2134.75,
    joinDate: '2023-08-03',
    subscribed: true,
  },
];

const subscribers = [
  { id: '1', email: 'subscriber1@example.com', date: '2025-10-28' },
  { id: '2', email: 'subscriber2@example.com', date: '2025-10-27' },
  { id: '3', email: 'subscriber3@example.com', date: '2025-10-26' },
  { id: '4', email: 'subscriber4@example.com', date: '2025-10-25' },
  { id: '5', email: 'subscriber5@example.com', date: '2025-10-24' },
];

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Customer Management</h1>
          <p className="text-slate-500">Manage customers and mailing list subscribers</p>
        </div>
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Send className="w-4 h-4 mr-2" />
              Send Email Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Email Campaign</DialogTitle>
              <DialogDescription>Create and send an email to your subscribers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input id="email-subject" placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">Message</Label>
                <Textarea id="email-body" placeholder="Enter your message" rows={8} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Schedule Send (Optional)</Label>
                <Input id="schedule-date" type="datetime-local" />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    setIsEmailDialogOpen(false);
                    toast.success('Email campaign scheduled successfully');
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule for Later
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="subscribers">Newsletter Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{customers.length} Total Customers</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {customers.filter(c => c.subscribed).length} Subscribed
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="text-slate-900">{customer.name}</p>
                          <p className="text-xs text-slate-500">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {customer.subscribed ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Subscribed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Subscribed</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Subscribers</CardTitle>
              <CardDescription>Manage your mailing list and send campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="text-slate-900">{subscribers.length} Active Subscribers</p>
                      <p className="text-sm text-slate-500">Growing at 12% per month</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Export List
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="text-slate-900">{subscriber.email}</TableCell>
                        <TableCell>{new Date(subscriber.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Unsubscribe
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
