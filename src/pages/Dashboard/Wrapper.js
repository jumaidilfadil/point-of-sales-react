import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../../App.css'

import Sidebar from '../../components/Dashboard/Sidebar'
import Checkout from './Checkout'
import History from './History'

class Wrapper extends Component {
  constructor(props) {
    super(props)
  }

	render() {
		return (
			<div id="wrapper">
				<Router basename="/pos">
					<Sidebar
            active={this.props.sidebarActive}
            onClickDismiss={(sidebarActive) => this.props.onClickDismiss(sidebarActive)}
          />
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
