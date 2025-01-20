import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DashboardContextProps } from '@/types/global-types'

const chartConfig = {
  desktop: {
    label: 'Trend',
    color: 'hsl(var(--chart-1))',
  },
}

export const TrendChart = ({
                             chartData,
                           }: {
  chartData: DashboardContextProps[]
}) => {
  return (
    <ChartContainer className="p-4 h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" maxHeight={450}>
        {chartData?.length > 0 && (
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="time"
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 20)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </ChartContainer>
  )
}
