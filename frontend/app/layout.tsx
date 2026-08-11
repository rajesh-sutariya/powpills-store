import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PowPills — Your Trusted Online Pharmacy & Healthcare Store',
  description:
    'Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
