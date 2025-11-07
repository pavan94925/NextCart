import { Container, Typography, Box } from '@mui/material'
import { getProducts } from './actions/products'
import ProductGrid from '@/components/products/ProductGrid'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 8)

  return (
    <>
      {/* Hero Section */}
      <Box className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 py-20">
        <Container maxWidth="lg">
          <div className="text-center max-w-3xl mx-auto">
            <StorefrontIcon sx={{ fontSize: 80 }} className="mb-4" />
            <Typography variant="h2" component="h1" className="font-bold mb-4">
              Welcome to NextCart
            </Typography>
            <Typography variant="h5" className="mb-6 opacity-90">
              Discover amazing products at unbeatable prices. Built with Next.js
              16, MUI & Tailwind CSS.
            </Typography>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products" className="no-underline">
                <Button
                  variant="contained"
                  size="large"
                  className="bg-white text-blue-600"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/products" className="no-underline">
                <Button
                  variant="outlined"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="py-12 bg-gray-100">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <LocalShippingIcon
                sx={{ fontSize: 60 }}
                color="primary"
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
                color="primary"
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
                color="primary"
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

      {/* Featured Products */}
      <Container maxWidth="xl" className="py-12">
        <Typography
          variant="h3"
          component="h2"
          className="font-bold mb-2 text-center"
        >
          Featured Products
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="mb-8 text-center"
        >
          Check out our most popular items
        </Typography>
        <ProductGrid products={featuredProducts} />

        <div className="text-center mt-8">
          <Link href="/products" className="no-underline">
            <Button variant="outlined" size="large">
              View All {products.length} Products
            </Button>
          </Link>
        </div>
      </Container>
    </>
  )
}
