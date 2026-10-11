import productsData from '@/data/products.json';
import doctorsData from '@/data/doctors.json';
import treatmentsData from '@/data/treatments.json';
import reviewsData from '@/data/reviews.json';
import articlesData from '@/data/articles.json';
import { Product } from '@/context/CartContext';

export type { Product } from '@/context/CartContext';

export interface Doctor {
  id: string;
  handle: string;
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  consultationsCount: string;
  specialties: string[];
  bio: string;
  image: string;
  clinicLocation: string;
}

export interface Treatment {
  id: string;
  handle: string;
  title: string;
  category: string;
  description: string;
  images: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  treatment: string;
  doctor: string;
  review: string;
  location: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  summary: string;
  image: string;
}

const allProducts = productsData as unknown as Product[];
const allDoctors = doctorsData as unknown as Doctor[];
const allTreatments = treatmentsData as unknown as Treatment[];
const allReviews = reviewsData as unknown as Review[];
const allArticles = articlesData as unknown as Article[];

export function getProducts(): Product[] {
  return allProducts;
}

export function getFeaturedProducts(count = 8): Product[] {
  return allProducts.slice(0, count);
}

export function getProductByHandle(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getProductTypes(): string[] {
  const types = allProducts.map((p) => p.product_type).filter(Boolean);
  return Array.from(new Set(types));
}

export function getVendors(): string[] {
  const vendors = allProducts.map((p) => p.vendor).filter(Boolean);
  return Array.from(new Set(vendors));
}

export function getDoctors(): Doctor[] {
  return allDoctors;
}

export function getDoctorByHandle(handle: string): Doctor | undefined {
  return allDoctors.find((d) => d.handle === handle || d.id === handle);
}

export function getTreatments(): Treatment[] {
  return allTreatments;
}

export function getTreatmentByHandle(handle: string): Treatment | undefined {
  return allTreatments.find((t) => t.handle === handle || t.id === handle);
}

export function getReviews(): Review[] {
  return allReviews;
}

export function getArticles(): Article[] {
  return allArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}
