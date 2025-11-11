import { CardContent, Typography, Chip, Divider, Box } from "@mui/material";
import Card from "@/components/ui/Card";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import AddToCart from "@/components/cart/AddToCart";
import Image from "next/image";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ReplayIcon from "@mui/icons-material/Replay";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <Card className="overflow-hidden">
        <div className="relative h-96 md:h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Card>

      {/* Product Info */}
      <div className="flex flex-col gap-4">
        <div>
          <Chip label={product.category} color="primary" className="mb-3" />
          <Typography variant="h3" component="h1" className="font-bold mb-3">
            {product.name}
          </Typography>
          <Typography variant="h4" color="primary" className="font-bold">
            {formatPrice(product.price)}
          </Typography>
        </div>

        <Divider />

        <div>
          <Typography variant="h6" className="font-semibold mb-3">
            Description
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className="leading-relaxed"
          >
            {product.description}
          </Typography>
        </div>

        <Divider />

        <div className="flex items-center gap-4">
          <Typography variant="body1" className="font-semibold">
            Availability:
          </Typography>
          <Chip
            label={
              product.stock > 0 ? `${product.stock} in stock` : "Out of stock"
            }
            color={product.stock > 0 ? "success" : "error"}
            variant="outlined"
          />
        </div>

        {/* Add to Cart */}
        <AddToCart product={product} />

        <Divider />

        {/* Features */}
        <Box className="space-y-3">
          <Typography variant="h6" className="font-semibold mb-3">
            Why Buy From Us?
          </Typography>

          <div className="flex items-start gap-3">
            <LocalShippingIcon color="primary" />
            <div>
              <Typography variant="body1" className="font-semibold">
                Free Shipping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                On orders over $50
              </Typography>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SecurityIcon color="primary" />
            <div>
              <Typography variant="body1" className="font-semibold">
                Secure Payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100% secure transactions
              </Typography>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ReplayIcon color="primary" />
            <div>
              <Typography variant="body1" className="font-semibold">
                Easy Returns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30-day return policy
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
