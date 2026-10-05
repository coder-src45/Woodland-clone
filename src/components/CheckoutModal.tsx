import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  Package, 
  ArrowRight,
  Receipt
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('Suvashish Sharma');
  const [email, setEmail] = useState('suvashish.ele5@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('42, Ridge Valley Road, DLF Phase 1');
  const [city, setCity] = useState('Gurugram');
  const [postalCode, setPostalCode] = useState('122002');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [upiId, setUpiId] = useState('suvashish@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const shipping = rawSubtotal >= freeShippingThreshold ? 0 : 150;
  const total = rawSubtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `WD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName: fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        items,
        subtotal: rawSubtotal,
        discount: 0,
        shipping,
        total,
        paymentMethod,
        status: 'Confirmed',
        estimatedDelivery: '3 - 5 Business Days (Express Dispatch)',
      };

      setConfirmedOrder(order);
      setIsProcessing(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#0F3822] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#C49756] flex items-center justify-center text-[#0B2516]">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-black tracking-wide uppercase leading-tight">
                {confirmedOrder ? 'Order Confirmed' : 'Woodland Express Checkout'}
              </h2>
              <span className="text-[11px] text-[#D8A563]">
                {confirmedOrder ? 'Receipt & Dispatch Summary' : 'Official Aero Group Store Gateway'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-stone-900">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-700 mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase rounded-full">
                Order #{confirmedOrder.orderId} Confirmed
              </span>
              <h3 className="font-heading text-2xl font-black uppercase text-[#0B2516]">
                Preparing For Mountain Trail Dispatch
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Thank you for your order, <strong>{confirmedOrder.customerName}</strong>. A confirmation email and tracking link has been sent to <strong>{confirmedOrder.email}</strong>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-stone-200 font-semibold">
                <span>Estimated Delivery Window:</span>
                <span className="text-emerald-800 font-bold">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping Destination:</span>
                <span className="text-right font-medium">
                  {confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.postalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Selection:</span>
                <span className="font-bold uppercase text-[#0F3822]">
                  {confirmedOrder.paymentMethod === 'cod' 
                    ? 'Cash on Delivery (Pay upon delivery)' 
                    : confirmedOrder.paymentMethod === 'upi'
                    ? 'Instant UPI'
                    : 'Credit/Debit Card'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-black text-stone-900">
                <span>Total Amount Due:</span>
                <span className="font-mono text-base text-[#0B2516] tabular-nums">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-600 uppercase">Items in this dispatch:</span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {confirmedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-xs py-1 px-2 bg-stone-50 rounded">
                    <span className="font-medium text-stone-800 line-clamp-1">
                      {it.quantity}x {it.product.name} ({it.selectedSize})
                    </span>
                    <span className="font-mono tabular-nums text-stone-600 shrink-0 ml-2">
                      ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#0F3822] hover:bg-[#164E2E] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Back To Store
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Customer Contact & Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6B38] flex items-center gap-1.5">
                <span>1. Shipping Destination & Contact</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Email Address (for tracking receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Postal Code (Pincode) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6B38]">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#0F3822] bg-[#EBF3ED] text-[#0F3822] ring-1 ring-[#0F3822]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Banknote className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-bold block uppercase">Cash on Delivery</span>
                    <span className="text-[10px] text-stone-500">Pay at doorstep</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#0F3822] bg-[#EBF3ED] text-[#0F3822] ring-1 ring-[#0F3822]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-bold block uppercase">Instant UPI</span>
                    <span className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#0F3822] bg-[#EBF3ED] text-[#0F3822] ring-1 ring-[#0F3822]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-bold block uppercase">Card / NetBanking</span>
                    <span className="text-[10px] text-stone-500">Visa, Mastercard, RuPay</span>
                  </div>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                    Enter Virtual Payment Address (UPI ID):
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded bg-white"
                  />
                </div>
              )}
            </div>

            {/* Summary & Submit */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Items ({items.length}):</span>
                <span className="font-mono tabular-nums font-semibold">
                  ₹{rawSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>Standard Delivery:</span>
                <span className="font-mono tabular-nums font-semibold text-emerald-700">
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span className="uppercase">Total Payable:</span>
                <span className="font-mono text-base text-[#0B2516] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#0F3822] hover:bg-[#164E2E] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (₹{total.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
