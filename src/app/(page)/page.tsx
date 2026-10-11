'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getFeaturedProducts, 
  getDoctors, 
  getTreatments, 
  getReviews 
} from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Activity, 
  Stethoscope, 
  Clock, 
  Award, 
  ChevronRight,
  Flame,
  Zap,
  Layers,
  HeartPulse
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const doctors = getDoctors();
  const chiefDoctor = doctors[0];
  const reviews = getReviews().slice(0, 3);

  const clinicalConcerns = [
    {
      title: 'Acne & Active Breakouts',
      desc: 'Targeted medical clearance of pustules, comedones & sebum congestion.',
      icon: Flame,
      href: '/pages/acne-pimple',
    },
    {
      title: 'Acne Scar Revision',
      desc: 'US-FDA MNRF fractional remodeling & precision subcision for textural scars.',
      icon: Layers,
      href: '/pages/acne-scar-treatment',
    },
    {
      title: 'Pigmentation & Melasma',
      desc: 'Epidermal and dermal melanin clearance with custom medical peels & laser toning.',
      icon: Sparkles,
      href: '/pages/skin-pigmentation',
    },
    {
      title: 'Laser Hair Reduction',
      desc: 'Triple-wavelength diode cooling system for painless, permanent hair reduction.',
      icon: Zap,
      href: '/pages/laser-hair-reduction',
    },
    {
      title: 'Anti-Ageing & Bioremodeling',
      desc: 'Profhilo, Botox & PDRN salmon DNA boosters for youthful cellular resilience.',
      icon: Activity,
      href: '/pages/botox',
    },
    {
      title: 'Hair Loss & Scalp Care',
      desc: 'Trichoscopic diagnosis, GFC therapy & clinical formulations for alopecia.',
      icon: HeartPulse,
      href: '/pages/allopecia',
    },
  ];

  return (
    <div className="w-full bg-white text-charcoal">
      
      {/* =========================================================================
          HERO SECTION (Directly inspired by reference screenshot visual layout)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#FAF8F5] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-subtle-border">
        {/* Soft background geometric glow */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#EFEAE2] via-[#F4EFE8] to-transparent pointer-events-none hidden lg:block" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Typography & Actions */}
            <div className="lg:col-span-7 space-y-6 lg:pr-6">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-subtle-border shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-taupe">
                  Board-Certified Dermatology & Clinical Skincare
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-normal text-charcoal leading-[1.08] tracking-[-0.02em]">
                Clinical dermatology <br className="hidden sm:inline" />
                <span className="italic font-light text-[#594E44]">guided by science</span>, <br />
                tailored to your biology.
              </h1>

              {/* Supporting Subtext */}
              <p className="text-base sm:text-lg text-taupe max-w-xl leading-relaxed font-normal">
                Physician-led medical treatments, US-FDA approved laser technologies, and authentic dermatologist-formulated skincare protocols designed for lasting cellular health.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/pages/contact"
                  className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md flex items-center gap-2"
                >
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/collections/all"
                  className="px-7 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-charcoal border border-subtle-border hover:bg-ivory hover:border-charcoal transition-all duration-200 flex items-center gap-2"
                >
                  <span>Explore Skincare Store</span>
                </Link>
              </div>

              {/* Micro-proof indicators */}
              <div className="pt-6 border-t border-subtle-border/80 flex flex-wrap items-center gap-6 text-xs text-taupe">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>US-FDA Approved Technologies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-amber-700" />
                  <span>Senior MD & DNB Dermatologists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                  <span>AI-Powered Skin Diagnostics</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Doctor Portrait with Floating Credibility Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#E7DEC8] via-[#E4DDD3] to-[#D5CABE]">
                <Image
                  src="/images/alloroots/doctors/dr-alok-kumar-sahoo.webp"
                  alt="Dr. Alok Kumar Sahoo - Chief Dermatologist at Allodermis"
                  fill
                  priority
                  className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 440px"
                />

                {/* Floating Credibility Badge (Mirroring the reference screenshot's floating pill) */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-amber-800">
                        DR
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-800">
                        MD
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-800">
                        Rx
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-charcoal block leading-tight">10,000+</span>
                      <span className="text-[10px] text-taupe leading-tight">Satisfied Patients</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-800 block">
                      ★ 4.9 Rating
                    </span>
                    <span className="text-[10px] text-taupe">Google Verified</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PROOF & STATS RIBBON (Mirroring yellow highlight bar in reference)
          ========================================================================= */}
      <section className="bg-[#FBE872] py-8 sm:py-10 border-y border-[#E6D050]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#DFCA45]">
            <div className="pt-3 md:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal block">
                15 years+
              </span>
              <span className="text-xs sm:text-sm text-charcoal/80 font-medium tracking-wide block mt-1">
                Clinical Dermatology Experience
              </span>
            </div>
            <div className="pt-3 md:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal block">
                50,000+
              </span>
              <span className="text-xs sm:text-sm text-charcoal/80 font-medium tracking-wide block mt-1">
                Patients Successfully Consulted
              </span>
            </div>
            <div className="pt-3 md:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal block">
                20+
              </span>
              <span className="text-xs sm:text-sm text-charcoal/80 font-medium tracking-wide block mt-1">
                Medical Honours & Accreditations
              </span>
            </div>
            <div className="pt-3 md:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal block">
                100%
              </span>
              <span className="text-xs sm:text-sm text-charcoal/80 font-medium tracking-wide block mt-1">
                US-FDA Approved Devices
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLINICAL CONCERNS GRID (Mirroring "Why people need..." in reference)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
              Physician-Led Clinical Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Specialized treatment for every skin & hair concern
            </h2>
            <p className="text-sm sm:text-base text-taupe leading-relaxed">
              Every skin concern requires precise dermatological diagnosis rather than generic cosmetic coverups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicalConcerns.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group p-8 rounded-2xl border border-subtle-border bg-[#FBF9F6] hover:bg-white hover:border-[#D5CDC4] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-subtle-border flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#8C8177] group-hover:text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-charcoal group-hover:text-black transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-taupe mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-subtle-border/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-black">
                    <span>Explore Treatment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          INDIVIDUALIZED HEALTH CONSULTING / ABOUT DOCTOR
          (Mirroring "Individualized health consulting" in reference)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-y border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Clean Doctor Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <Image
                  src="/images/alloroots/doctors/dr-alok-kumar-sahoo.webp"
                  alt="Dr. Alok Kumar Sahoo Chief Dermatologist"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

            {/* Right: Editorial Bio & Consultation CTA */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-taupe block">
                ABOUT ALLODERMIS MEDICAL TEAM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
                Individualized clinical consulting rooted in medical science.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-taupe leading-relaxed">
                <p>
                  Hello, I’m <strong>Dr. Alok Kumar Sahoo</strong>, Chief Dermatologist and Medical Director at Allodermis. I hold MBBS, MD (Dermatology, Venereology & Leprosy), and Fellowships in advanced dermatosurgery.
                </p>
                <p>
                  At Allodermis, we utilize cutting-edge medical diagnostic technologies, polarized dermoscopy, and personalized treatment formulations to uncover the root cellular cause of skin and hair conditions. Rather than selling generic cosmetic promises, we help you make evidence-based decisions so your skin remains resilient, healthy, and clear.
                </p>
              </div>

              {/* Doctor Credentials Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-subtle-border">
                <div className="p-3.5 rounded-xl bg-white border border-subtle-border">
                  <span className="text-xs font-bold text-charcoal block">MD & DNB</span>
                  <span className="text-[11px] text-taupe">Board-Certified</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-subtle-border">
                  <span className="text-xs font-bold text-charcoal block">15+ Years</span>
                  <span className="text-[11px] text-taupe">Clinical Practice</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-subtle-border col-span-2 sm:col-span-1">
                  <span className="text-xs font-bold text-charcoal block">Patia, KIIT Road</span>
                  <span className="text-[11px] text-taupe">Flagship Facility</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/pages/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-md"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          YOUR HEALTH, OUR COMMITMENT (Mirroring commitment + pills in reference)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Statement */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
                OUR CLINICAL PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
                Your skin health, our medical commitment.
              </h2>
              <p className="text-base sm:text-lg text-taupe leading-relaxed">
                Receive an objective, dermoscopic assessment using scientifically validated diagnostic protocols that have taken 15+ years of clinical practice and clinical research to refine.
              </p>
              <div>
                <Link
                  href="/pages/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-subtle-border text-charcoal hover:bg-ivory transition-colors"
                >
                  Read more about our clinic
                </Link>
              </div>
            </div>

            {/* Right Structured Pills (Directly inspired by reference screenshot) */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-[#F6F4F8] border border-[#ECE6F0] space-y-3">
                <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                  Skin Barrier Restoration
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-purple-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    <span>Diagnose transepidermal water loss & lipid depletion.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-purple-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    <span>Prescribe bio-identical ceramides and soothing peptides.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-purple-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    <span>Eliminate sensitizing ingredients and barrier irritants.</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-2xl bg-[#F3F8F5] border border-[#E3EFE8] space-y-3">
                <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                  US-FDA Approved Laser Energy
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-emerald-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Triple wavelength targeted laser beam calibration.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-emerald-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Safe for Fitzpatrick Skin Types III to V (Indian skin).</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/90 text-xs text-charcoal font-medium border border-emerald-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Integrated sapphire contact chilling for painless sessions.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WHY DR DAVID SMITH / WHY ALLODERMIS (Mirroring video preview in reference)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-y border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Media Thumbnail with Play Overlay */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-charcoal group">
                <Image
                  src="/images/alloroots/clinics/alloroots-bhubaneswar-clinic.webp"
                  alt="Allodermis State of the Art Clinic Facility"
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-charcoal ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white p-3 rounded-xl text-xs flex justify-between items-center">
                  <span>Take a Virtual Tour of Allodermis Clinic</span>
                  <span className="text-[10px] text-amber-300 font-bold uppercase">KIIT Road, Patia</span>
                </div>
              </div>
            </div>

            {/* Right: Why Choose Allodermis */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
                Why Dr. Alok Sahoo & Allodermis
              </h2>
              <p className="text-sm sm:text-base text-taupe leading-relaxed">
                Cut back on the number of unverified skincare decisions and aggressive marketing fads that you make daily. Let’s establish a clear medical plan to achieve your skin goals.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '15+ years of verified clinical and surgical experience.',
                  'Direct consultation with board-certified MD & DNB dermatologists.',
                  'Customized treatment formulas tailored for diverse Indian skin types.',
                  'Transparent protocols with competitive rates & zero hidden fees.',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-charcoal">
                    <span className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0"></span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/pages/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-md"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED SKINCARE PRODUCTS (Authentic Real 250+ Allodermis Catalog)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-2">
                AUTHENTIC CLINICAL FORMULATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
                Physician-dispensed skincare solutions
              </h2>
              <p className="text-sm sm:text-base text-taupe mt-2 max-w-xl">
                Genuine medical-grade topicals, targeted active serums, and barrier repairing moisturizers prescribed by our dermatologists.
              </p>
            </div>

            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold border border-subtle-border text-charcoal hover:bg-ivory hover:border-charcoal transition-all self-start md:self-auto"
            >
              <span>View All 250+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          AI SKIN ASSESSMENT INTERACTIVE CALLOUT
          ========================================================================= */}
      <section className="py-16 bg-[#F4EFEA] border-y border-subtle-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-subtle-border shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-subtle-border text-xs font-semibold uppercase tracking-wider text-charcoal">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Allodermis AI Diagnostic Engine</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Not sure which clinical routine your skin requires?
              </h3>
              <p className="text-sm sm:text-base text-taupe leading-relaxed">
                Take our 2-minute clinical questionnaire to evaluate your epidermal barrier, sensitivity profile, and primary concerns. Receive personalized physician recommendations instantly.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/pages/allodermis-ai-analysis"
                className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-md flex items-center gap-2"
              >
                Start Free AI Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUCCESS STORIES / TESTIMONIALS (Mirroring "Success Stories" in reference)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
              PATIENT EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Success Stories
            </h2>
            <p className="text-sm sm:text-base text-taupe leading-relaxed">
              Your trust in us is the greatest testimony to our clinical commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="p-8 rounded-2xl bg-[#FBF9F6] border border-subtle-border flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif text-xl font-medium text-charcoal">
                    {rev.treatment}
                  </h3>

                  <p className="text-sm text-taupe leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-subtle-border flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-charcoal block">{rev.name}</span>
                    <span className="text-xs text-taupe">{rev.location}</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                    Verified Patient
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION BANNER (Mirroring purple CTA card in reference)
          ========================================================================= */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#171717] via-[#2A2421] to-[#1A1817] text-white p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                Start your journey to healthier skin today!
              </h2>
              <p className="text-sm sm:text-base text-[#D5CDC4] leading-relaxed">
                Join thousands of patients who have restored their confidence and skin barrier through evidence-based dermatological care.
              </p>
              <div className="pt-4">
                <Link
                  href="/pages/contact"
                  className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-charcoal hover:bg-ivory hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}