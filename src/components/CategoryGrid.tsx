import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'boots' as ProductCategory,
      title: 'Iconic Boots',
      tagline: 'Buff Nubuck & Cleated Lugs',
      count: '34 Styles',
      illustration: 'camel_boot',
      colorHex: '#C49756',
      bgGradient: 'from-[#FAF6F0] to-[#EFE7DA]',
    },
    {
      id: 'shoes' as ProductCategory,
      title: 'Hiking & Trail',
      tagline: 'Waterproof & Wet-Grip Tread',
      count: '28 Styles',
      illustration: 'hiking_shoe',
      colorHex: '#1D3B2B',
      bgGradient: 'from-[#F2F6F3] to-[#E2EBE5]',
    },
    {
      id: 'jackets' as ProductCategory,
      title: 'Technical Apparel',
      tagline: 'Stormproof Shells & Thermal Fleeces',
      count: '42 Styles',
      illustration: 'weather_jacket',
      colorHex: '#0F3822',
      bgGradient: 'from-[#F3F7F4] to-[#DEE8E1]',
    },
    {
      id: 'backpacks' as ProductCategory,
      title: 'Expedition Packs',
      tagline: 'Waxed Canvas & Molle Straps',
      count: '16 Styles',
      illustration: 'expedition_pack',
      colorHex: '#2E3D2F',
      bgGradient: 'from-[#F5F4EE] to-[#EAE7DC]',
    },
    {
      id: 'sandals' as ProductCategory,
      title: 'Trail Sandals',
      tagline: 'Hydrophobic Webbing & Siped Soles',
      count: '19 Styles',
      illustration: 'outdoor_sandal',
      colorHex: '#9E6B2C',
      bgGradient: 'from-[#FAF5EF] to-[#EFE5D6]',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#8B6B38] uppercase">
              Curated Explorer Categories
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#0B2516] uppercase mt-1">
              Engineered For Every Terrain
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-2 sm:mt-0 max-w-sm">
            Discover rugged footwear, storm-tested technical apparel, and tactical gear tailored for uncharted territory.
          </p>
        </div>

        {/* 5-Column Responsive Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group text-left p-4 rounded-xl border border-stone-200 hover:border-[#0F3822] hover:shadow-md transition-all duration-200 flex flex-col justify-between bg-stone-50/60 hover:bg-white cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                    {cat.count}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-stone-200/80 group-hover:bg-[#0F3822] group-hover:text-white flex items-center justify-center text-stone-600 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="font-heading text-base font-bold text-[#0B2516] uppercase mt-2 group-hover:text-[#0F3822] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {cat.tagline}
                </p>
              </div>

              {/* Graphic container */}
              <div className="w-full aspect-square mt-4 p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ProductIllustration type={cat.illustration} colorHex={cat.colorHex} />
              </div>

              <div className="w-full pt-2 border-t border-stone-200/60 text-center">
                <span className="text-[11px] font-bold text-[#8B6B38] group-hover:text-[#0F3822] uppercase tracking-wider">
                  Explore Range &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
