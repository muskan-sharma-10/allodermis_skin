'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register, 
    resetPassword 
  } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);
    if (res.success) {
      closeAuthModal();
      window.location.href = '/account';
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to terms and privacy policy.');
      return;
    }

    setIsLoading(true);
    const res = await register({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    setIsLoading(false);
    if (res.success) {
      closeAuthModal();
      window.location.href = '/account';
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const res = await resetPassword(email);
    setIsLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
    } else {
      setError(res.message);
    }
  };

  const handleFillDemo = () => {
    setEmail('priya.sharma@example.com');
    setPassword('allodermis123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div 
        className="bg-white rounded-3xl w-full max-w-[480px] shadow-2xl border border-subtle-border overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-[#171717] text-[#EAE1D7] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-serif text-lg leading-tight text-white tracking-wide">
                Allodermis Clinic & Store
              </p>
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#C5BCB3]">
                Dermatologist Authenticated Portal
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* Tabs for Login / Register */}
          {authModalMode !== 'forgot' && (
            <div className="flex items-center p-1 bg-ivory rounded-xl border border-subtle-border mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  resetFormState();
                }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                  authModalMode === 'login'
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('register');
                  resetFormState();
                }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                  authModalMode === 'register'
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Error / Success Messages */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODE: SIGN IN */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
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
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory/80 border border-subtle-border rounded-xl text-sm text-charcoal placeholder:text-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-taupe">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('forgot');
                      resetFormState();
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
                    className="w-full pl-10 pr-10 py-2.5 bg-ivory/80 border border-subtle-border rounded-xl text-sm text-charcoal placeholder:text-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
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

              {/* Demo auto-fill helper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-taupe">Testing our website?</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-charcoal font-semibold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Use Demo Patient Account
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Sign In to Account'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-taupe">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    resetFormState();
                  }}
                  className="text-charcoal font-semibold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          )}

          {/* MODE: REGISTER */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Priya"
                      className="w-full pl-9 pr-3 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sharma"
                    className="w-full px-3 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-8 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-taupe hover:text-charcoal absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-taupe mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-ivory/80 border border-subtle-border rounded-xl text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeModalTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-subtle-border text-charcoal focus:ring-charcoal"
                />
                <label htmlFor="agreeModalTerms" className="text-[11px] text-taupe leading-tight">
                  I agree to Allodermis Clinical Terms of Service and receive personalized dermatological care updates.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-taupe">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    resetFormState();
                  }}
                  className="text-charcoal font-semibold hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {authModalMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h3 className="font-serif text-xl text-charcoal">Reset Password</h3>
                <p className="text-xs text-taupe">
                  Enter your email address and we'll dispatch an instant recovery link to access your clinic portal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory/80 border border-subtle-border rounded-xl text-sm text-charcoal placeholder:text-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#171717] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Recovery Link'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    resetFormState();
                  }}
                  className="text-xs text-charcoal font-medium hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Bottom Security Assurance */}
          <div className="mt-6 pt-4 border-t border-subtle-border flex items-center justify-between text-[11px] text-taupe">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-bit Encrypted Medical Privacy
            </span>
            <Link
              href="/pages/about"
              onClick={closeAuthModal}
              className="hover:text-charcoal underline"
            >
              Clinic Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
