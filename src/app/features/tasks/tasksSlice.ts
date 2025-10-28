import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { CaseReducer, PayloadAction, WritableDraft } from "@reduxjs/toolkit"
import useFetch from "../../../hooks/useFetch"
import { useAppSelector } from "../../../hooks/reduxHooks"

export interface Task {
    id: string,
    name: string,
    finished: boolean
}

export interface TaskUpdate {
    id: string,
    finished: boolean
}

interface tasksState {
    tasks: Task[]
}

const initialState: tasksState = {
    tasks: [
        {id: '1', name: 'task 1', finished: false},
        {id: '2', name: 'task 2', finished: false},
        {id: '3', name: 'task 3', finished: false},
    ]
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        taskUpdated: (state, action: PayloadAction<{id: string, finished: boolean}>) => {
            const { id, finished } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            
            if(task){
                task.finished = finished;   
            }
        },
        taskDeleted: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        }
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchAsync.fulfilled, (state, action) => {
    //             state.tasks = action.payload as Task[]
    //         })
    // }
})

export const selectTask = (state: tasksState, id: string) => state.tasks.find(task => task.id === id);

export const fetchAsync = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await useFetch('http://localhost:3000/tasks');
        return response.data;
    }
)

export const {taskAdded, taskUpdated, taskDeleted } = tasksSlice.actions;

export default tasksSlice.reducer;

