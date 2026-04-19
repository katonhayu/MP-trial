'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Plus,
  BarChart3,
  ShoppingCart,
  Settings,
  Store,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockSeller } from '@/lib/mock-data'

const navigation = [
  { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/seller/products', icon: Package },
  { name: 'Add Product', href: '/seller/products/new', icon: Plus },
  { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/seller/settings', icon: Settings },
]

export function SellerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Store className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">MarketHub</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {mockSeller.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {mockSeller.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{mockSeller.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="mt-3 w-full justify-start text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
