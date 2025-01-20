import { TrendChart } from '@/components/trend-analysis/trend-chart'
import { TrendSelect } from '@/components/trend-analysis/trend-select'
import { useTrendData } from '@/components/trend-analysis/use-trend-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const TrendAnalysis = () => {
  const { chartData, category, setCategory } = useTrendData()
  return (
    <Card className="w-full max-h-[550px]">
      <CardHeader className="p-4 pb-2 flex-row items-center ">
        <CardTitle className="text-sm w-1/2">Trend Analysis</CardTitle>
        <TrendSelect category={category} setCategory={setCategory} />
      </CardHeader>
      <CardContent className="p-4 h-full">
        <TrendChart chartData={chartData} />
      </CardContent>
    </Card>
  )
}
