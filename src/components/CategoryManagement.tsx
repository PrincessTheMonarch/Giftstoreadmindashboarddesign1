import { useState } from 'react';
import { Plus, Edit, Trash2, ChevronRight, FolderTree, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import { Badge } from './ui/badge';

interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  productCount: number;
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Age',
    icon: '🎂',
    subcategories: [
      { id: '1-1', name: 'Kids (5-12)', productCount: 45 },
      { id: '1-2', name: 'Teens (13-16)', productCount: 38 },
      { id: '1-3', name: 'Young Adults (17-25)', productCount: 67 },
      { id: '1-4', name: 'Adults (26+)', productCount: 92 },
    ],
  },
  {
    id: '2',
    name: 'Occasion',
    icon: '🎉',
    subcategories: [
      { id: '2-1', name: 'Birthday', productCount: 123 },
      { id: '2-2', name: 'Anniversary', productCount: 56 },
      { id: '2-3', name: 'Wedding', productCount: 78 },
      { id: '2-4', name: 'Graduation', productCount: 34 },
    ],
  },
  {
    id: '3',
    name: 'Relationship',
    icon: '❤️',
    subcategories: [
      { id: '3-1', name: 'Family', productCount: 89 },
      { id: '3-2', name: 'Friends', productCount: 76 },
      { id: '3-3', name: 'Colleagues', productCount: 45 },
      { id: '3-4', name: 'Romantic', productCount: 67 },
    ],
  },
  {
    id: '4',
    name: 'Price Range',
    icon: '💰',
    subcategories: [
      { id: '4-1', name: 'Under $25', productCount: 145 },
      { id: '4-2', name: '$25 - $50', productCount: 98 },
      { id: '4-3', name: '$50 - $100', productCount: 67 },
      { id: '4-4', name: 'Over $100', productCount: 34 },
    ],
  },
];

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      icon: newCategoryIcon || '📁',
      subcategories: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryIcon('');
    setIsDialogOpen(false);
    toast.success('Category created successfully');
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success('Category deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Category Management</h1>
          <p className="text-slate-500">Organize your products into categories and subcategories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new category to organize your products</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Holiday Gifts"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-icon">Icon (emoji)</Label>
                <Input
                  id="category-icon"
                  placeholder="e.g., 🎁"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                />
              </div>
              <Button onClick={handleAddCategory} className="w-full bg-orange-500 hover:bg-orange-600">
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          
          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xl">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {category.name}
                        <Badge variant="outline">{category.subcategories?.length || 0} subcategories</Badge>
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {category.subcategories?.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <FolderTree className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-900">{sub.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-500">{sub.productCount} products</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4">
                      <Button variant="outline" className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
