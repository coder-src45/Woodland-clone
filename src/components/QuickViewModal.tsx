import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Leaf, 
  ShoppingBag,
  Heart
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeStatus('Express 48-Hour Delivery Available! Free standard delivery on this item.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit postal code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase Gallery */}
        <div className="md:w-1/2 bg-[#F6F7F3] p-6 sm:p-10 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-200">
          
          <div className="w-full flex items-center justify-between">
            {product.tag && (
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-[#0F3822] text-white rounded">
                {product.tag}
              </span>
            )}
            <span className="text-xs font-mono text-stone-400">
              SKU: {product.sku}
            </span>
          </div>

          {/* Main Visual */}
          <div className="w-full max-w-[320px] aspect-4/3 my-4">
            <ProductIllustration 
              type={product.illustrationType} 
              colorHex={selectedColor.hex}
            />
          </div>

          {/* Color Switcher Buttons */}
          <div className="w-full pt-4 border-t border-stone-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase">
                Selected Finish: <span className="text-[#0F3822]">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor.name === c.name 
                        ? 'border-[#0F3822] scale-110 shadow-sm' 
                        : 'border-white hover:scale-105'
                    } ${c.accentClass}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-5">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-stone-500">
              <span>{product.gender}</span>
              <span>·</span>
              <span className="text-[#8B6B38]">{product.category}</span>
              {product.isProPlanet && (
                <span className="flex items-center gap-1 text-emerald-700">
                  <Leaf className="w-3 h-3" />
                  Eco-Certified
                </span>
              )}
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-black text-stone-900 uppercase mt-1 leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800 tabular-nums">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-stone-400">
                ({product.reviewsCount} verified reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-[#0B2516] font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                  Save {discountPercent}%
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Inclusive of all taxes · Free standard delivery
              </p>
            </div>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2.5 rounded-full border transition-colors ${
                isWishlisted 
                  ? 'bg-[#C49756] text-white border-[#C49756]' 
                  : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Select Size (India / UK Sizing):
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-xs text-[#8B6B38] hover:text-[#0B2516] font-semibold flex items-center gap-1 underline cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                Size Chart
              </button>
            </div>

            {/* Size guide popover */}
            {showSizeGuide && (
              <div className="mb-3 p-3 bg-stone-100 rounded-lg text-[11px] text-stone-600 border border-stone-200">
                <p className="font-bold text-stone-800 mb-1">Standard Footwear Size Guide:</p>
                <div className="grid grid-cols-6 gap-1 text-center font-mono">
                  <div className="bg-white p-1 rounded font-bold">UK 6: 25cm</div>
                  <div className="bg-white p-1 rounded font-bold">UK 7: 26cm</div>
                  <div className="bg-white p-1 rounded font-bold">UK 8: 27cm</div>
                  <div className="bg-white p-1 rounded font-bold">UK 9: 28cm</div>
                  <div className="bg-white p-1 rounded font-bold">UK 10: 29cm</div>
                  <div className="bg-white p-1 rounded font-bold">UK 11: 30cm</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#0F3822] text-white border-[#0F3822] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Add to Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-black font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Main Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-grow py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-[#0F3822] hover:bg-[#164E2E] text-white shadow-md active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Gear Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="pt-3 border-t border-stone-200">
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wide block mb-1.5">
              Check Express Delivery Availability
            </span>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-grow px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-bold uppercase rounded-md transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                {pincodeStatus}
              </p>
            )}
          </div>

          {/* Technical Specifications Breakdown */}
          <div className="pt-3 border-t border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-[#0B2516] uppercase tracking-wide block">
              Technical Specifications & Craftsmanship
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Upper Build</span>
                <span className="text-stone-800 font-medium">{product.material}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Sole System</span>
                <span className="text-stone-800 font-medium">{product.soleType}</span>
              </div>
              <div className="col-span-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Ideal Terrain Rating</span>
                <span className="text-stone-800 font-medium">{product.terrain}</span>
              </div>
            </div>

            {/* Key Features Bullet List */}
            <ul className="text-xs text-stone-600 space-y-1 pt-1">
              {product.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-200 text-center text-[10px] font-semibold text-stone-500 uppercase">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#0F3822]" />
              <span>100% Genuine</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-[#0F3822]" />
              <span>15-Day Return</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#0F3822]" />
              <span>Free Delivery</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
