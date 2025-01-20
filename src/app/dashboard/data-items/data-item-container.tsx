import { DataItem } from '@/components/data-item'
import { useDashboardContext } from '@/context/DashboardContext'
import { DashboardContextProps } from '@/types/global-types'

export const DataItemContainer = () => {
  const { state }: { state: DashboardContextProps } = useDashboardContext()

  return (
    <>
      <DataItem
        title="Visitors"
        value={state.visitors}
        change={state.changeVisitors}
      />
      <DataItem
        title="Sales"
        value={`$${state.sales}`}
        change={state.changeSales}
      />
      <DataItem
        title="Conversion Rate"
        value={`${state.conversionRate}%`}
        change={state.changeConversionRate}
      />
    </>
  )
}
