import { useEffect, useState } from 'react'

import { CategoryProps } from '@/components/trend-analysis/trend-analysis.types'
import {
  initialDashboardContext,
  useDashboardContext,
} from '@/context/dashboard-context'
import { DashboardContextProps } from '@/types/global-types'

const MAX_DATA_POINTS = 8

const getChartDataFromState = (
  currentState: DashboardContextProps,
  category: CategoryProps
) => {
  return {
    desktop: currentState[category],
    time: currentState.timestamp,
  }
}

export const useTrendData = () => {
  const [category, setCategory] = useState('visitors' as CategoryProps)
  const [count, setCount] = useState(0)
  const [chartData, setChartData] = useState([
    getChartDataFromState(initialDashboardContext, category),
  ])
  const { state } = useDashboardContext()

  useEffect(() => {
    if (count === MAX_DATA_POINTS) {
      setChartData([getChartDataFromState(initialDashboardContext, category)])
      setCount(0)
      return
    }

    setChartData([...chartData, getChartDataFromState(state, category)])
    setCount(count + 1)
  }, [state])

  return {
    category,
    setCategory,
    chartData,
  }
}
