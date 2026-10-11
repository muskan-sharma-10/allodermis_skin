'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 999;

const CartDrawer: React.FC = () => {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal, cartCount } = useCart();

  if (!isOpen) return null;

  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-subtle-border animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-subtle-border flex items-center justify-between bg-ivory">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-charcoal" />
              <h2 className="font-serif text-xl font-medium text-charcoal">Your Medical Bag</h2>
              <span className="text-xs bg-beige text-charcoal px-2 py-0.5 rounded-full font-semibold">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white text-taupe hover:text-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-[#FAF7F2] border-b border-subtle-border">
            {freeShippingDiff > 0 ? (
              <p className="text-xs text-charcoal mb-1.5 flex items-center justify-between">
                <span>Add <strong className="text-black font-semibold">₹{freeShippingDiff.toFixed(0)}</strong> more for <strong className="text-emerald-700">Free Express Delivery</strong></span>
                <span className="text-[11px] text-taupe">{progressPercent}%</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Congratulations! You’ve unlocked Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-subtle-border h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-charcoal h-full rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-subtle-border/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-taupe">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal font-medium">Your bag is empty</h3>
                  <p className="text-xs text-taupe mt-1 max-w-xs">
                    Explore our dermatologist-formulated active serums, broad-spectrum sunscreens, and medical barrier restorers.
                  </p>
                </div>
                <Link
                  href="/collections/all"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                >
                  Explore Skincare Store
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => {
                const imgUrl = item.product.images?.[0]?.src || item.product.image?.src || '/images/hero-clinic.jpg';
                const price = parseFloat(item.variant.price || '0');

                return (
                  <div key={`${item.product.id}-${item.variant.id}-${idx}`} className="pt-4 first:pt-0 flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-ivory flex-shrink-0 border border-subtle-border">
                      <Image
                        src={imgUrl}
                        alt={item.product.title}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/products/${item.product.handle}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-medium text-charcoal hover:text-black line-clamp-2 leading-snug"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant.id)}
                            className="text-taupe hover:text-destructive p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.variant.title !== 'Default Title' && (
                          <span className="text-[11px] text-taupe block mt-0.5">
                            Variant: {item.variant.title}
                          </span>
                        )}
                        <span className="text-[11px] text-taupe block">
                          Brand: {item.product.vendor}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-subtle-border rounded-lg bg-ivory">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                            className="px-2 py-1 text-charcoal hover:text-black text-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-charcoal min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                            className="px-2 py-1 text-charcoal hover:text-black text-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-charcoal">
                          ₹{(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-subtle-border bg-ivory/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-taupe">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-taupe">
                  <span>Estimated Shipping</span>
                  <span className="text-charcoal font-medium">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      'Calculated at Checkout'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-charcoal pt-2 border-t border-subtle-border">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#171717] text-white hover:bg-black transition-all shadow-md hover:scale-[1.01]"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-full text-xs font-medium text-taupe hover:text-charcoal transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-taupe pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Authentic Pharmacy Formulations & Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
