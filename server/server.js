const path = require('path')
const express = require('express')
const {createBundleRenderer} = require('vue-server-renderer')
const {sessionIdGenerator} = require('./middleware/csrf')
const {checkAuth} = require('./middleware/checkAuth')
const cookieParser = require('cookie-parser')

const template = require('fs').readFileSync(
    path.join(__dirname, '../templates/index.html'),
    'utf-8'
)

const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const server = express()

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
    inject: false
})
server.use(cookieParser())
server.use(express.json())
server.use('/static', express.static( path.normalize(__dirname + '/../dist/static')))
server.use(sessionIdGenerator)
server.use(checkAuth)

server.get('*', (req, res) => {

    const context = {url: req.url}

    renderer.renderToString(context, (err, html) => {
        console.log(err)
        if (err) {
            if (+err.message === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        }

        res.end(html)
    })
})

server.listen(3000)


module.exports = server