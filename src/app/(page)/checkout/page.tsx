'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowRight,
  ShoppingBag,
  User as UserIcon,
  Sparkles
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 999;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user, isAuthenticated, openAuthModal, addOrder } = useAuth();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751024',
  });

  // Auto-fill from user profile when logged in
  useEffect(() => {
    if (user) {
      const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: defaultAddr?.street || prev.address,
        apartment: defaultAddr?.apartment || prev.apartment,
        city: defaultAddr?.city || prev.city,
        state: defaultAddr?.state || prev.state,
        pincode: defaultAddr?.pincode || prev.pincode,
      }));
    }
  }, [user]);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const totalAmount = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsFormatted = cart.map((c) => ({
      id: c.product.id,
      title: c.product.title,
      price: c.variant.price,
      quantity: c.quantity,
      image: c.product.images?.[0]?.src,
    }));

    const newId = addOrder({
      total: totalAmount,
      items: itemsFormatted,
      shippingAddress: `${form.address}, ${form.city}, ${form.state} ${form.pincode}`,
      paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery',
    });

    setOrderId(newId);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="w-full bg-[#FAF8F5] text-charcoal py-16 lg:py-24 min-h-screen">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-subtle-border shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-taupe block mb-1">
                ORDER CONFIRMED
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Thank You, {form.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-taupe mt-2">
                Order Reference: <strong className="text-charcoal font-mono">{orderId}</strong>
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-subtle-border text-left space-y-3 text-xs text-taupe">
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="font-semibold text-charcoal text-right">
                  {form.address}, {form.city}, {form.state} {form.pincode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="font-semibold text-charcoal">{form.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-semibold text-charcoal uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-subtle-border font-bold text-charcoal text-sm">
                <span>Total Amount Paid:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-taupe leading-relaxed">
              Your prescription formulations are being prepared by Allodermis Clinical Dispensary under sterile guidelines. You will receive dispatch updates on WhatsApp and SMS.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors shadow-sm"
              >
                View in Account Dashboard
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ivory text-charcoal border border-subtle-border hover:bg-beige transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-charcoal py-12 lg:py-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-charcoal">Bag</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
                DISPENSARY CHECKOUT
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Patient & Delivery Details
              </h1>
            </div>

            {/* Account Status / Sign In Prompt */}
            {isAuthenticated && user ? (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-semibold text-[11px]">
                    {user.firstName[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">
                      Logged in as {user.firstName} {user.lastName}
                    </span>
                    <span className="text-[11px] text-emerald-800 block">
                      Saved address loaded • Order will sync to your account
                    </span>
                  </div>
                </div>
                <Link href="/account" className="text-xs text-charcoal underline font-medium hover:text-black">
                  View Account
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-ivory border border-subtle-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <UserIcon className="w-4 h-4 text-taupe" />
                  <span className="text-charcoal font-medium">
                    Have an Allodermis account? Sign in for saved addresses & points.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
                  <span>1. Contact Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="patient@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-subtle-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
                  <span>2. Shipping Address</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">First Name *</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Priyanka"
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Mohapatra"
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-taupe uppercase">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Plot No, Street, Landmark"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">City *</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">State *</label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-taupe uppercase">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4 border-t border-subtle-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  3. Select Payment Method
                </h3>
                <div className="space-y-2.5">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-charcoal bg-ivory' : 'border-subtle-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                      <div>
                        <span className="text-xs font-bold text-charcoal block">UPI / QR Code (Instant)</span>
                        <span className="text-[11px] text-taupe">Google Pay, PhonePe, Paytm, BHIM</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-bold">Fastest</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-charcoal bg-ivory' : 'border-subtle-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'card'} readOnly />
                      <div>
                        <span className="text-xs font-bold text-charcoal block">Credit or Debit Card</span>
                        <span className="text-[11px] text-taupe">Visa, MasterCard, RuPay with 256-Bit SSL</span>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-taupe" />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-charcoal bg-ivory' : 'border-subtle-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                      <div>
                        <span className="text-xs font-bold text-charcoal block">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-taupe">Pay at your doorstep upon verification</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#171717] text-white hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order • ₹{totalAmount.toFixed(2)}</span>
              </button>

            </form>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border space-y-6 sticky top-28">
              <h3 className="font-serif text-2xl font-medium text-charcoal">
                Order Review ({cart.length} items)
              </h3>

              <div className="divide-y divide-subtle-border max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-subtle-border flex-shrink-0">
                        <Image
                          src={item.product.images?.[0]?.src || '/images/hero-clinic.jpg'}
                          alt={item.product.title}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div className="truncate">
                        <span className="font-medium text-charcoal block truncate">{item.product.title}</span>
                        <span className="text-taupe text-[10px]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-charcoal flex-shrink-0">
                      ₹{(parseFloat(item.variant.price || '0') * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-subtle-border text-xs text-taupe">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal font-semibold">
                    {shippingFee === 0 ? <strong className="text-emerald-800">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-charcoal pt-2 border-t border-subtle-border">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-subtle-border text-[11px] text-taupe space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Licensed Medical Dispensary Delivery</span>
                </div>
                <p>
                  Shipped in discreet, temperature-monitored packaging from Allodermis Clinic in Bhubaneswar.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
