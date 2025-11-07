'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCartItemsCount } from '@/app/actions/cart'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)

  // Fetch cart count only once when component mounts
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const count = await getCartItemsCount()
        setCartItemsCount(count)
      } catch (error) {
        console.error('Error fetching cart count:', error)
        setCartItemsCount(0)
      }
    }
    fetchCartCount()
  }, []) // Empty dependency array - runs only once

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Cart', href: '/cart' },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-blue-600 text-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="no-underline text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xl font-bold hidden sm:block">
                NextCart
              </span>
              <span className="text-xl font-bold sm:hidden">NC</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`no-underline text-white hover:opacity-80 transition-opacity ${
                  pathname === '/' ? 'font-bold underline' : ''
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`no-underline text-white hover:opacity-80 transition-opacity ${
                  pathname === '/products' ? 'font-bold underline' : ''
                }`}
              >
                Products
              </Link>

              <Link href="/cart" className="no-underline text-white relative">
                <div className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleDrawerToggle}
              className="md:hidden p-2 text-white hover:bg-blue-700 rounded"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleDrawerToggle}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={handleDrawerToggle}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg mb-2 no-underline ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={handleDrawerToggle}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.label === 'Cart' && cartItemsCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
