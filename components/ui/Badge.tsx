import { Badge as MUIBadge, BadgeProps } from '@mui/material'
import { cn } from '@/lib/utils'

interface CustomBadgeProps extends BadgeProps {
  className?: string
}

export default function Badge({
  children,
  className,
  color = 'secondary',
  ...props
}: CustomBadgeProps) {
  return (
    <MUIBadge color={color} className={cn('', className)} {...props}>
      {children}
    </MUIBadge>
  )
}
