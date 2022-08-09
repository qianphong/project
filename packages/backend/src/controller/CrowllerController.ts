import { Request, Response, NextFunction } from 'express'
import { controller, Get, Use } from '../decorator'

function checkLogin(req: Request, res: Response, next: NextFunction): void {
  const isLogin = !!(req.session ? req.session.login : false)
  if (isLogin) {
    next()
  } else {
    res.json({ success: false, message: '请先登录' })
  }
  console.log('login middleware')
}

@controller('/')
export class CrollerController {
  @Get('/getData')
  @Use(checkLogin, (req, res, next) => {
    console.log('second middleware')
    next()
  })
  getData(req: Request, res: Response): void {
    res.send({ success: true, message: '操作成功', data: [{ a: 1, b: 2 }] })
  }
}
