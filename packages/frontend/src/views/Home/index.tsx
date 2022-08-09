import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, message } from 'antd'
import axios from 'axios'
import './index.css'

export default class Home extends Component {
  state = {
    loaded: false,
    isLogin: true
  }
  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      console.log(res)
      message.warning(res.data.message)
      if (!res.data?.success) {
        this.setState({
          isLogin: false
        })
      }
      this.setState({
        loaded: true
      })
    })
  }
  componentWillUnmount() {
    this.setState(() => {
      return
    })
  }
  handleLogoutClick() {
    axios.get('/api/logout').then((res) => {
      // if (res.data?.success) {
      //   this.setState({
      //     isLogin: false
      //   })
      // } else {
      //   message.error(res.data.message)
      // }
      console.log(res)
    })
  }
  render() {
    const { isLogin, loaded } = this.state
    if (isLogin) {
      if (loaded) {
        return (
          <div className="homepage">
            <Button type="primary">爬取</Button>
            <Button type="primary">展示</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>
              退出
            </Button>
          </div>
        )
      }
      return null
    }
    return <Redirect to="/login" />
  }
}
