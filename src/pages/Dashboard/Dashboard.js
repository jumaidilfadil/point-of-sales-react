import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ls from 'local-storage'
import '../../App.css';

import Navbar from '../../components/Dashboard/Navbar'
import Wrapper from './Wrapper'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      dimensions: {
        height: 0,
        width: 0
      },
      sidebarActive: true
    }
    
    window.addEventListener("resize", this.sidebarActiveStatus)
	}
	
  componentDidMount() {
    this.sidebarActiveStatus()
  }

  sidebarActiveStatus = async () => {
    await this.setState({
      dimensions: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    })
    
    this.state.dimensions.width <= 767 ? this.setState({sidebarActive: false}) : this.setState({sidebarActive: true})
  }
	
  updateSidebarActive = (sidebarActive) => {
    this.setState({
      sidebarActive
    })
  }
  
  render() {
    if(ls.get('token') && ls.get('token') !== undefined && ls.get('token') !== null)
    {
      return (
        <>
          <Navbar
            sidebarActive={this.state.sidebarActive}
            onClickSidebarCollapse={(sidebarActive) => this.updateSidebarActive(sidebarActive)}
          />
          <Wrapper
            sidebarActive={this.state.sidebarActive}
            onClickDismiss={(sidebarActive) => this.updateSidebarActive(sidebarActive)}
          />
        </>
      )
    }
    else
    {
      return <Redirect to='/' exact />
    }
  }
}

export default Dashboard;
