import { LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#1EA7FF",
  },
} satisfies ChartConfig
type Props = {
  chartData: any
}
export function CustomLineChart({ chartData }: Props) {
  return (
    <Card className="bg-[#1E1F25]  border-0">
      <CardHeader>
        <CardTitle>Total Completed</CardTitle>
        <CardDescription>Last 30days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[370px]" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 50,
              left: 12,
              right: 12,
            }}
          >
            <YAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="completed"
              stroke="var(--color-completed)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-completed)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-amber-50"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
