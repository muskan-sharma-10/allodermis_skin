'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, useCart } from '@/context/CartContext';
import { Heart, ShoppingBag, Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const mainVariant = product.variants?.[0] || {
    id: product.id,
    product_id: product.id,
    title: 'Default Title',
    price: '0.00',
    compare_at_price: null,
  };

  const priceNum = parseFloat(mainVariant.price || '0');
  const compareNum = mainVariant.compare_at_price ? parseFloat(mainVariant.compare_at_price) : 0;
  const hasDiscount = compareNum > priceNum;
  const discountPercent = hasDiscount ? Math.round(((compareNum - priceNum) / compareNum) * 100) : 0;

  const imgSrc = product.images?.[0]?.src || product.image?.src || '/images/hero-clinic.jpg';

  return (
    <div className="group relative flex flex-col bg-white border border-subtle-border rounded-2xl p-5 sm:p-6 luxury-card transition-all duration-300">
      
      {/* Top Badges & Wishlist */}
      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex flex-wrap gap-2">
          {product.product_type && (
            <span className="text-xs tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-ivory text-taupe border border-subtle-border">
              {product.product_type}
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs tracking-wider uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-taupe hover:text-rose-600 transition-colors shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-500 text-rose-500' : 'text-taupe'
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.handle}`} className="relative aspect-square w-full rounded-xl overflow-hidden bg-ivory/50 mb-5 block">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-xs text-taupe uppercase tracking-wider font-semibold block">
            {product.vendor || 'Allodermis Clinical'}
          </span>
          <Link
            href={`/products/${product.handle}`}
            className="font-medium text-base sm:text-lg text-charcoal hover:text-black line-clamp-2 leading-snug group-hover:underline decoration-subtle-border underline-offset-4 mt-1"
          >
            {product.title}
          </Link>
        </div>

        {/* Rating and Clinical Proof */}
        <div className="flex items-center gap-2 text-sm text-taupe pt-1">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-charcoal text-xs sm:text-sm">4.9</span>
          <span className="text-xs text-taupe font-medium">• Verified Dermatologist Rx</span>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-subtle-border/70 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-charcoal">
                ₹{priceNum.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-taupe line-through">
                  ₹{compareNum.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-emerald-800 font-semibold block mt-0.5">
              In Stock • 100% Genuine
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1, mainVariant.id)}
            aria-label={`Add ${product.title} to bag`}
            className="p-3 rounded-full bg-[#171717] text-white hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
