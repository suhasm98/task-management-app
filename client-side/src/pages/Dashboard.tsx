import { useEffect } from "react"
import { useDispatch } from "react-redux"
import api from "@/api/axios"
import { ChartConfig } from "@/components/ui/chart"

import { CustomAreaChart } from "@/components/CustomAreaChart"
import { CustomLineChart } from "@/components/CustomLineChart"
import Layout from "@/components/Layout"

import { ClipboardCheck, ClipboardList, Star } from "lucide-react"
import {
  fetchStats30dSuccess,
  fetchStats7dSuccess,
  fetchStatsFailure,
  fetchStatsStart,
} from "@/features/tasks/taskSlice"

import useDashboard from "@/hooks/useDashboard"

const chartConfig = {
  todo: {
    label: "Todo",
    color: "#5051F9",
  },
} satisfies ChartConfig

const chartConfigI = {
  inprogress: {
    label: "InProgress",
    color: "#1EA7FF",
  },
} satisfies ChartConfig

const chartConfigC = {
  completed: {
    label: "Completed",
    color: "#FF614C",
  },
} satisfies ChartConfig

export default function Dashboard() {
  const dispatch = useDispatch()
  const {
    completed30Data,
    completed7Data,
    completed7DataTotalCount,
    inProgress7Data,
    inProgress7TotalCount,
    todo7Data,
    todo7DataTotalCount,
  } = useDashboard()
  const fetchTaskStats = async () => {
    try {
      dispatch(fetchStatsStart())
      const [res7d, res30d] = await Promise.all([
        api.get("/tasks/stats", { withCredentials: true }), // default 7d
        api.get("/tasks/stats?range=30d", { withCredentials: true }),
      ])
      dispatch(fetchStats7dSuccess(res7d.data))
      dispatch(fetchStats30dSuccess(res30d.data))
    } catch (error: any) {
      dispatch(
        fetchStatsFailure(
          error?.response?.data?.message || "Failed to fetch stats"
        )
      )
    }
  }

  useEffect(() => {
    fetchTaskStats()
  }, [])
  return (
    <Layout>
      <div className="w-full flex justify-between mt-7">
        <CustomAreaChart
          Icon={<Star className="h-4 w-4" color="#E1E3E7" />}
          chartConfig={chartConfig}
          chartData={todo7Data}
          count={todo7DataTotalCount}
          footer="new tasks since last 7 days"
          heading="Todo"
          chartKey="todo"
        />
        <CustomAreaChart
          Icon={<ClipboardList className="h-4 w-4" color="#E1E3E7" />}
          chartConfig={chartConfigI}
          chartData={inProgress7Data}
          count={inProgress7TotalCount}
          footer="tasks since last 7 days"
          heading="In Progress"
          chartKey="inprogress"
        />
        <CustomAreaChart
          Icon={<ClipboardCheck className="h-4 w-4" color="#E1E3E7" />}
          chartConfig={chartConfigC}
          chartData={completed7Data}
          count={completed7DataTotalCount}
          footer="tasks since last 7 days"
          heading="Completed"
          chartKey="completed"
        />
      </div>
      <div></div>
      <div className="w-full mt-5">
        <CustomLineChart chartData={completed30Data} />
      </div>
    </Layout>
  )
}
