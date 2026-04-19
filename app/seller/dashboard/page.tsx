'use client'

import Link from 'next/link'
import { DollarSign, Package, ShoppingCart, TrendingUp, ArrowUpRight, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockAnalytics, mockProducts, mockOrders } from '@/lib/mock-data'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function SellerDashboardPage() {
  const sellerProducts = mockProducts.filter((p) => p.sellerId === 'seller-1')
  const recentOrders = mockOrders.slice(0, 3)

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: mockAnalytics.totalOrders.toString(),
      change: '+8.2%',
      icon: ShoppingCart,
    },
    {
      title: 'Products',
      value: mockAnalytics.totalProducts.toString(),
      change: '+2',
      icon: Package,
    },
    {
      title: 'Avg. Order Value',
      value: `$${mockAnalytics.averageOrderValue.toFixed(2)}`,
      change: '+5.1%',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
        </div>
        <Link href="/seller/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="text-success">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.revenueByMonth}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number) => [`$${value}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">${order.total}</p>
                    <Badge
                      variant={order.status === 'completed' ? 'default' : 'secondary'}
                      className={order.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/seller/orders">
              <Button variant="outline" className="mt-4 w-full">
                View All Orders
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage your product listings</CardDescription>
            </div>
            <Link href="/seller/products">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sellerProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <span className="text-lg font-semibold text-primary/30">
                      {product.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.downloadCount.toLocaleString()} downloads
                  </p>
                </div>
                <p className="font-semibold text-foreground">${product.price}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
