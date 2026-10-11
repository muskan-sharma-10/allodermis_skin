'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getProducts, getProductTypes, getVendors } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronDown, 
  Check, 
  Sparkles,
  ShieldCheck,
  ArrowUpDown
} from 'lucide-react';

interface CollectionPageProps {
  params: {
    handle: string;
  };
  searchParams: {
    type?: string;
    vendor?: string;
    q?: string;
  };
}

export default function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const allProducts = getProducts();
  const allTypes = getProductTypes();
  const allVendors = getVendors().slice(0, 20);

  const [selectedType, setSelectedType] = useState<string>(searchParams.type || 'All');
  const [selectedVendor, setSelectedVendor] = useState<string>(searchParams.vendor || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Handle specific collection handle
    if (params.handle === 'dandruff') {
      result = result.filter(p => 
        (typeof p.tags === 'string' && p.tags.toLowerCase().includes('dandruff')) ||
        (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes('dandruff'))) ||
        p.title.toLowerCase().includes('dandruff') ||
        p.title.toLowerCase().includes('scalp')
      );
    }

    // Category / Product type filter
    if (selectedType !== 'All') {
      result = result.filter(p => p.product_type === selectedType);
    }

    // Vendor filter
    if (selectedVendor !== 'All') {
      result = result.filter(p => p.vendor === selectedVendor);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        (p.vendor && p.vendor.toLowerCase().includes(q)) ||
        (p.product_type && p.product_type.toLowerCase().includes(q)) ||
        (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Price filter
    result = result.filter(p => {
      const price = parseFloat(p.variants?.[0]?.price || '0');
      return price <= priceRange;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => parseFloat(a.variants?.[0]?.price || '0') - parseFloat(b.variants?.[0]?.price || '0'));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parseFloat(b.variants?.[0]?.price || '0') - parseFloat(a.variants?.[0]?.price || '0'));
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [allProducts, params.handle, selectedType, selectedVendor, searchQuery, sortBy, priceRange]);

  const collectionTitle = 
    params.handle === 'dandruff' 
      ? 'Targeted Dandruff & Scalp Solutions' 
      : selectedType !== 'All' 
        ? `${selectedType} Formulations` 
        : 'All Clinical Skincare Products';

  const collectionDescription = 
    params.handle === 'dandruff'
      ? 'Dermatologist-recommended clinical shampoos, keratolytic lotions, and antifungal solutions formulated for persistent flaking and seborrheic dermatitis.'
      : 'Explore our complete catalog of 250+ genuine pharmaceutical formulations, barrier restorers, active serums, and broad-spectrum sunscreens curated by board-certified dermatologists.';

  return (
    <div className="w-full bg-white text-charcoal min-h-screen py-10 lg:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-6">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-charcoal transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-charcoal font-medium capitalize">{params.handle}</span>
        </div>

        {/* Collection Header */}
        <div className="pb-10 border-b border-subtle-border">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-2">
            PHYSICIAN-DISPENSED PHARMACEUTICALS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
            {collectionTitle}
          </h1>
          <p className="text-sm sm:text-base text-taupe mt-3 max-w-3xl leading-relaxed">
            {collectionDescription}
          </p>

          <div className="flex flex-wrap gap-4 items-center text-xs text-taupe mt-6 pt-4 border-t border-subtle-border/60">
            <span className="flex items-center gap-1.5 font-medium text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> 100% Genuine Pharmacy Sourced
            </span>
            <span>•</span>
            <span>Free Express Shipping on ₹999+</span>
            <span>•</span>
            <span>Tamper-Proof Medical Packaging</span>
          </div>
        </div>

        {/* Active Filters, Search Bar & Sort Row */}
        <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-subtle-border">
          
          {/* Search within collection */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, or ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-ivory text-xs text-charcoal border border-subtle-border focus:outline-none focus:border-charcoal transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-taupe hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-ivory border border-subtle-border text-charcoal"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Results count */}
            <span className="text-xs text-taupe hidden sm:inline">
              Showing <strong className="text-charcoal font-semibold">{filteredProducts.length}</strong> products
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-taupe hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-full bg-ivory text-xs text-charcoal border border-subtle-border focus:outline-none focus:border-charcoal transition-colors"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Products Grid */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            
            {/* Product Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal flex items-center justify-between">
                <span>Product Categories</span>
                {selectedType !== 'All' && (
                  <button onClick={() => setSelectedType('All')} className="text-[11px] text-taupe hover:underline">
                    Reset
                  </button>
                )}
              </h3>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-2 text-xs">
                <button
                  onClick={() => setSelectedType('All')}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedType === 'All' ? 'bg-[#171717] text-white font-medium' : 'text-charcoal hover:bg-ivory'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-70">{allProducts.length}</span>
                </button>
                {allTypes.map((type, i) => {
                  const count = allProducts.filter(p => p.product_type === type).length;
                  const active = selectedType === type;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        active ? 'bg-[#171717] text-white font-medium' : 'text-charcoal hover:bg-ivory'
                      }`}
                    >
                      <span className="truncate pr-2">{type}</span>
                      <span className="text-[10px] opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Price Range Filter */}
            <div className="space-y-3 pt-6 border-t border-subtle-border">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider font-bold text-charcoal">Max Price</span>
                <span className="font-semibold text-charcoal">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-charcoal cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-taupe">
                <span>₹100</span>
                <span>₹5,000+</span>
              </div>
            </div>

            {/* Brands & Vendors Filter */}
            <div className="space-y-3 pt-6 border-t border-subtle-border">
              <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal flex items-center justify-between">
                <span>Top Brands</span>
                {selectedVendor !== 'All' && (
                  <button onClick={() => setSelectedVendor('All')} className="text-[11px] text-taupe hover:underline">
                    Reset
                  </button>
                )}
              </h3>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-2 text-xs">
                <button
                  onClick={() => setSelectedVendor('All')}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedVendor === 'All' ? 'bg-[#171717] text-white font-medium' : 'text-charcoal hover:bg-ivory'
                  }`}
                >
                  <span>All Brands</span>
                </button>
                {allVendors.map((vendor, i) => {
                  const active = selectedVendor === vendor;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVendor(vendor)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        active ? 'bg-[#171717] text-white font-medium' : 'text-charcoal hover:bg-ivory'
                      }`}
                    >
                      <span className="truncate pr-2">{vendor}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clinical Guarantee Card */}
            <div className="p-5 rounded-xl bg-ivory border border-subtle-border space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-taupe block">
                Prescription Authenticity
              </span>
              <p className="text-xs text-taupe leading-relaxed">
                Allodermis ships directly from authorized pharmaceutical distributors. Every bottle is batch-coded and stored under temperature-controlled clinical conditions.
              </p>
            </div>

          </aside>

          {/* Main Products Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-ivory/50 rounded-2xl border border-subtle-border space-y-4">
                <p className="font-serif text-2xl text-charcoal">No products match your current filters.</p>
                <p className="text-xs text-taupe max-w-sm mx-auto">
                  Try clearing your search query or selecting a different category to view available formulations.
                </p>
                <button
                  onClick={() => {
                    setSelectedType('All');
                    setSelectedVendor('All');
                    setSearchQuery('');
                    setPriceRange(5000);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#171717] text-white uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-subtle-border">
              <h3 className="font-serif text-xl font-medium text-charcoal">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-taupe" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-charcoal block">Categories</span>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setSelectedType('All'); setMobileFilterOpen(false); }}
                  className="w-full text-left py-2 px-3 rounded-lg bg-ivory"
                >
                  All Categories
                </button>
                {allTypes.slice(0, 10).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedType(t); setMobileFilterOpen(false); }}
                    className={`w-full text-left py-2 px-3 rounded-lg ${selectedType === t ? 'bg-[#171717] text-white' : 'hover:bg-ivory'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
