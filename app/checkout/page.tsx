'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/marketplace/header'
import { mockProducts } from '@/lib/mock-data'

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Mock cart items
  const cartItems = [
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[1], quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const platformFee = subtotal * 0.05
  const total = subtotal + platformFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    router.push('/checkout/success')
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-foreground">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                      <p className="text-xs text-muted-foreground">
                        Your download links will be sent to this email
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM / YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      Your payment information is encrypted and secure
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground line-clamp-1">
                            {item.product.title}
                          </span>
                          <span className="text-foreground font-medium">
                            ${item.product.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform Fee</span>
                        <span className="text-foreground">${platformFee.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Pay ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                    <div className="space-y-2 text-center text-xs text-muted-foreground">
                      <p className="flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        30-day money-back guarantee
                      </p>
                      <p className="flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Instant digital delivery
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
