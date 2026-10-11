'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/products';
import { ArrowRight, Clock, Calendar, User, Sparkles } from 'lucide-react';

interface BlogListingProps {
  params: {
    blog: string;
  };
}

export default function BlogListingPage({ params }: BlogListingProps) {
  const articles = getArticles();
  const blogName = params.blog === 'case-study' ? 'Clinical Case Studies' : 'Allodermis Skin Academy';

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-taupe mb-8">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{blogName}</span>
        </div>

        {/* Header */}
        <div className="pb-10 border-b border-subtle-border mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-taupe block mb-2">
            PHYSICIAN-AUTHORED JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            {blogName}
          </h1>
          <p className="text-sm sm:text-base text-taupe mt-3 max-w-2xl leading-relaxed">
            Evidence-based medical articles, ingredient breakdowns, and clinical insights written by board-certified dermatologists.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.slug}
              href={`/blogs/${params.blog}/${art.slug}`}
              className="group bg-[#FAF8F5] border border-subtle-border rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#D5CDC4] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full bg-ivory border-b border-subtle-border overflow-hidden">
                  <Image
                    src={art.image || '/images/hero-clinic.jpg'}
                    alt={art.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-charcoal border border-subtle-border">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-taupe">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {art.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal group-hover:text-black leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-taupe line-clamp-3 leading-relaxed mt-2">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-black">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
