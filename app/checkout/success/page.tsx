'use client'

import Link from 'next/link'
import { CheckCircle, Download, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { mockProducts } from '@/lib/mock-data'

export default function CheckoutSuccessPage() {
  // Mock purchased items
  const purchasedItems = [mockProducts[0], mockProducts[1]]
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-foreground">
              Thank you for your purchase!
            </h1>
            <p className="mt-4 text-muted-foreground">
              Your order <span className="font-medium text-foreground">{orderId}</span> has been confirmed.
            </p>
          </div>

          {/* Email Notification */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Confirmation email sent</p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for download links and receipt
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Purchased Items */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Your Downloads</h2>
            <div className="mt-4 space-y-3">
              {purchasedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                          <span className="text-lg font-semibold text-primary/30">
                            {item.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/customer/purchases">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Purchases
              </Button>
            </Link>
            <Link href="/products">
              <Button className="w-full sm:w-auto">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
