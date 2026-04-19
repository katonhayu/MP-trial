import Link from 'next/link'
import { Star, Download, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="text-4xl font-semibold text-primary/30">
              {product.title.charAt(0)}
            </span>
          </div>
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
            <span>{product.downloadCount.toLocaleString()}</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          by <span className="text-foreground">{product.sellerName}</span>
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
        <span className="text-lg font-bold text-foreground">${product.price}</span>
        <Button
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            onAddToCart?.(product)
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
