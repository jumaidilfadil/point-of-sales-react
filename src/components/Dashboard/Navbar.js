import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand fixed-top dashboard">

          <button type="button" id="sidebarCollapse" className="btn" onClick={() => this.props.onClickSidebarCollapse(!this.props.sidebarActive)}>
            <i className="fas fa-bars"></i>
          </button>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle profile" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user-circle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item ripple" to="/logout" >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          
        </nav>
      </header>
    )
  }
}

export default Navbar
