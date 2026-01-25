import React from 'react';
import { Search, Menu, User, ShoppingBag, Sparkles } from 'lucide-react';
import { StoreSettings } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  settings: StoreSettings;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, settings }) => {
  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      {settings.announcementText && (
        <div className="bg-zinc-900 text-white py-2.5 px-4 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap text-center">
              {settings.announcementText}
            </p>
            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
        </div>
      )}

      <nav className="glass-effect border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-center group cursor-pointer py-2">
                {settings.logoUrl ? (
                  <div className="h-14 flex items-center">
                    <img src={settings.logoUrl} alt={settings.storeName} className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black tracking-[-0.05em] leading-none text-zinc-900 uppercase italic">
                        {settings.storeName}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-[1px] w-4 bg-zinc-200" />
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-[0.4em]">Est. 2022</span>
                        <div className="h-[1px] w-4 bg-zinc-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                <a href="#catalog" className="hover:text-zinc-900 transition-colors">The Catalog</a>
                <a href="#catalog" className="hover:text-zinc-900 transition-colors">Collections</a>
                <a href="#" className="text-red-500 hover:text-red-600 transition-colors">On Sale</a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block mr-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-xs focus:outline-none focus:ring-4 focus:ring-zinc-900/5 w-64 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              
              <button 
                onClick={onOpenCart}
                className="p-3 text-zinc-600 hover:text-zinc-900 transition-all rounded-xl hover:bg-zinc-50 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-zinc-900 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="p-3 text-zinc-600 hover:text-zinc-900 transition-all rounded-xl hover:bg-zinc-50">
                <User className="w-5 h-5" />
              </button>
              
              <button className="lg:hidden p-3 text-zinc-600 hover:bg-zinc-50 rounded-xl">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;