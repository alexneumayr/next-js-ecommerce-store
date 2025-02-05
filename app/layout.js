import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import localFont from 'next/font/local';
import Link from 'next/link';

config.autoAddCss = false;

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
        <header>
          <Link href="/">
            <img src="/logo.png" width="200px" alt="Site logo" />
          </Link>

          <nav>
            <ul>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/cart">
                  <FontAwesomeIcon
                    icon={faCartFlatbedSuitcase}
                    size="2x"
                    className="cart-icon"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
