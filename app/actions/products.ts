"use server";

import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache";

// Fetch all products with caching
export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  ["products-list"],
  {
    tags: [CACHE_TAGS.PRODUCTS],
    revalidate: 300, // 5 minutes
  },
);

// Fetch product by ID with caching
export const getProductById = unstable_cache(
  async (id: number): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
  ["product-detail"],
  {
    tags: [CACHE_TAGS.PRODUCT],
    revalidate: 600, // 10 minutes
  },
);

// Get products by category
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("category")
      .order("category");

    if (error) throw error;

    // Get unique categories
    const categories = [...new Set(data?.map((item) => item.category) || [])];
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Revalidate products cache
export async function revalidateProducts() {
  revalidateTag(CACHE_TAGS.PRODUCTS);
  revalidateTag(CACHE_TAGS.PRODUCT);
}
