import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  // Promo discount logic
  let discount = 0;
  if (appliedPromo === 'ADVENTURE15') {
    discount = Math.round(rawSubtotal * 0.15);
  } else if (appliedPromo === 'PROPLANET') {
    discount = Math.min(500, rawSubtotal);
  }

  const freeShippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const finalTotal = Math.max(0, rawSubtotal - discount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (code === 'ADVENTURE15' || code === 'PROPLANET') {
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "ADVENTURE15" for 15% off or "PROPLANET" for ₹500 off.');
    }
  };

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
              <ShoppingBag className="w-5 h-5 text-[#0F3822]" />
              <h2 className="font-heading text-lg font-black text-stone-900 uppercase">
                Your Adventure Bag
              </h2>
              <span className="text-xs font-bold text-stone-500 font-mono">
                ({items.reduce((acc, it) => acc + it.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="p-3.5 bg-[#EBF3ED] border-b border-emerald-200/60 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-semibold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  {isFreeShipping 
                    ? '🎉 You have unlocked FREE Express Delivery!' 
                    : `Add ₹${amountToFreeShipping.toLocaleString('en-IN')} more for FREE Delivery!`}
                </span>
                <span className="font-mono text-[11px] font-bold">
                  {Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0F3822] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-base font-bold text-stone-900 uppercase">
                  Your gear bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Equip yourself with genuine buff nubuck boots, all-weather shells, or tactical packs.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0F3822] hover:bg-[#164E2E] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  {/* Thumbnail Illustration */}
                  <div className="w-20 h-20 bg-white rounded-lg border border-stone-200 p-1 shrink-0 flex items-center justify-center">
                    <ProductIllustration 
                      type={item.product.illustrationType} 
                      colorHex={item.selectedColor.hex}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-heading text-xs font-bold text-stone-900 uppercase line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block" 
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:text-stone-900"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:text-stone-900"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-black font-mono text-[#0B2516] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Calculations */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3.5">
              
              {/* Promo Code Box */}
              {!appliedPromo ? (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. ADVENTURE15)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs uppercase bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-bold uppercase rounded transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-red-600 font-medium">{promoError}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 rounded bg-emerald-100 border border-emerald-300 text-xs text-emerald-900">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Coupon &ldquo;{appliedPromo}&rdquo; Applied (-₹{discount.toLocaleString('en-IN')})
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 font-semibold">
                    ₹{rawSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Delivery</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-black text-stone-900">
                  <span className="uppercase">Grand Total</span>
                  <span className="font-mono text-base text-[#0B2516] tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#0F3822] hover:bg-[#164E2E] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>256-Bit SSL Encrypted Checkout · 100% Genuine Woodland Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
