import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? parseInt(process.env.PORT,  10) : 3000
const app = next({ dev, quiet: true, dir: 'app' })
const handle = app.getRequestHandler()

process.on('uncaughtException', err => {
    console.error('uncaughtException', err)
})

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err)
})

app.prepare().then(() => {
    const server = express()

    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
