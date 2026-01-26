import React, { useState } from 'react';
import { MessageCircle, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  onAddToCart: (size: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, whatsappNumber, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | number>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleBuyNow = () => {
    const message = encodeURIComponent(`Hi Dikhava! I'm interested in the ${product.name} (Size: ${selectedSize}). Is this currently available?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleAddToCartClick = () => {
    onAddToCart(selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white border border-zinc-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/60 transition-all duration-500 flex flex-col h-full">
      {/* Image Area */}
      <div className="aspect-[4/5] overflow-hidden bg-zinc-50 relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-zinc-900 text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-xl">
              New Drop
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-xl">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Quick Size Selection Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                  selectedSize === size 
                    ? 'bg-white text-zinc-900 shadow-lg scale-110' 
                    : 'bg-white/20 text-white hover:bg-white/40 backdrop-blur-md'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">{product.brand}</p>
          <div className="flex items-center gap-1 bg-zinc-50 px-2 py-0.5 rounded-lg">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[9px] font-black text-zinc-600">4.9</span>
          </div>
        </div>
        
        <h3 className="font-bold text-zinc-900 text-lg mb-4 leading-tight group-hover:text-zinc-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl font-black text-zinc-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-zinc-400 line-through text-xs font-bold">₹{product.originalPrice}</span>
          )}
        </div>
        
        {/* Buttons Area */}
        <div className="mt-auto flex gap-2">
          <button 
            onClick={handleAddToCartClick}
            className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
              added 
                ? 'bg-zinc-100 text-zinc-500' 
                : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? 'Added' : 'Add to Cart'}
          </button>
          <button 
            onClick={handleBuyNow}
            className="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all flex items-center justify-center shadow-lg"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;