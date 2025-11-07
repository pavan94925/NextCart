import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NextCart - Modern E-commerce Store',
  description:
    'Shop the latest products with NextCart - Built with Next.js 16 & Tailwind CSS',
  keywords: ['ecommerce', 'shopping', 'nextjs', 'online store'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* Remove MUIThemeProvider completely */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 bg-gray-50">{children}</main>

          {/* Simple Tailwind Footer */}
          <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h6 className="font-bold text-lg mb-4">NextCart</h6>
                  <p className="opacity-80 text-sm">
                    Your one-stop shop for all your needs. Built with Next.js
                    16.
                  </p>
                </div>
                <div>
                  <h6 className="font-bold text-lg mb-4">Quick Links</h6>
                  <div className="flex flex-col gap-2">
                    <a
                      href="/"
                      className="text-white opacity-80 hover:opacity-100 no-underline text-sm"
                    >
                      Home
                    </a>
                    <a
                      href="/products"
                      className="text-white opacity-80 hover:opacity-100 no-underline text-sm"
                    >
                      Products
                    </a>
                    <a
                      href="/cart"
                      className="text-white opacity-80 hover:opacity-100 no-underline text-sm"
                    >
                      Cart
                    </a>
                  </div>
                </div>
                <div>
                  <h6 className="font-bold text-lg mb-4">Contact</h6>
                  <p className="opacity-80 text-sm">
                    Email: support@nextcart.com
                    <br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                <p className="opacity-70 text-sm">
                  © 2024 NextCart. All rights reserved. Built with ❤️ using
                  Next.js 16
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
