import './App.css'

import { Page } from '@/app/dashboard/page'
import { ErrorBoundary } from '@/components/error-boundary/error-boundary'

import { DashboardContextProvider } from './context/dashboard-context'

export const App = () => {
  return (
    <ErrorBoundary>
      <DashboardContextProvider>
        <Page />
      </DashboardContextProvider>
    </ErrorBoundary>
  )
}
