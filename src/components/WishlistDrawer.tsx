import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product, size: string, color: ProductColor) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C49756] fill-current" />
              <h2 className="font-heading text-lg font-black text-stone-900 uppercase">
                Your Saved Gear
              </h2>
              <span className="text-xs font-bold text-stone-500 font-mono">
                ({wishlistProducts.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-base font-bold text-stone-900 uppercase">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any rugged boots, jackets, or backpacks to save them for your next trek.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0F3822] hover:bg-[#164E2E] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white transition-all"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => onQuickView(product)}
                    className="w-20 h-20 bg-stone-100 rounded-lg p-1 shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <ProductIllustration 
                      type={product.illustrationType} 
                      colorHex={product.colors[0].hex}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => onQuickView(product)}
                          className="font-heading text-xs font-bold text-stone-900 uppercase line-clamp-1 hover:text-[#0F3822] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold font-mono text-[#0B2516] tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-400 line-through font-mono tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Move to Bag Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onMoveToCart(product, product.sizes[0], product.colors[0]);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="w-full py-1.5 px-3 bg-[#0F3822] hover:bg-[#164E2E] text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
              <span className="text-xs text-stone-500">
                Items remain saved in your browser storage for your next adventure.
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
