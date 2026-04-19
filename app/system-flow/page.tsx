'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ArrowDown,
  User,
  Search,
  ShoppingCart,
  CreditCard,
  Download,
  Package,
  Store,
  BarChart3,
  DollarSign,
  Users,
  CheckCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'

const customerFlow = [
  {
    step: 1,
    title: 'Browse Products',
    description: 'Explore marketplace with search and filters',
    icon: Search,
    page: '/products',
  },
  {
    step: 2,
    title: 'View Details',
    description: 'Check product info, reviews, and seller',
    icon: Package,
    page: '/products/1',
  },
  {
    step: 3,
    title: 'Add to Cart',
    description: 'Select products and manage cart',
    icon: ShoppingCart,
    page: '/cart',
  },
  {
    step: 4,
    title: 'Checkout',
    description: 'Secure payment with multiple options',
    icon: CreditCard,
    page: '/checkout',
  },
  {
    step: 5,
    title: 'Download',
    description: 'Instant access to digital products',
    icon: Download,
    page: '/customer/purchases',
  },
]

const sellerFlow = [
  {
    step: 1,
    title: 'Create Account',
    description: 'Sign up as a seller',
    icon: User,
    page: '/auth/register',
  },
  {
    step: 2,
    title: 'Add Products',
    description: 'Upload and list digital products',
    icon: Package,
    page: '/seller/products/new',
  },
  {
    step: 3,
    title: 'Manage Store',
    description: 'Track orders and inventory',
    icon: Store,
    page: '/seller/products',
  },
  {
    step: 4,
    title: 'View Analytics',
    description: 'Monitor sales and performance',
    icon: BarChart3,
    page: '/seller/analytics',
  },
  {
    step: 5,
    title: 'Receive Payouts',
    description: 'Automatic earnings withdrawal',
    icon: DollarSign,
    page: '/seller/settings',
  },
]

const allPages = [
  { name: 'Homepage', path: '/', category: 'Public' },
  { name: 'Products List', path: '/products', category: 'Public' },
  { name: 'Product Detail', path: '/products/1', category: 'Public' },
  { name: 'Shopping Cart', path: '/cart', category: 'Customer' },
  { name: 'Checkout', path: '/checkout', category: 'Customer' },
  { name: 'Order Success', path: '/checkout/success', category: 'Customer' },
  { name: 'My Purchases', path: '/customer/purchases', category: 'Customer' },
  { name: 'Login', path: '/auth/login', category: 'Auth' },
  { name: 'Register', path: '/auth/register', category: 'Auth' },
  { name: 'Seller Dashboard', path: '/seller/dashboard', category: 'Seller' },
  { name: 'Seller Products', path: '/seller/products', category: 'Seller' },
  { name: 'Add Product', path: '/seller/products/new', category: 'Seller' },
  { name: 'Seller Orders', path: '/seller/orders', category: 'Seller' },
  { name: 'Seller Analytics', path: '/seller/analytics', category: 'Seller' },
  { name: 'Seller Settings', path: '/seller/settings', category: 'Seller' },
]

export default function SystemFlowPage() {
  const groupedPages = allPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = []
    }
    acc[page.category].push(page)
    return acc
  }, {} as Record<string, typeof allPages>)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-primary/10 text-primary">System Documentation</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                MarketHub System Flow
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Visual documentation of user journeys and all available pages in the 
                multi-vendor marketplace platform.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Journey */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Customer Journey</h2>
                <p className="text-muted-foreground">From discovery to download</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Flow Steps */}
            <div className="grid gap-4 md:grid-cols-5">
              {customerFlow.map((item, index) => (
                <div key={item.step} className="relative">
                  <Link href={item.page}>
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Step {item.step}
                          </Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  {index < customerFlow.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block z-10">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seller Journey */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                  <Store className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Seller Journey</h2>
                  <p className="text-muted-foreground">From signup to earnings</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4 md:grid-cols-5">
                {sellerFlow.map((item, index) => (
                  <div key={item.step} className="relative">
                    <Link href={item.page}>
                      <Card className="group h-full transition-all hover:shadow-lg hover:border-accent/30">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                              Step {item.step}
                            </Badge>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                            <item.icon className="h-6 w-6 text-accent" />
                          </div>
                          <h3 className="mt-4 font-semibold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    {index < sellerFlow.length - 1 && (
                      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block z-10">
                        <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Pages */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Available Pages</h2>
            <p className="text-muted-foreground">Quick access to every page in the marketplace</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(groupedPages).map(([category, pages]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pages.map((page) => (
                      <Link
                        key={page.path}
                        href={page.path}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span>{page.name}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Overview */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">Platform Features</h2>
              <p className="text-muted-foreground">Key capabilities of the marketplace</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'For Customers',
                  features: [
                    'Browse and search products',
                    'Filter by category and price',
                    'View product details and reviews',
                    'Secure checkout process',
                    'Instant digital downloads',
                    'Purchase history tracking',
                  ],
                },
                {
                  title: 'For Sellers',
                  features: [
                    'Easy product listing',
                    'Order management',
                    'Revenue analytics',
                    'Customer insights',
                    'Automatic payouts',
                    'Store customization',
                  ],
                },
                {
                  title: 'Platform',
                  features: [
                    'Responsive design',
                    'Brown-White color theme',
                    'Clean Notion-style UI',
                    'Real-time charts',
                    'Secure authentication',
                    'Multi-vendor support',
                  ],
                },
              ].map((section) => (
                <Card key={section.title}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
