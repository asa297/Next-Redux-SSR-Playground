import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EXAMPLE_MODULE } from './constants'
import { ExampleState } from './state'
import { exampleDemoAction } from './actions'

export type ChatAuth = { channel: string; uid?: string; limit: number }

const initialState = {} as ExampleState

export const ExampleSlice = createSlice({
    name: EXAMPLE_MODULE,
    initialState,
    reducers: {},
    extraReducers : {
        [exampleDemoAction.fulfilled.toString()]: (state: ExampleState, action:PayloadAction<string> ) => {
            state.message = action.payload
        },
    }
})