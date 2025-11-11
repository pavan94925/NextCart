// Next.js 16 Cache Configurations

export const cacheConfig = {
  products: {
    // Cache product list for 5 minutes, revalidate in background
    revalidate: 300, // 5 minutes
    tags: ["products"],
  },
  productDetail: {
    // Cache individual product for 10 minutes
    revalidate: 600, // 10 minutes
    tags: ["product"],
  },
  cart: {
    // Don't cache cart data
    revalidate: 0,
    tags: ["cart"],
  },
};

// Cache tags for revalidation
export const CACHE_TAGS = {
  PRODUCTS: "products",
  PRODUCT: "product",
  CART: "cart",
} as const;

// Cache life profiles for Next.js 16
export const cacheLife = {
  short: {
    stale: 60, // 1 minute
    revalidate: 300, // 5 minutes
    expire: 600, // 10 minutes
  },
  medium: {
    stale: 300, // 5 minutes
    revalidate: 600, // 10 minutes
    expire: 1800, // 30 minutes
  },
  long: {
    stale: 3600, // 1 hour
    revalidate: 7200, // 2 hours
    expire: 86400, // 24 hours
  },
} as const;
