'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, DollarSign, FileText, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categories } from '@/lib/mock-data'

export default function AddProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    router.push('/seller/products')
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
        <h1 className="mt-4 text-2xl font-bold text-foreground">Add New Product</h1>
        <p className="text-muted-foreground">Create a new digital product listing</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Add details about your product</CardDescription>
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
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter((c) => c !== 'All').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="49"
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
                <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mt-4 font-medium text-foreground">Drop your files here</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      or click to browse (ZIP, PDF, up to 500MB)
                    </p>
                    <Button variant="outline" className="mt-4">
                      <FileText className="mr-2 h-4 w-4" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
                <CardDescription>Upload an attractive cover image for your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mt-4 font-medium text-foreground">Upload cover image</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Recommended: 1200x800px (PNG, JPG)
                    </p>
                    <Button variant="outline" className="mt-4">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                  </div>
                </div>
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
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    {formData.title ? (
                      <span className="text-4xl font-semibold text-primary/30">
                        {formData.title.charAt(0)}
                      </span>
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {formData.title || 'Product Title'}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {formData.description || 'Product description will appear here...'}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    ${formData.price || '0'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Publishing...' : 'Publish Product'}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
