'use client'

import Link from 'next/link'
import { Star, Download, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/types'
import { useCart } from '@/components/marketplace/cart-context'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80"}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
            }}
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge className="bg-primary/10 text-primary text-xs hover:bg-primary/20">
              Featured
            </Badge>
          )}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-3 font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span>{product.rating}</span>
            <span className="text-muted-foreground/60">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{product.downloadCount.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          by <span className="text-foreground">{product.sellerName}</span>
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
        <span className="text-lg font-bold text-foreground">Rp {product.price.toLocaleString('id-ID')}</span>
        <Button
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            if (onAddToCart) {
              onAddToCart(product)
            } else {
              addToCart(product)
              toast.success(`${product.title} added to cart`)
            }
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
