'use client'

import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartItem from './CartItem'
import Button from '@/components/ui/Button'
import { CartItem as CartItemType } from '@/types'
import { getCartFromStorage, saveCartToStorage } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CartList() {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setCart(getCartFromStorage())
    setIsLoading(false)
  }, [])

  const handleUpdateQuantity = (id: number, quantity: number) => {
    const validQuantity = Math.max(1, quantity)
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.min(validQuantity, item.stock) }
      }
      return item
    })
    setCart(updatedCart)
    saveCartToStorage(updatedCart)
    window.dispatchEvent(new Event('storage'))
    router.refresh()
  }

  const handleRemove = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
    saveCartToStorage(updatedCart)
    window.dispatchEvent(new Event('storage'))
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Typography variant="h6" color="text.secondary">
          Loading cart...
        </Typography>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCartIcon
          sx={{ fontSize: 100 }}
          className="text-gray-400 mb-4"
        />
        <Typography variant="h4" className="font-bold mb-2">
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-6">
          Add some products to get started!
        </Typography>
        <Link href="/products" className="no-underline">
          <Button variant="contained" size="large">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h6" className="mb-4 text-gray-600">
        {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
      </Typography>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}
