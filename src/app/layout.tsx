import type { Metadata, Viewport } from "next";
import "../style/globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Allodermis | Board-Certified Dermatology & Clinical Skincare",
    template: "%s | Allodermis Dermatology",
  },
  description:
    "Allodermis provides physician-led dermatology treatments, US-FDA approved technologies, AI skin analysis, and genuine clinical skincare formulations curated by board-certified dermatologists.",
  keywords: [
    "Allodermis",
    "dermatologist Bhubaneswar",
    "clinical skincare",
    "skin clinic",
    "acne scar treatment",
    "laser hair reduction",
    "chemical peels",
    "Dr Alok Kumar Sahoo",
    "dermatology online consultation",
    "authentic medical skincare products",
  ],
  authors: [{ name: "Allodermis Medical Team" }],
  creator: "Allodermis Dermatology Clinic",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://allodermis.com",
    siteName: "Allodermis Dermatology",
    title: "Allodermis | Board-Certified Dermatology & Clinical Skincare",
    description:
      "Transform your skin with physician-formulated medical solutions, advanced laser aesthetics, and board-certified dermatologists.",
    images: [
      {
        url: "/images/hero-banner-doctors.jpg",
        width: 1200,
        height: 630,
        alt: "Allodermis Dermatology",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: [
      { url: "/favicon.png" }
    ]
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-charcoal font-sans antialiased selection:bg-[#EAE1D7] selection:text-charcoal">
        <AuthProvider>
          <CartProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <CartDrawer />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
