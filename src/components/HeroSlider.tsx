import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Award, Compass, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { ProductIllustration } from './ProductIllustrations';
import { ProductCategory } from '../types';

interface HeroSliderProps {
  onSelectCategory: (cat: ProductCategory | 'all' | 'proplanet') => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative bg-[#0B2516] text-white overflow-hidden">
      {/* Background Topographic / Outdoor Subtle Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C49756 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-[#C49756]/40 text-[#C49756] text-xs font-bold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>{slide.tagline}</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none text-white text-balance">
                {slide.headline}
              </h1>
              <p className="text-lg sm:text-xl text-[#D8A563] font-medium tracking-wide">
                {slide.subheading}
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectCategory(slide.filterCategory as ProductCategory)}
                className="px-6 py-3.5 bg-[#C49756] hover:bg-[#b08447] text-[#0B2516] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {slide.ctaPrimary}
              </button>
              <button
                onClick={() => onSelectCategory(slide.filterCategory === 'jackets' ? 'jackets' : 'all')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all active:scale-95 cursor-pointer"
              >
                {slide.ctaSecondary}
              </button>
            </div>

            {/* Micro specs */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 text-xs text-stone-300 max-w-lg">
              <div>
                <span className="block font-bold text-white uppercase text-[11px]">Upper Leather</span>
                <span className="text-stone-400">2.2mm Buff Nubuck</span>
              </div>
              <div>
                <span className="block font-bold text-white uppercase text-[11px]">Traction Cleats</span>
                <span className="text-stone-400">Deep Vulcanized Lugs</span>
              </div>
              <div>
                <span className="block font-bold text-white uppercase text-[11px]">Eco Impact</span>
                <span className="text-emerald-400">Zero Chromium Tan</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-b from-[#164227]/60 to-[#0F3822]/80 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl backdrop-blur-sm group">
              
              {/* Top Card Badge */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded bg-[#C49756] text-[#0B2516] font-extrabold uppercase tracking-wider text-[10px]">
                  {slide.badge}
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  AERO-SERIES 2026
                </span>
              </div>

              {/* Large Product Illustration */}
              <div className="w-full max-w-[320px] aspect-4/3 transition-transform duration-500 group-hover:scale-105">
                <ProductIllustration type={slide.illustration} />
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Shield className="w-3.5 h-3.5 text-[#C49756]" />
                  15-Day Trails Trial
                </span>
                <button
                  onClick={() => onSelectCategory(slide.filterCategory as ProductCategory)}
                  className="text-[#C49756] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="flex items-center justify-between pt-8 mt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-8 bg-[#C49756]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Pillars Bar */}
      <div className="bg-[#081B10] border-t border-[#164227] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#C49756] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px]">100% Buff Nubuck</p>
              <p className="text-stone-400 text-[10px]">Toughest Grade Hand-Selected Leathers</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#C49756] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px]">Vibram-Grade Traction</p>
              <p className="text-stone-400 text-[10px]">Cleated Multi-Surface Grip Outsoles</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px]">ProPlanet Certified</p>
              <p className="text-stone-400 text-[10px]">Eco-Friendly Chrome-Free Tanning</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#C49756] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px]">Since 1950s Quebec</p>
              <p className="text-stone-400 text-[10px]">Aero Group Extreme Heritage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
