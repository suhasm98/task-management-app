import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filter: "all" | "completed" | "pending";
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    filter: "all",
};


const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<"all" | "completed" | "pending">) => {
            state.filter = action.payload;
        },
        fetchTasksStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchTasksStart, fetchTasksSuccess, fetchTasksFailure, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
