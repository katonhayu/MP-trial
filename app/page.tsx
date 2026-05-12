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
        <section className="relative overflow-hidden border-b border-border bg-card">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="text-center">
              <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary hover:bg-primary/20">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Over 10,000+ Digital Products
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
                The Digital Product
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Marketplace</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
                MarketHub is the premier marketplace for creators and buyers. Find high-quality templates, 
                courses, ebooks, and more from talented sellers worldwide.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/seller/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-secondary">
                    Start Selling
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid gap-6 sm:grid-cols-3">
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Creators</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-foreground">Rp 30M+</p>
                  <p className="text-sm text-muted-foreground">Paid to Creators</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Star className="h-6 w-6" />
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
        <section className="border-y border-border bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why Choose MarketHub?</h2>
              <p className="mt-2 text-muted-foreground">Everything you need to buy and sell digital products</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Secure Payments</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    All transactions are protected with industry-standard encryption. Get your money fast with automatic payouts.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Instant Delivery</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Digital products are delivered instantly after purchase. No waiting, start using your products right away.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
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
          <Card className="overflow-hidden border-border bg-primary text-primary-foreground">
            <CardContent className="relative flex flex-col items-center p-12 text-center">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="relative">
                <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Selling?</h2>
                <p className="mt-4 max-w-xl text-primary-foreground/80">
                  Join thousands of creators earning money from their digital products. 
                  Set up your store in minutes and start selling today.
                </p>
                <Link href="/auth/register" className="mt-8 inline-block">
                  <Button size="lg" variant="secondary" className="shadow-lg">
                    Create Your Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
