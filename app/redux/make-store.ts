import { createStore, applyMiddleware, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from '@app/modules/root-reducer'
import { rootSaga } from '@app/modules/root-saga'

const isProdEnv = process.env.NODE_ENV === 'production'
const isServer = typeof window === 'undefined'

const bindMiddleware = (middleware: Middleware[]) => {
    if (!isServer && !isProdEnv) {
        return composeWithDevTools(applyMiddleware(...middleware, logger))
    }
    return applyMiddleware(...middleware)
}

export const makeStore = (initialState : any) => {
    const sagaMiddleware = createSagaMiddleware()
    const middleware = [sagaMiddleware]

    const store = createStore(rootReducer, initialState, bindMiddleware(middleware)) as any

    store.saga = sagaMiddleware.run(rootSaga)

    return store
}
