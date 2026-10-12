'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getFeaturedProducts, 
  getDoctors, 
  getReviews,
  getCategories,
  getTreatmentResults,
  getFaqs,
  getArticles,
  Doctor,
  TreatmentResult
} from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import AppointmentModal from '@/components/appointment/AppointmentModal';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Stethoscope, 
  Award, 
  ChevronRight,
  Flame,
  Zap,
  Layers,
  HeartPulse,
  Clock,
  Calendar,
  HelpCircle,
  Plus,
  Minus,
  SlidersHorizontal,
  Activity
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const doctors = getDoctors();
  const reviews = getReviews();
  const categories = getCategories();
  const treatmentResults = getTreatmentResults();
  const faqs = getFaqs();
  const articles = getArticles();

  // Modal State
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedTreatment, setSelectedTreatment] = useState<string | undefined>();

  // Interactive Concern Filter State
  const concernTabs = [
    'Acne & Acne Scars',
    'Pigmentation',
    'Anti-Ageing & Wrinkles',
    'Dryness & Hydration'
  ];
  const [activeConcernTab, setActiveConcernTab] = useState(concernTabs[0]);

  // Interactive Treatment Results Category State
  const resultCategories = [
    'All Results',
    'Acne & Pigmentation',
    'Laser Treatment',
    'Laser Hair Removal',
    'Anti-Ageing',
    'Dermat Surgery',
    'Permanent Makeup'
  ];
  const [activeResultCat, setActiveResultCat] = useState('All Results');

  // FAQ Accordion Open State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Before/After Slider Interaction State (id -> percentage, default 50%)
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({});

  const filteredResults = activeResultCat === 'All Results'
    ? treatmentResults
    : treatmentResults.filter((r) => r.category.toLowerCase().includes(activeResultCat.toLowerCase()));

  const handleOpenAppointment = (docName?: string, treatName?: string) => {
    setSelectedDoctor(docName);
    setSelectedTreatment(treatName);
    setAppointmentModalOpen(true);
  };

  const handleSliderChange = (idx: number, val: number) => {
    setSliderPositions((prev) => ({ ...prev, [idx]: val }));
  };

  return (
    <div className="w-full bg-white text-charcoal">
      
      {/* =========================================================================
          HERO BANNER (Spacious editorial layout, high legibility, elegant typography)
          ========================================================================= */}
      <section className="relative w-full min-h-[88vh] lg:min-h-[92vh] flex items-center overflow-hidden border-b border-subtle-border">
        
        {/* Full-Bleed Doctor Consultation Clinic Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero-banner-consultation.jpg"
            alt="Allodermis Dermatology Consultation Room"
            fill
            priority
            quality={95}
            className="object-cover object-right md:object-center"
            sizes="100vw"
          />

          {/* Seamless Soft Gradient Overlay on Left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/85 md:via-white/75 lg:via-white/65 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Content Container with Generous Spacing & Larger Typography */}
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-14 relative z-10 py-28 sm:py-36 lg:py-44">
          <div className="max-w-2xl lg:max-w-3xl space-y-8 sm:space-y-10">
            
            {/* Eyebrow Label */}
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-[0.28em] font-bold text-[#736B63] block">
                SKIN & CARE FROM BOARD-CERTIFIED DERMATOLOGISTS
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal text-[#171717] leading-[1.08] tracking-[-0.025em]">
              Where Science <br />
              Meets <br />
              Skin Health
            </h1>

            {/* Supporting Paragraph with relaxed line height */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#524B45] leading-relaxed max-w-2xl font-normal">
              Experience exceptional dermatological care in an environment of sophistication and medical excellence. Fast AI skin analysis, board-certified MD dermatologist review, and personalized physician-dispensed treatments.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button
                onClick={() => handleOpenAppointment()}
                className="px-9 sm:px-11 py-4.5 sm:py-5 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold bg-[#171717] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center gap-3 luxury-btn-shine cursor-pointer"
              >
                <span>SCHEDULE CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/pages/allodermis-ai-analysis"
                className="px-8 sm:px-10 py-4.5 sm:py-5 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold bg-white/95 hover:bg-white text-[#171717] border border-[#D5CDC4] hover:border-[#171717] transition-all duration-300 backdrop-blur-sm flex items-center gap-3 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>FREE AI SKIN CHECK</span>
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          PROOF & STATS RIBBON (Spacious, airy statistics bar)
          ========================================================================= */}
      <section className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-14 text-center divide-y md:divide-y-0 md:divide-x divide-subtle-border">
            <div className="pt-6 md:pt-0">
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal block">
                15+
              </span>
              <span className="text-sm sm:text-base text-taupe font-semibold tracking-wider uppercase block mt-2">
                Years of Clinical Practice
              </span>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal block">
                50,000+
              </span>
              <span className="text-sm sm:text-base text-taupe font-semibold tracking-wider uppercase block mt-2">
                Patients Successfully Treated
              </span>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal block">
                100%
              </span>
              <span className="text-sm sm:text-base text-taupe font-semibold tracking-wider uppercase block mt-2">
                AIIMS & Board-Certified Doctors
              </span>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal block">
                100%
              </span>
              <span className="text-sm sm:text-base text-taupe font-semibold tracking-wider uppercase block mt-2">
                US-FDA Approved Devices
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: SHOP BY CATEGORY (Allodermis 11 Categories, Spacious Layout)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              AUTHENTIC MEDICAL STORE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              Physician-curated medical formulations, clinical skincare kits, and dermatologist consultations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href.startsWith('http') ? cat.href : '/collections/all'}
                className="group flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl border border-subtle-border bg-[#FDFBF9] hover:bg-white hover:border-[#D5CDC4] hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white border-2 border-subtle-border p-2 mb-4 group-hover:scale-108 transition-transform duration-500 shadow-xs">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-contain p-2"
                    sizes="120px"
                  />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal group-hover:text-black transition-colors leading-snug">
                  {cat.name}
                </h3>
                <span className="text-xs text-taupe mt-1.5 flex items-center gap-1 group-hover:text-charcoal font-medium">
                  Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: EXPERT SKINCARE IN 3 SIMPLE STEPS
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              CLINICAL HOMECARE PROTOCOL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Expert skincare in 3 simple steps
            </h2>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              Fast AI analysis. Real dermatologist review. A clear plan you can follow from home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Step 1 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-subtle-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold text-lg">
                  01
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                    Take a free AI skin check
                  </h3>
                  <p className="text-base sm:text-lg text-taupe mt-3 leading-relaxed">
                    Upload photos and answer a few clinical questions. Get your initial skin health diagnostic report in under 60 seconds.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-subtle-border">
                <Link
                  href="/pages/allodermis-ai-analysis"
                  className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-black uppercase tracking-wider"
                >
                  <span>Start Free AI Check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-subtle-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center font-bold text-lg">
                  02
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                    Get dermatologist review
                  </h3>
                  <p className="text-base sm:text-lg text-taupe mt-3 leading-relaxed">
                    A qualified, board-certified MD dermatologist personally evaluates your skin barrier, acne grading, or pigmentation before recommendations are finalized.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-subtle-border">
                <button
                  onClick={() => handleOpenAppointment()}
                  className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-black uppercase tracking-wider cursor-pointer"
                >
                  <span>Consult Dermatologist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-subtle-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-lg">
                  03
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                    Follow your skin plan
                  </h3>
                  <p className="text-base sm:text-lg text-taupe mt-3 leading-relaxed">
                    Receive clear skin guidance, prescription protocols, and trusted physician-dispensed product options delivered directly to your doorstep.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-subtle-border">
                <Link
                  href="/collections/all"
                  className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-black uppercase tracking-wider"
                >
                  <span>Shop Verified Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: NO MORE GUESSING WHAT YOUR SKIN NEEDS (Spotlight Proof)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
                EVIDENCE-BASED CERTAINTY
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
                No more guessing what your skin needs.
              </h2>
              <p className="text-lg sm:text-xl text-taupe leading-relaxed">
                Allodermis learns from thousands of skin cases across India, so you get care guided by wider doctor experience, not marketing fads or guesswork.
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border space-y-2">
                  <span className="font-serif text-4xl sm:text-5xl font-medium text-charcoal block">
                    10K+
                  </span>
                  <span className="text-base font-semibold text-charcoal block">
                    Skin cases reviewed by experts
                  </span>
                  <p className="text-sm text-taupe leading-relaxed">
                    Evaluated through dermoscopy and diagnostic histopathology.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border space-y-2">
                  <span className="font-serif text-4xl sm:text-5xl font-medium text-charcoal block">
                    90%
                  </span>
                  <span className="text-base font-semibold text-charcoal block">
                    Patients showed visible improvement
                  </span>
                  <p className="text-sm text-taupe leading-relaxed">
                    Objective clinical clearance observed by week 4 of tailored treatment.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenAppointment()}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-md cursor-pointer"
                >
                  <span>Book Consultation with AIIMS Doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Clinic Imagery */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image
                  src="/images/alloroots/clinics/alloroots-bhubaneswar-clinic.webp"
                  alt="Allodermis State of the Art Clinic Facility"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-black/75 backdrop-blur-md text-white p-5 rounded-2xl">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block mb-1">
                    KIIT Road, Patia Flagship Clinic
                  </span>
                  <p className="text-sm leading-snug">
                    Equipped with international energy-based systems, fractional lasers, and sterile operating suites.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SHOP BY CONCERN (Interactive Tabbed Product Showcase)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
                TARGETED DERMATOLOGICAL SOLUTIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
                Shop by Concern
              </h2>
              <p className="text-lg sm:text-xl text-taupe max-w-2xl leading-relaxed">
                Medical-grade topicals formulated to repair, soothe, and rejuvenate targeted skin barrier conditions.
              </p>
            </div>

            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-wider font-semibold border border-subtle-border bg-white text-charcoal hover:bg-ivory hover:border-charcoal transition-all self-start md:self-auto shadow-xs"
            >
              <span>View All 250+ Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Concern Tabs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12 border-b border-subtle-border/80 pb-6">
            {concernTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveConcernTab(tab)}
                className={`px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeConcernTab === tab
                    ? 'bg-[#171717] text-white shadow-md'
                    : 'bg-white text-taupe border border-subtle-border hover:text-charcoal hover:border-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: OUR SPECIALISTS (All 8 Board-Certified Dermatologists)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              EXPERT CARE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Our Specialists
            </h2>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              Board-certified dermatologists from AIIMS & top institutions, dedicated to delivering science-backed, compassionate skin care.
            </p>
          </div>

          {/* 8 Doctor Cards Grid with Generous Padding & Larger Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {doctors.map((doc: Doctor) => (
              <div
                key={doc.id}
                className="group flex flex-col justify-between bg-[#FDFBF9] border border-subtle-border rounded-3xl p-6 sm:p-7 hover:bg-white hover:border-[#D5CDC4] hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-5">
                  
                  {/* Doctor Image */}
                  <div className="relative aspect-[4/4] rounded-2xl overflow-hidden bg-ivory border border-subtle-border">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-charcoal border border-subtle-border shadow-xs">
                      {doc.experience}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-charcoal group-hover:text-black transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900 font-semibold mt-1">
                      {doc.title.split('·')[0]}
                    </p>
                    <p className="text-xs text-taupe mt-1">
                      {doc.title.split('·').slice(1).join(' · ')}
                    </p>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {doc.specialties.slice(0, 3).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white text-taupe border border-subtle-border"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-taupe italic leading-relaxed pt-2 border-t border-subtle-border/60">
                    "{doc.bio}"
                  </p>

                </div>

                {/* Consult Button */}
                <div className="pt-6 mt-6 border-t border-subtle-border">
                  <button
                    onClick={() => handleOpenAppointment(doc.name)}
                    className="w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#171717] text-white hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Consult {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TREATMENT RESULTS (Real Before & After with Interactive Comparison)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              REAL CLINICAL RESULTS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Treatment Results
            </h2>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              See real results from our treatments. 98% of patients see visible, measurable improvements within weeks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            {resultCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveResultCat(cat)}
                className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeResultCat === cat
                    ? 'bg-[#171717] text-white shadow-md'
                    : 'bg-white text-taupe border border-subtle-border hover:text-charcoal hover:border-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Before & After Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredResults.map((result: TreatmentResult, idx: number) => {
              const sliderPos = sliderPositions[idx] !== undefined ? sliderPositions[idx] : 50;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-subtle-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Eyebrow & Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        {result.category}
                      </span>
                      <span className="text-xs text-emerald-800 font-semibold">
                        Verified Outcome
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-charcoal">
                      {result.title}
                    </h3>

                    {/* Interactive Side-by-Side Comparison Media */}
                    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-ivory border border-subtle-border select-none group">
                      
                      {/* After Image (Background) */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={result.afterImg}
                          alt={`After: ${result.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                          After
                        </span>
                      </div>

                      {/* Before Image (Clipped Left Layer) */}
                      <div 
                        className="absolute inset-0 h-full overflow-hidden border-r-2 border-white shadow-2xl transition-[clip-path]"
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                      >
                        <Image
                          src={result.beforeImg}
                          alt={`Before: ${result.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                          Before
                        </span>
                      </div>

                      {/* Interactive Slider Divider Handle */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPos}
                        onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                        aria-label="Slide to compare before and after"
                      />

                      {/* Handle Icon indicator */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10 w-8 h-8 rounded-full bg-white text-charcoal shadow-xl flex items-center justify-center border border-subtle-border text-xs font-bold"
                        style={{ left: `${sliderPos}%` }}
                      >
                        ↔
                      </div>

                    </div>

                    <div className="pt-2">
                      <p className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                        {result.treatment}
                      </p>
                      <p className="text-sm text-taupe mt-1 leading-relaxed">
                        {result.desc}
                      </p>
                    </div>

                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-5 mt-5 border-t border-subtle-border">
                    <button
                      onClick={() => handleOpenAppointment(undefined, result.treatment)}
                      className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold border border-subtle-border text-charcoal hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Book Treatment Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: NEW ARRIVALS & FEATURED FORMULATIONS
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
                AUTHENTIC CLINICAL FORMULATIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
                New Arrivals
              </h2>
              <p className="text-lg sm:text-xl text-taupe max-w-2xl leading-relaxed">
                Physician-dispensed skincare topicals with clinically validated active percentages for real, transformative outcomes.
              </p>
            </div>

            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-wider font-semibold border border-subtle-border bg-white text-charcoal hover:bg-ivory hover:border-charcoal transition-all self-start md:self-auto shadow-xs"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CLIENT TESTIMONIALS (Google Reviews & Patient Proof)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              PATIENT EXPERIENCES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
              Client Testimonial
            </h2>
            <div className="flex items-center justify-center gap-2 text-amber-500 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-base font-bold text-charcoal ml-2">4.9 on Google Reviews</span>
            </div>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              Your trust in us is the greatest testimony to our clinical commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {reviews.slice(0, 3).map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-subtle-border flex flex-col justify-between space-y-8 hover:shadow-xl transition-all"
              >
                <div className="space-y-5">
                  <div className="flex items-center text-amber-500 gap-1.5">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-charcoal leading-snug">
                    {rev.treatment}
                  </h3>

                  <p className="text-base text-taupe leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-6 border-t border-subtle-border flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-charcoal block">{rev.name}</span>
                    <span className="text-xs text-taupe mt-0.5 block">{rev.location}</span>
                  </div>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    Verified Patient
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (Authentic Allodermis FAQs)
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-white border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
              PATIENT CLARIFICATIONS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-taupe leading-relaxed">
              Find clear answers from our dermatologists on routines, products, clinic treatments, and appointments.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-subtle-border bg-[#FDFBF9] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-xl sm:text-2xl font-medium text-charcoal pr-4">
                      {faq.question}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white border border-subtle-border flex items-center justify-center flex-shrink-0 text-charcoal">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-7 pt-2 text-base sm:text-lg text-[#524B45] leading-relaxed border-t border-subtle-border/60 bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions banner */}
          <div className="max-w-4xl mx-auto mt-12 p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-medium text-charcoal">
                Still have questions?
              </h4>
              <p className="text-base text-taupe">
                Our clinical medical team is here to assist you with personalized answers.
              </p>
            </div>
            <Link
              href="/pages/contact"
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-sm flex-shrink-0"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BLOG POSTS & CLINICAL INSIGHTS
          ========================================================================= */}
      <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-b border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-taupe block">
                PHYSICIAN PUBLICATIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
                Blog posts
              </h2>
              <p className="text-lg sm:text-xl text-taupe max-w-2xl leading-relaxed">
                Evidence-based skincare advice, ingredient analyses, and dermatologist guides.
              </p>
            </div>

            <Link
              href="/pages/about"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-wider font-semibold border border-subtle-border bg-white text-charcoal hover:bg-ivory hover:border-charcoal transition-all self-start md:self-auto shadow-xs"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.map((art, idx) => (
              <div
                key={art.slug || idx}
                className="group flex flex-col justify-between bg-white border border-subtle-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-charcoal uppercase tracking-wider">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-taupe">
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{art.author}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal group-hover:text-black transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-sm text-taupe leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0 border-t border-subtle-border/50">
                  <span className="text-xs uppercase tracking-wider font-bold text-charcoal group-hover:text-black flex items-center gap-1.5 pt-4">
                    Read Article <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION BANNER (Expansive luxury banner)
          ========================================================================= */}
      <section className="pb-28 lg:pb-36 pt-12 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="rounded-3xl bg-gradient-to-r from-[#171717] via-[#2A2421] to-[#1A1817] text-white p-12 sm:p-20 lg:p-28 text-center relative overflow-hidden shadow-2xl">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#C4B7A6] block">
                BEGIN YOUR SKINCARE TRANSFORMATION
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal text-white leading-tight">
                Start your journey to resilient skin health today.
              </h2>
              <p className="text-lg sm:text-xl text-[#D5CDC4] leading-relaxed max-w-2xl mx-auto">
                Join thousands of patients who have restored their confidence and skin barrier through evidence-based dermatological care.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
                <button
                  onClick={() => handleOpenAppointment()}
                  className="px-10 py-5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold bg-white text-charcoal hover:bg-ivory hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-3"
                >
                  <span>Book In-Clinic Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/pages/allodermis-ai-analysis"
                  className="px-9 py-5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold bg-transparent text-white border border-[#D5CDC4]/60 hover:border-white transition-all duration-300 flex items-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Free AI Skin Check</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        selectedDoctorName={selectedDoctor}
        selectedTreatmentName={selectedTreatment}
      />

    </div>
  );
}