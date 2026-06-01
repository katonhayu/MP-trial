'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, Database, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

interface Category {
  id: string
  name: string
  slug: string
  product_count?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  
  // Form State
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  // Delete State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      // Fetch categories
      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

      if (catError) throw catError

      // Fetch product counts for each category
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('category_id')

      if (prodError && prodError.code !== 'PGRST116') {
        console.error('Error fetching product counts:', prodError)
      }

      const countsMap: Record<string, number> = {}
      if (prodData) {
        prodData.forEach((p) => {
          if (p.category_id) {
            countsMap[p.category_id] = (countsMap[p.category_id] || 0) + 1
          }
        })
      }

      const formatted = (catData || []).map((cat: any) => ({
        ...cat,
        product_count: countsMap[cat.id] || 0,
      }))

      setCategories(formatted)
    } catch (error: any) {
      console.error('Error fetching categories:', error)
      toast.error('Gagal mengambil data kategori: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    if (dialogMode === 'create') {
      setSlug(generateSlug(val))
    }
  }

  const openCreateDialog = () => {
    setDialogMode('create')
    setName('')
    setSlug('')
    setSelectedCategory(null)
    setDialogOpen(true)
  }

  const openEditDialog = (category: Category) => {
    setDialogMode('edit')
    setName(category.name)
    setSlug(category.slug)
    setSelectedCategory(category)
    setDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) {
      toast.error('Nama dan slug kategori harus diisi.')
      return
    }

    setIsSubmitting(true)
    try {
      if (dialogMode === 'create') {
        const { error } = await supabase
          .from('categories')
          .insert({ name: name.trim(), slug: slug.trim() })

        if (error) throw error
        toast.success('Kategori berhasil ditambahkan!')
      } else {
        if (!selectedCategory) return
        const { error } = await supabase
          .from('categories')
          .update({ name: name.trim(), slug: slug.trim() })
          .eq('id', selectedCategory.id)

        if (error) throw error
        toast.success('Kategori berhasil diperbarui!')
      }
      setDialogOpen(false)
      fetchCategories()
    } catch (error: any) {
      console.error('Error saving category:', error)
      toast.error('Gagal menyimpan kategori: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!categoryToDelete) return
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryToDelete.id)

      if (error) throw error
      toast.success(`Kategori "${categoryToDelete.name}" berhasil dihapus.`)
      setDeleteConfirmOpen(false)
      setCategoryToDelete(null)
      fetchCategories()
    } catch (error: any) {
      console.error('Error deleting category:', error)
      toast.error('Gagal menghapus kategori: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const seedMockCategories = async () => {
    setIsSubmitting(true)
    const mockCats = [
      { name: 'Design Templates', slug: 'design-templates' },
      { name: 'Code Templates', slug: 'code-templates' },
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'E-Books', slug: 'e-books' },
      { name: 'Graphics', slug: 'graphics' },
      { name: 'Audio', slug: 'audio' },
    ]

    try {
      // First, get existing to avoid duplicate slug violations
      const { data: existing } = await supabase.from('categories').select('slug')
      const existingSlugs = new Set((existing || []).map((e) => e.slug))

      const toInsert = mockCats.filter((cat) => !existingSlugs.has(cat.slug))

      if (toInsert.length === 0) {
        toast.info('Semua kategori bawaan sudah ada di database.')
        return
      }

      const { error } = await supabase.from('categories').insert(toInsert)
      if (error) throw error

      toast.success(`Berhasil menambahkan ${toInsert.length} kategori bawaan!`)
      fetchCategories()
    } catch (error: any) {
      console.error('Error seeding categories:', error)
      toast.error('Gagal menambahkan kategori bawaan: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage product categories and tags</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={seedMockCategories} disabled={isSubmitting}>
            <Database className="mr-2 h-4 w-4" />
            Seed Categories
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories by name or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={fetchCategories} title="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Product Count</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Memuat kategori...
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Belum ada kategori. Klik "Add Category" atau "Seed Categories" untuk menambahkan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium text-foreground">
                      {category.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {category.slug}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {category.product_count}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(category)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(category)}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {dialogMode === 'create' ? 'Add New Category' : 'Edit Category'}
              </DialogTitle>
              <DialogDescription>
                Fill in the category name and slug. Slug will be generated automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-name">Category Name</Label>
                <Input
                  id="cat-name"
                  placeholder="e.g., WordPress Themes"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-slug">Slug (URL friendly)</Label>
                <Input
                  id="cat-slug"
                  placeholder="e.g., wordpress-themes"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Hapus Kategori?
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kategori <strong>{categoryToDelete?.name}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
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
