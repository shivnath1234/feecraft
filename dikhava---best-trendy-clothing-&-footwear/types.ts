export enum Category {
  SNEAKERS = 'Sneakers',
  CROCS_SLIPPERS = 'Crocs and slippers',
  SHIRTS = 'Shirts',
  T_SHIRTS = 'T-shirts',
  PANTS_TRACKPANTS = 'Pants and Track Pants',
  SWEATSHIRTS = 'Sweat Shirts',
  JACKETS = 'All Type Jackets',
  PREMIUM_SETS = 'Premium Sets',
  ESSENTIALS = 'Essential'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: Category;
  description: string;
  images: string[];
  sizes: (number | string)[];
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  selectedSize: number | string;
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  logoUrl: string;
  announcementText: string;
  whatsappNumber: string;
  instagramLink: string;
  youtubeLink: string;
  mapsLink: string;
  heroSlides: string[];
}