export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  imageUrl: string
  sellerId: string
  sellerName: string
  rating: number
  reviewCount: number
  downloadCount: number
  featured: boolean
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  products: CartItem[]
  total: number
  status: 'pending' | 'completed' | 'refunded'
  createdAt: string
  customerId: string
  customerEmail: string
}

export interface Seller {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  totalSales: number
  totalProducts: number
  rating: number
  joinedAt: string
}

export interface Analytics {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  averageOrderValue: number
  revenueByMonth: { month: string; revenue: number }[]
  topProducts: { name: string; sales: number }[]
}

export interface Review {
  id: string
  productId: string
  customerId: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
}
