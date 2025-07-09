import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'My Store',
  description: 'An awesome online store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        
          <Header />
          <main className="flex-grow px-4 py-6">{children}</main>
          <Footer/>
      
      </body>
    </html>
  );
}
