'use client'

import { DollarSign, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockAnalytics } from '@/lib/mock-data'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const categoryData = [
  { name: 'Design Templates', value: 45 },
  { name: 'Code Templates', value: 30 },
  { name: 'Online Courses', value: 15 },
  { name: 'E-Books', value: 10 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']

export default function SellerAnalyticsPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: `Rp ${mockAnalytics.totalRevenue.toLocaleString('id-ID')}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: mockAnalytics.totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: TrendingUp,
    },
    {
      title: 'Unique Visitors',
      value: '12.4K',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance and insights</p>
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
                <Badge
                  variant="secondary"
                  className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
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
                    tickFormatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Revenue']}
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

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products by downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Order Value</span>
                  <span className="font-medium text-foreground">
                    ${mockAnalytics.averageOrderValue.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-3/4 rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Repeat Customer Rate</span>
                  <span className="font-medium text-foreground">42%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[42%] rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Review Response Rate</span>
                  <span className="font-medium text-foreground">95%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[95%] rounded-full bg-success" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Refund Rate</span>
                  <span className="font-medium text-foreground">1.2%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[1.2%] rounded-full bg-destructive" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
