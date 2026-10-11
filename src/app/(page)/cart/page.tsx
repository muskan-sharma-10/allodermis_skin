'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Truck
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, cartCount, clearCart } = useCart();

  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="w-full bg-white text-charcoal py-12 lg:py-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">Medical Shopping Bag</span>
        </div>

        <div className="pb-8 border-b border-subtle-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
              ORDER OVERVIEW
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Your Shopping Bag
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-taupe hover:text-destructive self-start sm:self-auto"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-ivory flex items-center justify-center mx-auto text-taupe">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium text-charcoal">Your bag is currently empty</h2>
              <p className="text-xs sm:text-sm text-taupe mt-2">
                Discover authentic physician-formulated active serums, mineral sunscreens, and medical barrier restorers in our dispensary.
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
          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Shipping Progress */}
              <div className="p-4 rounded-2xl bg-ivory border border-subtle-border space-y-2">
                <div className="flex justify-between text-xs text-charcoal">
                  <span>
                    {freeShippingDiff > 0 ? (
                      <>Add <strong>₹{freeShippingDiff.toFixed(0)}</strong> more for <strong>Free Express Shipping</strong></>
                    ) : (
                      <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> You unlocked Free Express Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-taupe">{progressPercent}%</span>
                </div>
                <div className="w-full bg-subtle-border h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-charcoal h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-subtle-border border-y border-subtle-border">
                {cart.map((item, idx) => {
                  const imgUrl = item.product.images?.[0]?.src || item.product.image?.src || '/images/hero-clinic.jpg';
                  const price = parseFloat(item.variant.price || '0');

                  return (
                    <div key={idx} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-ivory border border-subtle-border flex-shrink-0">
                          <Image
                            src={imgUrl}
                            alt={item.product.title}
                            fill
                            className="object-contain p-2"
                            sizes="96px"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-taupe block">
                            {item.product.vendor}
                          </span>
                          <Link
                            href={`/products/${item.product.handle}`}
                            className="font-medium text-sm text-charcoal hover:underline"
                          >
                            {item.product.title}
                          </Link>
                          {item.variant.title !== 'Default Title' && (
                            <span className="text-xs text-taupe block">
                              Variant: {item.variant.title}
                            </span>
                          )}
                          <span className="text-xs text-charcoal font-semibold block sm:hidden">
                            ₹{price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-subtle-border rounded-full bg-ivory px-3 py-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                            className="p-1 hover:text-black text-taupe"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-charcoal min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                            className="p-1 hover:text-black text-taupe"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-lg font-bold text-charcoal min-w-[80px] text-right hidden sm:block">
                          ₹{(price * item.quantity).toFixed(2)}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variant.id)}
                          className="text-taupe hover:text-destructive p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border space-y-6 sticky top-28 shadow-sm">
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-taupe border-b border-subtle-border pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="text-charcoal font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-charcoal font-semibold">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-800">FREE</span>
                      ) : (
                        '₹99.00'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span className="text-charcoal font-semibold">Included</span>
                  </div>
                </div>

                <div className="flex justify-between text-base font-bold text-charcoal">
                  <span>Estimated Total</span>
                  <span>
                    ₹{(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#171717] text-white hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/collections/all"
                    className="w-full py-3 rounded-full text-xs font-medium text-center text-taupe hover:text-charcoal block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="pt-2 border-t border-subtle-border text-[11px] text-taupe space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Genuine Pharmacy Formulations</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <Truck className="w-4 h-4" />
                    <span>Dispatched in Temperature-Controlled Packaging</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
