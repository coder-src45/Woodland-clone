import React, { useState } from 'react';
import { WOODLAND_PRODUCTS } from './data/products';
import { Product, ProductCategory, ProductColor, CartItem, OrderDetails } from './types';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { ProPlanetSection } from './components/ProPlanetSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-boot-item',
      productId: 'wd-boot-01',
      product: WOODLAND_PRODUCTS[0],
      selectedSize: 'UK 9',
      selectedColor: WOODLAND_PRODUCTS[0].colors[0],
      quantity: 1,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['wd-boot-02', 'wd-jacket-01']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modal states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(null);

  // Category selection handler with scroll into view
  const handleSelectCategory = (cat: ProductCategory | 'all' | 'sale' | 'proplanet') => {
    setActiveCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product, 
    size: string, 
    color: ProductColor, 
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.productId === product.id && it.selectedSize === size && it.selectedColor.name === color.name
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${size}-${color.name}-${Date.now()}`,
            productId: product.id,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          }
        ];
      }
    });
  };

  // Update quantity in cart
  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((it) => (it.id === cartItemId ? { ...it, quantity: newQty } : it))
      );
    }
  };

  // Remove from cart
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== cartItemId));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  // Wishlisted products list
  const wishlistProducts = WOODLAND_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Order success handler
  const handleOrderSuccess = (order: OrderDetails) => {
    setLatestOrder(order);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5] text-stone-900">
      
      {/* Official Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStores={() => setIsStoresOpen(true)}
        onOpenTracking={() => setIsTrackOrderOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Banner Showcase */}
        <HeroSlider onSelectCategory={handleSelectCategory} />

        {/* Explore Categories Cards */}
        <CategoryGrid onSelectCategory={(cat) => handleSelectCategory(cat)} />

        {/* Interactive Equipment & Footwear Catalog */}
        <ProductGrid
          products={WOODLAND_PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod, sz, clr) => handleAddToCart(prod, sz, clr, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* ProPlanet Ecological Sustainability Section */}
        <ProPlanetSection onShopProPlanet={(cat) => handleSelectCategory(cat)} />

      </main>

      {/* Official Woodland Worldwide Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenStores={() => setIsStoresOpen(true)}
        onOpenTracking={() => setIsTrackOrderOpen(true)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, sz, clr, qty) => {
          handleAddToCart(prod, sz, clr, qty);
          setIsCartOpen(true);
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((pId) => pId !== id))}
        onMoveToCart={(prod, sz, clr) => {
          handleAddToCart(prod, sz, clr, 1);
          setIsCartOpen(true);
        }}
        onQuickView={(prod) => {
          setIsWishlistOpen(false);
          setQuickViewProduct(prod);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoresOpen}
        onClose={() => setIsStoresOpen(false)}
      />

      {/* Track Order Consignment Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        recentOrder={latestOrder}
      />

    </div>
  );
}
