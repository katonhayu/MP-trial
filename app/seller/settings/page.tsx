'use client'

import { useState } from 'react'
import { Save, User, CreditCard, Bell, Shield, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { mockSeller } from '@/lib/mock-data'

export default function SellerSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and store settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="store">
            <Store className="mr-2 h-4 w-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="payouts">
            <CreditCard className="mr-2 h-4 w-4" />
            Payouts
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {mockSeller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={mockSeller.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockSeller.email} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue={mockSeller.bio}
                  placeholder="Tell customers about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>Customize your store appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue={mockSeller.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-url">Store URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">markethub.com/</span>
                  <Input id="store-url" defaultValue="designstudiopro" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  rows={4}
                  defaultValue={mockSeller.bio}
                  placeholder="Describe your store..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Manage how you receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Available Balance</p>
                    <p className="text-2xl font-bold text-foreground">$2,450.00</p>
                  </div>
                  <Button>Withdraw</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Bank Account</p>
                      <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payout Schedule</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatic weekly payouts every Monday
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: 'New Orders',
                  description: 'Get notified when you receive a new order',
                  defaultChecked: true,
                },
                {
                  title: 'Product Reviews',
                  description: 'Get notified when a customer leaves a review',
                  defaultChecked: true,
                },
                {
                  title: 'Payout Notifications',
                  description: 'Get notified when a payout is processed',
                  defaultChecked: true,
                },
                {
                  title: 'Marketing Emails',
                  description: 'Receive tips and updates about growing your business',
                  defaultChecked: false,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
