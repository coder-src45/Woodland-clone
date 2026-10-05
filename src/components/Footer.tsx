import React, { useState } from 'react';
import { 
  TreePine, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Leaf, 
  Check, 
  Compass 
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all' | 'proplanet') => void;
  onOpenStores: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStores,
  onOpenTracking,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0B2516] text-white border-t border-[#164227]">
      
      {/* Newsletter & Adventure Club Bar */}
      <div className="border-b border-[#164227] py-10 px-4 sm:px-6 lg:px-8 bg-[#081B10]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#C49756] text-xs font-bold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Join Woodland Explorers Club</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              Get 10% Off Your Initial Expedition
            </h3>
            <p className="text-xs text-stone-400 max-w-md">
              Receive private drop alerts, technical gear guides, and invitations to Himalayan conservation treks.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="px-6 py-3 rounded-lg bg-[#164227] border border-[#C49756] text-xs font-bold text-[#EFE7DA] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C49756]" />
                <span>Welcome to the Explorers Club! Check your inbox for code <strong>ADVENTURE15</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C49756]"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C49756] hover:bg-[#b08447] text-[#0B2516] text-xs font-black uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer"
                >
                  Join Club
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#164227] flex items-center justify-center text-[#C49756] border border-[#C49756]/40">
                <TreePine className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-black tracking-wider text-white uppercase">
                WOODLAND
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Born from the rugged timberlands of Quebec, Canada in the 1950s under the Aero Group umbrella, Woodland has outfitted mountaineers, trekkers, and explorers with indestructible buff-nubuck footwear and expedition gear.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C49756] shrink-0" />
                <span>Aero Club HQ, Plot 4, Community Centre, Mayapuri, New Delhi - 110064</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C49756] shrink-0" />
                <span className="font-mono">Toll Free: 1800-419-2525 (Mon-Sat, 9AM-7PM)</span>
              </p>
            </div>
          </div>

          {/* Footwear Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#C49756]">
              Footwear Range
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('boots')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Iconic Buff Nubuck Boots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('boots')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tactical Mountain Combat Boots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Waterproof Hiking Shoes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lugged Trail Sneakers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('sandals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Amphibious Outdoor Sandals
                </button>
              </li>
            </ul>
          </div>

          {/* Apparel & Gear */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#C49756]">
              Apparel & Gear
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('jackets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All-Terrain Stormproof Shells
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('jackets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  450 GSM Heavy Fleece Hoodies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('backpacks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Expedition 45L Rucksacks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('proplanet')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Leaf className="w-3 h-3 text-emerald-400" />
                  <span>ProPlanet Eco Collection</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Special Adventure Markdowns
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#C49756]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={onOpenStores}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#C49756]" />
                  <span>Store Locator</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Truck className="w-3 h-3 text-[#C49756]" />
                  <span>Track Consignment</span>
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  15-Day Return Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Leather Care & Maintenance Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Corporate Inquiries & Bulk Gear
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Trust & Legal Bar */}
        <div className="pt-10 mt-10 border-t border-[#164227] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Woodland Worldwide (Aero Club Group). All rights reserved.</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">ProPlanet Audit Reports</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Authentic Gear
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-[#C49756]" />
              Express Indian Pan-Pin Dispatch
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
