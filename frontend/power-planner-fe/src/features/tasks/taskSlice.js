import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit"


const initialState = {
    tasks: []
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    extraReducers : (builder) => {
        builder.addCase()
    }
})

export const fetchTasks = createAsyncThunk("fetchTasks",)