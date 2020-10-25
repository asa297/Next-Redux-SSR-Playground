import { createAsyncThunk } from '@reduxjs/toolkit'

import { EXAMPLE_MODULE } from './constants'

export const exampleDemoAction = createAsyncThunk(`${EXAMPLE_MODULE}/GET_HELLO`, async () => {
    return await new Promise<string>((reslove) => {
        setTimeout(() => {
            reslove('exampleDemoAction')
        },5000)
    })
})