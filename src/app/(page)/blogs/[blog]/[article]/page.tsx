'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Share2
} from 'lucide-react';

interface ArticlePageProps {
  params: {
    blog: string;
    article: string;
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.article);
  const allArticles = getArticles();
  const featuredProducts = getFeaturedProducts(3);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="w-full bg-white text-charcoal py-14 lg:py-20 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <Link 
          href={`/blogs/${params.blog}`} 
          className="inline-flex items-center gap-2 text-xs font-semibold text-taupe hover:text-charcoal mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {params.blog === 'case-study' ? 'Case Studies' : 'Skin Academy'}</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 pb-8 border-b border-subtle-border">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-taupe block">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-taupe pt-2">
            <span className="font-semibold text-charcoal">{article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>
        </div>

        {/* Article Hero Media */}
        <div className="my-8 relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-ivory border border-subtle-border">
          <Image
            src={article.image || '/images/hero-clinic.jpg'}
            alt={article.title}
            fill
            priority
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {/* Article Editorial Body */}
        <article className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed space-y-6 pt-4 text-sm sm:text-base">
          <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed italic border-l-2 border-charcoal pl-4">
            {article.summary}
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal pt-4">
            Dermatological Mechanism & Physiological Context
          </h2>
          <p className="text-taupe">
            Cutaneous biology operates on a fine balance of lipid synthesis, keratinocyte desquamation, and dermal collagen synthesis. In Indian skin types (Fitzpatrick types III to V), hyper-reactive melanocytes and sebaceous hyperplasia frequently complicate simple topical interventions.
          </p>
          <p className="text-taupe">
            Clinical studies emphasize that over-cleansing and reliance on aggressive physical astringents disrupt the stratum corneum barrier, resulting in compensatory oil surges and micro-inflammation.
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal pt-4">
            Evidence-Based Treatment Pathways
          </h2>
          <p className="text-taupe">
            At Allodermis Clinic, treatment protocols are phased based on individual barrier resilience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-taupe">
            <li><strong>Phase 1: Barrier Restoration:</strong> Strengthening cellular ceramides and physiological pH.</li>
            <li><strong>Phase 2: Targeted Active Intervention:</strong> Introduction of clinically dosed retinoids, azelaic acid, or tranexamic acid.</li>
            <li><strong>Phase 3: Energy-Based Remodeling:</strong> Utilizing US-FDA approved MNRF or Q-switched lasers when indicated.</li>
          </ul>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-subtle-border my-8 space-y-2">
            <span className="text-xs uppercase font-bold text-charcoal block">Physician Summary & Takeaway</span>
            <p className="text-xs text-taupe leading-relaxed">
              Never initiate high-potency active cocktails without consulting a board-certified dermatologist. Individual skin tolerance dictates active percentages, application frequencies, and necessary barrier buffers.
            </p>
          </div>
        </article>

        {/* Author Box */}
        <div className="my-12 p-8 rounded-3xl bg-ivory border border-subtle-border flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-charcoal flex-shrink-0">
            <Image
              src="/images/alloroots/doctors/dr-alok-kumar-sahoo.webp"
              alt={article.author}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider font-bold text-taupe block">Article Author</span>
            <h4 className="font-serif text-xl font-medium text-charcoal">{article.author}</h4>
            <p className="text-xs text-taupe">
              Board-Certified Dermatologist at Allodermis Dermatology Clinic, Bhubaneswar. Specializing in evidence-based medical skincare and clinical dermatosurgery.
            </p>
          </div>
        </div>

        {/* Recommended Formulations */}
        <div className="pt-12 border-t border-subtle-border space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-medium text-charcoal">
              Physician-Dispensed Skincare Related to this Topic
            </h3>
            <Link href="/collections/all" className="text-xs font-semibold text-charcoal hover:underline">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
