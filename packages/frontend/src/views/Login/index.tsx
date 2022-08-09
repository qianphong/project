import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './index.css'
interface formFields {
  password: string
}
interface Props {
  form: WrappedFormUtils<formFields>
}

class NormalLoginForm extends Component<Props> {
  state = {
    isLogin: false,
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        axios
          .post('/api/login', qs.stringify({ password: values.password }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          })
          .then(ret => {
            if (ret.data?.success) {
              this.setState({ isLogin: true })
            } else {
              message.error(ret.data.message)
            }
          })
      }
    })
  }

  render() {
    const { isLogin } = this.state
    const { getFieldDecorator } = this.props.form
    return isLogin ? (
      <Redirect to="/" />
    ) : (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入登录密码' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm,
)
export default WrappedNormalLoginForm
