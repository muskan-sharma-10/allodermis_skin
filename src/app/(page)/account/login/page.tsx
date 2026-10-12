'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isForgotView, setIsForgotView] = useState(false);

  // If already logged in, redirect to account dashboard
  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (isForgotView) {
      const res = await resetPassword(email);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setError(res.message);
      }
      return;
    }

    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      window.location.href = '/account';
    } else if (res.error) {
      setError(res.error);
    }
  };

  const fillDemoAccount = () => {
    setEmail('priya.sharma@example.com');
    setPassword('allodermis123');
    setError(null);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#FAF8F5] py-12 md:py-20 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[460px]">
        {/* Luxury Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-subtle-border shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-7">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-subtle-border text-[11px] font-semibold text-charcoal uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              Patient & Customer Portal
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-tight font-normal">
              {isForgotView ? 'Reset Password' : 'Sign In'}
            </h1>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              {isForgotView
                ? 'Enter your email to receive recovery instructions.'
                : 'Access your clinical orders, prescriptions, and skin assessment records.'}
            </p>
          </div>

          {/* Quick Demo Fill button */}
          {!isForgotView && (
            <div className="p-3 bg-ivory rounded-2xl border border-subtle-border/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs text-charcoal font-medium">Quick Demo Test Account</span>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="text-xs font-semibold text-charcoal hover:text-black underline underline-offset-2"
              >
                Auto Fill
              </button>
            </div>
          )}

          {/* Notifications */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal placeholder:text-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                />
              </div>
            </div>

            {!isForgotView && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-taupe">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotView(true);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-xs text-charcoal hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-ivory/60 border border-subtle-border rounded-xl text-sm text-charcoal placeholder:text-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-taupe hover:text-charcoal absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {!isForgotView && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-taupe">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-subtle-border text-charcoal focus:ring-charcoal"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : isForgotView
                ? 'Dispatch Recovery Link'
                : 'Sign In to Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle or Switch */}
          {isForgotView ? (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotView(false);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-xs text-charcoal font-medium hover:underline"
              >
                ← Back to Sign In
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-subtle-border text-center space-y-3">
              <p className="text-xs text-taupe">
                Don't have an Allodermis account?
              </p>
              <Link
                href="/account/register"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-ivory hover:bg-beige/70 text-charcoal border border-subtle-border text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Create an Account
              </Link>
            </div>
          )}

          {/* Trust assurances */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-taupe">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>US-FDA Standards & 256-bit SSL Protected Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
