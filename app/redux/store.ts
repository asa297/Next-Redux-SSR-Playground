import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { RootReducer} from '@app/modules/root-reducer'
import deepmerge from 'deepmerge'

let store: ReturnType<typeof initStore>

function initStore(preloadedState: any) {
    return configureStore({
        reducer: RootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,
        middleware: getDefaultMiddleware({
            serializableCheck: false, // hide warning about non-serializable date objects on SSR
        }),
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