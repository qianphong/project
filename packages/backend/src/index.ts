import express from 'express'
import { urlencoded } from 'body-parser'
import cookieSession from 'cookie-session'
import router from './router'
import './controller'

const app = express()
app.use(urlencoded({ extended: false }))
app.use(
  cookieSession({
    name: 'session',
    keys: ['123']
  })
)
app.use(router)
app.listen(7001, () => {
  console.log('server is running')
})

//问题1 express 库的类型定义文件.d.ts 文件类型描述不准确
//问题2 当我使用中间件的时候，对req或者res做了修改后，实际上类型并不能更改
