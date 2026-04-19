'use client'

import { use } from 'react'
import Link from 'next/link'
import { Star, Download, ShoppingCart, Heart, Share2, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { ProductCard } from '@/components/marketplace/product-card'
import { mockProducts, mockReviews } from '@/lib/mock-data'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)
  const productReviews = mockReviews.filter((r) => r.productId === product.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <span className="text-8xl font-bold text-primary/20">
                  {product.title.charAt(0)}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <Badge variant="secondary" className="w-fit">
                {product.category}
              </Badge>

              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>{product.downloadCount.toLocaleString()} downloads</span>
                </div>
              </div>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8">
                <p className="text-4xl font-bold text-foreground">${product.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">One-time purchase, lifetime access</p>
              </div>

              <div className="mt-8 flex gap-3">
                <Link href="/cart" className="flex-1">
                  <Button size="lg" className="w-full">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-8" />

              {/* Seller Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {product.sellerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{product.sellerName}</p>
                  <p className="text-sm text-muted-foreground">Verified Seller</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  View Profile
                </Button>
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3">
                {[
                  'Instant digital download',
                  'Lifetime updates included',
                  '30-day money-back guarantee',
                  'Premium support included',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-success" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="w-full justify-start border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="prose prose-sm max-w-none p-6 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground">About this product</h3>
                  <p className="mt-4">
                    {product.description} This product has been carefully crafted to help you achieve your goals faster. 
                    With attention to detail and modern design principles, it provides everything you need to get started.
                  </p>
                  <h4 className="mt-6 font-semibold text-foreground">What&apos;s included:</h4>
                  <ul className="mt-2 space-y-2">
                    <li>Full source files</li>
                    <li>Documentation and setup guide</li>
                    <li>Free updates for life</li>
                    <li>Premium support</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {review.customerName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{review.customerName}</p>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-warning text-warning'
                                        : 'text-muted-foreground/30'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="mt-4 text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center py-12 text-center">
                      <p className="text-lg font-medium text-foreground">No reviews yet</p>
                      <p className="mt-2 text-muted-foreground">Be the first to review this product</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
