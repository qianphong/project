import { Request, Response } from 'express'
import { controller, Get, Post } from '../decorator'

interface LoginRequest extends Request {
  body: {
    [prop: string]: string | undefined
  }
}

@controller('/api')
export class LoginController {
  @Post('/login')
  login(req: LoginRequest, res: Response): void {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
      res.send({ success: false, message: '已经登录了' })
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.send({ success: true, message: '登录成功' })
      } else {
        res.send({ success: false, message: '密码错误，登录失败' })
      }
    }
  }
  @Get('/isLogin')
  isLogin(req: Request, res: Response): void {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : false
    res.send({
      success: typeof isLogin === 'boolean' ? isLogin : false,
      message: isLogin ? '已经登录了' : '用户未登录'
    })
  }
  @Get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    res.send({ success: true, message: '您已退出登录' })
  }
  @Get('/')
  home(req: Request, res: Response): void {
    if (req.session && req.session.login === true) {
      res.send(`
      <html>
        <body>
          <div>欢迎</div>
          <a href="/logout">退出登录</a>
        </body>
      </html>
     `)
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <div><input type="password" name="password" placeholder="请输入密码" /></div>
            <button>提交</button>
          </form>
        </body>
      </html>
      `)
    }
  }
}
