import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Calendar, Eye, EyeOff, Upload, Image as ImageIcon, Video, Layout, Search, Filter, Folder, MoreVertical, Download, Copy, ExternalLink, FileImage, Film, ImagePlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner';

interface FeaturedSection {
  id: string;
  name: string;
  description: string;
  productCount: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
}

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'banner' | 'video';
  url: string;
  size: string;
  uploadDate: string;
  folder: string;
  dimensions?: string;
  usageCount: number;
}

const initialSections: FeaturedSection[] = [
  {
    id: '1',
    name: 'Staff Picks',
    description: 'Handpicked favorites from our team',
    productCount: 12,
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Trending Now',
    description: 'Most popular gifts this month',
    productCount: 20,
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Easter Gifts',
    description: 'Special collection for Easter celebration',
    productCount: 15,
    isActive: true,
    startDate: '2025-03-15',
    endDate: '2025-04-20',
    order: 3,
  },
  {
    id: '4',
    name: 'Luxury Collection',
    description: 'Premium gifts for special occasions',
    productCount: 8,
    isActive: false,
    order: 4,
  },
  {
    id: '5',
    name: 'Under $25',
    description: 'Great gifts that won\'t break the bank',
    productCount: 45,
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    name: "Mother's Day Special",
    description: 'Perfect gifts for mom',
    productCount: 18,
    isActive: false,
    startDate: '2025-05-01',
    endDate: '2025-05-11',
    order: 6,
  },
];

const initialMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'hero-banner-valentine.jpg',
    type: 'banner',
    url: '/media/banners/hero-valentine.jpg',
    size: '2.4 MB',
    uploadDate: '2024-10-15',
    folder: 'Seasonal Campaigns',
    dimensions: '1920x600',
    usageCount: 3,
  },
  {
    id: '2',
    name: 'product-chocolate-box.jpg',
    type: 'image',
    url: '/media/products/chocolate-box.jpg',
    size: '856 KB',
    uploadDate: '2024-10-20',
    folder: 'Product Images',
    dimensions: '800x800',
    usageCount: 12,
  },
  {
    id: '3',
    name: 'gift-wrapping-tutorial.mp4',
    type: 'video',
    url: '/media/videos/gift-wrapping.mp4',
    size: '45.2 MB',
    uploadDate: '2024-10-18',
    folder: 'Tutorials',
    dimensions: '1920x1080',
    usageCount: 8,
  },
  {
    id: '4',
    name: 'homepage-banner-winter.jpg',
    type: 'banner',
    url: '/media/banners/winter-sale.jpg',
    size: '1.8 MB',
    uploadDate: '2024-10-22',
    folder: 'Seasonal Campaigns',
    dimensions: '1920x600',
    usageCount: 5,
  },
  {
    id: '5',
    name: 'category-birthday.jpg',
    type: 'image',
    url: '/media/categories/birthday.jpg',
    size: '1.2 MB',
    uploadDate: '2024-10-12',
    folder: 'Category Headers',
    dimensions: '1200x400',
    usageCount: 7,
  },
  {
    id: '6',
    name: 'how-to-choose-gifts.mp4',
    type: 'video',
    url: '/media/videos/choose-gifts.mp4',
    size: '38.6 MB',
    uploadDate: '2024-10-25',
    folder: 'Tutorials',
    dimensions: '1920x1080',
    usageCount: 15,
  },
];

export function FeaturedSections() {
  const [sections, setSections] = useState<FeaturedSection[]>(initialSections);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [mediaFilter, setMediaFilter] = useState('all');
  const [folderFilter, setFolderFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSectionStatus = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, isActive: !section.isActive } : section
    ));
    toast.success('Section status updated');
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
    toast.success('Section deleted successfully');
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
    toast.success('Media item deleted successfully');
  };

  const copyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesType = mediaFilter === 'all' || item.type === mediaFilter;
    const matchesFolder = folderFilter === 'all' || item.folder === folderFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesFolder && matchesSearch;
  });

  const uniqueFolders = Array.from(new Set(mediaItems.map(item => item.folder)));

  const mediaStats = {
    totalImages: mediaItems.filter(i => i.type === 'image').length,
    totalBanners: mediaItems.filter(i => i.type === 'banner').length,
    totalVideos: mediaItems.filter(i => i.type === 'video').length,
    totalSize: mediaItems.reduce((acc, item) => {
      const size = parseFloat(item.size);
      return acc + (item.size.includes('MB') ? size : size / 1024);
    }, 0).toFixed(1),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Content Management</h1>
        <p className="text-slate-500">Manage featured sections and media library</p>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sections">Featured Sections</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>

        {/* Featured Sections Tab */}
        <TabsContent value="sections" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900">Featured Sections</h2>
              <p className="text-sm text-slate-500">Create and manage featured product collections</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Section
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Featured Section</DialogTitle>
                  <DialogDescription>Add a new featured product collection</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="section-name">Section Name</Label>
                    <Input id="section-name" placeholder="e.g., Valentine's Day Gifts" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section-description">Description</Label>
                    <Input id="section-description" placeholder="Brief description of this section" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date (Optional)</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date (Optional)</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <Label htmlFor="active">Activate immediately</Label>
                    <Switch id="active" defaultChecked />
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      toast.success('Section created successfully');
                    }}
                  >
                    Create Section
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className={!section.isActive ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Button variant="ghost" size="sm" className="cursor-move mt-1">
                        <GripVertical className="w-4 h-4 text-slate-400" />
                      </Button>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {section.name}
                          {section.isActive ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">{section.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSectionStatus(section.id)}
                      >
                        {section.isActive ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Products in section</span>
                    <span className="text-slate-900">{section.productCount}</span>
                  </div>
                  {(section.startDate || section.endDate) && (
                    <div className="flex items-center gap-2 text-sm bg-sky-50 p-3 rounded-lg">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <div className="flex-1">
                        <p className="text-sky-900">Scheduled Display</p>
                        <p className="text-xs text-sky-600">
                          {section.startDate && `From ${new Date(section.startDate).toLocaleDateString()}`}
                          {section.endDate && ` to ${new Date(section.endDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Products
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Section Display Order</CardTitle>
              <CardDescription>Drag sections to reorder how they appear on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <div
                      key={section.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-move"
                    >
                      <GripVertical className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500 w-8">{index + 1}.</span>
                      <span className="flex-1 text-slate-900">{section.name}</span>
                      {section.isActive ? (
                        <Badge variant="outline" className="text-xs">Visible</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs opacity-50">Hidden</Badge>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Library Tab */}
        <TabsContent value="media" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Images</p>
                    <p className="text-slate-900">{mediaStats.totalImages}</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileImage className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Banners</p>
                    <p className="text-slate-900">{mediaStats.totalBanners}</p>
                  </div>
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Layout className="w-5 h-5 text-sky-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Videos</p>
                    <p className="text-slate-900">{mediaStats.totalVideos}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Film className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Size</p>
                    <p className="text-slate-900">{mediaStats.totalSize} MB</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Upload */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={mediaFilter} onValueChange={setMediaFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="banner">Banners</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={folderFilter} onValueChange={setFolderFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {uniqueFolders.map(folder => (
                    <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                  <DialogDescription>Upload images, banners, or videos to your library</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF, MP4 up to 50MB</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-type">Media Type</Label>
                    <Select defaultValue="image">
                      <SelectTrigger id="media-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Product Image</SelectItem>
                        <SelectItem value="banner">Banner/Hero Image</SelectItem>
                        <SelectItem value="video">Video Content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-folder">Folder</Label>
                    <Select defaultValue="products">
                      <SelectTrigger id="media-folder">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="products">Product Images</SelectItem>
                        <SelectItem value="banners">Seasonal Campaigns</SelectItem>
                        <SelectItem value="categories">Category Headers</SelectItem>
                        <SelectItem value="tutorials">Tutorials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-name">File Name (Optional)</Label>
                    <Input id="media-name" placeholder="Leave blank to use original name" />
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setIsUploadDialogOpen(false);
                      toast.success('Media uploaded successfully');
                    }}
                  >
                    Upload Files
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-slate-100 rounded-t-xl overflow-hidden">
                    {item.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-slate-400" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyMediaUrl(item.url)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Full Size
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => deleteMediaItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge 
                      className={`absolute top-2 left-2 ${
                        item.type === 'image' ? 'bg-orange-500 hover:bg-orange-500' :
                        item.type === 'banner' ? 'bg-sky-500 hover:bg-sky-500' :
                        'bg-purple-500 hover:bg-purple-500'
                      }`}
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-slate-900 truncate" title={item.name}>{item.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Folder className="w-3 h-3" />
                      <span className="truncate">{item.folder}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{item.size}</span>
                      <span>{item.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{item.uploadDate}</span>
                      <Badge variant="outline" className="text-xs">
                        Used {item.usageCount}x
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">No media found</p>
                <p className="text-sm text-slate-500">Try adjusting your filters or upload new media</p>
              </CardContent>
            </Card>
          )}

          {/* Folder Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Folder Organization
              </CardTitle>
              <CardDescription>Manage media folders and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {uniqueFolders.map((folder) => {
                  const folderItems = mediaItems.filter(item => item.folder === folder);
                  return (
                    <div key={folder} className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Folder className="w-5 h-5 text-orange-500" />
                        <p className="text-sm text-slate-900">{folder}</p>
                      </div>
                      <p className="text-xs text-slate-500">{folderItems.length} items</p>
                    </div>
                  );
                })}
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-orange-400 transition-colors cursor-pointer flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">New Folder</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
