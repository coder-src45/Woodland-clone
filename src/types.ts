export type ProductCategory = 'boots' | 'shoes' | 'jackets' | 'backpacks' | 'sandals';
export type ProductGender = 'men' | 'women' | 'unisex';

export interface ProductColor {
  name: string;
  hex: string;
  accentClass: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  gender: ProductGender;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  colors: ProductColor[];
  sizes: string[];
  material: string;
  soleType: string;
  terrain: string;
  description: string;
  keyFeatures: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isProPlanet?: boolean;
  illustrationType: 
    | 'camel_boot' 
    | 'hiking_shoe' 
    | 'weather_jacket' 
    | 'trail_sneaker' 
    | 'expedition_pack' 
    | 'outdoor_sandal' 
    | 'combat_boot' 
    | 'fleece_hoodie';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  timings: string;
  isPickupAvailable: boolean;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card';
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}
