import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Tag, Target, TrendingUp, Users, ShoppingBag, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReceiverCriteria {
  id: string;
  name: string;
  category: 'gender' | 'age' | 'relationship' | 'occasion';
  productCount: number;
  description?: string;
}

const initialCriteria: ReceiverCriteria[] = [
  // Gender
  { id: '1', name: 'Male', category: 'gender', productCount: 234 },
  { id: '2', name: 'Female', category: 'gender', productCount: 312 },
  { id: '3', name: 'Unisex', category: 'gender', productCount: 189 },
  
  // Age Range
  { id: '4', name: 'Kids (5-12)', category: 'age', productCount: 145 },
  { id: '5', name: 'Teens (13-16)', category: 'age', productCount: 98 },
  { id: '6', name: 'Young Adults (17-25)', category: 'age', productCount: 156 },
  { id: '7', name: 'Adults (26+)', category: 'age', productCount: 267 },
  
  // Relationship
  { id: '8', name: 'Partner/Spouse', category: 'relationship', productCount: 189 },
  { id: '9', name: 'Boss/Employer', category: 'relationship', productCount: 87 },
  { id: '10', name: 'Friend', category: 'relationship', productCount: 234 },
  { id: '11', name: 'Colleague', category: 'relationship', productCount: 123 },
  { id: '12', name: 'Family Member', category: 'relationship', productCount: 198 },
  
  // Occasion
  { id: '13', name: 'Birthday', category: 'occasion', productCount: 278 },
  { id: '14', name: 'Wedding', category: 'occasion', productCount: 145 },
  { id: '15', name: 'Graduation', category: 'occasion', productCount: 98 },
  { id: '16', name: "Valentine's Day", category: 'occasion', productCount: 167 },
  { id: '17', name: 'Anniversary', category: 'occasion', productCount: 134 },
];

const topCombinations = [
  { combination: 'Female + Partner + Birthday', uses: 456, conversions: 342, rate: 75 },
  { combination: 'Male + Boss + Anniversary', uses: 289, conversions: 198, rate: 68 },
  { combination: 'Female + Friend + Wedding', uses: 234, conversions: 167, rate: 71 },
  { combination: 'Male + Teen + Graduation', uses: 198, conversions: 134, rate: 68 },
  { combination: 'Female + Boss + Birthday', uses: 178, conversions: 145, rate: 81 },
];

const taggedProducts = [
  { id: '1', name: 'Luxury Watch', tags: ['Male', 'Boss', 'Anniversary'], conversions: 89 },
  { id: '2', name: 'Spa Gift Set', tags: ['Female', 'Partner', 'Birthday'], conversions: 124 },
  { id: '3', name: 'Personalized Notebook', tags: ['Unisex', 'Colleague', 'Birthday'], conversions: 67 },
  { id: '4', name: 'Jewelry Box', tags: ['Female', 'Friend', 'Wedding'], conversions: 98 },
  { id: '5', name: 'Tech Gadget Set', tags: ['Male', 'Teen', 'Graduation'], conversions: 76 },
];

const categoryColors: Record<string, string> = {
  gender: '#f97316',
  age: '#0ea5e9',
  relationship: '#8b5cf6',
  occasion: '#10b981',
};

export function ShoppingAssistant() {
  const [criteria, setCriteria] = useState<ReceiverCriteria[]>(initialCriteria);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [newCriteriaName, setNewCriteriaName] = useState('');
  const [newCriteriaCategory, setNewCriteriaCategory] = useState<string>('');
  const [newCriteriaDescription, setNewCriteriaDescription] = useState('');

  const handleAddCriteria = () => {
    if (!newCriteriaName || !newCriteriaCategory) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCriteria: ReceiverCriteria = {
      id: Date.now().toString(),
      name: newCriteriaName,
      category: newCriteriaCategory as ReceiverCriteria['category'],
      productCount: 0,
      description: newCriteriaDescription,
    };

    setCriteria([...criteria, newCriteria]);
    setNewCriteriaName('');
    setNewCriteriaCategory('');
    setNewCriteriaDescription('');
    setIsAddDialogOpen(false);
    toast.success('Criteria added successfully');
  };

  const handleDeleteCriteria = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
    toast.success('Criteria deleted successfully');
  };

  const getCriteriaByCategory = (category: string) => {
    return criteria.filter(c => c.category === category);
  };

  const criteriaDistribution = [
    { name: 'Gender', value: getCriteriaByCategory('gender').length, color: categoryColors.gender },
    { name: 'Age Range', value: getCriteriaByCategory('age').length, color: categoryColors.age },
    { name: 'Relationship', value: getCriteriaByCategory('relationship').length, color: categoryColors.relationship },
    { name: 'Occasion', value: getCriteriaByCategory('occasion').length, color: categoryColors.occasion },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Shopping Assistant</h1>
        <p className="text-slate-500">Manage Gift Finder criteria and analyze customer behavior</p>
      </div>

      <Tabs defaultValue="management" className="space-y-6">
        <TabsList>
          <TabsTrigger value="management">Gift Finder Management</TabsTrigger>
          <TabsTrigger value="analytics">Gift Finder Analytics</TabsTrigger>
        </TabsList>

        {/* Gift Finder Management Tab */}
        <TabsContent value="management" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900">Receiver Criteria</h2>
              <p className="text-sm text-slate-500">Manage criteria for matching products to customer needs</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Criteria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Receiver Criteria</DialogTitle>
                  <DialogDescription>Create a new tag for Gift Finder recommendations</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="criteria-name">Criteria Name</Label>
                    <Input
                      id="criteria-name"
                      placeholder="e.g., Male Employer"
                      value={newCriteriaName}
                      onChange={(e) => setNewCriteriaName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="criteria-category">Category</Label>
                    <Select value={newCriteriaCategory} onValueChange={setNewCriteriaCategory}>
                      <SelectTrigger id="criteria-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gender">Gender</SelectItem>
                        <SelectItem value="age">Age Range</SelectItem>
                        <SelectItem value="relationship">Relationship/Role</SelectItem>
                        <SelectItem value="occasion">Occasion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="criteria-description">Description (Optional)</Label>
                    <Textarea
                      id="criteria-description"
                      placeholder="Brief description of this criteria"
                      value={newCriteriaDescription}
                      onChange={(e) => setNewCriteriaDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddCriteria} className="w-full bg-orange-500 hover:bg-orange-600">
                    Add Criteria
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Criteria by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['gender', 'age', 'relationship', 'occasion'].map((category) => {
              const categoryCriteria = getCriteriaByCategory(category);
              const categoryName = category === 'gender' ? 'Gender' :
                                  category === 'age' ? 'Age Range' :
                                  category === 'relationship' ? 'Relationship/Role' : 'Occasion';
              
              return (
                <Card key={category}>
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: categoryColors[category] }}
                        />
                        {categoryName}
                      </CardTitle>
                      <Badge variant="outline">{categoryCriteria.length} items</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {categoryCriteria.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                          <div className="flex-1">
                            <p className="text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.productCount} products tagged</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Tag className="w-3 h-3 mr-1" />
                              Tag Products
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteCriteria(item.id)}
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Preview and Tagged Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview Gift Finder Results
                </CardTitle>
                <CardDescription>See what users will see for specific combinations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Select Combination</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCriteriaByCategory('gender').map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCriteriaByCategory('relationship').map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCriteriaByCategory('occasion').map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-sky-500 hover:bg-sky-600">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Results
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Gift Finder Preview</DialogTitle>
                      <DialogDescription>User view for: Female + Boss + Birthday</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-slate-900">We found 12 perfect gifts for a female boss on their birthday!</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-slate-200 rounded-lg">
                          <div className="w-full h-32 bg-slate-100 rounded mb-2" />
                          <p className="text-sm text-slate-900">Luxury Gift Box</p>
                          <p className="text-xs text-slate-500">$45.99</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-lg">
                          <div className="w-full h-32 bg-slate-100 rounded mb-2" />
                          <p className="text-sm text-slate-900">Premium Notebook Set</p>
                          <p className="text-xs text-slate-500">$32.99</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Top Tagged Products
                </CardTitle>
                <CardDescription>Most frequently tagged products across criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {taggedProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-500 hover:bg-orange-500">{index + 1}</Badge>
                        <div>
                          <p className="text-sm text-slate-900">{product.name}</p>
                          <div className="flex gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                            {product.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{product.tags.length - 2}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">{product.conversions} uses</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Gift Finder Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500">Total Uses</p>
                    <p className="text-slate-900">1,355</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+24%</span>
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
                    <p className="text-sm text-slate-500">Avg. Conversion Rate</p>
                    <p className="text-slate-900">72.6%</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+8%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500">Active Criteria</p>
                    <p className="text-slate-900">{criteria.length}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+3 new</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-sky-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500">Tagged Products</p>
                    <p className="text-slate-900">986</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+15%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Combinations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Used Combinations</CardTitle>
                <CardDescription>Most popular criteria combinations and their conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Combination</TableHead>
                      <TableHead>Uses</TableHead>
                      <TableHead>Conv. Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCombinations.map((combo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p className="text-sm text-slate-900">{combo.combination}</p>
                        </TableCell>
                        <TableCell>{combo.uses}</TableCell>
                        <TableCell>
                          <Badge 
                            className={combo.rate >= 75 ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-sky-100 text-sky-700 hover:bg-sky-100'}
                          >
                            {combo.rate}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Criteria Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Criteria Distribution</CardTitle>
                <CardDescription>Breakdown of criteria by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={criteriaDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {criteriaDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate by Combination Type</CardTitle>
              <CardDescription>Compare performance across different combination patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCombinations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="combination" stroke="#64748b" angle={-45} textAnchor="end" height={120} />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                AI Insights & Recommendations
              </CardTitle>
              <CardDescription>Data-driven suggestions to improve Gift Finder performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="text-sm text-green-900">
                    <strong>High Performer:</strong> "Female + Boss + Birthday" has an 81% conversion rate. Consider creating more products for this segment.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                  <p className="text-sm text-orange-900">
                    <strong>Opportunity:</strong> "Male + Colleague" combinations have low product variety. Add 10-15 more tagged products to improve recommendations.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-sky-500 bg-sky-50 rounded">
                  <p className="text-sm text-sky-900">
                    <strong>Trending:</strong> Valentine's Day queries increased 45% this week. Update featured products for this occasion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
