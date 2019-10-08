import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './ripple.css'

class Sidebar extends Component {
  render() {
    return (
      <nav id="sidebar" className="dashboard active">

        <div id="dismiss">
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

/*
<Link to="/dashboard/products">
  <i className="fas fa-plus text-success"></i>
  <span>Products</span>
</Link>
*/

export default Sidebar
