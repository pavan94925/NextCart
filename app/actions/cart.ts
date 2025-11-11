"use server";

import { cookies } from "next/headers";
import { CartItem } from "@/types";

const CART_COOKIE = "nextcart_cart";

export async function getCart(): Promise<CartItem[]> {
  try {
    const cookieStore = await cookies();
    const cart = cookieStore.get(CART_COOKIE);
    return cart ? JSON.parse(cart.value) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
}

export async function addToCartAction(product: any, quantity: number = 1) {
  try {
    const cart = await getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    const cookieStore = await cookies();
    cookieStore.set(CART_COOKIE, JSON.stringify(updatedCart), {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function updateCartItemQuantity(
  productId: number,
  quantity: number,
) {
  try {
    const cart = await getCart();

    let updatedCart: CartItem[];

    if (quantity <= 0) {
      updatedCart = cart.filter((item) => item.id !== productId);
    } else {
      updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(CART_COOKIE, JSON.stringify(updatedCart), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, error: "Failed to update cart" };
  }
}

export async function removeFromCartAction(productId: number) {
  try {
    const cart = await getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);

    const cookieStore = await cookies();
    cookieStore.set(CART_COOKIE, JSON.stringify(updatedCart), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: "Failed to remove from cart" };
  }
}

export async function clearCartAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(CART_COOKIE);
    return { success: true, cart: [] };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}

// Main function - use this name
export async function getCartItemsCount(): Promise<number> {
  try {
    const cart = await getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
}

// Alias for backward compatibility
export const getCartCount = getCartItemsCount;
