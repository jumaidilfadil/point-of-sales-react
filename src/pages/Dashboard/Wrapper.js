import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../../App.css'

import Sidebar from '../../components/Dashboard/Sidebar'
import Checkout from './Checkout'
import History from './History'
import Products from './Products'

class Wrapper extends Component {
  render() {
    return (
      <div id="wrapper">
        <Router>
          <Sidebar />
          <div id="content-area">
            <div className="container-fluid">
              <Route path="/dashboard" exact component={Checkout}></Route>
              <Route path="/dashboard/history" component={History}></Route>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default Wrapper
