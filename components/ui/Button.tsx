import { Button as MUIButton, ButtonProps } from '@mui/material'
import { cn } from '@/lib/utils'

interface CustomButtonProps extends ButtonProps {
  className?: string
}

export default function Button({
  className,
  children,
  variant = 'contained',
  size = 'medium',
  ...props
}: CustomButtonProps) {
  return (
    <MUIButton
      variant={variant}
      size={size}
      className={cn(
        'normal-case rounded-lg font-medium shadow-md hover:shadow-lg transition-all',
        className
      )}
      {...props}
    >
      {children}
    </MUIButton>
  )
}
