import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';
import { Product, ProductCategory, ProductColor, ProductGender } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: ProductCategory | 'all' | 'proplanet') => void;
  searchQuery: string;
  onClearSearch: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [selectedGender, setSelectedGender] = useState<'all' | ProductGender>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyProPlanet, setOnlyProPlanet] = useState<boolean>(activeCategory === 'proplanet');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && activeCategory !== 'proplanet' && p.category !== activeCategory) {
          return false;
        }
        // Proplanet filter
        if ((activeCategory === 'proplanet' || onlyProPlanet) && !p.isProPlanet) {
          return false;
        }
        // Gender filter
        if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMaterial = p.material.toLowerCase().includes(q);
          const matchTerrain = p.terrain.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchMaterial && !matchTerrain && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, activeCategory, onlyProPlanet, selectedGender, searchQuery, sortBy]);

  const categoriesList: { label: string; value: ProductCategory | 'all' | 'proplanet' }[] = [
    { label: 'All Equipment', value: 'all' },
    { label: 'Iconic Boots', value: 'boots' },
    { label: 'Hiking Shoes', value: 'shoes' },
    { label: 'Apparel & Jackets', value: 'jackets' },
    { label: 'Backpacks', value: 'backpacks' },
    { label: 'Sandals', value: 'sandals' },
    { label: 'ProPlanet 🌱', value: 'proplanet' },
  ];

  return (
    <section id="catalog" className="py-12 bg-[#F8F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Controls Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#8B6B38]">
                Expedition Catalog
              </span>
              <span className="text-xs text-stone-400">/</span>
              <span className="text-xs font-semibold text-stone-600 uppercase">
                {filteredProducts.length} Items Available
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#0B2516] uppercase mt-1">
              {activeCategory === 'all' 
                ? 'All Rugged Outdoor Gear' 
                : activeCategory === 'proplanet'
                ? 'ProPlanet Eco-Certified Collection'
                : `${activeCategory.toUpperCase()} COLLECTION`}
            </h2>
          </div>

          {/* Sort Dropdown & Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Gender Filter Tabs */}
            <div className="inline-flex rounded-lg bg-stone-200/80 p-1 text-xs font-semibold uppercase">
              {(['all', 'men', 'women'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedGender === gender
                      ? 'bg-white text-[#0B2516] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {gender === 'all' ? 'All' : gender}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 text-stone-800 text-xs font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#0F3822] cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Segmented Scroll Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                onSelectCategory(cat.value);
                if (cat.value === 'proplanet') setOnlyProPlanet(true);
                else setOnlyProPlanet(false);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-[#0F3822] text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search status indicator */}
        {searchQuery && (
          <div className="flex items-center justify-between bg-stone-200/60 rounded-lg px-4 py-2.5 mb-6 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-500" />
              <span>
                Search results for &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </span>
            </div>
            <button
              onClick={onClearSearch}
              className="text-stone-500 hover:text-stone-900 font-bold uppercase tracking-wider text-[11px] underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search or Filter State */
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-lg font-bold text-stone-900 uppercase">
              No matching outdoor gear found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
              We couldn&apos;t find any products matching your selected filters or search query. Try broadening your criteria.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedGender('all');
                onClearSearch();
                setOnlyProPlanet(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3822] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#164E2E] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
