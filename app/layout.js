import './globals.css';
import localFont from 'next/font/local';
import Header from './Header.js';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Homepage | E-Store',
    template: '%s | E-Store',
  },
  description:
    'Discover the latest tech gadgets, electronics, and accessories at unbeatable prices. Shop smartphones, laptops, gaming gear, and more with fast shipping and secure checkout. Upgrade your tech today!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
