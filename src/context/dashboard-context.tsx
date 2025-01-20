import React, { createContext, useContext, useMemo, useState } from 'react'

import { DashboardContextProps } from '@/types/global-types'

export const initialDashboardContext: DashboardContextProps = {
  visitors: 0,
  changeVisitors: 0,
  sales: 0,
  changeSales: 0,
  conversionRate: 0,
  changeConversionRate: 0,
  timestamp: new Date().toLocaleString(),
}

const DashboardContext = createContext(initialDashboardContext)

export const useDashboardContext = () => useContext(DashboardContext)

export const DashboardContextProvider = ({ children }) => {
  const [state, setState] = useState(initialDashboardContext)

  const updateState = (newState) => {
    setState(newState)
  }

  const contextValue = useMemo(
    () => ({
      state,
      updateState,
    }),
    [state]
  )

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}
