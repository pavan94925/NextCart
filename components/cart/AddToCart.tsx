"use client";

import { useState } from "react";
import { TextField, CircularProgress, Alert, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@/components/ui/Button";
import { Product } from "@/types";
import { getCartFromStorage, saveCartToStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      const cart = getCartFromStorage();
      const existingItem = cart.find((item: any) => item.id === product.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = [...cart, { ...product, quantity }];
      }

      saveCartToStorage(updatedCart);

      // Show success message
      setShowSuccess(true);

      // Trigger navbar update
      window.dispatchEvent(new Event("storage"));

      // Refresh to update cart count
      router.refresh();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 1;
    setQuantity(Math.max(1, Math.min(product.stock, num)));
  };

  return (
    <>
      <div className="flex gap-4 items-start mt-4">
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          inputProps={{ min: 1, max: product.stock }}
          className="w-28"
          size="medium"
          disabled={product.stock === 0}
        />

        <Button
          variant="contained"
          size="large"
          startIcon={
            isAdding ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <AddShoppingCartIcon />
            )
          }
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className="flex-1"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>

      {/* Success notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
