import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  completedAt: string
  createdAt: string
  status: "todo" | "inprogress" | "completed"
  title: string
  updatedAt: string
  user: string
  __v: number
  _id: string
}

interface TaskStats {
  [date: string]: {
    todo: number
    inprogress: number
    completed: number
  }
}

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
  filter: "all" | "todo" | "inprogress" | "completed"
  stats7d: TaskStats
  stats30d: TaskStats
  statsLoading: boolean
  statsError: string | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "todo",
  stats7d: {},
  stats30d: {},
  statsLoading: false,
  statsError: null,
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<"all" | "todo" | "inprogress" | "completed">
    ) {
      state.filter = action.payload
    },
    fetchTasksStart(state) {
      state.loading = true
      state.error = null
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false
      state.tasks = action.payload
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },

    //Stats-specific reducers
    fetchStatsStart(state) {
      state.statsLoading = true
      state.statsError = null
    },
    fetchStats7dSuccess(state, action: PayloadAction<TaskStats>) {
      state.statsLoading = false
      state.stats7d = action.payload
    },
    fetchStats30dSuccess(state, action: PayloadAction<TaskStats>) {
      state.statsLoading = false
      state.stats30d = action.payload
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.statsLoading = false
      state.statsError = action.payload
    },
  },
})

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  setFilter,
  fetchStatsStart,
  fetchStats7dSuccess,
  fetchStats30dSuccess,
  fetchStatsFailure,
} = taskSlice.actions
export default taskSlice.reducer
