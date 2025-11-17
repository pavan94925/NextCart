"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCartItemsCount } from "@/app/actions/cart";

export default function Navbar({user}: {user: any}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch cart count only once when component mounts
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const count = await getCartItemsCount();
        setCartItemsCount(count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartItemsCount(0);
      }
    };
    fetchCartCount();
  }, []); // Empty dependency array - runs only once

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear cookies on client side
      document.cookie =
        "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Wait a moment for cookie to clear
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirect to login page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white text-orange-500 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="no-underline text-orange-500 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="black"
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

            <div className="hidden md:flex flex-1 justify-center px-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full max-w-md px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`no-underline text-black hover:opacity-80 transition-opacity ${
                  pathname === "/" ? "font-bold underline" : ""
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`no-underline text-black hover:opacity-80 transition-opacity ${
                  pathname === "/products" ? "font-bold underline" : ""
                }`}
              >
                Products
              </Link>

              <Link href="/cart" className="no-underline text-black relative">
                <div className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="black"
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
                    <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Logout Button - Desktop */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-white text-black border border-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleDrawerToggle}
              className="md:hidden p-2 text-black hover:bg-gray-200 rounded transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="black"
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
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleDrawerToggle}
          />

          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-black">Menu</span>
              <button
                onClick={handleDrawerToggle}
                className="p-2 hover:bg-gray-100 rounded text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="black"
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
                      ? "bg-orange-100 text-orange-700 font-bold"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={handleDrawerToggle}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.label === "Cart" && cartItemsCount > 0 && (
                      <span className="bg-orange-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              {/* Logout Button - Mobile */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full mt-4 bg-orange-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center flex items-center justify-center gap-2"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
