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
    <div className="group relative flex flex-col bg-white border border-subtle-border rounded-xl p-4 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-[#DCD5CD]">
      
      {/* Top Badges & Wishlist */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex flex-wrap gap-1.5">
          {product.product_type && (
            <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full bg-ivory text-taupe border border-subtle-border">
              {product.product_type}
            </span>
          )}
          {hasDiscount && (
            <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
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
          className="p-1.5 rounded-full bg-white/80 hover:bg-white text-taupe hover:text-rose-600 transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-500 text-rose-500' : 'text-taupe'
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.handle}`} className="relative aspect-square w-full rounded-lg overflow-hidden bg-ivory/60 mb-4 block">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[11px] text-taupe uppercase tracking-wider font-medium block">
            {product.vendor || 'Allodermis Clinical'}
          </span>
          <Link
            href={`/products/${product.handle}`}
            className="font-medium text-sm text-charcoal hover:text-black line-clamp-2 leading-snug group-hover:underline decoration-subtle-border underline-offset-4 mt-0.5"
          >
            {product.title}
          </Link>
        </div>

        {/* Rating and Clinical Proof */}
        <div className="flex items-center gap-1.5 text-xs text-taupe pt-1">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-charcoal text-[11px]">4.9</span>
          <span className="text-[11px] text-taupe">(Verified Rx)</span>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-subtle-border/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-charcoal">
                ₹{priceNum.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-taupe line-through">
                  ₹{compareNum.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-medium block">
              In Stock • Rx Verified
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1, mainVariant.id)}
            aria-label={`Add ${product.title} to bag`}
            className="p-2.5 rounded-full bg-[#171717] text-white hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
