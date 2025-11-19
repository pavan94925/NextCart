import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/actions/products";
import ProductDetails from "@/components/products/ProductDetails";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - NextCart`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Link href="/products" className="no-underline mb-6 inline-block">
        <Button variant="text" startIcon={<ArrowBackIcon />} className="mb-4">
          Back to Products
        </Button>
      </Link>

      <ProductDetails product={product} />
    </Container>
  );
}
