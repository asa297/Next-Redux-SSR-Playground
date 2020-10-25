import { createSelector } from '@reduxjs/toolkit'

import { EXAMPLE_MODULE } from './constants'
import { ExampleState } from './state'

export const exampleStateSelector = (state: any) => state[EXAMPLE_MODULE] as ExampleState

export const messageSelector = createSelector(exampleStateSelector, (state) => {
    return state.message || null
})
