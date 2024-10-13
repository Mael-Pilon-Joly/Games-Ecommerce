import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My App',
  description: 'A sample homepage setup in Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="background">
      <header>
         <Navbar />
        </header>
        <main>{children}</main>
        <footer>My Footer</footer>
      </body>
    </html>
  );
}
