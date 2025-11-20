
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at?: string;
}


export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}


export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}


export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}


export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}


export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
}


export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
