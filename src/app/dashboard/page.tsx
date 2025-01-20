import { DataItemContainer } from '@/app/dashboard/data-items/data-item-container'
import { Header } from '@/app/dashboard/header/header'
import { AppSidebar } from '@/components/app-sidebar'
import { TrendAnalysis } from '@/components/trend-analysis/trend-analysis'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useDashboardData } from '@/hooks/use-dashboard-data'

export const Page = () => {
  useDashboardData()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DataItemContainer />
          <div className="flex-1 rounded-xl max-h-[550px]">
            <TrendAnalysis />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
