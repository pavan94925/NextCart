import { Container, Typography } from '@mui/material'
import { getProducts } from '@/app/actions/products'
import ProductGrid from '@/components/products/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h3" component="h1" className="font-bold mb-6">
        All Products
      </Typography>
      <Typography variant="body1" color="text.secondary" className="mb-8">
        Browse our complete collection of {products.length} products
      </Typography>
      <ProductGrid products={products} />
    </Container>
  )
}
