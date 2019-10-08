import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Logout from './pages/Logout'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/dashboard/history" component={Dashboard}></Route>
          <Route path="/dashboard/products" component={Dashboard}></Route>
          <Route path="/logout" component={Logout}></Route>
        </Router>
      </>
    )
  }
}

export default App;
