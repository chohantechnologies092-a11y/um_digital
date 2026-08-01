import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://umdigitalagency.com'),
  title: {
    default: 'UM Digital Agency | Full-Stack Digital Services & Solutions',
    template: '%s | UM Digital Agency',
  },
  description:
    'Premier 360° digital agency offering Digital Marketing, SEO, Graphic Design, Web & SaaS Engineering, Photography, and 3D Motion Animation.',
  keywords: [
    'UM Digital Agency',
    'Digital Marketing Agency',
    'SEO Services',
    'Graphics Designing',
    'Web Development',
    'Software Engineering',
    '3D Motion Animation',
    'Aeronox Solutions',
  ],
  authors: [{ name: 'UM Digital Agency' }],
  creator: 'UM Digital Agency',
  publisher: 'UM Digital / Aeronox Solutions LTD',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umdigitalagency.com',
    siteName: 'UM Digital Agency',
    title: 'UM Digital Agency | Full-Stack Digital Services & Solutions',
    description:
      'Premier 360° digital agency offering Digital Marketing, SEO, Graphic Design, Web & SaaS Engineering, Photography, and 3D Motion Animation.',
    images: [
      {
        url: '/assets/um digital logo-01.png',
        width: 1200,
        height: 630,
        alt: 'UM Digital Agency Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UM Digital Agency | Full-Stack Digital Services & Solutions',
    description:
      'Premier 360° digital agency offering Digital Marketing, SEO, Graphic Design, Web & SaaS Engineering, Photography, and 3D Motion Animation.',
    images: ['/assets/um digital logo-01.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/um digital logo-01.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
