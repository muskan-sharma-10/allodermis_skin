'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  getTreatmentByHandle, 
  getDoctorByHandle, 
  getDoctors, 
  getTreatments, 
  getReviews, 
  getFeaturedProducts 
} from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { 
  ShieldCheck, 
  Stethoscope, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Calendar, 
  Star, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Heart,
  User,
  Zap,
  Activity
} from 'lucide-react';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function GenericAllodermisPage({ params }: PageProps) {
  const { handle } = params;

  // 1. Check if it's our-doctors directory
  if (handle === 'our-doctors' || handle === 'our-team') {
    return <DoctorsDirectoryPage />;
  }

  // 2. Check if it's AI skin analysis
  if (handle === 'allodermis-ai-analysis') {
    return <AISkinAnalysisPage />;
  }

  // 3. Check if it's Reviews page
  if (handle === 'reviews') {
    return <ReviewsPage />;
  }

  // 4. Check if it's About page
  if (handle === 'about') {
    return <AboutPage />;
  }

  // 5. Check if it's Contact page
  if (handle === 'contact') {
    return <ContactPage />;
  }

  // 6. Check if it's an individual doctor profile
  const doctor = getDoctorByHandle(handle);
  if (doctor) {
    return <DoctorProfilePage doctor={doctor} />;
  }

  // 7. Check if it's a treatment page
  const treatment = getTreatmentByHandle(handle);
  if (treatment) {
    return <TreatmentDetailPage treatment={treatment} />;
  }

  // 8. Fallback for other standard pages (e.g. policies)
  return <PolicyPage handle={handle} />;
}

/* =========================================================================
   SUB-PAGE: DOCTORS DIRECTORY
   ========================================================================= */
function DoctorsDirectoryPage() {
  const doctors = getDoctors();

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
            MEDICAL LEADERSHIP
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Board-Certified Dermatologists
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Our department is led by senior MD and DNB dermatologists with specialized surgical training, international fellowships, and over 15+ years of verified clinical experience.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#FBF9F6] border border-subtle-border rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white border border-subtle-border shadow-xs">
                  <Image
                    src={doc.image || '/images/alloroots/doctors/dr-alok-kumar-sahoo.webp'}
                    alt={doc.name}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-charcoal border border-subtle-border">
                    {doc.experience}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-medium text-charcoal">
                    {doc.name}
                  </h3>
                  <span className="text-xs font-semibold text-taupe block mt-0.5">
                    {doc.title}
                  </span>
                  <span className="text-[11px] text-charcoal/80 block mt-1">
                    {doc.qualifications}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-taupe block mb-1">Specialties:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specialties?.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-white border border-subtle-border px-2 py-0.5 rounded-md text-charcoal">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-subtle-border flex flex-col gap-2">
                <Link
                  href={`/pages/${doc.handle}`}
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-center bg-white border border-subtle-border hover:bg-ivory text-charcoal transition-colors"
                >
                  View Physician Profile
                </Link>
                <Link
                  href="/pages/contact"
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-center bg-[#171717] hover:bg-black text-white transition-colors"
                >
                  Book Appointment
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: INDIVIDUAL DOCTOR PROFILE
   ========================================================================= */
function DoctorProfilePage({ doctor }: { doctor: any }) {
  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <Link href="/pages/our-doctors" className="hover:text-charcoal">Doctors</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{doctor.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Quick Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-ivory">
              <Image
                src={doctor.image || '/images/alloroots/doctors/dr-alok-kumar-sahoo.webp'}
                alt={doctor.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F6] border border-subtle-border space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Clinical Practice Information
              </h4>
              <div className="space-y-3 text-xs text-taupe">
                <div className="flex justify-between border-b border-subtle-border/60 pb-2">
                  <span>Experience:</span>
                  <span className="font-semibold text-charcoal">{doctor.experience}</span>
                </div>
                <div className="flex justify-between border-b border-subtle-border/60 pb-2">
                  <span>Consultations:</span>
                  <span className="font-semibold text-charcoal">{doctor.consultationsCount}</span>
                </div>
                <div className="flex justify-between border-b border-subtle-border/60 pb-2">
                  <span>Facility:</span>
                  <span className="font-semibold text-charcoal">{doctor.clinicLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-semibold text-emerald-800">Mon – Sat (By Appointment)</span>
                </div>
              </div>

              <Link
                href="/pages/contact"
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Schedule Appointment with {doctor.name.split(' ')[1] || 'Doctor'}
              </Link>
            </div>
          </div>

          {/* Right Column: Bio, Qualifications & Medical Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
                BOARD-CERTIFIED DERMATOLOGIST
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
                {doctor.name}
              </h1>
              <p className="text-base text-taupe font-medium mt-1">
                {doctor.title}
              </p>
              <p className="text-xs font-semibold text-charcoal/80 mt-1">
                {doctor.qualifications}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-taupe leading-relaxed">
              <h3 className="font-serif text-2xl text-charcoal font-medium">Professional Background</h3>
              <p>{doctor.bio}</p>
              <p>
                Dr. {doctor.name.split(' ')[1] || 'Sahoo'} prioritizes patient safety and natural, anatomically sound aesthetic outcomes. He strictly adheres to evidence-based international clinical dermatology guidelines and does not prescribe or dispense unverified cosmetic claims.
              </p>
            </div>

            {/* Specialties */}
            <div className="space-y-3 pt-4 border-t border-subtle-border">
              <h3 className="font-serif text-2xl text-charcoal font-medium">Clinical Areas of Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.specialties?.map((spec: string, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-ivory border border-subtle-border flex items-center gap-2 text-xs font-medium text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditation & Standards */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-subtle-border space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal">Medical Ethics Guarantee</span>
              </div>
              <p className="text-xs text-taupe leading-relaxed">
                All consultations adhere to strict patient confidentiality, calibrated photographic documentation, and honest prognosis. You will only receive treatment recommendations that are clinically indicated for your skin.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: TREATMENT DETAIL PAGE
   ========================================================================= */
function TreatmentDetailPage({ treatment }: { treatment: any }) {
  const doctors = getDoctors();

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <span className="text-taupe">{treatment.category}</span>
          <span>/</span>
          <span className="text-charcoal font-medium">{treatment.title}</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
            CLINICAL DERMATOLOGY PROTOCOL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
            {treatment.title}
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            {treatment.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Clinical Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Card */}
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                Clinical Overview & Indication
              </h2>
              <p className="text-sm sm:text-base text-taupe leading-relaxed">
                At Allodermis, our {treatment.title} protocol is designed following thorough dermoscopic evaluation. Unlike generic aesthetic salons, every session is supervised or performed by qualified dermatologists using calibrated, medical-grade equipment with sterile clinical hygiene standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-subtle-border text-xs">
                <div>
                  <span className="text-taupe block">Session Time</span>
                  <span className="font-bold text-charcoal">45–60 Minutes</span>
                </div>
                <div>
                  <span className="text-taupe block">Downtime</span>
                  <span className="font-bold text-charcoal">Minimal to None</span>
                </div>
                <div>
                  <span className="text-taupe block">Sessions Required</span>
                  <span className="font-bold text-charcoal">3–6 for Optimal Results</span>
                </div>
              </div>
            </div>

            {/* Treatment Step by Step */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                What to Expect During Your Session
              </h2>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Diagnostic Dermoscopy & Consultation', desc: 'Detailed skin analysis under polarized light to assess dermal depth, melanin reactivity, and barrier integrity.' },
                  { step: '02', title: 'Targeted Medical Preparation', desc: 'Gentle cleansing and topical numbing applied if performing energy-based or microneedling protocols.' },
                  { step: '03', title: 'Physician-Calibrated Procedure', desc: 'Precision delivery of calibrated wavelengths or pharmaceutical actives tailored to your specific tolerance.' },
                  { step: '04', title: 'Post-Care Barrier Soothing & Routine', desc: 'Application of cooling peptides, physical zinc sunblock, and customized home regimen instructions.' },
                ].map((s, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-subtle-border bg-white flex gap-5 items-start">
                    <span className="font-serif text-2xl font-bold text-taupe">{s.step}</span>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-charcoal">{s.title}</h4>
                      <p className="text-xs sm:text-sm text-taupe leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Suitability */}
            <div className="p-8 rounded-3xl bg-white border border-subtle-border space-y-4">
              <h3 className="font-serif text-2xl font-medium text-charcoal">Is this procedure right for you?</h3>
              <p className="text-sm text-taupe leading-relaxed">
                This treatment is indicated for individuals experiencing textural irregularities, persistent discoloration, or structural volume loss. During your in-person consultation, our dermatologists review your medical history, current medications, and past procedures to ensure absolute suitability.
              </p>
            </div>

          </div>

          {/* Right Sidebar: Doctor Booking Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-8 rounded-3xl bg-[#FAF8F5] border border-subtle-border shadow-md space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-taupe block">
                  BOOK CLINICAL CONSULTATION
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-medium mt-1">
                  Schedule Your Visit
                </h3>
                <p className="text-xs text-taupe mt-1">
                  Consult directly with our senior board-certified dermatologists at our KIIT Road facility in Bhubaneswar.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Dermoscopic examination included</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Personalized prescription skincare plan</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Transparent treatment pricing</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/pages/contact"
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#171717] text-white hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-taupe block">Questions? Call Clinic Reception</span>
                <span className="text-xs font-semibold text-charcoal block mt-0.5">+91 91781 12345</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: AI SKIN ANALYSIS INTERACTIVE QUESTIONNAIRE
   ========================================================================= */
function AISkinAnalysisPage() {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('Oily / Combination');
  const [primaryConcern, setPrimaryConcern] = useState('Acne & Active Pimples');
  const [sensitivity, setSensitivity] = useState('Moderate (Occasional redness)');
  const [sunExposure, setSunExposure] = useState('Moderate (1-3 hours outdoor)');
  const [completed, setCompleted] = useState(false);

  const featuredProducts = getFeaturedProducts(4);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setCompleted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-charcoal py-14 lg:py-20 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-subtle-border text-xs font-semibold uppercase tracking-wider text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Clinical Algorithm</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
            Allodermis AI Skin Analysis
          </h1>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed">
            Answer 4 clinical questions to discover your personalized routine and physician-recommended treatment plan.
          </p>
        </div>

        {!completed ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-subtle-border shadow-xl space-y-8">
            
            {/* Step Indicator */}
            <div className="flex items-center justify-between pb-6 border-b border-subtle-border">
              <span className="text-xs uppercase font-bold tracking-wider text-taupe">
                Question {step} of 4
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-1.5 rounded-full transition-colors ${
                      i <= step ? 'bg-charcoal' : 'bg-subtle-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Skin Type */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  How does your skin feel midday?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Oily / Shiny across entire face',
                    'Combination (Oily T-zone, normal cheeks)',
                    'Dry / Tight / Flaky feeling',
                    'Normal / Balanced',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSkinType(option)}
                      className={`p-5 rounded-2xl text-left border-2 text-sm font-medium transition-all ${
                        skinType === option
                          ? 'border-charcoal bg-[#171717] text-white shadow-md'
                          : 'border-subtle-border bg-ivory text-charcoal hover:border-charcoal/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Primary Concern */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  What is your primary clinical concern?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Acne & Active Pimples',
                    'Acne Scars & Depressed Texture',
                    'Dark Spots, Melasma & Pigmentation',
                    'Fine Lines, Wrinkles & Skin Laxity',
                    'Scalp Dandruff & Hair Thinning',
                    'Uneven Skin Tone & Sun Tan',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrimaryConcern(option)}
                      className={`p-5 rounded-2xl text-left border-2 text-sm font-medium transition-all ${
                        primaryConcern === option
                          ? 'border-charcoal bg-[#171717] text-white shadow-md'
                          : 'border-subtle-border bg-ivory text-charcoal hover:border-charcoal/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Sensitivity */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  How does your skin react to new products or sun?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Extremely Sensitive (Stings, burns easily)',
                    'Moderate (Occasional redness)',
                    'Resilient (Tolerates most active serums)',
                    'Prone to itching / allergic rashes',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSensitivity(option)}
                      className={`p-5 rounded-2xl text-left border-2 text-sm font-medium transition-all ${
                        sensitivity === option
                          ? 'border-charcoal bg-[#171717] text-white shadow-md'
                          : 'border-subtle-border bg-ivory text-charcoal hover:border-charcoal/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Sun Exposure */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  What is your typical daily sun and screen exposure?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'High (Outdoors > 3 hours daily)',
                    'Moderate (1 to 3 hours outdoor)',
                    'Mostly Indoors with heavy screen use (Blue light)',
                    'Minimal outdoor exposure',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSunExposure(option)}
                      className={`p-5 rounded-2xl text-left border-2 text-sm font-medium transition-all ${
                        sunExposure === option
                          ? 'border-charcoal bg-[#171717] text-white shadow-md'
                          : 'border-subtle-border bg-ivory text-charcoal hover:border-charcoal/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Next / Back Controls */}
            <div className="pt-6 border-t border-subtle-border flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-charcoal border border-subtle-border hover:bg-ivory"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleNext}
                className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-all flex items-center gap-2"
              >
                <span>{step === 4 ? 'Calculate Analysis' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* Results Screen */
          <div className="space-y-10 animate-in fade-in duration-500">
            
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-subtle-border shadow-xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-taupe block mb-1">
                  DIAGNOSTIC REPORT GENERATED
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                  Your Personalized Skin Blueprint
                </h2>
              </div>

              {/* Diagnosis Summary Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 max-w-2xl mx-auto text-xs">
                <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                  <span className="text-taupe block text-[10px] uppercase">Skin Profile</span>
                  <span className="font-bold text-charcoal">{skinType.split(' ')[0]}</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                  <span className="text-taupe block text-[10px] uppercase">Target Concern</span>
                  <span className="font-bold text-charcoal truncate">{primaryConcern}</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                  <span className="text-taupe block text-[10px] uppercase">Sensitivity</span>
                  <span className="font-bold text-charcoal">{sensitivity.split(' ')[0]}</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-subtle-border">
                  <span className="text-taupe block text-[10px] uppercase">UV Risk</span>
                  <span className="font-bold text-charcoal">{sunExposure.split(' ')[0]}</span>
                </div>
              </div>

              {/* Clinical Advice */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-subtle-border text-left space-y-3 max-w-2xl mx-auto text-xs sm:text-sm text-taupe leading-relaxed">
                <h4 className="font-bold text-charcoal text-sm">Physician Assessment Summary:</h4>
                <p>
                  Based on your input, your epidermal barrier requires gentle sebum regulation combined with calming anti-inflammatory actives. Avoid harsh physical scrubs and over-exfoliation. Focus on ceramide fortification in the evening and high UVA/UVB PA++++ photoprotection each morning.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/pages/contact"
                  className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white hover:bg-black transition-colors"
                >
                  Book Dermatologist Consultation
                </Link>
                <button
                  onClick={() => { setStep(1); setCompleted(false); }}
                  className="px-6 py-4 rounded-full text-xs font-semibold text-charcoal border border-subtle-border hover:bg-ivory transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium text-center">
                Physician-Recommended Formulations for Your Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: REVIEWS & PATIENT STORIES
   ========================================================================= */
function ReviewsPage() {
  const reviews = getReviews();

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
            VERIFIED PATIENT FEEDBACK
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Patient Transformations & Reviews
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Real testimonies from patients who trusted Allodermis Dermatology Clinic for acne scars, pigmentation, laser treatments, and surgical care.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-ivory border border-subtle-border">
            <span className="font-serif text-4xl font-bold text-charcoal block">4.9 / 5</span>
            <span className="text-xs text-taupe block mt-1">Overall Patient Rating</span>
          </div>
          <div className="p-6 rounded-2xl bg-ivory border border-subtle-border">
            <span className="font-serif text-4xl font-bold text-charcoal block">10,000+</span>
            <span className="text-xs text-taupe block mt-1">Verified Clinical Cases</span>
          </div>
          <div className="p-6 rounded-2xl bg-ivory border border-subtle-border">
            <span className="font-serif text-4xl font-bold text-charcoal block">98.4%</span>
            <span className="text-xs text-taupe block mt-1">Would Recommend Allodermis</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-[#FBF9F6] border border-subtle-border flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center text-amber-500 gap-1">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {rev.treatment}
                </h3>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-subtle-border flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-charcoal block">{rev.name}</span>
                  <span className="text-taupe">{rev.location} • {rev.date}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {rev.doctor}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: ABOUT ALLODERMIS
   ========================================================================= */
function AboutPage() {
  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
              OUR CLINICAL STORY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
              Science over marketing. <br />
              Dermatology over fads.
            </h1>
            <p className="text-base sm:text-lg text-taupe leading-relaxed">
              Allodermis was established with a singular mission: to provide world-class, board-certified medical dermatology, advanced dermatosurgery, and authentic pharmaceutical skincare without commercial fluff.
            </p>
            <p className="text-sm sm:text-base text-taupe leading-relaxed">
              Our flagship clinic at KIIT Road, Patia, Bhubaneswar is equipped with international gold-standard laser workstations, US-FDA approved RF energy platforms, and sterile surgical suites.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-ivory">
              <Image
                src="/images/alloroots/clinics/alloroots-bhubaneswar-clinic.webp"
                alt="Allodermis Flagship Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-subtle-border">
          <div className="p-8 rounded-2xl bg-ivory border border-subtle-border space-y-3">
            <Stethoscope className="w-8 h-8 text-charcoal" />
            <h3 className="font-serif text-2xl font-medium text-charcoal">Physician Supervision</h3>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Every procedure is directly evaluated by board-certified MD & DNB dermatologists, ensuring the highest safety margins for diverse Indian skin types.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-ivory border border-subtle-border space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-800" />
            <h3 className="font-serif text-2xl font-medium text-charcoal">US-FDA Technologies</h3>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              We invest exclusively in clinically validated laser and energy platforms with rigorous international peer-reviewed safety and efficacy trials.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-ivory border border-subtle-border space-y-3">
            <Award className="w-8 h-8 text-amber-700" />
            <h3 className="font-serif text-2xl font-medium text-charcoal">Prescription Purity</h3>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Our retail skincare dispensary stocks 100% genuine formulations sourced directly from authorized manufacturers under strict cold-chain and storage protocols.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: CONTACT & APPOINTMENT BOOKING
   ========================================================================= */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Alok Kumar Sahoo',
    concern: 'Acne & Scars',
    date: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block">
            CONNECT WITH ALLODERMIS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Book an Appointment
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Schedule an in-person clinical consultation or virtual assessment with our board-certified dermatologists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Booking Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-subtle-border shadow-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal">Appointment Request Received</h3>
                <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our clinic reception team will call you at <strong>{formData.phone}</strong> to confirm your slot with {formData.doctor}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white mt-4"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priyanka Mohapatra"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Preferred Doctor</label>
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    >
                      <option>Dr. Alok Kumar Sahoo (Chief Dermatologist)</option>
                      <option>Dr. Shivani Biswal (Aesthetic Specialist)</option>
                      <option>Dr. Pranomita (Clinical Dermatologist)</option>
                      <option>Dr. Narayanan (Laser Surgeon)</option>
                      <option>First Available Specialist</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Primary Skin Concern</label>
                    <select
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    >
                      <option>Acne & Active Pimples</option>
                      <option>Acne Scars (MNRF & Subcision)</option>
                      <option>Pigmentation & Melasma</option>
                      <option>Laser Hair Reduction</option>
                      <option>Botox & Fillers</option>
                      <option>PDRN Skin Booster / Profhilo</option>
                      <option>Hair Fall & Scalp Care</option>
                      <option>General Dermatology Consultation</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Brief Medical Notes or Symptoms</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention any past treatments, allergies, or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-subtle-border text-xs text-charcoal focus:outline-none focus:border-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#171717] text-white hover:bg-black transition-all shadow-md"
                >
                  Confirm Appointment Booking
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Clinic Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-subtle-border space-y-6">
              <h3 className="font-serif text-2xl font-medium text-charcoal">Clinic Location & Hours</h3>

              <div className="space-y-4 text-xs text-taupe">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Flagship Facility</strong>
                    <span>Alloroots & Allodermis Clinic, KIIT Road, Patia, Bhubaneswar, Odisha 751024, India</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Reception & Appointments</strong>
                    <span>+91 91781 12345 / 0674-3501234</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Email Inquiries</strong>
                    <span>allodermis@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Operating Hours</strong>
                    <span>Monday – Saturday: 10:00 AM – 8:00 PM IST</span>
                    <span className="block text-[11px] text-taupe mt-0.5">Sunday by prior appointment only</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-subtle-border text-xs text-taupe space-y-2">
              <span className="font-bold text-charcoal uppercase tracking-wider block">Parking & Accessibility</span>
              <p>
                Valet parking and wheelchair accessible facilities available at our Patia clinic. Located 5 minutes from KIIT University campus.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   SUB-PAGE: LEGAL & POLICY FALLBACK
   ========================================================================= */
function PolicyPage({ handle }: { handle: string }) {
  const formattedTitle = handle
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-1">
            ALLODERMIS POLICY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
            {formattedTitle}
          </h1>
          <span className="text-xs text-taupe block mt-2">
            Last Updated: October 2026 • Registered Medical Practice
          </span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-taupe leading-relaxed pt-6 border-t border-subtle-border">
          <p>
            Allodermis operates as a licensed dermatology clinic and clinical skincare dispensary in Bhubaneswar, India. We are dedicated to maintaining the highest clinical standards of patient privacy, product authenticity, and ethical medical care.
          </p>
          <h3 className="font-serif text-xl font-medium text-charcoal pt-4">Authenticity & Product Safety</h3>
          <p>
            All pharmaceuticals and cosmeceuticals dispensed through Allodermis are stored under temperature-controlled conditions in compliance with medical storage standards. Items are dispatched in tamper-evident packaging.
          </p>
          <h3 className="font-serif text-xl font-medium text-charcoal pt-4">Shipping & Returns</h3>
          <p>
            Orders over ₹999 qualify for complimentary express shipping across India. Due to the sensitive biological nature of prescription dermatological formulations, opened medicinal products cannot be accepted for return unless damaged in transit.
          </p>
          <h3 className="font-serif text-xl font-medium text-charcoal pt-4">Medical Consultations</h3>
          <p>
            Consultation fees must be settled upon clinic check-in. Tele-consultations require prior appointment slot confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
