import React from 'react';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  whatsappNumber: string;
  onUpdateQuantity: (id: string, size: number | string, delta: number) => void;
  onRemove: (id: string, size: number | string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, whatsappNumber, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    let message = "Hi Dikhava! I'd like to place an order for the following items:\n\n";
    
    items.forEach(item => {
      message += `• ${item.name} (Size: ${item.selectedSize}) x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    
    message += `\n*Order Total: ₹${total}*\n\nPlease confirm availability and payment details!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="px-6 py-8 border-b border-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight">Your Cart</h2>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{items.length} Premium Items</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors bg-zinc-50 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar bg-zinc-50/20">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 bg-zinc-100 rounded-[30px] flex items-center justify-center mb-6 text-zinc-300">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-8 leading-relaxed">Your shopping bag is waiting to be filled with trends.</p>
                <button 
                  onClick={onClose}
                  className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-800 transition-all"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-5 bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm group">
                    <div className="w-24 h-24 bg-zinc-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-zinc-900 truncate pr-4 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Size: {item.selectedSize}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-zinc-50 rounded-xl px-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-black text-zinc-900 text-sm">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-8 py-10 border-t border-zinc-100 space-y-5 bg-white">
              <div className="space-y-3">
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                  <span className="font-black text-zinc-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-black uppercase tracking-widest">Shipping Fee</span>
                  <span className="text-green-600 font-black uppercase tracking-widest text-[9px]">Calculated at Chat</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-zinc-900 pt-3 border-t border-zinc-50 uppercase tracking-tighter">
                  <span>Payable</span>
                  <span>₹{total}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-2xl active:scale-[0.98]"
              >
                Place Order via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;