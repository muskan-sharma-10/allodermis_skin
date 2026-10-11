'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts, Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Plus, 
  Minus, 
  ChevronRight, 
  Sparkles, 
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const product = getProductByHandle(params.handle);
  const allProducts = getProducts();

  if (!product) {
    notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  // Gallery state
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ id: 1, src: product.image?.src || '/images/hero-clinic.jpg' }];
  const [selectedImage, setSelectedImage] = useState(images[0].src);

  // Variant & quantity state
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id || product.id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage' | 'delivery'>('desc');

  const currentVariant = product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0] || {
    id: product.id,
    product_id: product.id,
    title: 'Default Title',
    price: '0.00',
    compare_at_price: null,
  };

  const priceNum = parseFloat(currentVariant.price || '0');
  const compareNum = currentVariant.compare_at_price ? parseFloat(currentVariant.compare_at_price) : 0;
  const hasDiscount = compareNum > priceNum;
  const discountPercent = hasDiscount ? Math.round(((compareNum - priceNum) / compareNum) * 100) : 0;

  // Clean HTML description text
  const cleanDescription = (product.body_html || '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .trim();

  // Related products from same vendor or type
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.product_type === product.product_type || p.vendor === product.vendor))
    .slice(0, 4);

  return (
    <div className="w-full bg-white text-charcoal py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-charcoal transition-colors">Skincare</Link>
          <span>/</span>
          {product.product_type && (
            <>
              <Link href={`/collections/all?type=${encodeURIComponent(product.product_type)}`} className="hover:text-charcoal transition-colors">
                {product.product_type}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-charcoal font-medium truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Grid: Image Gallery (Left) + Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Primary Large Image View */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ivory/60 border border-subtle-border p-8 flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                className="object-contain p-6 hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                  Save {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-ivory border-2 flex-shrink-0 transition-all ${
                      selectedImage === img.src ? 'border-charcoal scale-102 shadow-sm' : 'border-subtle-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Doctor Trust Feature Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-subtle-border">
              <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                <ShieldCheck className="w-4 h-4 mx-auto text-emerald-700 mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal block">100% Genuine</span>
                <span className="text-[10px] text-taupe">Direct from Lab</span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                <Award className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal block">Rx Grade</span>
                <span className="text-[10px] text-taupe">Clinically Validated</span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                <Truck className="w-4 h-4 mx-auto text-charcoal mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal block">Fast Delivery</span>
                <span className="text-[10px] text-taupe">Dispatched in 24h</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Information & Purchase Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Vendor & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-taupe">
                Brand: {product.vendor || 'Allodermis'}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-semibold text-charcoal">4.9 / 5</span>
                <span className="text-taupe">(Dermatologist Recommended)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
              {product.title}
            </h1>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-ivory border border-subtle-border flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-charcoal">
                    ₹{priceNum.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-taupe line-through">
                      ₹{compareNum.toFixed(2)}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <span className="text-xs text-taupe mt-1 block">
                  Inclusive of all taxes • Free shipping on orders above ₹999
                </span>
              </div>

              <div className="text-right">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-1.5 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-800">In Stock</span>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                  Select Size / Variant:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedVariantId === v.id
                          ? 'border-charcoal bg-[#171717] text-white shadow-sm'
                          : 'border-subtle-border bg-white text-charcoal hover:bg-ivory'
                      }`}
                    >
                      {v.title} — ₹{parseFloat(v.price).toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center border border-subtle-border rounded-full bg-ivory px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-black text-taupe"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-charcoal min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-black text-taupe"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => addToCart(product, quantity, selectedVariantId)}
                  className="flex-1 py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#171717] text-white hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Medical Bag — ₹{(priceNum * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Save to wishlist"
                  className="p-3.5 rounded-full border border-subtle-border hover:bg-ivory text-taupe hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Consultation prompt */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-subtle-border flex items-center justify-between text-xs text-taupe">
                <span>Unsure if this fits your current treatment plan?</span>
                <Link href="/pages/contact" className="font-semibold text-charcoal hover:underline flex items-center gap-1">
                  Ask a Doctor <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Informational Tabs Accordion */}
            <div className="pt-6 border-t border-subtle-border space-y-4">
              <div className="flex border-b border-subtle-border gap-6 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-3 transition-colors ${
                    activeTab === 'desc' ? 'border-b-2 border-charcoal text-charcoal' : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Clinical Details
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-3 transition-colors ${
                    activeTab === 'ingredients' ? 'border-b-2 border-charcoal text-charcoal' : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Formulation & Safety
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-3 transition-colors ${
                    activeTab === 'usage' ? 'border-b-2 border-charcoal text-charcoal' : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Application Instructions
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-3 transition-colors ${
                    activeTab === 'delivery' ? 'border-b-2 border-charcoal text-charcoal' : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Storage & Shipping
                </button>
              </div>

              <div className="py-2 text-xs sm:text-sm text-taupe leading-relaxed">
                {activeTab === 'desc' && (
                  <div className="space-y-3">
                    <p className="font-medium text-charcoal">
                      Comprehensive medical indication and dermatological benefits:
                    </p>
                    <div 
                      className="prose prose-sm max-w-none text-taupe leading-relaxed [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4"
                      dangerouslySetInnerHTML={{ __html: cleanDescription || 'High-performance pharmaceutical formula developed for optimal cutaneous absorption and targeted skin barrier repair.' }}
                    />
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <p className="font-medium text-charcoal">
                      Active components and vehicle formulation:
                    </p>
                    <p>
                      Formulated with high-purity active therapeutic agents. Free of comedogenic fillers, harsh sulfates, and artificial fragrances. Formulated to minimize sensitizing potential on compromised skin barriers.
                    </p>
                    <div className="p-3 bg-ivory rounded-lg border border-subtle-border text-[11px] text-charcoal">
                      <strong>Dermatologist Note:</strong> Patch-test on inner forearm 24 hours prior to initial facial application if hypersensitivity history is present.
                    </div>
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="space-y-3">
                    <p className="font-medium text-charcoal">Recommended clinical application protocol:</p>
                    <ul className="list-disc pl-4 space-y-1.5">
                      <li>Cleanse target area thoroughly with a mild, non-stripping cleanser.</li>
                      <li>Pat skin completely dry before application unless instructed otherwise.</li>
                      <li>Dispense 2-3 drops or a pea-sized amount and gently distribute over affected zones.</li>
                      <li>Always follow morning routines with a broad-spectrum SPF 50+ mineral or hybrid sunscreen.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-3">
                    <p className="font-medium text-charcoal">Preservation & Logistics:</p>
                    <p>
                      Store in a cool, dry place away from direct sunlight (below 25°C). Orders dispatched directly from Allodermis Medical Dispensary in Bhubaneswar via temperature-monitored courier partners within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related & Complementary Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-subtle-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
                  COMPLEMENTARY FORMULATIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  Dermatologist-recommended pairs
                </h2>
              </div>
              <Link href="/collections/all" className="text-xs font-semibold text-charcoal hover:underline">
                View All Skincare
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
