import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700'] });

export const metadata = {
  title: 'AI Heating Assistant',
  description: 'Boiler calculator and AI chat for heating systems',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
