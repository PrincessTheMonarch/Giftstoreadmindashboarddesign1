import { useState } from 'react';
import { Plus, Edit, Trash2, Filter, Search, Star, Package2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  bulkAvailable: boolean;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Gift Box',
    category: 'Birthday',
    price: 45.99,
    stock: 123,
    featured: true,
    bulkAvailable: true,
    image: 'gift-box',
  },
  {
    id: '2',
    name: 'Personalized Mug',
    category: 'Office',
    price: 12.99,
    stock: 456,
    featured: false,
    bulkAvailable: true,
    image: 'mug',
  },
  {
    id: '3',
    name: 'Scented Candle Set',
    category: 'Home',
    price: 29.99,
    stock: 89,
    featured: true,
    bulkAvailable: false,
    image: 'candles',
  },
  {
    id: '4',
    name: 'Photo Frame',
    category: 'Anniversary',
    price: 18.99,
    stock: 234,
    featured: false,
    bulkAvailable: true,
    image: 'frame',
  },
  {
    id: '5',
    name: 'Chocolate Gift Basket',
    category: 'Birthday',
    price: 54.99,
    stock: 67,
    featured: true,
    bulkAvailable: false,
    image: 'chocolate',
  },
  {
    id: '6',
    name: 'Plush Teddy Bear',
    category: 'Kids',
    price: 24.99,
    stock: 178,
    featured: false,
    bulkAvailable: true,
    image: 'teddy',
  },
];

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStock = filterStock === 'all' || 
      (filterStock === 'low' && product.stock < 100) ||
      (filterStock === 'high' && product.stock >= 100);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Product Management</h1>
          <p className="text-slate-500">Manage your product inventory and details</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Create a new product in your catalog</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price ($)</Label>
                  <Input id="product-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock">Stock Quantity</Label>
                  <Input id="product-stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" placeholder="Enter product description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-tags">Tags</Label>
                <Input id="product-tags" placeholder="e.g., luxury, handmade, personalized" />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="featured">Mark as Featured</Label>
                <Switch id="featured" />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="bulk">Available for Bulk Orders</Label>
                <Switch id="bulk" />
              </div>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  toast.success('Product added successfully');
                }}
              >
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Anniversary">Anniversary</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStock} onValueChange={setFilterStock}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="high">High Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Package2 className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-slate-900">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={product.stock < 100 ? 'text-orange-600' : 'text-slate-900'}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {product.featured && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {product.bulkAvailable && (
                        <Badge variant="outline">Bulk</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
