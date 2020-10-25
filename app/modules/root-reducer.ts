import { combineReducers } from 'redux'

import { ExampleSlice } from '@app/modules/example/slice'

export const RootReducer = combineReducers({
    [ExampleSlice.name]: ExampleSlice.reducer,
})
