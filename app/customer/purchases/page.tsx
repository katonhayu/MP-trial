'use client'

import Link from 'next/link'
import { Download, Star, ExternalLink, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { mockProducts, mockOrders } from '@/lib/mock-data'

export default function CustomerPurchasesPage() {
  // Mock purchase data - combining products from orders
  const purchases = mockOrders.flatMap((order) =>
    order.products.map((item) => ({
      ...item.product,
      purchaseDate: order.createdAt,
      orderId: order.id,
      orderStatus: order.status,
    }))
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Purchases</h1>
            <p className="mt-2 text-muted-foreground">
              Access and download your purchased products
            </p>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase, index) => (
                    <Card key={`${purchase.id}-${index}`}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          {/* Product Image */}
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                              <span className="text-2xl font-semibold text-primary/30">
                                {purchase.title.charAt(0)}
                              </span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <Link
                                  href={`/products/${purchase.id}`}
                                  className="font-semibold text-foreground hover:text-primary transition-colors"
                                >
                                  {purchase.title}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  by {purchase.sellerName}
                                </p>
                              </div>
                              <Badge
                                variant={purchase.orderStatus === 'completed' ? 'default' : 'secondary'}
                                className={purchase.orderStatus === 'completed' ? 'bg-success text-success-foreground' : ''}
                              >
                                {purchase.orderStatus === 'completed' ? 'Delivered' : 'Processing'}
                              </Badge>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                Purchased {new Date(purchase.purchaseDate).toLocaleDateString()}
                              </span>
                              <span>Order {purchase.orderId}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-warning text-warning" />
                                <span>{purchase.rating}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex shrink-0 gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="py-16">
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="mt-6 text-lg font-semibold text-foreground">
                      No purchases yet
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Browse our marketplace to find great digital products
                    </p>
                    <Link href="/products" className="mt-6">
                      <Button>Browse Products</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <Card className="py-16">
                <CardContent className="flex flex-col items-center text-center">
                  <p className="text-muted-foreground">Your recent purchases will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card className="py-16">
                <CardContent className="flex flex-col items-center text-center">
                  <p className="text-muted-foreground">Products you&apos;ve favorited will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
