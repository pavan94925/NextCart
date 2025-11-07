'use client'

import {
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Card from '@/components/ui/Card'
import { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      onUpdateQuantity(item.id, item.quantity + 1)
    }
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="flex gap-4 items-center p-4">
        <Link href={`/products/${item.id}`} className="no-underline">
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.id}`} className="no-underline">
            <Typography
              variant="h6"
              className="font-semibold hover:text-primary cursor-pointer line-clamp-1"
            >
              {item.name}
            </Typography>
          </Link>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-1"
          >
            {item.description}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className="font-semibold mt-1"
          >
            {formatPrice(item.price)} each
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            size="small"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            color="primary"
          >
            <RemoveIcon />
          </IconButton>

          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
            }
            inputProps={{
              min: 1,
              max: item.stock,
              style: { textAlign: 'center' },
            }}
            size="small"
            className="w-16"
          />

          <IconButton
            size="small"
            onClick={handleIncrease}
            disabled={item.quantity >= item.stock}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </div>

        <Box className="text-right min-w-[100px]">
          <Typography variant="h6" className="font-bold">
            {formatPrice(item.price * item.quantity)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.quantity} × {formatPrice(item.price)}
          </Typography>
        </Box>

        <IconButton
          color="error"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}
