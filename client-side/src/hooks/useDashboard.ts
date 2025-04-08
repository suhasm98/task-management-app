import { RootState } from "@/app/store"
import { forEach } from "lodash"
import { useSelector } from "react-redux"

const useDashboard = () => {
  const { stats7d, stats30d } = useSelector((state: RootState) => state.tasks)
  let todo7DataTotalCount = 0
  let inProgress7TotalCount = 0
  let completed7DataTotalCount = 0
  const todo7Data: any[] = []
  const inProgress7Data: any[] = []
  const completed7Data: any[] = []
  const completed30Data: any[] = []
  forEach(stats7d, (v, n) => {
    inProgress7TotalCount += v.inprogress
    todo7DataTotalCount += v.todo
    completed7DataTotalCount += v.completed
    todo7Data.push({ date: n, todo: v.todo })
    inProgress7Data.push({ date: n, inprogress: v.inprogress })
    completed7Data.push({ date: n, completed: v.completed })
  })
  forEach(stats30d, (v, n) => {
    completed30Data.push({ date: n, completed: v.completed })
  })

  return {
    todo7Data,
    inProgress7Data,
    completed7Data,
    completed30Data,
    todo7DataTotalCount,
    inProgress7TotalCount,
    completed7DataTotalCount,
  }
}

export default useDashboard
