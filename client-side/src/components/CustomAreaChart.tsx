"use client"

import { Area, AreaChart, XAxis } from "recharts"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { JSX } from "react"

type Props = {
  Icon: JSX.Element
  heading: string
  hideIcon?: boolean
  chartConfig: ChartConfig
  chartData: any
  footer: string
  count: number
  chartKey: string
}

export function CustomAreaChart({
  Icon,
  chartConfig,
  chartData,
  footer,
  heading,
  count,
  chartKey,
}: Props) {
  return (
    <Card className="w-96 h-52 bg-[#1E1F25] border-0">
      <div className="px-6 flex items-center">
        <div className="w-9 h-9 bg-[#282932] rounded-full flex items-center justify-center mr-2">
          {Icon}
        </div>
        <CardTitle>{heading}</CardTitle>
      </div>

      <CardContent className="flex justify-between">
        <ChartContainer className="h-24 w-32" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 2,
              bottom: 1,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              hide
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey={chartKey}
              stroke={`var(--color-${chartKey})`}
              fill={`var(--color-${chartKey})`}
              fillOpacity={0.4}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          <span className="text-5xl text-white text-end ">{count}</span>
          <span className="font-medium leading-none text-[#898999]">
            {footer}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
