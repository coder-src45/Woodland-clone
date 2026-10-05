import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Truck, 
  Menu, 
  X, 
  Leaf, 
  ChevronDown
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStores: () => void;
  onOpenTracking: () => void;
  onSelectCategory: (cat: ProductCategory | 'all' | 'sale' | 'proplanet') => void;
  activeCategory: string;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenStores,
  onOpenTracking,
  onSelectCategory,
  activeCategory,
  onSearchChange,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0B2516] text-[#EFE7DA] text-xs py-2 px-4 border-b border-[#164227]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C49756] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              FREE STANDARD DELIVERY ON ALL ORDERS ABOVE ₹999 · 15-DAY RETURN GUARANTEE
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <button 
              onClick={onOpenStores}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C49756]" />
              <span>Store Locator</span>
            </button>
            <span className="text-stone-600">|</span>
            <button 
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#C49756]" />
              <span>Track Order</span>
            </button>
            <span className="text-stone-600">|</span>
            <button 
              onClick={() => onSelectCategory('proplanet')}
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>ProPlanet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark & Tree Icon */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 md:hidden hover:text-stone-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-2.5 text-left group"
            >
              {/* Woodland Iconic Pine Tree Emblem */}
              <div className="w-10 h-10 rounded-full bg-[#0F3822] flex items-center justify-center text-[#C49756] shadow-sm group-hover:scale-105 transition-transform duration-200">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 2L17 9H14.5L18.5 15H14L19 21H5L10 15H5.5L9.5 9H7L12 2Z" />
                  <rect x="10.5" y="20.5" width="3" height="2" fill="#C49756" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-black tracking-wider text-[#0F3822] uppercase leading-none">
                  WOODLAND
                </span>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#8B6B38] uppercase mt-0.5">
                  EXPLORE MORE
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold tracking-wide uppercase">
            <button
              onClick={() => onSelectCategory('all')}
              className={`transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'all' 
                  ? 'text-[#0F3822] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-stone-600'
              }`}
            >
              All Gear
            </button>

            <button
              onClick={() => onSelectCategory('boots')}
              className={`transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'boots' 
                  ? 'text-[#0F3822] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-stone-600'
              }`}
            >
              Boots
            </button>

            <button
              onClick={() => onSelectCategory('shoes')}
              className={`transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'shoes' 
                  ? 'text-[#0F3822] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-stone-600'
              }`}
            >
              Hiking & Shoes
            </button>

            <button
              onClick={() => onSelectCategory('jackets')}
              className={`transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'jackets' 
                  ? 'text-[#0F3822] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-stone-600'
              }`}
            >
              Apparel
            </button>

            <button
              onClick={() => onSelectCategory('backpacks')}
              className={`transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'backpacks' 
                  ? 'text-[#0F3822] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-stone-600'
              }`}
            >
              Backpacks
            </button>

            <button
              onClick={() => onSelectCategory('proplanet')}
              className={`flex items-center gap-1 transition-colors py-2 relative hover:text-[#0F3822] ${
                activeCategory === 'proplanet' 
                  ? 'text-[#0F3822] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F3822]' 
                  : 'text-emerald-800'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>ProPlanet</span>
            </button>
          </nav>

          {/* Zone 3: Search, Wishlist & Cart Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Input Box */}
            <div className="relative hidden lg:block w-52 xl:w-64">
              <input
                type="text"
                placeholder="Search boots, jackets, gear..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-100 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822] focus:border-[#0F3822] placeholder:text-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#0F3822] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-[#0F3822] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C49756] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-2 bg-[#0F3822] hover:bg-[#164E2E] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              aria-label="Shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#C49756] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="pb-3 lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search boots, jackets, shoes, gear..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-100 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold tracking-wide uppercase">
            <button
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              All Gear
            </button>
            <button
              onClick={() => { onSelectCategory('boots'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Boots
            </button>
            <button
              onClick={() => { onSelectCategory('shoes'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Hiking Shoes
            </button>
            <button
              onClick={() => { onSelectCategory('jackets'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Apparel
            </button>
            <button
              onClick={() => { onSelectCategory('backpacks'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Backpacks
            </button>
            <button
              onClick={() => { onSelectCategory('sandals'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Sandals
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
            <button 
              onClick={() => { onOpenStores(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full py-1.5"
            >
              <MapPin className="w-4 h-4 text-[#C49756]" />
              <span>Find Nearby Woodland Store</span>
            </button>
            <button 
              onClick={() => { onOpenTracking(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full py-1.5"
            >
              <Truck className="w-4 h-4 text-[#C49756]" />
              <span>Track Existing Order</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
