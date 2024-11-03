import '@/app/globals.css';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'Dynamic Filtering System',
  description:
        'Dynamic filtering system for a product catalog that allows users to filter products based on category, price range, brand and rating.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col justify-between bg-gray-400">
        <Header/>
        <main className="flex-1 px-4 md:px-8 xl:px-16 2xl:px-40 3xl:px-large">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
