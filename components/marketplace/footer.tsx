import Link from 'next/link'
import { Store } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">MarketHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The premier marketplace for digital products. Buy and sell templates, courses, ebooks, and more.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-medium text-foreground">Products</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/products?category=templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/products?category=courses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/products?category=ebooks" className="text-muted-foreground hover:text-foreground transition-colors">
                  E-Books
                </Link>
              </li>
              <li>
                <Link href="/products?category=graphics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Graphics
                </Link>
              </li>
            </ul>
          </div>

          {/* Seller Links */}
          <div>
            <h3 className="font-medium text-foreground">Sellers</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/seller/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/seller/products/new" className="text-muted-foreground hover:text-foreground transition-colors">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Seller Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-medium text-foreground">Support</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MarketHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
