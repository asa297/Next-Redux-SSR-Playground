import { configureStore,  getDefaultMiddleware} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { RootReducer} from '@app/modules/root-reducer'
import deepmerge from 'deepmerge'
import { logger } from 'redux-logger'

let store: ReturnType<typeof initStore>

const isProdEnv = process.env.NODE_ENV === 'production'
const isServer = typeof window === 'undefined'

function initStore(preloadedState: any) {
    const middlewares = (!isProdEnv && !isServer) ? [...getDefaultMiddleware({ serializableCheck : false }).concat(logger)] : [...getDefaultMiddleware({ serializableCheck : false })]
    return configureStore({
        reducer: RootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,
        middleware: middlewares
    })
}
export const initializeStore = (preloadedState = {}) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        const merged = deepmerge(store.getState(), preloadedState, {
            // always use target array
            arrayMerge: (target, source, options) => {
                return target
            },
        })
        _store = initStore(merged)

        // Reset the current store
        store = undefined as any
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: any) {
    return useMemo(() => initializeStore(initialState), [initialState])
}