
import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, Truck, RefreshCw, Youtube, Instagram, MapPin, Phone, Zap, MessageCircle, ChevronLeft, Shield, Lock, Heart } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AiAssistant from './components/AiAssistant';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { Category, Product, CartItem, StoreSettings } from './types';

const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'DIKHAVA',
  storeTagline: 'DURGA NAGAR, NORTH DUMDUM • KOLKATA',
  logoUrl: '',
  announcementText: '',
  whatsappNumber: '918902810144',
  instagramLink: 'https://www.instagram.com/dikhava_shopping?igsh=MTQzMmY3NGY4bHZnNA==',
  youtubeLink: 'https://youtube.com/@dikhava?si=-zcwN-QlIK0y2NcM',
  mapsLink: 'https://maps.app.goo.gl/1MFS51cahtExockG6',
  heroSlides: [
    "https://instasize.com/p/60dfeeb1982f6c056b5caeb6b46d5c758fbe8f4fc93b06092cc44030f931d021",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=2000"
  ]
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('dikhava_products');
    const savedSettings = localStorage.getItem('dikhava_settings');
    
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { setProducts(INITIAL_PRODUCTS); }
    } else {
      setProducts(INITIAL_PRODUCTS);
    }

    if (savedSettings) {
      try { 
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...INITIAL_SETTINGS, ...parsed }); 
      } catch (e) { 
        setSettings(INITIAL_SETTINGS); 
      }
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('dikhava_products', JSON.stringify(updatedProducts));
  };

  const saveSettings = (updatedSettings: StoreSettings) => {
    setSettings(updatedSettings);
    localStorage.setItem('dikhava_settings', JSON.stringify(updatedSettings));
  };

  useEffect(() => {
    if (settings.heroSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % settings.heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [settings.heroSlides.length]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product, size: string | number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, size: string | number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, size: string | number) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-zinc-900 selection:text-white">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        settings={settings}
      />

      <main className="flex-1">
        {/* HERO SLIDER SECTION */}
        <section className="relative h-[85vh] flex items-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0">
            {settings.heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-60 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={slide} 
                  className="w-full h-full object-cover scale-105"
                  alt={`${settings.storeName} Slide ${index + 1}`}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-20" />
          </div>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + settings.heroSlides.length) % settings.heroSlides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % settings.heroSlides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left z-30">
            <div className="max-w-4xl mx-auto md:mx-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-8">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-white font-black uppercase tracking-[0.3em] text-[9px]">
                  {settings.storeTagline}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-[12rem] font-black text-white leading-[0.8] tracking-tighter mb-12 drop-shadow-2xl uppercase italic">
                {settings.storeName}
              </h1>
              
              <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                <a 
                  href="#catalog"
                  className="bg-white text-zinc-950 px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:scale-[1.02] transition-all active:scale-95"
                >
                  Explore Drops
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 text-white px-10 py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Direct Chat
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="bg-white py-8 border-b border-zinc-50 sticky top-[120px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              {['All', ...Object.values(Category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200' 
                      : 'bg-zinc-50 text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="catalog" className="py-24 bg-zinc-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-zinc-900 mb-3 uppercase italic">New Seasonal Drops</h2>
                <div className="flex items-center gap-3">
                   <div className="h-[2px] w-8 bg-zinc-900" />
                   <p className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">Premium Collections Only</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  whatsappNumber={settings.whatsappNumber}
                  onAddToCart={(size) => handleAddToCart(product, size)} 
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <AiAssistant products={products} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        whatsappNumber={settings.whatsappNumber}
        onUpdateQuantity={updateCartQuantity} 
        onRemove={removeFromCart} 
      />

      {isAdminOpen && (
        <AdminPanel 
          products={products} 
          settings={settings}
          onSaveProducts={saveProducts} 
          onSaveSettings={saveSettings}
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Navigation</h5>
              <ul className="space-y-4">
                <li><button onClick={scrollToTop} className="text-zinc-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">Return Home</button></li>
                <li><button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="text-zinc-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">Catalog Index</button></li>
                <li><button onClick={() => setIsAdminOpen(true)} className="text-zinc-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Lock className="w-3 h-3" /> Terminal Access</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Location & Support</h5>
              <div className="space-y-8">
                <a href={settings.mapsLink} target="_blank" className="flex gap-5 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-300">Dikhava HQ • School Rd<br />Durga Nagar, Kolkata 700065</p>
                </a>
                <a href={`tel:+${settings.whatsappNumber}`} className="flex gap-5 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <Phone className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  </div>
                  <p className="text-zinc-200 text-lg font-black tracking-widest group-hover:text-white">+{settings.whatsappNumber}</p>
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Management Gateway</h5>
              <div className="space-y-6">
                <button onClick={() => setIsAdminOpen(true)} className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                  <Shield className="w-10 h-10 text-white bg-zinc-900 rounded-xl p-2 group-hover:scale-110 transition-transform" />
                  <div className="text-left"><h6 className="text-[10px] font-black uppercase tracking-widest text-white">Staff Management</h6></div>
                </button>
                <div className="flex gap-4">
                  <a href={settings.instagramLink} target="_blank" className="flex-1 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"><Instagram className="w-5 h-5 text-zinc-400" /></a>
                  <a href={settings.youtubeLink} target="_blank" className="flex-1 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"><Youtube className="w-5 h-5 text-zinc-400" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-1">© 2026 {settings.storeName}. ALL RIGHTS RESERVED.</p>
                <p className="text-[7px] font-bold text-zinc-800 uppercase tracking-[0.6em]">ESTABLISHED SINCE 2022 • KOLKATA</p>
                <p className="text-[8px] font-medium text-zinc-500 uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
                  Made with <Heart className="w-2 h-2 text-red-500 fill-red-500" /> by Shivnath Dey • Regards MoradoSolution
                </p>
             </div>
             <div className="flex items-center gap-4 bg-zinc-900/50 px-6 py-4 rounded-2xl border border-white/5">
                <Zap className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                <span className="text-[9px] font-black tracking-[0.2em] uppercase">Grexa Digital Architecture</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${settings.whatsappNumber}`}
        target="_blank"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-zinc-900 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-zinc-100 pointer-events-none">
          Live Assistance
        </div>
      </a>
    </div>
  );
};

export default App;
