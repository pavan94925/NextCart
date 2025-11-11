import { type ClassValue, clsx } from "clsx";
import { CartItem } from "@/types";

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format price to USD
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// Calculate cart total
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Get cart from localStorage (client-side only)
export function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const cart = localStorage.getItem("nextcart_cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart from storage:", error);
    return [];
  }
}

// Save cart to localStorage
export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("nextcart_cart", JSON.stringify(cart));
    // Dispatch storage event to update other components
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
}

// Clear cart from storage
export function clearCartFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("nextcart_cart");
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Error clearing cart from storage:", error);
  }
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Check if item is in stock
export function isInStock(stock: number): boolean {
  return stock > 0;
}

// Calculate discount percentage
export function calculateDiscount(
  originalPrice: number,
  salePrice: number,
): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
