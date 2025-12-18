import { Save, Shield, CreditCard, Truck, Bell, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your store configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Admin Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic details about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Gift Haven" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Contact Email</Label>
                  <Input id="store-email" type="email" defaultValue="contact@gifthaven.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea 
                  id="store-description" 
                  defaultValue="Your one-stop shop for thoughtful gifts for every occasion"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-banner">Store-wide Banner (Optional)</Label>
                <Input id="store-banner" placeholder="e.g., Free shipping on orders over $50!" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency & Tax</CardTitle>
              <CardDescription>Configure pricing and tax settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="ngn">NGN (₦)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="8.5" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="tax-inclusive">Prices include tax</Label>
                  <p className="text-xs text-slate-500">Display prices with tax included</p>
                </div>
                <Switch id="tax-inclusive" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Gateways
              </CardTitle>
              <CardDescription>Configure payment methods for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">Stripe</p>
                      <p className="text-xs text-slate-500">Credit cards, Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">PayPal</p>
                      <p className="text-xs text-slate-500">PayPal wallet and credit cards</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Publishable Key</Label>
                <Input id="stripe-key" placeholder="pk_live_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input id="stripe-secret" type="password" placeholder="sk_live_..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery Zones
              </CardTitle>
              <CardDescription>Configure shipping zones and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-slate-900">Domestic (USA)</p>
                    <p className="text-sm text-slate-500">$5.99 - Standard (5-7 days) | $12.99 - Express (2-3 days)</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-slate-900">International</p>
                    <p className="text-sm text-slate-500">$15.99 - Standard (10-14 days) | $29.99 - Express (5-7 days)</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add New Zone
              </Button>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
                <Input id="free-shipping-threshold" type="number" defaultValue="50" />
                <p className="text-xs text-slate-500">Offer free shipping for orders above this amount</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>Configure when to receive email alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>New Order</Label>
                    <p className="text-xs text-slate-500">Receive email when a new order is placed</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>Low Stock Alert</Label>
                    <p className="text-xs text-slate-500">Notify when product stock is low</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>Bulk Orders</Label>
                    <p className="text-xs text-slate-500">Special notification for bulk orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>Customer Reviews</Label>
                    <p className="text-xs text-slate-500">Notify when customers leave reviews</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Admin Users & Permissions
              </CardTitle>
              <CardDescription>Manage admin access and roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">Admin (You)</p>
                      <p className="text-xs text-slate-500">admin@gifthaven.com - Full Access</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Owner</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                      JD
                    </div>
                    <div>
                      <p className="text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-500">john@gifthaven.com - Product Manager</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      JS
                    </div>
                    <div>
                      <p className="text-slate-900">Jane Smith</p>
                      <p className="text-xs text-slate-500">jane@gifthaven.com - Order Manager</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Invite Admin User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}