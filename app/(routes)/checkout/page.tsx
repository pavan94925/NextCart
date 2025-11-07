'use client'

import { Container, Typography, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useEffect } from 'react'
import { saveCartToStorage } from '@/lib/utils'

export default function CheckoutPage() {
  useEffect(() => {
    // Clear cart after successful checkout
    saveCartToStorage([])
  }, [])

  return (
    <Container maxWidth="sm" className="py-16">
      <Paper className="p-8 text-center">
        <CheckCircleIcon
          sx={{ fontSize: 100 }}
          color="success"
          className="mb-4"
        />

        <Typography variant="h3" component="h1" className="font-bold mb-4">
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" className="mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-8">
          You will receive an email confirmation shortly with your order
          details.
        </Typography>

        <div className="flex flex-col gap-3">
          <Link href="/products" className="no-underline">
            <Button variant="contained" size="large" fullWidth>
              Continue Shopping
            </Button>
          </Link>

          <Link href="/" className="no-underline">
            <Button variant="outlined" size="large" fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>
      </Paper>
    </Container>
  )
}
