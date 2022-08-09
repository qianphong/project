import React from 'react'
import Home from './views/Home'
import Login from './views/Login'
import { HashRouter, Switch, Route } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
