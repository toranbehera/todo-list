import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import usersReducer from "./features/users/userSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        users: usersReducer,
        auth: authReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>


