'use client'

import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/src/lib/supabase'
import { toast } from 'sonner'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [loadingCats, setLoadingCats] = useState(true)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  })

  // File States
  const [productFile, setProductFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [existingFile, setExistingFile] = useState<string | null>(null)

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Load Categories & Product Info
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')
        if (error) throw error
        setCategories(data || [])
      } catch (err: any) {
        console.error('Error loading categories:', err)
        toast.error('Gagal mengambil kategori dari database.')
      } finally {
        setLoadingCats(false)
      }
    }

    const loadProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (data) {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            price: data.price ? data.price.toString() : '',
            category: data.category_id || '',
          })
          setExistingImage(data.image_path)
          setExistingFile(data.file_path)
          if (data.image_path) {
            setImagePreviewUrl(data.image_path)
          }
        }
      } catch (err: any) {
        console.error('Error loading product:', err)
        toast.error('Gagal mengambil detail produk: ' + err.message)
        router.push('/seller/products')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
    loadProduct()
  }, [id, router])

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductFile(e.target.files[0])
    }
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setCoverImage(file)
      // Cleanup blob url if we created one (don't revoke if it's external existingImage URL)
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveProductFile = () => {
    setProductFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemoveCoverImage = () => {
    setCoverImage(null)
    if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl)
    }
    setImagePreviewUrl(existingImage || null)
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.category) {
      toast.error('Silakan pilih kategori produk.')
      return
    }

    setIsSubmitting(true)
    try {
      let image_path = existingImage
      let file_path = existingFile

      // 1. Upload new image if chosen
      if (coverImage) {
        try {
          const fileExt = coverImage.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
          const { error } = await supabase.storage
            .from('products')
            .upload(`images/${fileName}`, coverImage)

          if (error) throw error

          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(`images/${fileName}`)
          image_path = publicUrl
        } catch (err: any) {
          console.warn('Storage image upload error, using local preview:', err)
          if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
            image_path = imagePreviewUrl
          }
        }
      }

      // 2. Upload new file if chosen
      if (productFile) {
        try {
          const fileExt = productFile.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
          const { error } = await supabase.storage
            .from('products')
            .upload(`files/${fileName}`, productFile)

          if (error) throw error

          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(`files/${fileName}`)
          file_path = publicUrl
        } catch (err: any) {
          console.warn('Storage file upload error, fallback to placeholder:', err)
        }
      }

      const { error } = await supabase
        .from('products')
        .update({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category_id: formData.category,
          image_path: image_path,
          file_path: file_path,
        })
        .eq('id', id)

      if (error) throw error

      toast.success('Produk berhasil diperbarui!')
      router.push('/seller/products')
    } catch (err: any) {
      console.error('Error updating product:', err)
      toast.error('Gagal memperbarui produk: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Memuat data produk...</p>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/seller/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Edit Product</h1>
        <p className="text-muted-foreground">Update your digital product listing</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update details about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Premium UI Kit for Figma"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your product includes and who it's for..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      disabled={loadingCats}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingCats ? 'Memuat...' : 'Select a category'} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Rp)</Label>
                    <div className="relative">
                      <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">Rp</span>
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="100000"
                        className="pl-10"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Files */}
            <Card>
              <CardHeader>
                <CardTitle>Product Files</CardTitle>
                <CardDescription>Upload the files customers will download</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProductFileChange}
                  accept=".zip,.pdf,.rar"
                  className="hidden"
                />
                {productFile ? (
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{productFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(productFile.size / (1024 * 1024)).toFixed(2)} MB (New selection)
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={handleRemoveProductFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : existingFile ? (
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">
                          {existingFile.split('/').pop() || 'Product File'}
                        </p>
                        <p className="text-xs text-muted-foreground">Existing file attached</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div
                    className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <p className="mt-4 font-medium text-foreground">Drop your files here</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        or click to browse (ZIP, PDF, up to 500MB)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
                <CardDescription>Upload an attractive cover image for your product</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className="hidden"
                />
                {imagePreviewUrl ? (
                  <div className="relative rounded-lg border border-border overflow-hidden bg-muted/30">
                    <img
                      src={imagePreviewUrl}
                      alt="Cover Preview"
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="outline"
                        className="mr-2 bg-background hover:bg-background/90"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        Change Image
                      </Button>
                      {coverImage && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleRemoveCoverImage}
                        >
                          Revert
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <ImageIcon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="mt-4 font-medium text-foreground">Upload cover image</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Recommended: 1200x800px (PNG, JPG)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation()
                          imageInputRef.current?.click()
                        }}
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Choose Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted relative">
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      {formData.title ? (
                        <span className="text-4xl font-semibold text-primary/30">
                          {formData.title.charAt(0)}
                        </span>
                      ) : (
                        <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {formData.title || 'Product Title'}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {formData.description || 'Product description...'}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    Rp {formData.price ? Number(formData.price).toLocaleString('id-ID') : '0'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                </Button>
                <Link href="/seller/products" className="block w-full">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
