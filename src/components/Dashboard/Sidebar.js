import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './ripple.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav id="sidebar" className={`dashboard${this.props.active === true && ' active'}`}>

        <div id="dismiss" onClick={() => this.props.onClickDismiss(false)}>
          <i className="fas fa-times"></i>
        </div>

        <ul className="components">

          <li id="beranda" className="ripple text-dark">
            <Link to="/dashboard">
              <i className="fas fa-utensils"></i>
              <span>Checkout</span>
            </Link>
          </li>

          <li className="ripple text-dark">
            <Link to="/dashboard/history">
              <i class="fas fa-clipboard-list"></i>
              <span>History</span>
            </Link>
          </li>

          <li className="ripple text-dark">
            <a data-toggle="modal" data-target="#modalFormProduct" style={{cursor: 'pointer'}}>
              <i className="fas fa-plus text-success"></i>
              <span>Add Products</span>
            </a>
          </li>

        </ul>

      </nav>
    )
  }
}

export default Sidebar
