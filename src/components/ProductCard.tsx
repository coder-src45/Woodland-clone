import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Top Media Showcase Container */}
      <div className="relative w-full aspect-4/3 bg-[#F7F7F5] flex items-center justify-center p-6 overflow-hidden">
        
        {/* Subtle Tag (No pill clusters, clean tag) */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#0B2516] text-[#EFE7DA] rounded">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted 
              ? 'bg-[#C49756] text-white' 
              : 'bg-white/90 text-stone-600 hover:text-stone-900 shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Visual Illustration */}
        <div className="w-full h-full max-w-[240px] max-h-[190px] transition-transform duration-300 group-hover:scale-105">
          <ProductIllustration 
            type={product.illustrationType} 
            colorHex={selectedColor.hex}
          />
        </div>

        {/* Quick View Floating Overlay on Desktop Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-4 py-1.5 bg-stone-900/90 hover:bg-stone-900 text-white rounded text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-md whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        
        <div>
          {/* Muted Metadata with separator */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            <span>{product.gender}</span>
            <span>·</span>
            <span className="text-[#8B6B38]">{product.category}</span>
            {product.isProPlanet && (
              <>
                <span>·</span>
                <span className="text-emerald-700">ProPlanet</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-heading text-sm font-bold text-stone-900 group-hover:text-[#0F3822] transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-stone-800 tabular-nums">
              {product.rating}
            </span>
            <span className="text-[11px] text-stone-400 tabular-nums">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor.name === color.name 
                  ? 'ring-2 ring-[#0F3822] ring-offset-1 scale-110' 
                  : 'border-stone-300 hover:scale-105'
              } ${color.accentClass}`}
              aria-label={color.name}
            />
          ))}
          <span className="text-[10px] text-stone-400 ml-1 truncate">
            {selectedColor.name}
          </span>
        </div>

        {/* Pricing Baseline & Buy CTA */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-[#0B2516] font-mono tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">
              Save {discountPercent}%
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-700 text-white'
                : 'bg-[#0F3822] hover:bg-[#164E2E] text-white active:scale-95'
            }`}
            aria-label="Add to cart"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
