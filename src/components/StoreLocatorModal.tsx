import React, { useState, useMemo } from 'react';
import { X, MapPin, Phone, Clock, Search, CheckCircle2, Navigation } from 'lucide-react';
import { WOODLAND_STORES } from '../data/stores';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [directionsNotice, setDirectionsNotice] = useState<string | null>(null);

  const cities = ['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Chandigarh', 'Pune', 'Kolkata', 'Dehradun'];

  const filteredStores = useMemo(() => {
    return WOODLAND_STORES.filter((store) => {
      if (selectedCity !== 'All' && store.city !== selectedCity) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          store.name.toLowerCase().includes(q) ||
          store.address.toLowerCase().includes(q) ||
          store.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCity, searchFilter]);

  const handleGetDirections = (storeName: string) => {
    setDirectionsNotice(`Opening navigation route to ${storeName}...`);
    setTimeout(() => setDirectionsNotice(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F3822] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C49756] flex items-center justify-center text-[#0B2516]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-black uppercase tracking-wide">
                Woodland Store Locator
              </h2>
              <span className="text-xs text-[#D8A563]">
                Find official Woodland stores & authorized trial hubs near you
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

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by store name, street, or locality..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3822]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* City pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#0F3822] text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {directionsNotice && (
            <div className="p-2.5 rounded bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-700 animate-spin" />
              <span>{directionsNotice}</span>
            </div>
          )}
        </div>

        {/* Store List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredStores.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              No Woodland stores found matching your search. Try another city or location.
            </div>
          ) : (
            filteredStores.map((store) => (
              <div 
                key={store.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-[#0F3822] hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm font-bold text-stone-900 uppercase">
                        {store.name}
                      </h3>
                      {store.isPickupAvailable && (
                        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Pickup Available
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C49756] shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleGetDirections(store.name)}
                    className="self-start px-3 py-1.5 bg-[#0F3822] hover:bg-[#164E2E] text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-200/60 text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-mono">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{store.timings}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-600">
          Showing {filteredStores.length} stores across India · Free size trials & returns available in-store
        </div>

      </div>
    </div>
  );
};
