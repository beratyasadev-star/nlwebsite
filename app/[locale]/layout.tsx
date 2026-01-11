import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { locales, localeDirections, Locale } from "@/src/lib/i18n";
import { getDictionary } from "@/src/dictionaries";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Arapça için ek font (opsiyonel - Google Fonts'tan)
// import { Noto_Sans_Arabic } from "next/font/google";
// const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], display: "swap" });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  // Geçersiz locale kontrolü
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dir = localeDirections[locale as Locale];
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.className} ${dir === 'rtl' ? 'rtl' : ''}`} suppressHydrationWarning>
        <Header locale={locale as Locale} dict={dict} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
