import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package } from 'lucide-react';
import { OrderDetails } from '../types';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrder?: OrderDetails | null;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  recentOrder,
}) => {
  if (!isOpen) return null;

  const [orderQuery, setOrderQuery] = useState(recentOrder ? recentOrder.orderId : 'WD-784219');
  const [searched, setSearched] = useState(true);

  const steps = [
    {
      title: 'Order Confirmed & Verified',
      date: 'Oct 04, 2026 · 10:30 AM',
      location: 'Woodland Aero Group HQ, New Delhi',
      done: true,
      current: false,
    },
    {
      title: 'Quality Check & ProPlanet Packing',
      date: 'Oct 04, 2026 · 03:45 PM',
      location: 'Central Distribution Center, Baddi',
      done: true,
      current: false,
    },
    {
      title: 'In Transit via Express Logistics',
      date: 'Oct 05, 2026 · 07:15 AM',
      location: 'Regional Sorting Hub',
      done: true,
      current: true,
    },
    {
      title: 'Out for Doorstep Delivery',
      date: 'Expected Today by 6:00 PM',
      location: 'Nearest Delivery Facility',
      done: false,
      current: false,
    },
    {
      title: 'Delivered & Handed Over',
      date: 'Pending Delivery',
      location: 'Customer Address',
      done: false,
      current: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F3822] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C49756] flex items-center justify-center text-[#0B2516]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-black uppercase tracking-wide">
                Track Woodland Consignment
              </h2>
              <span className="text-xs text-[#D8A563]">
                Real-time express surface & air dispatch tracker
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50">
          <form 
            onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. WD-784219 or Phone)"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0F3822] hover:bg-[#164E2E] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {/* Timeline Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Consignment ID</span>
              <span className="font-mono font-bold text-stone-900">{orderQuery}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Courier Partner</span>
              <span className="font-bold text-[#0F3822]">Bluedart Pro-Air Express</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                    step.done 
                      ? 'bg-[#0F3822] text-white' 
                      : step.current 
                      ? 'bg-[#C49756] text-white animate-pulse'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-baseline justify-between">
                    <h3 className={`font-bold uppercase ${step.current ? 'text-[#0F3822]' : 'text-stone-800'}`}>
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400">{step.date}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C49756]" />
                    <span>{step.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#EBF3ED] rounded-xl text-xs text-emerald-900 border border-emerald-200 flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Driver contact info and live GPS milestone will be activated once out for delivery.</span>
          </div>
        </div>

        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
          Need assistance? Call Woodland 24x7 Expedition Support at 1800-419-2525
        </div>

      </div>
    </div>
  );
};
