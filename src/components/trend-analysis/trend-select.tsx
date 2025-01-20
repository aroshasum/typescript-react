import { CategoryProps } from '@/components/trend-analysis/trend-analysis.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface TrendSelectProps {
  category: CategoryProps
  setCategory: (value: CategoryProps) => void
}

export const TrendSelect = ({ category, setCategory }: TrendSelectProps) => {
  return (
    <div className=" ml-auto flex items-center">
      <Select
        defaultValue="visitors"
        value={category}
        onValueChange={(value) => setCategory(value as CategoryProps)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Visitors" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="visitors">Visitors</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="conversionRate">Conversion Rate</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
