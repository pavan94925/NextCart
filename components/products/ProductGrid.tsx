import { Grid2 as Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import InventoryIcon from "@mui/icons-material/Inventory";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <InventoryIcon sx={{ fontSize: 80 }} className="text-gray-400 mb-4" />
        <Typography variant="h5" color="text.secondary" className="mb-2">
          No products found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Check back later for new products!
        </Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
