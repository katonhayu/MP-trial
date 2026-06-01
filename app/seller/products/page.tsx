'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Download, Database, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { supabase } from '@/src/lib/supabase'
import { toast } from 'sonner'
import { mockProducts } from '@/lib/mock-data'

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProducts(data || [])
    } catch (error: any) {
      console.error('Error fetching products:', error)
      toast.error('Gagal memuat produk dari database: ' + error.message)
      // Fallback to mock data for visual preview
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id)

      if (error) throw error

      toast.success(`Produk "${productToDelete.title}" berhasil dihapus.`)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
      fetchProducts()
    } catch (error: any) {
      console.error('Error deleting product:', error)
      toast.error('Gagal menghapus produk: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const seedMockProducts = async () => {
    setIsSubmitting(true)
    try {
      // 1. Fetch categories to map names to IDs
      const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('*')

      if (catsError) throw catsError

      if (!cats || cats.length === 0) {
        toast.error('Tolong masuk ke menu Categories dan klik "Seed Categories" terlebih dahulu!')
        return
      }

      const catMap = new Map(cats.map((c) => [c.name.toLowerCase(), c.id]))

      // 2. Fetch user to use as seller_id
      const { data: { user } } = await supabase.auth.getUser()
      let sellerId = user?.id

      if (!sellerId) {
        // Fallback: get first user from users table
        const { data: usersList } = await supabase.from('users').select('id').limit(1)
        if (usersList && usersList.length > 0) {
          sellerId = usersList[0].id
        } else {
          // If no user exists, prompt log in or create user first
          toast.error('Tolong buat akun/registrasi terlebih dahulu untuk mendapatkan seller_id!')
          return
        }
      }

      // 3. Filter mockProducts that are already in products table to avoid duplicates
      const { data: existingProds } = await supabase.from('products').select('title')
      const existingTitles = new Set((existingProds || []).map((p) => p.title.toLowerCase()))

      const toInsert = mockProducts
        .filter((mp) => !existingTitles.has(mp.title.toLowerCase()))
        .map((mp) => {
          // Find matching category UUID or default to the first category
          const normalizedCat = mp.category.toLowerCase()
          const category_id = catMap.get(normalizedCat) || cats[0].id

          return {
            title: mp.title,
            description: mp.description,
            price: mp.price,
            category_id: category_id,
            seller_id: sellerId,
            image_path: mp.imageUrl,
            file_path: '/placeholder-file.zip',
            is_active: true,
          }
        })

      if (toInsert.length === 0) {
        toast.info('Semua produk bawaan sudah ada di database.')
        return
      }

      const { error } = await supabase.from('products').insert(toInsert)
      if (error) throw error

      toast.success(`Berhasil menambahkan ${toInsert.length} produk bawaan ke database!`)
      fetchProducts()
    } catch (error: any) {
      console.error('Error seeding products:', error)
      toast.error('Gagal menambahkan produk bawaan: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={seedMockProducts} disabled={isSubmitting}>
            <Database className="mr-2 h-4 w-4" />
            Seed Products
          </Button>
          <Link href="/seller/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={fetchProducts} title="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Memuat produk...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Belum ada produk. Klik "Add Product" atau "Seed Products" untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                            <span className="text-sm font-semibold text-primary/30">
                              {product.title.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.categories?.name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Download className="h-4 w-4" />
                        {/* Download count is simulated since it's not stored in the schema */}
                        {(product.download_count || 0).toLocaleString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.is_active ? 'default' : 'secondary'}
                        className={product.is_active ? 'bg-success text-success-foreground' : ''}
                      >
                        {product.is_active ? 'Active' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/seller/products/edit/${product.id}`} className="flex w-full items-center">
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Hapus Produk?
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk <strong>{productToDelete?.title}</strong>?
              Tindakan ini akan menghapus produk dari daftar penjualan Anda secara permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
