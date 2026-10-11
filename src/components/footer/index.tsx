'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-[#EAE1D7] pt-20 pb-12 border-t border-[#2B2724]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Medical Credibility Banner */}
        <div className="pb-16 border-b border-[#2E2A27] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4B7A6] font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Evidence-Based Clinical Dermatology
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Subscribe to physician insights & tailored skincare advisories.
            </h3>
            <p className="text-sm text-[#9E9285] max-w-xl">
              Receive medical articles, ingredient breakdowns, and clinical recommendations curated directly by our board-certified dermatologists.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-[#24211E] text-white placeholder-[#8C8177] border border-[#38332F] text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-white text-[#171717] hover:bg-[#EAE1D7] text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <span className="text-[11px] text-[#786F66] mt-2 block">
              We respect your privacy. Strictly medical updates, zero spam. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-[#2E2A27]">
          
          {/* Col 1: Brand & Clinic Identity */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-3xl tracking-[0.06em] text-white uppercase block">
                Allodermis
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#A89C8E] block mt-1">
                Dermatology & Advanced Clinical Skincare
              </span>
            </div>

            <p className="text-sm text-[#B0A597] leading-relaxed max-w-sm">
              Allodermis is an advanced dermatology center delivering physician-led medical skincare, US-FDA approved laser technologies, and rigorous evidence-driven aesthetics led by senior board-certified specialists.
            </p>

            <div className="space-y-3 text-xs text-[#C4B7A6]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
                <span>Alloroots & Allodermis Clinic, KIIT Road, Patia, Bhubaneswar, Odisha 751024, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                <span>+91 91781 12345 / 0674-3501234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                <span>allodermis@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM (IST)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://www.instagram.com/allodermisclinic/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#24211E] border border-[#38332F] flex items-center justify-center text-[#C4B7A6] hover:text-white hover:border-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/AllodermisSkinClinic/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#24211E] border border-[#38332F] flex items-center justify-center text-[#C4B7A6] hover:text-white hover:border-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://allodermis.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#24211E] border border-[#38332F] flex items-center justify-center text-[#C4B7A6] hover:text-white hover:border-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Clinical Treatments */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-white">
              Clinical Procedures
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9285]">
              <li><Link href="/pages/acne-pimple" className="hover:text-white transition-colors">Acne & Breakout Therapy</Link></li>
              <li><Link href="/pages/acne-scar-treatment" className="hover:text-white transition-colors">Acne Scar Revision (MNRF)</Link></li>
              <li><Link href="/pages/laser-hair-reduction" className="hover:text-white transition-colors">Laser Hair Reduction (US-FDA)</Link></li>
              <li><Link href="/pages/chemical-peel" className="hover:text-white transition-colors">Clinical Chemical Peels</Link></li>
              <li><Link href="/pages/skin-pigmentation" className="hover:text-white transition-colors">Melasma & Pigmentation</Link></li>
              <li><Link href="/pages/botox" className="hover:text-white transition-colors">Botox & Anti-Wrinkle Care</Link></li>
              <li><Link href="/pages/dermal-fillers" className="hover:text-white transition-colors">Dermal Fillers & Contouring</Link></li>
              <li><Link href="/pages/pdrn-skin-booster" className="hover:text-white transition-colors">PDRN Salmon DNA Booster</Link></li>
              <li><Link href="/pages/profhilo" className="hover:text-white transition-colors">Profhilo Bioremodeling</Link></li>
              <li><Link href="/pages/hifu" className="hover:text-white transition-colors">HIFU Non-Surgical Lifting</Link></li>
            </ul>
          </div>

          {/* Col 3: Medical Skincare Store */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-white">
              Medical Store
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9285]">
              <li><Link href="/collections/all" className="hover:text-white transition-colors">All 250+ Clinical Products</Link></li>
              <li><Link href="/collections/all?type=Moisturizers" className="hover:text-white transition-colors">Moisturizers & Ceramides</Link></li>
              <li><Link href="/collections/all?type=Serums" className="hover:text-white transition-colors">Clinical Serums & Actives</Link></li>
              <li><Link href="/collections/all?type=Face+Wash+%26+Cleansers" className="hover:text-white transition-colors">Gentle & Foaming Cleansers</Link></li>
              <li><Link href="/collections/all?type=Sunscreen" className="hover:text-white transition-colors">Broad-Spectrum Sunscreens</Link></li>
              <li><Link href="/collections/all?type=Scalp+Solution" className="hover:text-white transition-colors">Hair & Scalp Solutions</Link></li>
              <li><Link href="/collections/all?type=Anti-Ageing" className="hover:text-white transition-colors">Anti-Ageing & Peptides</Link></li>
              <li><Link href="/collections/all?type=Supplements" className="hover:text-white transition-colors">Oral Clinical Supplements</Link></li>
              <li><Link href="/collections/dandruff" className="hover:text-white transition-colors">Targeted Dandruff Protocols</Link></li>
            </ul>
          </div>

          {/* Col 4: Medical Team & Patient Care */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-white">
              Clinic & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9285]">
              <li><Link href="/pages/our-doctors" className="hover:text-white transition-colors">Board-Certified Dermatologists</Link></li>
              <li><Link href="/pages/allodermis-ai-analysis" className="hover:text-white transition-colors">AI Skin Assessment Tool</Link></li>
              <li><Link href="/pages/reviews" className="hover:text-white transition-colors">Patient Stories & Google Reviews</Link></li>
              <li><Link href="/pages/about" className="hover:text-white transition-colors">About Our Medical Facility</Link></li>
              <li><Link href="/blogs/skin-acacdemy" className="hover:text-white transition-colors">Dermatology Skin Academy</Link></li>
              <li><Link href="/pages/contact" className="hover:text-white transition-colors">Book Clinic Appointment</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">View Medical Shopping Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Saved Skincare Wishlist</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal, Disclaimer & Accreditation */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#80756A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>© {new Date().getFullYear()} Allodermis Dermatology Clinic. All rights reserved. Registered Medical Facility.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pages/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/pages/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/pages/shipping-policy" className="hover:text-white transition-colors">Shipping & Returns</Link>
            <Link href="/pages/contact" className="hover:text-white transition-colors">Patient Support</Link>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 pt-6 border-t border-[#24211E] text-[11px] text-[#696057] leading-relaxed text-center">
          <p>
            Medical Disclaimer: Content on Allodermis is designed for clinical educational and skincare selection purposes only. It is not intended to be a substitute for professional medical diagnosis or personalized treatment. Consult our licensed board-certified dermatologists before initiating specialized medical procedures or prescription protocols.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;