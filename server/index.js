import { Nuxt, Builder } from 'nuxt'
import Koa from 'koa'
import R from 'ramda'
var cors = require('koa2-cors');
import { resolve } from 'path'
const MIDDLEWARES = ['database','common','router']
let config = require('../nuxt.config.js')
config.dev = !(process.env === 'production')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const r = path => resolve(__dirname, path)
class Server {
  constructor () {
    this.app = new Koa()
    this.app.use(cors({
      origin: function (ctx) {
        if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080';
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))

    this.useMiddleWares(this.app)(MIDDLEWARES)
  }

  useMiddleWares (app) {
    return R.map(R.compose(
      R.map(i => i(app)),
      require,
      i => `${r('./middlewares')}/${i}`
    ))
  }

  async start () {
    const nuxt = new Nuxt(config)
    if (config.dev) {
      const builder = new Builder(nuxt)
      builder.build().catch(e => {
        console.error(e) // eslint-disable-line no-console
        process.exit(1)
      })
    }
    this.app.use(ctx => {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset

      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })
    this.app.listen(port, host)
    console.log('Server listening on' + host + ':' + port)
  }
}
const app = new Server()
app.start()