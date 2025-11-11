import { Container, Typography, Box } from '@mui/material'
import ProductGrid from '@/components/products/ProductGrid'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { getCurrentUser } from '@/lib/drizzle/sessions'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BannerCarousel from '@/components/BannerCarousel'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const featuredProducts = []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Use Navbar component instead of custom nav */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Box className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 py-20">
          <Container maxWidth="xl" className="py-8">
            <BannerCarousel />
          </Container>
        </Box>

        {/* Features Section */}
        <Box className="py-12 bg-gray-100">
          <Container maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <LocalShippingIcon
                  sx={{ fontSize: 60 }}
                  color="warning"
                  className="mb-3"
                />
                <Typography variant="h6" className="font-bold mb-2">
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On orders over $50
                </Typography>
              </div>
              <div className="text-center">
                <SecurityIcon
                  sx={{ fontSize: 60 }}
                  color="warning"
                  className="mb-3"
                />
                <Typography variant="h6" className="font-bold mb-2">
                  Secure Payment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% secure transactions
                </Typography>
              </div>
              <div className="text-center">
                <SupportAgentIcon
                  sx={{ fontSize: 60 }}
                  color="warning"
                  className="mb-3"
                />
                <Typography variant="h6" className="font-bold mb-2">
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicated customer service
                </Typography>
              </div>
            </div>
          </Container>
        </Box>

        {/* Featured Products Section */}
        <Container maxWidth="xl" className="py-12">
          <Typography
            variant="h3"
            component="h2"
            className="font-bold mb-2 text-center"
          >
            Coming Soon
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className="mb-8 text-center"
          >
            Our product catalog will be available soon
          </Typography>

          <div className="text-center py-12">
            <Typography variant="h6" color="text.secondary">
              Products will be available soon
            </Typography>
          </div>

          <div className="text-center mt-8">
            <Link href="/products" className="no-underline">
              <Button variant="outlined" size="large" disabled>
                Products Coming Soon
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h6 className="font-bold text-lg mb-4">NextCart</h6>
              <p className="opacity-80 text-sm">
                Your one-stop shop for all your needs. Built with Next.js 16.
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
              © 2024 NextCart. All rights reserved. Built with ❤️ using Next.js
              16
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
