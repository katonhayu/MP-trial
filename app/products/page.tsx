'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { ProductCard } from '@/components/marketplace/product-card'
import { mockProducts, categories } from '@/lib/mock-data'
import ProductDataGrid from '@/components/marketplace/product-data-grid'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState<string[]>([])

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'rating':
        return b.rating - a.rating
      default:
        return b.downloadCount - a.downloadCount
    }
  })

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Categories</h3>
        <div className="grid gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card text-foreground border border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Price Range</h3>
        <div className="space-y-3">
          {['Under Rp250.000', 'Rp250.000 - Rp500.000', 'Rp500.000 - Rp1.000.000', 'Over Rp1.000.000'].map((range) => (
            <div key={range} className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/50 transition-colors">
              <Checkbox
                id={range}
                checked={priceRange.includes(range)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setPriceRange([...priceRange, range])
                  } else {
                    setPriceRange(priceRange.filter((r) => r !== range))
                  }
                }}
                className="border-primary/40"
              />
              <Label htmlFor={range} className="text-sm font-medium text-foreground cursor-pointer">
                {range}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/50 transition-colors">
              <Checkbox id={`rating-${rating}`} className="border-primary/40" />
              <Label htmlFor={`rating-${rating}`} className="text-sm font-medium text-foreground cursor-pointer">
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Browse Products</h1>
            <p className="mt-2 text-muted-foreground">
              Discover {mockProducts.length}+ digital products from talented creators
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card border-2 border-primary/20 focus:border-primary/60 text-foreground placeholder:text-muted-foreground shadow-sm rounded-xl transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-card border-2 border-primary/20 focus:border-primary/60 text-foreground rounded-xl shadow-sm transition-all duration-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-primary/30">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden items-center gap-1 rounded-xl border-2 border-primary/20 bg-card p-1 sm:flex shadow-sm">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-lg transition-all duration-200"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-lg transition-all duration-200"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm hover:bg-card/80">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="rounded-2xl border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/10">
                <FilterSidebar />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3`}>
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <ProductDataGrid products={sortedProducts} />
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-medium text-foreground">No products found</p>
                  <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
