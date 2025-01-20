import { ArrowDown, ArrowUp, ChartLineIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface DataItemProps {
  title: string
  value: string
  change: number
}

export const DataItem = ({ title, value, change }: DataItemProps) => {
  const changeTextColor = change < 0 ? 'text-red-500' : ''
  return (
    <Card className="w-full">
      <CardHeader className="items-center p-4 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <ChartLineIcon className="mr-2" size={14} />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid w-full items-center">
          <div className="font-bold text-lg">{value}</div>
          <div
            className={`text-sm flex items-center ${
              change > 0 ? 'text-green-500' : changeTextColor
            }`}
          >
            <div>{`${change}% compared to last record`}</div>
            {change ? (
              <div>
                {change > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}{' '}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
