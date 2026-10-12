'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Phone,
  ShieldCheck,
  ArrowRight,
  User as UserIcon,
  LogOut,
  ChevronRight,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import treatmentsMegamenuData from '@/data/treatments_megamenu.json';
import categoriesData from '@/data/categories.json';
import { getFeaturedProducts } from '@/lib/products';

interface TreatmentItem {
  title: string;
  href: string;
  img: string;
}

interface TreatmentCategory {
  id: string;
  category: string;
  items: TreatmentItem[];
}

const Header = () => {
  const pathname = usePathname();
  const { cartCount, setIsOpen: openCartDrawer, wishlist } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active Category inside the Treatments Megamenu
  const treatmentCategories = treatmentsMegamenuData as TreatmentCategory[];
  const [selectedTreatmentCat, setSelectedTreatmentCat] = useState<string>(
    treatmentCategories[0]?.id || 'laserhair'
  );

  const featuredSearchProducts = getFeaturedProducts(4);

  // Prevent background scrolling when megamenu, mobile menu, or search modal is open
  useEffect(() => {
    if (activeDropdown || mobileMenuOpen || searchOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [activeDropdown, mobileMenuOpen, searchOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setSearchOpen(false);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const activeCategoryData = treatmentCategories.find(c => c.id === selectedTreatmentCat) || treatmentCategories[0];

  return (
    <>
      {/* Dimmed backdrop overlay when dropdown is open - prevents interacting with background and locks focus */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-30 transition-opacity duration-200"
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}

      {/* Unified Sticky Header Wrapper - Fixed seamlessly at top with zero scroll jump */}
      <div className="sticky top-0 z-40 w-full shadow-xs">
        
        {/* Top Clinical Announcement Bar with 30% Promotion */}
        <div className="bg-[#171717] text-[#EAE1D7] text-xs py-2 px-4 border-b border-[#2D2A28]">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold tracking-wide truncate">
                Up to 30% Off on all Treatments • Board-Certified Dermatology Clinic & Skincare Store
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-5 text-[#D5CDC4] shrink-0">
              <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EAE1D7]" /> 100% Genuine Formulations
              </span>
              <span className="text-[#8C8177]">|</span>
              <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-[#EAE1D7]" /> KIIT Road, Patia, Bhubaneswar
              </span>
              <span className="text-[#8C8177]">|</span>
              <Link href="/pages/contact" className="hover:text-white transition-colors underline underline-offset-2 font-semibold whitespace-nowrap">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <header
          onMouseLeave={() => setActiveDropdown(null)}
          className={`w-full transition-all duration-300 relative ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-subtle-border'
              : 'bg-white border-b border-subtle-border/70'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-3 xl:gap-8">
              
              {/* Logo */}
              <div className="flex items-center shrink-0">
                <Link 
                  href="/" 
                  onClick={() => setActiveDropdown(null)}
                  className="group flex flex-col"
                >
                  <span className="font-serif text-2xl sm:text-[30px] tracking-tight font-normal text-charcoal group-hover:text-black transition-colors whitespace-nowrap">
                    Allodermis
                  </span>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-taupe font-sans -mt-0.5 whitespace-nowrap">
                    Dermatology Clinic
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center h-full space-x-3.5 xl:space-x-5 2xl:space-x-8 text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium text-charcoal/90 shrink-0">
                
                {/* Why Us / About Link */}
                <Link 
                  href="/pages/about" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`h-20 flex items-center hover:text-black transition-colors whitespace-nowrap ${pathname === '/pages/about' ? 'text-black font-semibold' : ''}`}
                >
                  Why Us
                </Link>

                {/* Treatments Megamenu Trigger */}
                <div 
                  className="h-20 flex items-center"
                  onMouseEnter={() => setActiveDropdown('treatments')}
                >
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'treatments' ? null : 'treatments')}
                    className={`flex items-center gap-1.5 h-full hover:text-black transition-colors cursor-pointer whitespace-nowrap ${
                      pathname.startsWith('/pages') && !pathname.includes('contact') && !pathname.includes('about')
                        ? 'text-black font-semibold'
                        : ''
                    }`}
                  >
                    Treatments
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Shop Skincare Dropdown Trigger */}
                <div 
                  className="h-20 flex items-center"
                  onMouseEnter={() => setActiveDropdown('shop')}
                >
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'shop' ? null : 'shop')}
                    className={`flex items-center gap-1.5 h-full hover:text-black transition-colors cursor-pointer whitespace-nowrap ${
                      pathname.startsWith('/collections') || pathname.startsWith('/products') ? 'text-black font-semibold' : ''
                    }`}
                  >
                    Shop Skincare
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Conditions */}
                <Link 
                  href="/pages/acne-pimple" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`h-20 flex items-center hover:text-black transition-colors whitespace-nowrap ${pathname === '/pages/acne-pimple' ? 'text-black font-semibold' : ''}`}
                >
                  Conditions
                </Link>

                {/* Doctors */}
                <Link 
                  href="/pages/our-doctors" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`h-20 flex items-center hover:text-black transition-colors whitespace-nowrap ${pathname === '/pages/our-doctors' ? 'text-black font-semibold' : ''}`}
                >
                  Doctors
                </Link>

                {/* Treatment Results */}
                <Link 
                  href="/pages/reviews" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`h-20 flex items-center hover:text-black transition-colors whitespace-nowrap ${pathname === '/pages/reviews' ? 'text-black font-semibold' : ''}`}
                >
                  Results
                </Link>

                {/* AI Skin Assessment */}
                <Link 
                  href="/pages/allodermis-ai-analysis" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className="h-20 flex items-center hover:text-black transition-colors gap-1.5 text-charcoal group whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">AI Skin Check</span>
                </Link>

                {/* Contact */}
                <Link 
                  href="/pages/contact" 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`h-20 flex items-center hover:text-black transition-colors whitespace-nowrap ${pathname === '/pages/contact' ? 'text-black font-semibold' : ''}`}
                >
                  Contact
                </Link>

              </nav>

              {/* Right Action Icons & Primary CTA */}
              <div 
                className="flex items-center space-x-1 sm:space-x-2 shrink-0"
                onMouseEnter={() => setActiveDropdown(null)}
              >
              
              {/* Search Toggle */}
              <button 
                onClick={() => setSearchOpen(true)}
                aria-label="Search treatments and skincare"
                title="Search"
                className="p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors flex items-center justify-center cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account / User Menu Dropdown */}
              <div 
                className="relative"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      onMouseEnter={() => setUserDropdownOpen(true)}
                      className="p-1 sm:p-1.5 rounded-full hover:bg-ivory transition-colors text-charcoal flex items-center justify-center"
                      aria-label="User Account"
                      title={`Account (${user.firstName})`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#171717] text-[#EAE1D7] flex items-center justify-center text-xs font-semibold ring-2 ring-ivory">
                        {user.firstName[0]}
                      </div>
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-subtle-border rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2.5 border-b border-subtle-border">
                          <p className="text-xs font-semibold text-charcoal truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-[11px] text-taupe truncate">{user.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {user.memberTier}
                          </span>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/account"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
                          >
                            <UserIcon className="w-3.5 h-3.5 text-taupe" />
                            Account Dashboard
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5 text-taupe" />
                            Saved Wishlist
                          </Link>
                        </div>
                        <div className="pt-1 border-t border-subtle-border">
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => openAuthModal('login')}
                      onMouseEnter={() => setUserDropdownOpen(true)}
                      className="p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors flex items-center justify-center cursor-pointer"
                      aria-label="Account Login"
                      title="Sign In / Register"
                    >
                      <UserIcon className="w-5 h-5" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-subtle-border rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              openAuthModal('login');
                            }}
                            className="w-full py-2 px-3 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
                          >
                            Sign In
                          </button>
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              openAuthModal('register');
                            }}
                            className="w-full py-2 px-3 bg-ivory hover:bg-beige text-charcoal border border-subtle-border text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                aria-label="View Wishlist"
                title="Wishlist"
                className="relative p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors hidden sm:flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Toggle */}
              <button 
                onClick={() => openCartDrawer(true)}
                aria-label="Open Shopping Bag"
                title="Shopping Bag"
                className="relative p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors flex items-center justify-center cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="hidden sm:block h-5 w-px bg-subtle-border mx-1"></div>

              {/* Primary Consultation CTA Button */}
              <Link
                href="/pages/contact"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold bg-[#171717] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm luxury-btn-shine whitespace-nowrap"
              >
                Book Appointment
              </Link>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-black lg:hidden cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Full-Width Visual Megamenu for Treatments - Docked directly to navbar bottom */}
        {activeDropdown === 'treatments' && (
          <div 
            className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b border-subtle-border shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => setActiveDropdown('treatments')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
              {/* Header Strip */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle-border">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    CLINICAL PROCEDURES & LASER AESTHETICS
                  </span>
                  <span className="text-xs text-taupe hidden sm:inline">
                    US-FDA Approved Energy Systems & AIIMS Specialists
                  </span>
                </div>
                <Link 
                  href="/pages/our-doctors" 
                  onClick={() => setActiveDropdown(null)}
                  className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1.5"
                >
                  <span>Meet Our 8 Board-Certified Doctors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-12 gap-5 max-h-[calc(100vh-170px)]">
                {/* Left Column: Category Tabs (Compact & elegant, fits all 10 categories without cutting off) */}
                <div className="col-span-3 border-r border-subtle-border pr-3 space-y-0.5 max-h-[350px] overflow-y-auto no-scrollbar">
                  {treatmentCategories.map((cat) => {
                    const isSelected = cat.id === selectedTreatmentCat;
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setSelectedTreatmentCat(cat.id)}
                        onClick={() => setSelectedTreatmentCat(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[#171717] text-white font-semibold shadow-xs translate-x-0.5'
                            : 'text-charcoal hover:bg-ivory hover:text-black'
                        }`}
                      >
                        <span className="truncate pr-1">{cat.category}</span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-white' : 'text-taupe'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Visual Treatment Cards Grid with Images */}
                <div className="col-span-9 pl-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="font-serif text-lg sm:text-xl font-medium text-charcoal">
                      {activeCategoryData.category}
                    </h4>
                    <span className="text-xs text-taupe font-medium">
                      {activeCategoryData.items.length} Procedure{activeCategoryData.items.length > 1 ? 's' : ''} Available
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3 max-h-[310px] overflow-y-auto no-scrollbar pr-1">
                    {activeCategoryData.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group flex flex-col bg-[#FDFBF9] hover:bg-white border border-subtle-border hover:border-[#D5CDC4] rounded-xl p-2.5 hover:shadow-md transition-all duration-200"
                      >
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-ivory mb-2">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-106 transition-transform duration-300"
                            sizes="220px"
                          />
                        </div>
                        <span className="font-medium text-xs text-charcoal group-hover:text-black leading-snug line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-taupe group-hover:text-charcoal font-medium mt-0.5 flex items-center gap-1">
                          View Procedure <ChevronRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full-Width Visual Megamenu for Shop Skincare - Docked directly to navbar bottom */}
        {activeDropdown === 'shop' && (
          <div 
            className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b border-subtle-border shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => setActiveDropdown('shop')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle-border">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    CLINICAL SKINCARE STORE
                  </span>
                  <span className="text-xs text-taupe hidden sm:inline">
                    Authentic Physician-Curated Formulations (250+ Products)
                  </span>
                </div>
                <Link 
                  href="/collections/all" 
                  onClick={() => setActiveDropdown(null)}
                  className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1.5"
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[320px] overflow-y-auto no-scrollbar pr-1">
                {categoriesData.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href.startsWith('http') ? cat.href : '/collections/all'}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FDFBF9] hover:bg-white border border-subtle-border hover:border-[#D5CDC4] hover:shadow-sm transition-all group"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-subtle-border flex-shrink-0">
                      <Image
                        src={cat.img}
                        alt={cat.name}
                        fill
                        unoptimized
                        className="object-contain p-1 group-hover:scale-108 transition-transform duration-300"
                        sizes="40px"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-semibold text-charcoal group-hover:text-black block truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-taupe block">
                        Explore Formulations
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer with Visual Submenus */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-subtle-border bg-white px-6 py-8 space-y-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-300">
            
            {/* Quick Consultation CTA */}
            <div className="space-y-3">
              <Link
                href="/pages/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3.5 rounded-full text-xs tracking-wider uppercase font-semibold bg-[#171717] text-white"
              >
                Book In-Clinic Consultation
              </Link>
              <Link
                href="/pages/allodermis-ai-analysis"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold bg-ivory text-charcoal border border-subtle-border"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                Free AI Skin Check
              </Link>
            </div>

            {/* Mobile Accordion for Treatments with Real Images */}
            <div className="pt-2 border-t border-subtle-border">
              <button
                onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                className="w-full flex items-center justify-between py-2.5 text-base font-semibold text-charcoal"
              >
                <span>Clinical Treatments</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileTreatmentsOpen && (
                <div className="pt-3 pb-2 space-y-4 max-h-[360px] overflow-y-auto pl-2">
                  {treatmentCategories.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <span className="text-xs uppercase tracking-wider font-bold text-amber-900 block">
                        {cat.category}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {cat.items.slice(0, 4).map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-xl bg-ivory/60 border border-subtle-border text-xs"
                          >
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={item.img} alt={item.title} fill className="object-cover" sizes="32px" />
                            </div>
                            <span className="font-medium text-charcoal truncate">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion for Shop Skincare with Images */}
            <div className="pt-2 border-t border-subtle-border">
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="w-full flex items-center justify-between py-2.5 text-base font-semibold text-charcoal"
              >
                <span>Shop Skincare by Category</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileShopOpen && (
                <div className="grid grid-cols-2 gap-2.5 pt-3 pb-2">
                  {categoriesData.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.href.startsWith('http') ? cat.href : '/collections/all'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory/60 border border-subtle-border"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex-shrink-0">
                        <Image src={cat.img} alt={cat.name} fill className="object-contain p-1" sizes="32px" />
                      </div>
                      <span className="text-xs font-medium text-charcoal truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* General Navigation Links */}
            <div className="pt-2 border-t border-subtle-border space-y-2.5 text-base font-medium">
              <Link href="/pages/our-doctors" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">
                Our 8 Board-Certified Doctors
              </Link>
              <Link href="/pages/reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">
                Real Treatment Results & Reviews
              </Link>
              <Link href="/pages/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">
                About Allodermis Clinic
              </Link>
              <Link href="/pages/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">
                Clinic Location & Contact
              </Link>
            </div>

          </div>
        )}
      </header>
      </div>

      {/* Visual Search Modal with Live Product Cards & Images (Matching Allodermis search dropdown) */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl p-6 sm:p-8 shadow-2xl border border-subtle-border space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-subtle-border">
              <span className="text-xs font-bold uppercase tracking-wider text-taupe">
                Search Products & Clinical Treatments
              </span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1.5 hover:bg-ivory rounded-full text-charcoal cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/collections/all?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="relative"
            >
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for? (e.g. Aclaris, Photon, Sebamed, Retinol)..."
                autoFocus
                className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] rounded-2xl text-base text-charcoal placeholder:text-taupe focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal border border-subtle-border transition-all"
              />
            </form>

            {/* Most Searched Products with Real Images */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                Most Searched Products
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {featuredSearchProducts.map((p) => {
                  const pImg = p.images?.[0]?.src || p.image?.src || '';
                  const pPrice = p.variants?.[0]?.price || '0';
                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.handle}`}
                      onClick={() => setSearchOpen(false)}
                      className="group flex flex-col p-3 rounded-2xl bg-[#FDFBF9] hover:bg-white border border-subtle-border hover:shadow-md transition-all"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-2">
                        {pImg && (
                          <Image
                            src={pImg}
                            alt={p.title}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                            sizes="160px"
                          />
                        )}
                      </div>
                      <span className="font-medium text-xs sm:text-sm text-charcoal group-hover:text-black line-clamp-2 leading-snug">
                        {p.title}
                      </span>
                      <span className="text-xs font-bold text-charcoal mt-1">
                        Rs. {parseFloat(pPrice).toFixed(2)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Most Searched Keywords */}
            <div className="pt-2 border-t border-subtle-border">
              <span className="text-xs text-taupe font-semibold block mb-2">
                Most searched keywords:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Skincare', 'Sunscreen', 'Acne Scar', 'Moisturizers', 'Pigmentation', 'Chemical Peel', 'PDRN', 'Body Care', 'Hair Care'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      window.location.href = `/collections/all?q=${encodeURIComponent(tag)}`;
                    }}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#171717] hover:text-white text-charcoal border border-subtle-border transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;