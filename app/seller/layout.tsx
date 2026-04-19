import { SellerSidebar } from '@/components/marketplace/seller-sidebar'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <SellerSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
