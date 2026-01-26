
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'croc-olive',
    name: 'Classic Clog - Olive Green',
    brand: 'Crocs',
    price: 2499,
    originalPrice: 3499,
    category: Category.CROCS_SLIPPERS,
    description: 'Iconic olive green clogs with signature ventilation and comfort.',
    images: ['https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'],
    sizes: [7, 8, 9, 10],
    colors: ['Olive'],
    isNew: true
  },
  {
    id: 'amg-slides',
    name: 'AMG Petronas F1 Slides',
    brand: 'Puma x AMG',
    price: 3499,
    originalPrice: 4499,
    category: Category.CROCS_SLIPPERS,
    description: 'Official Mercedes-AMG Petronas Formula One team slides in signature teal.',
    images: ['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800'],
    sizes: [7, 8, 9, 10, 11],
    colors: ['Teal/Silver'],
    isNew: true
  },
  {
    id: 'luxury-slides',
    name: 'Gold Monogram Slides',
    brand: 'Premium Selection',
    price: 1899,
    category: Category.CROCS_SLIPPERS,
    description: 'Luxury navy blue slides with gold-tone hardware monogram.',
    images: ['https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?auto=format&fit=crop&q=80&w=800'],
    sizes: [6, 7, 8, 9],
    colors: ['Navy/Gold'],
    isSale: true
  },
  {
    id: 'croc-yellow',
    name: 'Classic Clog - Lemon Yellow',
    brand: 'Crocs',
    price: 2499,
    category: Category.CROCS_SLIPPERS,
    description: 'Bright lemon yellow comfort clogs for a bold look.',
    images: ['https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'],
    sizes: [4, 5, 6, 7, 8],
    colors: ['Yellow']
  },
  {
    id: 'croc-navy',
    name: 'Baya Clog - Navy Blue',
    brand: 'Crocs',
    price: 2699,
    category: Category.CROCS_SLIPPERS,
    description: 'Deep navy blue Baya series clogs with enhanced side ventilation.',
    images: ['https://images.unsplash.com/photo-1596702994242-990797370a9b?auto=format&fit=crop&q=80&w=800'],
    sizes: [7, 8, 9, 10, 11],
    colors: ['Navy']
  },
  {
    id: 's1',
    name: 'Retro Blue & Tan Craft',
    brand: 'Dikhava Selection',
    price: 4999,
    category: Category.SNEAKERS,
    description: 'Premium blue and white leather construction with tan accents.',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'],
    sizes: [7, 8, 9, 10],
    colors: ['Blue/White/Tan'],
    isNew: true
  },
  {
    id: 't1',
    name: 'Graphic Street Tee',
    brand: 'Urban Vibes',
    price: 999,
    category: Category.T_SHIRTS,
    description: 'Heavyweight oversized tee with unique street art graphic.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black'],
    isNew: true
  },
  {
    id: 'j1',
    name: 'Classic Puffer Jacket',
    brand: 'Winter Shield',
    price: 3499,
    category: Category.JACKETS,
    description: 'Water-resistant puffer jacket with premium down filling.',
    images: ['https://images.unsplash.com/photo-1539533377285-3412704e5a44?auto=format&fit=crop&q=80&w=800'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black']
  }
];
