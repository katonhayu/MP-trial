'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap, Users, TrendingUp, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { ProductCard } from '@/components/marketplace/product-card'
import { mockProducts } from '@/lib/mock-data'

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
                <Sparkles className="mr-1 h-3 w-3" />
                Over 10,000+ Digital Products
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Discover & Sell Premium
                <span className="block text-primary">Digital Products</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
                MarketHub is the premier marketplace for creators and buyers. Find high-quality templates, 
                courses, ebooks, and more from talented sellers worldwide.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/seller/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Start Selling
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid gap-6 sm:grid-cols-3">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Creators</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-foreground">$2M+</p>
                  <p className="text-sm text-muted-foreground">Paid to Creators</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked products from top creators</p>
            </div>
            <Link href="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why Choose MarketHub?</h2>
              <p className="mt-2 text-muted-foreground">Everything you need to buy and sell digital products</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Secure Payments</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    All transactions are protected with industry-standard encryption. Get your money fast with automatic payouts.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Instant Delivery</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Digital products are delivered instantly after purchase. No waiting, start using your products right away.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Quality Guaranteed</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Every product is reviewed for quality. 30-day money-back guarantee on all purchases.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ready to Start Selling?</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Join thousands of creators earning money from their digital products. 
                Set up your store in minutes and start selling today.
              </p>
              <Link href="/auth/register" className="mt-8">
                <Button size="lg">
                  Create Your Store
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
