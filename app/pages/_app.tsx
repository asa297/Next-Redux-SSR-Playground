import { useStore } from '@app/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

export default function App({ Component, pageProps }: any) {
    const store = useStore(pageProps.initialReduxState)
    return (
        <>
            <ReduxProvider store={store}>
                <Component {...pageProps} />
            </ReduxProvider>
            {/* Fix bug Chrome that causes CSS transitions to fire */}
            <script> </script>
        </>
    )
}