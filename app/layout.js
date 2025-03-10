import './globals.css';
import Footer from './Footer.js';
import Header from './Header.js';

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
      <body>
        <Header />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
