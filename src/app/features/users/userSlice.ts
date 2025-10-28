import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import { selectCurrentUsername } from "../auth/authSlice"

export interface User {
    id: string,
    name: string
}

const initialState: User[] = [
    {id: '0', name: 'Tidus'},
    {id: '1', name: 'Henri'},
    {id: '2', name: 'Strohl'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    } 
})

export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: string | null) => state.users.find(user => user.id === userId)

export const selectCurrentUser = (state: RootState) => {
    const currentUsername = selectCurrentUsername(state)
    return selectUserById(state, currentUsername)
}
