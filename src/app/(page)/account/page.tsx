'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, Address } from '@/context/AuthContext';
import { 
  User as UserIcon, 
  ShoppingBag, 
  MapPin, 
  FileText, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  Calendar,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { 
    user, 
    isAuthenticated, 
    logout, 
    updateProfile, 
    addAddress, 
    removeAddress, 
    setDefaultAddress,
    openAuthModal
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'prescriptions' | 'addresses' | 'profile'>('orders');

  // New Address Modal state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    apartment: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751024',
    isDefault: false,
  });

  // Edit Profile state
  const [editName, setEditName] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // If not logged in
  if (!isAuthenticated || !user) {
    return (
      <div className="w-full min-h-[80vh] bg-[#FAF8F5] py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border border-subtle-border shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-ivory border border-subtle-border flex items-center justify-center mx-auto text-charcoal">
            <UserIcon className="w-8 h-8 text-charcoal" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-taupe block">
              PATIENT & CLIENT PORTAL
            </span>
            <h1 className="font-serif text-3xl text-charcoal">
              Welcome to Allodermis
            </h1>
            <p className="text-sm text-taupe leading-relaxed">
              Please sign in to view your clinical skincare orders, dermatologist prescriptions, and saved consultation details.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#171717] text-white hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Sign In to Your Account
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/account/register"
              className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-semibold bg-ivory text-charcoal border border-subtle-border hover:bg-beige/70 transition-all block"
            >
              Register New Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.street) return;

    addAddress(newAddress);
    setShowAddAddress(false);
    setNewAddress({
      name: '',
      phone: '',
      street: '',
      apartment: '',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751024',
      isDefault: false,
    });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editName);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top User Greeting Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-subtle-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#171717] text-[#EAE1D7] flex items-center justify-center font-serif text-2xl sm:text-3xl font-medium shrink-0 border-2 border-beige">
              {user.firstName[0]}
              {user.lastName ? user.lastName[0] : ''}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  {user.firstName} {user.lastName}
                </h1>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {user.memberTier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-taupe flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {user.email}
                </span>
                {user.phone && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> {user.phone}
                    </span>
                  </>
                )}
                <span>•</span>
                <span>Member since {user.joinedDate}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/collections/all"
              className="py-2.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ivory text-charcoal border border-subtle-border hover:bg-beige/60 transition-colors"
            >
              Browse Skincare
            </Link>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="py-2.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Left Nav Tabs & Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs (Sidebar) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-subtle-border shadow-sm space-y-1.5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-charcoal hover:bg-ivory'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                Orders ({user.orders.length})
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'prescriptions'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-charcoal hover:bg-ivory'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                Prescriptions ({user.prescriptions.length})
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-charcoal hover:bg-ivory'
              }`}
            >
              <span className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                Saved Addresses ({user.addresses.length})
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-charcoal hover:bg-ivory'
              }`}
            >
              <span className="flex items-center gap-3">
                <UserIcon className="w-4 h-4" />
                Account Details
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h2 className="font-serif text-2xl text-charcoal">Your Order History</h2>
                  <span className="text-xs text-taupe">Total: {user.orders.length} Orders</span>
                </div>

                {user.orders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-subtle-border space-y-4">
                    <ShoppingBag className="w-12 h-12 text-taupe/50 mx-auto" />
                    <div className="space-y-1">
                      <p className="text-base font-medium text-charcoal">No orders placed yet</p>
                      <p className="text-xs text-taupe">
                        Discover board-certified formulations tailored for your skin type.
                      </p>
                    </div>
                    <Link
                      href="/collections/all"
                      className="inline-flex py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                    >
                      Shop Dermatologist Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-subtle-border shadow-sm space-y-5"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-subtle-border">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-serif font-bold text-charcoal">
                                Order #{order.id}
                              </span>
                              <span className="text-xs text-taupe">• Placed on {order.date}</span>
                            </div>
                            <span className="text-xs text-taupe">
                              Shipped to: {order.shippingAddress}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              {order.status}
                            </span>
                            <span className="font-semibold text-base text-charcoal">
                              ₹{order.total.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-ivory border border-subtle-border flex items-center justify-center font-serif text-xs text-charcoal shrink-0">
                                  {idx + 1}
                                </div>
                                <div>
                                  <p className="font-medium text-charcoal leading-snug">{item.title}</p>
                                  <p className="text-xs text-taupe">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-medium text-charcoal text-sm">
                                ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div className="pt-3 border-t border-subtle-border flex items-center justify-between text-xs text-taupe">
                          <span>Paid via {order.paymentMethod}</span>
                          <span className="font-medium text-charcoal hover:underline cursor-pointer">
                            View Clinical Invoice
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PRESCRIPTIONS */}
            {activeTab === 'prescriptions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h2 className="font-serif text-2xl text-charcoal">
                    Dermatology Prescriptions & Advice
                  </h2>
                  <span className="text-xs text-taupe">Verified by Dr. Alok Sahoo</span>
                </div>

                {user.prescriptions.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-subtle-border space-y-4">
                    <FileText className="w-12 h-12 text-taupe/50 mx-auto" />
                    <div className="space-y-1">
                      <p className="text-base font-medium text-charcoal">No prescriptions on record</p>
                      <p className="text-xs text-taupe">
                        Consult with our dermatologists to receive digital prescription regimen.
                      </p>
                    </div>
                    <Link
                      href="/pages/contact"
                      className="inline-flex py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                    >
                      Book Consultation
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.prescriptions.map((rx) => (
                      <div
                        key={rx.id}
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-subtle-border shadow-sm space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-subtle-border">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-lg font-semibold text-charcoal">
                                Prescription #{rx.id}
                              </span>
                              <span className="text-xs bg-ivory px-2.5 py-0.5 rounded-full border border-subtle-border text-charcoal font-medium">
                                Issued: {rx.date}
                              </span>
                            </div>
                            <span className="text-xs text-taupe flex items-center gap-1.5 mt-0.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              {rx.doctor}
                            </span>
                          </div>

                          <div className="text-xs text-taupe sm:text-right">
                            <span className="block text-[11px] uppercase tracking-wider font-semibold text-taupe">
                              Scheduled Follow-Up
                            </span>
                            <span className="font-medium text-charcoal">{rx.followUpDate}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-xs uppercase tracking-wider font-semibold text-taupe block mb-1">
                            Clinical Diagnosis & Evaluation:
                          </span>
                          <p className="text-sm font-medium text-charcoal bg-ivory/60 p-3 rounded-xl border border-subtle-border/80">
                            {rx.diagnosis}
                          </p>
                        </div>

                        <div>
                          <span className="text-xs uppercase tracking-wider font-semibold text-taupe block mb-2">
                            Prescribed Protocol & Treatment Routine:
                          </span>
                          <ul className="space-y-2">
                            {rx.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                  {i + 1}
                                </span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-1">
                  <h2 className="font-serif text-2xl text-charcoal">Saved Delivery Addresses</h2>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add New Address
                  </button>
                </div>

                {/* Add Address Form Accordion */}
                {showAddAddress && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-subtle-border shadow-md space-y-4 animate-in fade-in"
                  >
                    <h3 className="font-serif text-lg text-charcoal">Add Delivery Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                          Full Name / Recipient
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          placeholder="Priya Sharma"
                          className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                        Street Address / Landmark
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        placeholder="Plot 42, DLF Cyber City, Patia"
                        className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                          Apartment / Suite
                        </label>
                        <input
                          type="text"
                          value={newAddress.apartment}
                          onChange={(e) => setNewAddress({ ...newAddress, apartment: e.target.value })}
                          placeholder="Flat 602"
                          className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          placeholder="751024"
                          className="w-full px-3.5 py-2.5 bg-ivory rounded-xl text-xs text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="setDefaultNew"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="rounded border-subtle-border text-charcoal"
                      />
                      <label htmlFor="setDefaultNew" className="text-xs text-charcoal">
                        Set as default shipping address for Allodermis orders
                      </label>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-ivory text-charcoal hover:bg-beige transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-3xl p-6 border border-subtle-border shadow-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-charcoal">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#171717] text-white">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-taupe leading-relaxed">
                          {addr.street}
                          {addr.apartment ? `, ${addr.apartment}` : ''}
                          <br />
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-xs text-charcoal font-medium">{addr.phone}</p>
                      </div>

                      <div className="pt-3 border-t border-subtle-border flex items-center justify-between">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-xs text-charcoal hover:underline font-medium"
                          >
                            Set as default
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" /> Default Address
                          </span>
                        )}

                        <button
                          onClick={() => removeAddress(addr.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-subtle-border shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-charcoal">Account & Security</h2>
                  <p className="text-xs text-taupe">
                    Update personal details and manage medical access permissions.
                  </p>
                </div>

                {profileSaved && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your profile information was updated successfully.</span>
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editName.firstName}
                        onChange={(e) => setEditName({ ...editName, firstName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory rounded-xl text-xs sm:text-sm text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editName.lastName}
                        onChange={(e) => setEditName({ ...editName, lastName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory rounded-xl text-xs sm:text-sm text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                      Email Address (Locked)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-4 py-2.5 bg-ivory/50 rounded-xl text-xs sm:text-sm text-taupe border border-subtle-border cursor-not-allowed"
                    />
                    <span className="text-[11px] text-taupe mt-1 block">
                      To change email, please contact clinic support for verification.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editName.phone}
                      onChange={(e) => setEditName({ ...editName, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-ivory rounded-xl text-xs sm:text-sm text-charcoal border border-subtle-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
