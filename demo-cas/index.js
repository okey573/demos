const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')


const app = new Koa()
const router = new Router()

router
  .get('/', async (ctx) => {
    ctx.body = {
      code: 200,
      data: 'server'
    }
  })
  .get('/login', async (ctx) => {
    const tgc = ctx.cookies.get('TGC')
    if (tgc) {
      ctx.status = 302
      ctx.redirect('http://okey.com/home.html')
    } else {
      ctx.status = 302
      ctx.redirect('http://okey.com/login.html')
    }
  })
  .get('/userLogin', async (ctx) => {
    ctx.cookies.set('TGC', 'tgc', {
      maxAge: 60 * 1000,
      domain: 'okey.com'
    })
    ctx.cookies.set('token', '123456789', {
      maxAge: 60 * 60 * 1000,
      domain: 'okey.com'
    })
    ctx.body = {
      code: 200,
      data: 'login success'
    }
    ctx.status = 302
    ctx.redirect('http://okey.com/index.html')
  })
  .get('/getToken', async (ctx) => {
    ctx.body = {
      code: 200,
      data: ctx.cookies.get('token')
    }
  })


app
  .use(cors({ credentials: true, origin: (ctx) => ctx.request.header.origin }))
  .use(router.routes())
  .listen(3000, () => {
    console.log('server is running...')
  })
