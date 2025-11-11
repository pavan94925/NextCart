"use client";

import { CardContent, Typography, Divider, Chip } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

type CartItem = {
  id: string;
  name?: string;
  price: number;
  quantity: number;
};

function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      setCart(parsed);
    } catch {
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );

  return { cart, total, itemCount, isLoading };
}

export default function CartSummary() {
  const { cart, total, itemCount, isLoading } = useCart();

  if (isLoading) {
    return (
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  const subtotal = total;
  const tax = total * 0.1; // 10% tax
  const shippingCost = subtotal >= 50 ? 0 : 10; // Free shipping over $50
  const grandTotal = subtotal + tax + shippingCost;

  return (
    <Card className="sticky top-24 shadow-xl">
      <CardContent className="p-6">
        <Typography variant="h5" className="font-bold mb-4">
          Order Summary
        </Typography>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <Typography variant="body1">
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </Typography>
            <Typography variant="body1" className="font-semibold">
              {formatPrice(subtotal)}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LocalShippingIcon fontSize="small" color="action" />
              <Typography variant="body1">Shipping</Typography>
            </div>
            <div className="text-right">
              {shippingCost === 0 ? (
                <Chip label="FREE" size="small" color="success" />
              ) : (
                <Typography variant="body1" className="font-semibold">
                  {formatPrice(shippingCost)}
                </Typography>
              )}
            </div>
          </div>

          {subtotal < 50 && shippingCost > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              className="block"
            >
              Add {formatPrice(50 - subtotal)} more for free shipping!
            </Typography>
          )}

          <div className="flex justify-between items-center">
            <Typography variant="body1">Tax (10%)</Typography>
            <Typography variant="body1" className="font-semibold">
              {formatPrice(tax)}
            </Typography>
          </div>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-between items-center mb-6">
          <Typography variant="h6" className="font-bold">
            Total
          </Typography>
          <Typography variant="h5" className="font-bold" color="primary">
            {formatPrice(grandTotal)}
          </Typography>
        </div>

        <Link href="/checkout" className="no-underline">
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            className="mb-3"
          >
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/products" className="no-underline">
          <Button variant="outlined" size="medium" fullWidth>
            Continue Shopping
          </Button>
        </Link>

        {/* Security badges */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Typography
            variant="caption"
            color="text.secondary"
            className="text-center block mb-2"
          >
            Secure Checkout
          </Typography>
          <div className="flex justify-center gap-2 flex-wrap">
            <Chip label="SSL Encrypted" size="small" variant="outlined" />
            <Chip label="Secure Payment" size="small" variant="outlined" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
