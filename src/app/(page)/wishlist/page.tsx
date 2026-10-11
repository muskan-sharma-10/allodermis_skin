'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useCart();
  const allProducts = getProducts();
  const savedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">Saved Skincare</span>
        </div>

        <div className="pb-8 border-b border-subtle-border mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
            PERSONAL ROUTINE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Your Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-taupe mt-2">
            Formulations and clinical treatments you have earmarked for your daily routine.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-ivory flex items-center justify-center mx-auto text-taupe">
              <Heart className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium text-charcoal">No saved items yet</h2>
              <p className="text-xs sm:text-sm text-taupe mt-2">
                Click the heart icon on any clinical formulation to bookmark it for later review or your next order.
              </p>
            </div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
            >
              <span>Explore Skincare Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
