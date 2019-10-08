import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ls from 'local-storage'
import '../../App.css';

import Navbar from '../../components/Dashboard/Navbar'
import Wrapper from './Wrapper'

class Dashboard extends Component {
  render() {
    if(ls.get('token') && ls.get('token') !== undefined)
    {
      return (
        <>
          <Navbar />
          <Wrapper />
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
