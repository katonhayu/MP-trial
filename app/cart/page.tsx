'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { mockProducts } from '@/lib/mock-data'
import type { CartItem } from '@/lib/types'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[1], quantity: 1 },
  ])

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const platformFee = subtotal * 0.05
  const total = subtotal + platformFee

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartItemCount={cartItems.length} />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="mt-2 text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                            <span className="text-2xl font-semibold text-primary/30">
                              {item.product.title.charAt(0)}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                href={`/products/${item.product.id}`}
                                className="font-medium text-foreground hover:text-primary transition-colors"
                              >
                                {item.product.title}
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground">
                                by {item.product.sellerName}
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              Rp {item.product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-4">
                            <p className="text-sm text-muted-foreground">
                              {item.product.category}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform Fee (5%)</span>
                      <span className="text-foreground">Rp {platformFee.toLocaleString('id-ID')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Link href="/checkout" className="w-full">
                      <Button size="lg" className="w-full">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4" />
                      Secure checkout powered by Stripe
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <Card className="py-16">
              <CardContent className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-foreground">Your cart is empty</h2>
                <p className="mt-2 text-muted-foreground">
                  Looks like you haven&apos;t added any products yet.
                </p>
                <Link href="/products" className="mt-6">
                  <Button>
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
