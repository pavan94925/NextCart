import {
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CardActions,
} from '@mui/material'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="no-underline">
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.name}
          className="h-56 object-cover cursor-pointer"
        />
      </Link>

      <CardContent className="flex-1 flex flex-col gap-2 p-4">
        <div className="flex justify-between items-start gap-2">
          <Link
            href={`/products/${product.id}`}
            className="no-underline flex-1"
          >
            <Typography
              variant="h6"
              component="h3"
              className="font-semibold line-clamp-2 hover:text-primary cursor-pointer"
            >
              {product.name}
            </Typography>
          </Link>
          <Chip
            label={product.category}
            size="small"
            color="primary"
            variant="outlined"
            className="shrink-0"
          />
        </div>

        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-2 flex-1"
        >
          {product.description}
        </Typography>

        <div className="flex justify-between items-center mt-auto pt-2">
          <Typography variant="h5" color="primary" className="font-bold">
            {formatPrice(product.price)}
          </Typography>

          <Chip
            label={product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            size="small"
            color={product.stock > 0 ? 'success' : 'error'}
            variant="filled"
          />
        </div>
      </CardContent>

      <CardActions className="p-4 pt-0">
        <Link href={`/products/${product.id}`} className="no-underline w-full">
          <Button
            variant="contained"
            fullWidth
            disabled={product.stock === 0}
            startIcon={<ShoppingCartIcon />}
            size="large"
          >
            {product.stock > 0 ? 'View Details' : 'Out of Stock'}
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
