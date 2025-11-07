import { Container, Typography } from '@mui/material'
import CartList from '@/components/cart/CartList'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const dynamic = 'force-dynamic'

export default function CartPage() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Link href="/products" className="no-underline mb-6 inline-block">
        <Button variant="text" startIcon={<ArrowBackIcon />} className="mb-4">
          Continue Shopping
        </Button>
      </Link>

      <Typography variant="h3" component="h1" className="font-bold mb-8">
        Shopping Cart
      </Typography>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList />
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </Container>
  )
}
