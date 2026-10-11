'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Calendar,
  Phone,
  ShieldCheck,
  Stethoscope,
  ArrowRight
} from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const { cartCount, setIsOpen: openCartDrawer, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
  }, [pathname]);

  const treatmentsMenu = [
    { title: 'Acne & Pimple Treatment', desc: 'Medical-grade protocols for active breakouts', href: '/pages/acne-pimple' },
    { title: 'Acne Scar Revision (MNRF)', desc: 'Dermal remodeling & subcision technology', href: '/pages/acne-scar-treatment' },
    { title: 'Laser Hair Reduction', desc: 'US-FDA approved painless triple diode lasers', href: '/pages/laser-hair-reduction' },
    { title: 'Clinical Chemical Peels', desc: 'Dermatologist formulations for renewal', href: '/pages/chemical-peel' },
    { title: 'Skin Pigmentation & Melasma', desc: 'Targeted epidermal & dermal melanin clearance', href: '/pages/skin-pigmentation' },
    { title: 'Botox & Anti-Wrinkle', desc: 'Natural facial muscle relaxation', href: '/pages/botox' },
    { title: 'Dermal Fillers & Contouring', desc: 'Hyaluronic acid structural enhancement', href: '/pages/dermal-fillers' },
    { title: 'PDRN Salmon DNA Booster', desc: 'Deep cellular regeneration & glass radiance', href: '/pages/pdrn-skin-booster' },
    { title: 'Profhilo Bioremodeling', desc: 'High-concentration bio-remodeling therapy', href: '/pages/profhilo' },
    { title: 'HIFU Non-Surgical Lift', desc: 'Focused ultrasound collagen lifting', href: '/pages/hifu' },
  ];

  const shopCategories = [
    { title: 'All Skincare Products', href: '/collections/all' },
    { title: 'Moisturizers & Barrier Repair', href: '/collections/all?type=Moisturizers' },
    { title: 'Clinical Serums & Actives', href: '/collections/all?type=Serums' },
    { title: 'Face Wash & Cleansers', href: '/collections/all?type=Face+Wash+%26+Cleansers' },
    { title: 'Broad-Spectrum Sunscreens', href: '/collections/all?type=Sunscreen' },
    { title: 'Scalp & Hair Care', href: '/collections/all?type=Scalp+Solution' },
    { title: 'Anti-Ageing Formulations', href: '/collections/all?type=Anti-Ageing' },
    { title: 'Clinical Supplements', href: '/collections/all?type=Supplements' },
  ];

  return (
    <>
      {/* Top Clinical Announcement Bar */}
      <div className="bg-[#171717] text-[#EAE1D7] text-xs py-2 px-4 border-b border-[#2D2A28]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">Board-Certified Dermatology Clinic & Medical Skincare Store</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[#D5CDC4]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EAE1D7]" /> 100% Genuine Dermatologist Formulations
            </span>
            <span className="text-[#8C8177]">|</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#EAE1D7]" /> KIIT Road, Patia, Bhubaneswar
            </span>
            <span className="text-[#8C8177]">|</span>
            <Link href="/pages/contact" className="hover:text-white transition-colors underline underline-offset-2">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-subtle-border'
            : 'bg-white border-b border-subtle-border/60'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.06em] font-medium text-charcoal group-hover:text-black transition-colors uppercase">
                  Allodermis
                </span>
                <span className="text-[9px] tracking-[0.24em] uppercase text-taupe font-sans -mt-0.5">
                  Dermatology & Clinical Skincare
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-[14px] font-medium text-charcoal/90">
              {/* Treatments Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('treatments')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1.5 py-6 hover:text-black transition-colors ${
                    pathname.startsWith('/pages') && !pathname.includes('contact') && !pathname.includes('about')
                      ? 'text-black font-semibold'
                      : ''
                  }`}
                >
                  Treatments
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'treatments' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-subtle-border rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="col-span-2 pb-2 mb-2 border-b border-subtle-border flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider font-semibold text-taupe">Physician-Led Clinical Procedures</span>
                      <Link href="/pages/our-doctors" className="text-xs text-charcoal hover:underline flex items-center gap-1">
                        Meet Our Dermatologists <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    {treatmentsMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="p-3 rounded-lg hover:bg-ivory transition-colors group flex flex-col"
                      >
                        <span className="font-medium text-sm text-charcoal group-hover:text-black">{item.title}</span>
                        <span className="text-xs text-taupe mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Clinical Shop Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1.5 py-6 hover:text-black transition-colors ${
                    pathname.startsWith('/collections') || pathname.startsWith('/products') ? 'text-black font-semibold' : ''
                  }`}
                >
                  Clinical Shop
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'shop' && (
                  <div className="absolute top-full left-0 w-[480px] bg-white border border-subtle-border rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="col-span-2 pb-2 mb-1 border-b border-subtle-border flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider font-semibold text-taupe">Dermatologist-Approved Skincare</span>
                      <Link href="/collections/all" className="text-xs text-charcoal hover:underline">
                        View All (250+)
                      </Link>
                    </div>
                    {shopCategories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={cat.href}
                        className="p-2.5 rounded-lg hover:bg-ivory transition-colors text-sm text-charcoal hover:text-black font-normal"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Doctors */}
              <Link 
                href="/pages/our-doctors" 
                className={`py-6 hover:text-black transition-colors ${pathname === '/pages/our-doctors' ? 'text-black font-semibold' : ''}`}
              >
                Doctors
              </Link>

              {/* AI Skin Assessment */}
              <Link 
                href="/pages/allodermis-ai-analysis" 
                className="py-6 hover:text-black transition-colors flex items-center gap-1.5 text-charcoal group"
              >
                <Sparkles className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>AI Skin Analysis</span>
              </Link>

              {/* About Clinic */}
              <Link 
                href="/pages/about" 
                className={`py-6 hover:text-black transition-colors ${pathname === '/pages/about' ? 'text-black font-semibold' : ''}`}
              >
                About
              </Link>

              {/* Reviews */}
              <Link 
                href="/pages/reviews" 
                className={`py-6 hover:text-black transition-colors ${pathname === '/pages/reviews' ? 'text-black font-semibold' : ''}`}
              >
                Reviews
              </Link>

              {/* Blog / Journal */}
              <Link 
                href="/blogs/skin-acacdemy" 
                className={`py-6 hover:text-black transition-colors ${pathname.startsWith('/blogs') ? 'text-black font-semibold' : ''}`}
              >
                Journal
              </Link>
            </nav>

            {/* Right Action Icons & Primary CTA */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button 
                onClick={() => setSearchOpen(true)}
                aria-label="Search treatments and skincare"
                className="p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                aria-label="View Wishlist"
                className="relative p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors hidden sm:block"
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
                className="relative p-2 text-charcoal hover:text-black hover:bg-ivory rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Consultation CTA Button */}
              <Link
                href="/pages/contact"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold bg-[#171717] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                Book Consultation
              </Link>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-black lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-subtle-border bg-white px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="space-y-4">
              <Link
                href="/pages/contact"
                className="w-full flex items-center justify-center py-3 rounded-full text-xs tracking-wider uppercase font-semibold bg-[#171717] text-white"
              >
                Book Consultation
              </Link>
              <Link
                href="/pages/allodermis-ai-analysis"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold bg-ivory text-charcoal border border-subtle-border"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                Start AI Skin Analysis
              </Link>
            </div>

            <div className="pt-4 border-t border-subtle-border space-y-3">
              <span className="text-xs uppercase tracking-wider text-taupe font-semibold block">Navigation</span>
              <div className="flex flex-col space-y-3 text-base font-medium">
                <Link href="/collections/all" className="hover:text-black py-1">Clinical Skincare Store (250+)</Link>
                <Link href="/pages/our-doctors" className="hover:text-black py-1">Board-Certified Doctors</Link>
                <Link href="/pages/acne-pimple" className="hover:text-black py-1">Acne & Breakout Care</Link>
                <Link href="/pages/acne-scar-treatment" className="hover:text-black py-1">Acne Scar Revision (MNRF)</Link>
                <Link href="/pages/laser-hair-reduction" className="hover:text-black py-1">Laser Hair Reduction</Link>
                <Link href="/pages/skin-pigmentation" className="hover:text-black py-1">Pigmentation & Melasma</Link>
                <Link href="/pages/pdrn-skin-booster" className="hover:text-black py-1">PDRN Skin Booster</Link>
                <Link href="/pages/reviews" className="hover:text-black py-1">Patient Reviews & Results</Link>
                <Link href="/pages/about" className="hover:text-black py-1">About Allodermis Clinic</Link>
                <Link href="/blogs/skin-acacdemy" className="hover:text-black py-1">Dermatology Journal</Link>
                <Link href="/wishlist" className="hover:text-black py-1">My Saved Wishlist</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-subtle-border text-xs text-taupe space-y-1">
              <p className="font-semibold text-charcoal">Allodermis Dermatology Clinic</p>
              <p>KIIT Road, Patia, Bhubaneswar, Odisha 751024</p>
              <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-subtle-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-subtle-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-taupe">Search Treatments & Skincare</span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-ivory rounded-full text-charcoal"
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
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. Retinol, Sunscreen, Acne, Morr Max)..."
                autoFocus
                className="w-full pl-11 pr-4 py-3.5 bg-ivory rounded-xl text-base text-charcoal placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-charcoal"
              />
            </form>
            <div className="pt-2">
              <span className="text-xs text-taupe font-medium">Quick Suggestions:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Sunscreen', 'Acne Scar', 'Moisturizer', 'Salicylic Acid', 'Hair Fall', 'Chemical Peel', 'PDRN'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      window.location.href = `/collections/all?q=${encodeURIComponent(tag)}`;
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-ivory hover:bg-beige text-charcoal transition-colors"
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