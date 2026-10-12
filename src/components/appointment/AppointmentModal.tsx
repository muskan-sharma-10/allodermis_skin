'use client';

import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, Stethoscope, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { getDoctors } from '@/lib/products';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctorName?: string;
  selectedTreatmentName?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  selectedDoctorName,
  selectedTreatmentName,
}: AppointmentModalProps) {
  const doctors = getDoctors();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: selectedDoctorName || doctors[0]?.name || 'Dr. Alok Sahoo',
    treatment: selectedTreatmentName || 'Acne & Pigmentation Consultation',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-subtle-border overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#171717] text-white flex items-center justify-between border-b border-[#2C2724]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#D5CDC4] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Allodermis Dermatology Clinic
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Book a Consultation
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-3xl font-normal text-charcoal">
                  Appointment Request Received
                </h3>
                <p className="text-base text-taupe leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our clinical coordinator will reach out to <strong>{formData.phone}</strong> shortly to confirm your consultation schedule with {formData.doctor}.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-subtle-border text-left max-w-md mx-auto space-y-2 text-sm text-charcoal">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-taupe" />
                  <span><strong>Location:</strong> KIIT Road, Patia, Bhubaneswar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-taupe" />
                  <span><strong>Time Slot:</strong> {formData.time}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-base text-taupe leading-relaxed">
                Connect directly with our board-certified MD dermatologists. Choose your specialist or treatment concern below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Choose Specialist
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all appearance-none cursor-pointer"
                    >
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.name}>
                          {doc.name} ({doc.qualifications.split('·')[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Concern / Treatment */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Concern or Treatment
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Acne & Acne Scars">Acne & Acne Scars Revision</option>
                    <option value="Skin Pigmentation & Melasma">Skin Pigmentation & Melasma</option>
                    <option value="Laser Hair Reduction">Laser Hair Reduction</option>
                    <option value="Chemical Peels & Glow Medifacial">Chemical Peels & Glow Medifacial</option>
                    <option value="Anti-Ageing & Botox / Fillers">Anti-Ageing & Botox / Fillers</option>
                    <option value="Hair Loss & GFC Therapy">Hair Loss & GFC Therapy</option>
                    <option value="General Dermatology Consultation">General Dermatology Consultation</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                  Additional Details or Symptoms (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current routine or symptoms..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-subtle-border bg-[#FDFCFB] text-charcoal text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]/20 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#171717] text-white hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Confirming Appointment...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment Request</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <span className="text-xs text-taupe">
                  100% Confidential • Direct Board-Certified Dermatologist Care
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
