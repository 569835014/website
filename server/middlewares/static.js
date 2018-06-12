
const staticServer = require('koa-static-server')
const staticPath = './web'
export const staticFile=app => {
    app.use(staticServer({rootDir: 'web', rootPath: staticPath}))
}