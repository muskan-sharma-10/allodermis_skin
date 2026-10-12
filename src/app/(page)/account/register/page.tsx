'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to account dashboard
  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to terms of service.');
      return;
    }

    setLoading(true);
    const res = await register({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    setLoading(false);

    if (res.success) {
      window.location.href = '/account';
    } else if (res.error) {
      setError(res.error);
    }
  };

  const membershipBenefits = [
    'Track Physician-Approved Clinical Orders',
    'Access Official E-Prescriptions & Follow-up Plans',
    'Saved Shipping Addresses for 1-Click Fast Checkout',
    'Special Patient Pricing & Clinical Skincare Privileges',
  ];

  return (
    <div className="w-full min-h-[90vh] bg-[#FAF8F5] py-12 md:py-20 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Clinical Benefits Column (Desktop) */}
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-taupe block">
              ALLODERMIS CLINICAL MEMBERSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
              Evidence-based care, customized for your skin.
            </h2>
            <p className="text-sm text-taupe leading-relaxed">
              Create your account to consult with board-certified dermatologists, store skin histories, and receive authentic medical skincare.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {membershipBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm text-charcoal font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-subtle-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Dermatologist Note</span>
            </div>
            <p className="text-xs text-taupe italic">
              "Every prescription and skincare recommendation is vetted by Dr. Alok Kumar Sahoo to ensure safety and biological effectiveness."
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-subtle-border shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-6">
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal">
                Create Your Account
              </h1>
              <p className="text-xs text-taupe">
                Join Allodermis to manage orders and clinical records.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Priya"
                      className="w-full pl-10 pr-3 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sharma"
                    className="w-full px-4 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                    Password (min. 6)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-9 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-taupe hover:text-charcoal absolute right-2.5 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-subtle-border text-charcoal focus:ring-charcoal"
                />
                <label htmlFor="agreeTerms" className="text-xs text-taupe leading-relaxed">
                  I agree to Allodermis Clinical Terms of Service, Privacy Policy, and consent to receive digital treatment updates.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-subtle-border text-center">
              <p className="text-xs text-taupe">
                Already have an Allodermis account?{' '}
                <Link href="/account/login" className="text-charcoal font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-taupe">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Your medical records & information are private & protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
