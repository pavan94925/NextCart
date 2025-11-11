import { Card as MUICard, CardProps } from "@mui/material";
import { cn } from "@/lib/utils";

interface CustomCardProps extends CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  className,
  children,
  elevation = 2,
  ...props
}: CustomCardProps) {
  return (
    <MUICard
      elevation={elevation}
      className={cn("rounded-xl border border-gray-200", className)}
      {...props}
    >
      {children}
    </MUICard>
  );
}
