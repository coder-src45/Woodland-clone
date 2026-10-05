import React, { useState } from 'react';
import { Leaf, Droplets, Recycle, TreePine, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface ProPlanetSectionProps {
  onShopProPlanet: (cat: ProductCategory | 'proplanet') => void;
}

export const ProPlanetSection: React.FC<ProPlanetSectionProps> = ({ onShopProPlanet }) => {
  const [activeTab, setActiveTab] = useState<'tanning' | 'rubber' | 'water' | 'forest'>('tanning');

  const pillars = {
    tanning: {
      title: 'Vegetable Chrome-Free Tanning',
      subtitle: 'Organic Mimosa & Chestnut Bark Extracts',
      description: 'Conventional tanneries rely on heavy chrome salts that leach into soil. Woodland pioneered closed-circuit vegetable tanning across its leather facilities, extracting natural tannins from tree bark and quebracho wood to achieve indestructible supple buff nubuck with 0% hazardous chromium.',
      stat: '100% Chrome-Free',
      statLabel: 'ProPlanet certified footwear leathers',
      icon: Leaf,
    },
    rubber: {
      title: 'Reclaimed Tyre Rubber Soles',
      subtitle: 'Zero Microplastic Leaching into Mountain Soil',
      description: 'Each Woodland cleated lug sole is compounded using vulcanized reclaimed automobile tire rubber combined with natural latex. This produces an exceptionally high abrasion resistance while preventing tons of vulcanized elastomer waste from choking mountain valleys.',
      stat: '35% Reclaimed',
      statLabel: 'Automotive rubber compound per sole unit',
      icon: Recycle,
    },
    water: {
      title: 'Closed-Loop Effluent Treatment',
      subtitle: '98% Water Recycling Across Production',
      description: 'Through multi-stage reverse osmosis and biological filtration beds, all industrial wash water in our tanning drums is scrubbed, neutralized, and returned to production cycles without releasing a single drop of contaminated effluent into local waterways.',
      stat: '98% Recycled',
      statLabel: 'Water reused in closed-loop cycles',
      icon: Droplets,
    },
    forest: {
      title: 'Himalayan Afforestation Drive',
      subtitle: 'Leave No Trace Forest Canopy Initiative',
      description: 'For every pair of ProPlanet boots purchased, Woodland funds the plantation and three-year nurturing of native pine, cedar, and oak saplings across degraded ecological corridors in the Shivalik and Garhwal Himalayan ranges.',
      stat: '1.4M+ Trees',
      statLabel: 'Planted across the Himalayan belt',
      icon: TreePine,
    },
  };

  const current = pillars[activeTab];
  const IconComponent = current.icon;

  return (
    <section className="py-16 bg-[#0B2516] text-white border-b border-[#164227] relative overflow-hidden">
      
      {/* Background Evergreen Silhouettes Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C49756 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <Leaf className="w-3.5 h-3.5" />
            <span>ProPlanet Environmental Charter</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Leave No Trace
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            True outdoor exploration respects the wilderness it crosses. From our non-toxic vegetable tanning to reclaimed cleated soles, discover how Woodland builds gear that leaves nature untamed.
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {(Object.keys(pillars) as (keyof typeof pillars)[]).map((tabKey) => {
            const tab = pillars[tabKey];
            const TabIcon = tab.icon;
            const isActive = activeTab === tabKey;

            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#164227] border-[#C49756] ring-1 ring-[#C49756] shadow-lg'
                    : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <TabIcon className={`w-5 h-5 mb-3 ${isActive ? 'text-[#C49756]' : 'text-stone-400'}`} />
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                    {tab.title}
                  </h3>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {tab.stat}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Showcase Box */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#123620] to-[#0D2918] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C49756] uppercase tracking-wider">
                <IconComponent className="w-4 h-4" />
                <span>{current.subtitle}</span>
              </div>

              <h3 className="font-heading text-2xl font-black uppercase text-white">
                {current.title}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onShopProPlanet('proplanet')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C49756] hover:bg-[#b08447] text-[#0B2516] text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  <span>Shop ProPlanet Footwear</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stat Callout Card */}
            <div className="md:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 text-center space-y-2">
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#C49756] block tracking-tight">
                {current.stat}
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">
                {current.statLabel}
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Independently Audited</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
