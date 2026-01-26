import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Save, LogOut, Package, Image as ImageIcon, IndianRupee, Layers, Settings, Image, Globe, Share2, Info, Megaphone, Youtube, Type } from 'lucide-react';
import { Product, Category, StoreSettings } from '../types';

interface AdminPanelProps {
  products: Product[];
  settings: StoreSettings;
  onSaveProducts: (products: Product[]) => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onClose: () => void;
}

type AdminTab = 'inventory' | 'hero' | 'brand';

const AdminPanel: React.FC<AdminPanelProps> = ({ products, settings, onSaveProducts, onSaveSettings, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  
  // Product States
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Settings Temp State
  const [tempSettings, setTempSettings] = useState<StoreSettings>(settings);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'shivnath' && password === 'shivbhaiophoap') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onSaveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const imageUrls = typeof editingProduct.images === 'string' 
      ? (editingProduct.images as string).split('\n').filter(url => url.trim() !== '')
      : editingProduct.images || [];

    const sizes = typeof editingProduct.sizes === 'string'
      ? (editingProduct.sizes as string).split(',').map(s => s.trim())
      : editingProduct.sizes || [7, 8, 9, 10];

    let newProducts;
    if (isAdding) {
      const newProduct = {
        ...editingProduct,
        id: Date.now().toString(),
        images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
        sizes: sizes,
        colors: editingProduct.colors || ['Standard'],
        isNew: true
      } as Product;
      newProducts = [newProduct, ...products];
    } else {
      newProducts = products.map(p => p.id === editingProduct.id ? ({...editingProduct, images: imageUrls, sizes} as Product) : p);
    }

    onSaveProducts(newProducts);
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleSaveStoreSettings = () => {
    onSaveSettings(tempSettings);
    alert('Store configuration updated successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">Store Core</h2>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-2">Internal Management Terminal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Login ID</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none font-bold"
                placeholder="Enter ID"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Access Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none font-bold"
                placeholder="••••••••"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-zinc-900 text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-800 transition-all shadow-xl">
                Enter Terminal
              </button>
              <button type="button" onClick={onClose} className="px-8 bg-zinc-100 text-zinc-500 rounded-3xl hover:bg-zinc-200 transition-all font-black text-[11px] uppercase tracking-widest">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Dikhava Command Center</h2>
            <div className="flex items-center gap-4 mt-1">
              {['inventory', 'hero', 'brand'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as AdminTab)}
                  className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg transition-all ${
                    activeTab === tab ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-4 bg-white border border-zinc-100 hover:bg-zinc-50 rounded-2xl transition-all shadow-sm">
            <LogOut className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          
          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black tracking-tighter uppercase">Product Catalog</h3>
                <button 
                  onClick={() => { setIsAdding(true); setEditingProduct({ name: '', brand: '', price: 0, originalPrice: 0, description: '', category: Category.SNEAKERS, images: [], sizes: '7, 8, 9, 10' as any }); }}
                  className="flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  Launch New Product
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <div key={product.id} className="group bg-white border border-zinc-100 rounded-[32px] p-6 flex flex-col hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-square bg-zinc-50 rounded-2xl overflow-hidden mb-6 relative">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-black bg-zinc-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">{product.category}</span>
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{product.brand}</span>
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-4">{product.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-zinc-900">₹{product.price}</span>
                        {product.originalPrice && <span className="text-zinc-400 line-through text-xs">₹{product.originalPrice}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-6 border-t border-zinc-50 mt-6">
                      <button 
                        onClick={() => { setEditingProduct({...product, images: (product.images as string[]).join('\n') as any, sizes: (product.sizes as any[]).join(', ') as any}); setIsAdding(false); }}
                        className="flex-1 py-4 bg-zinc-50 hover:bg-zinc-900 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest"
                      >
                        Modify
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-4 bg-zinc-50 hover:bg-red-500 hover:text-white rounded-2xl transition-all text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">Hero Banners</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">The Visual Soul of Dikhava</p>
              </div>
              
              <div className="bg-white border border-zinc-100 rounded-[40px] p-10 space-y-8 shadow-xl">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Slide Image URLs (Paste one per line)
                  </label>
                  <textarea 
                    value={tempSettings.heroSlides.join('\n')}
                    onChange={e => setTempSettings({...tempSettings, heroSlides: e.target.value.split('\n').filter(u => u.trim() !== '')})}
                    className="w-full px-8 py-6 bg-zinc-50 border border-zinc-100 rounded-3xl font-mono text-sm focus:ring-2 focus:ring-zinc-900 outline-none h-64 custom-scrollbar"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <button 
                  onClick={handleSaveStoreSettings}
                  className="w-full bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-2xl"
                >
                  <Save className="w-4 h-4" />
                  Update Banners
                </button>
              </div>
            </div>
          )}

          {/* BRAND TAB */}
          {activeTab === 'brand' && (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">Global Store Setup</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Identity & Connectivity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Store Identity */}
                <div className="bg-white border border-zinc-100 rounded-[40px] p-10 space-y-8 shadow-xl">
                   <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-50 pb-4">
                     <Type className="w-4 h-4" /> Brand Identity
                   </h4>
                   <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Store Display Name</label>
                        <input 
                          value={tempSettings.storeName}
                          onChange={e => setTempSettings({...tempSettings, storeName: e.target.value})}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Store Tagline</label>
                        <input 
                          value={tempSettings.storeTagline}
                          onChange={e => setTempSettings({...tempSettings, storeTagline: e.target.value})}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Logo Image URL</label>
                        <input 
                          value={tempSettings.logoUrl}
                          onChange={e => setTempSettings({...tempSettings, logoUrl: e.target.value})}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none font-mono text-xs"
                          placeholder="Link to PNG/SVG logo..."
                        />
                      </div>
                   </div>
                </div>

                {/* Promotional & Social */}
                <div className="bg-white border border-zinc-100 rounded-[40px] p-10 space-y-8 shadow-xl">
                   <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-50 pb-4">
                     <Megaphone className="w-4 h-4" /> Promos & Socials
                   </h4>
                   <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Announcement Bar Text</label>
                        <input 
                          value={tempSettings.announcementText}
                          onChange={e => setTempSettings({...tempSettings, announcementText: e.target.value})}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none"
                          placeholder="e.g. 50% SALE LIVE NOW!"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">WhatsApp Number (e.g. 918902810144)</label>
                        <input 
                          value={tempSettings.whatsappNumber}
                          onChange={e => setTempSettings({...tempSettings, whatsappNumber: e.target.value})}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Instagram Link</label>
                          <input 
                            value={tempSettings.instagramLink}
                            onChange={e => setTempSettings({...tempSettings, instagramLink: e.target.value})}
                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">YouTube Link</label>
                          <input 
                            value={tempSettings.youtubeLink}
                            onChange={e => setTempSettings({...tempSettings, youtubeLink: e.target.value})}
                            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold focus:ring-2 focus:ring-zinc-900 outline-none text-xs"
                          />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="md:col-span-2">
                   <button 
                    onClick={handleSaveStoreSettings}
                    className="w-full bg-zinc-900 text-white py-6 rounded-[32px] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-2xl transition-all"
                  >
                    <Save className="w-5 h-5" />
                    Commit Store Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Edit Modal Overlay */}
      {editingProduct && (
        <div className="fixed inset-0 z-[250] bg-zinc-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-[40px] p-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black tracking-tighter uppercase">{isAdding ? 'Add Product' : 'Edit Product'}</h3>
              <button onClick={() => setEditingProduct(null)} className="p-3 hover:bg-zinc-100 rounded-full">
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Product Official Name</label>
                  <input required value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Brand</label>
                  <input value={editingProduct.brand} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold" />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Category</label>
                   <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold appearance-none">
                     {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                   </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Sale Price (₹)</label>
                  <input type="number" required value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">MRP / Original Price (₹)</label>
                  <input type="number" value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-zinc-400" placeholder="Optional" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Available Sizes (Comma Separated)</label>
                  <input value={editingProduct.sizes as any} onChange={e => setEditingProduct({...editingProduct, sizes: e.target.value as any})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold" placeholder="7, 8, 9, 10, 11" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Description</label>
                  <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold h-24" placeholder="Tell customers about this item..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Photo URLs (One per line)</label>
                  <textarea required value={editingProduct.images as any} onChange={e => setEditingProduct({...editingProduct, images: e.target.value as any})} className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold h-40 font-mono text-xs" placeholder="https://..." />
                </div>
              </div>
              <button className="w-full bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                <Save className="w-5 h-5" />
                Confirm Product Launch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;