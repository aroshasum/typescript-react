import './App.css'

import { Page } from '@/app/dashboard/page'
import { ErrorBoundary } from '@/components/error-boundary/error-boundary'

import { DashboardContextProvider } from './context/DashboardContext'

export default function App() {
  return (
    <ErrorBoundary>
      <DashboardContextProvider>
        <Page />
      </DashboardContextProvider>
    </ErrorBoundary>
  )
}
