import App, { AppInitialProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'

class MyApp extends App<AppInitialProps> {
    render() {
        const { Component, pageProps } = this.props
        console.log(pageProps)
        return (
            <Component {...pageProps} />
        )
    }
  }

  export default MyApp