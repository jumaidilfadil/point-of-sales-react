import React, { Component } from 'react'
import axios from 'axios'
import ls from 'local-storage'
import dateFormat from 'dateformat'

import RupiahFormat from '../../helpers/RupiahFormat'

import '../../App.css'

import logoEmptyCart from '../../coffee.png'
import CardMenu from '../../components/Card/CardMenu'
import CardCartItem from '../../components/Card/CardCartItem'
import AddEditProduct from '../../components/AddEditProduct'
import CheckoutModal from '../../components/Modal/CheckoutModal'
import Loading from '../../components/Loading'
import SuccessModal from '../../components/Modal/SuccessModal'

class Checkout extends Component {
  constructor() {
    super()

    this.state = {
      sort: 'name',
      order: 'ASC',
      search: '',
      page: 1,
      limit: 6,
      data: [],
      totalPage: '',
      selectedId: [],
      cart: [],
      cartTotal: 0,

      name: '',
      description: '',
      image: '',
      id_category: 1,
      price: '',
      stock: '',
      buttonDisabled: false,
      formStatus: 'Add',
      productIdSelected: null,

      invoice: '',
      username: '',
      orderDate: ''
    }
  }

  getProducts = (sort, order, search, page, limit) => {
    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`
      }
    }
    
    let url = `http://localhost:5000/api/v1/product?sort=${sort}&order=${order}&page=${page}&limit=${limit}`
    search && search.length >= 3 && ( url += `&search=${search}` )
    axios.get(url, header)
      .then(result => {
        const data = result.data.data ? result.data.data : []
        this.setState({
          data,
          totalPage: result.data.total_page 
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getProducts(this.state.sort, this.state.order, this.state.search, this.state.page, this.state.limit)

    var dateNow = new Date()
    var invoice = dateFormat(dateNow, 'yyyymmddHHMMss')
    var orderDate = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss')

    this.setState({
      invoice,
      username: ls.get('username'),
      orderDate
    })
  }

  getSort = (e) => {
    e.preventDefault()
    let sort = e.target.value
    this.setState({
      sort
    })
    this.getProducts(sort, this.state.order, this.state.search, this.state.page, this.state.limit)
  }

  getOrder = (e) => {
    e.preventDefault()
    let order = e.target.value
    this.setState({
      order
    })
    this.getProducts(this.state.sort, order, this.state.search, this.state.page, this.state.limit)
  }

  getSearch = (e) => {
    e.preventDefault()
    let search = e.target.value
    this.setState({
      search
    })
    if(search.length >= 3)
    {
      this.setState({
        page: 1
      })
      this.getProducts(this.state.sort, this.state.order, search, this.state.page, this.state.limit)
    }
    else
    {
      this.getProducts(this.state.sort, this.state.order, '', this.state.page, this.state.limit)
    }
  }

  getLimit = (e) => {
    e.preventDefault()
    let limit = e.target.value
    this.setState({
      page: 1,
      limit
    })
    this.getProducts(this.state.sort, this.state.order, this.state.search, 1, limit)
  }

  getPage = (page) => {
    this.setState({
      page
    })
    this.getProducts(this.state.sort, this.state.order, this.state.search, page, this.state.limit)
  }

  getPageMinus = () => {
    let page = this.state.page - 1
    this.setState({
      page
    })
    this.getProducts(this.state.sort, this.state.order, this.state.search, page, this.state.limit)
  }

  getPagePlus = () => {
    let page = this.state.page + 1
    this.setState({
      page
    })
    this.getProducts(this.state.sort, this.state.order, this.state.search, page, this.state.limit)
  }

  pagination = () => {
    var totalPage = this.state.totalPage
    var pageButton = []
    for(let i=1; i<=totalPage; i++)
    {
      pageButton.push(i)
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center pagination-sm">
          <li className={`page-item${this.state.page === 1 ? ' disabled' : ''}`}>
            <a
              className="page-link"
              style={{cursor: 'pointer'}}
              onClick={() => this.getPageMinus()}
            >
              Previous
            </a>
          </li>
          {
            pageButton.map((page) => (
              <li className={`page-item${page === this.state.page ? ' active' : ''}`}>
                <a
                  className="page-link"
                  onClick={() => this.getPage(page)}
                  style={{cursor: 'pointer'}}
                >
                  {page}
                </a>
              </li>
            ))
          }
          <li className={`page-item${this.state.page === totalPage ? ' disabled' : ''}`}>
            <a
              className="page-link"
              style={{cursor: 'pointer'}}
              onClick={() => this.getPagePlus()}
            >
              Next
            </a>
          </li>
        </ul> 
      </nav>
    )
  }

  menuClickHandler = (id) => {
    var selectedId = [...this.state.selectedId]
    if(selectedId.includes(id)) {
      var index = selectedId.findIndex(selected => selected === id)
      selectedId.splice(index, 1)
      this.state.cart.splice(index, 1)
      this.setState({ cartTotal: this.state.cartTotal - 1 })
    } else {
      selectedId.push(id)
      
      var index = this.state.data.findIndex(menu => menu.id === id)
      var cartAdd = this.state.data[index]
      this.state.cart.push(cartAdd)
      var cart = [...this.state.cart]
      var indexCart = cart.findIndex(menu => menu.id === id)
      cart[indexCart].quantity = 1

      this.setState({
        cart: cart,
        cartTotal: this.state.cartTotal + 1
      })
    }

    this.setState({ selectedId })
  }

  plusHandler = (id) => {
    var cart = [...this.state.cart]
    var index = cart.findIndex(menu => menu.id === id)
    if(cart[index].quantity < cart[index].stock)
    {
      cart[index].quantity++
      this.setState({
        cart: cart
      })
    }
  }

  minusHandler = (id) => {
    var cart = [...this.state.cart]
    var index = cart.findIndex(menu => menu.id === id)
    if(cart[index].quantity > 1)
    {
      cart[index].quantity--
      this.setState({
        cart: cart
      })
    }
  }

  isEmptyItems = () => {
    let data = [...this.state.data]
    if(data && data !== undefined && data.length >= 1)
    {
      return (
        <div class="row">
          {data!=='' && data!==[] && data !== null ? (
            <CardMenu
              menu={this.state.data}
              selected={this.state.selectedId}
              menuClick={(id) => this.menuClickHandler(id)}
              editButtonClick={(product) => this.editButtonHandler(product)}
              deleteButtonClick={(id) => this.deleteButtonHandler(id)}
            />
          ) : (
            <Loading />
          )}
        </div>
      )
    }
    else
    {
      return (
        <h2 className="h5 text-center">Items not found.</h2>
      )
    }
  }

  isEmptyCart = () => {
    if(this.state.cartTotal >= 1)
    {
      let total = 0;
      this.state.cart.forEach(function(element, i) {
        total += element.price * element.quantity;
      })
      var ppn = (total * 10) / 100
      var totalAll = total + ppn

      return (
        <>
          <CardCartItem
            menu={this.state.cart}
            onClickPlus={(id) => this.plusHandler(id)}
            onClickMinus={(id) => this.minusHandler(id)}
          />
          <div className="mt-5">
            <p className="font-weight-bold h5">
              Total :
              <span className="float-right">* {RupiahFormat(total)}</span>
              <br />
              <small>* Not including PPN</small>
            </p>
            <button type="button" data-toggle="modal" data-target="#modalCheckout" style={{cursor: 'pointer'}} className="btn btn-primary btn-block btn-raised ripple">Checkout</button>
            <button
              type="button"
              className="btn btn-danger btn-block btn-raised ripple"
              onClick={this.cancelCheckoutHandler}
            >
              Cancel
            </button>
            <CheckoutModal
              cart={this.state.cart}
              total={total}
              ppn={ppn}
              totalAll={totalAll}
              invoice={this.state.invoice}
              username={this.state.username}
              orderDate={this.state.orderDate}
              onClickHandler={this.onClickCheckoutHandler}
            />
          </div>
        </>
      )
    }
    else
    {
      return (
        <p className="text-center">
          <img src={logoEmptyCart} className="img-fluid" alt="Empty Cart" style={{maxWidth: '200px'}} />
          <br />
          <h3>Your cart is empty.</h3>
          <span className="text-muted">Please add some items from the menu.</span>
        </p>
      )
    }
  }

  cancelCheckoutHandler = (e) => {
    e.preventDefault()
    if(window.confirm('Are you sure to empty the cart?'))
    {
      this.setState({
        selectedId: [],
        cart: [],
        cartTotal: 0
      })
    }
  }

  inputOnChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  inputFileOnChangeHandler = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }
  onSubmitHandler = (e) => {
    e.preventDefault()
    this.setState({ buttonDisabled: true })

    var url
    var payload = new FormData()

    payload.set('name', this.state.name)
    payload.set('description', this.state.description)
    payload.append('image', this.state.image)
    payload.set('id_category', this.state.id_category)
    payload.set('price', this.state.price)
    payload.set('stock', this.state.stock)
    
    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`,
        'Content-Type':'multipart/form-data'
      }
    }

    if(this.state.formStatus === 'Add')
    {
      url = 'http://localhost:5000/api/v1/product'
      this.addProduct(url, payload, header)
    }
    else
    {
      url = `http://localhost:5000/api/v1/product/${this.state.productIdSelected}`
      this.editProduct(url, payload, header)
    }
  }
  editButtonHandler = (product) => {
    this.setState({
      name: product.name,
      description: product.description,
      image: product.image,
      id_category: product.id_category,
      price: product.price,
      stock: product.stock,
      formStatus: 'Edit',
      productIdSelected: product.id
    })
  }

  addProduct = (url, payload, header) => {
    axios.post(url, payload, header)
      .then(response => {
        var product = [...this.state.data]
        product.push(response.data.data)
        this.setState({
          data: product,
          name: '',
          description: '',
          image: '',
          id_category: '',
          price: '',
          stock: '',
          formStatus: 'Add',
          buttonDisabled: false
        })
        this.getProducts(this.state.sort, this.state.order, this.state.search, this.state.page, this.state.limit)
        this.closeModalForm()
      })
      .catch(error => {
        console.log(error)
        this.setState({
          buttonDisabled: false,
        })
      })
  }

  editProduct = (url, payload, header) => {
    axios.put(url, payload, header)
      .then(response => {
        var products = [...this.state.data];
        var indexProduct = products.findIndex(product => product.id === this.state.productIdSelected);
        var res = response.data.data

        products[indexProduct].name = res.name
        products[indexProduct].description = res.description
        products[indexProduct].image = res.image
        products[indexProduct].id_category = res.id_category
        products[indexProduct].price = res.price
        products[indexProduct].stock = res.stock

        this.setState({
          data: products,
          buttonDisabled: false,
          name: '',
          description: '',
          image: '',
          id_category: '',
          price: '',
          stock: '',
          formStatus: 'Create'
        })
        this.getProducts(this.state.sort, this.state.order, this.state.search, this.state.page, this.state.limit)
        this.closeModalForm()
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisabled: false,
        })
      });
  }

  deleteButtonHandler = (id) => {
    if(window.confirm('Are you sure to delete this data?'))
    {
      var url = `http://localhost:5000/api/v1/product/${id}`
      const header = {
        headers: {
          Authorization: `Bearer ${ls.get('token')}`
        }
      }
      axios.delete(url, header)
        .then(response => {
          var products = [...this.state.data]
          var index = products.findIndex(product => product.id === id)
          products.splice(index, 1)
          this.setState({ data: products })
          this.getProducts(this.state.sort, this.state.order, this.state.search, this.state.page, this.state.limit)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  cancelButtonHandler = (e) => {
    e.preventDefault()
    this.setState({
      name: '',
      description: '',
      image: '',
      id_category: '',
      price: '',
      stock: '',
      formStatus: 'Add',
      buttonDisabled: false
    })
  }

  closeModalForm = () => {
    document.getElementById('closeModalForm').click()
  }

  closeModalCheckout = () => {
    document.getElementById('closeModalCheckout').click()
  }

  onClickCheckoutHandler = () => {
    let url = 'http://localhost:5000/checkout'
    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`
      }
    }

    let product_name = []
    let price = []
    let quantity = []
    for(let i=0; i<this.state.cart.length; i++) {
      product_name.push(this.state.cart[i].name)
      price.push(this.state.cart[i].price)
      quantity.push(this.state.cart[i].quantity)
    }
    let payload = {
      invoice: this.state.invoice,
      username: this.state.username,
      date: this.state.orderDate,
      product_name,
      price,
      quantity
    }

    this.checkout(url, payload, header)
  }

  checkout = (url, payload, header) => {
    axios.post(url, payload, header)
      .then(response => {
        this.closeModalCheckout()

        var dateNow = new Date()
        var invoice = dateFormat(dateNow, 'yyyymmddHHMMss')
        var orderDate = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss')
    
        this.setState({
          selectedId: [],
          cart: [],
          cartTotal: 0,
          invoice,
          orderDate
        })

        
        document.getElementById('successModalButton').click()
      })
      .catch(error => {
        console.log(error)
        this.setState({
          buttonDisabled: false,
        })
      })
  }

  successModal = (title, message) => {
    return (
      <SuccessModal
        title={title}
        message={message}
      />
    )
  }
  
  render() {
    return (
      <div className="row">

        <div className="col-md-8">
          <main role="main">
            <h1 className="h4 text-center mb-3">Items Menu</h1>

            <div class="form-row">
              
              <div className="form-group col-md-4 bmd-form-group bmd-form-group-sm">
                <label for="search">Search Item Name</label>
                <input
                  type="name"
                  name="search"
                  id="search"
                  class="form-control form-control-sm"
                  value={this.state.search}
                  onChange={this.getSearch}
                />
              </div>

              <div className="form-group col-md-2">
                <label for="sort">Sort</label>
                <select name="sort" id="sort" className="form-control form-control-sm" onChange={this.getSort}>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>

              <div className="form-group col-md-2">
                <label for="order">Order</label>
                <select name="order" id="order" className="form-control form-control-sm" onChange={this.getOrder}>
                  <option value="ASC">Ascending</option>
                  <option value="DESC">Descending</option>
                </select>
              </div>

              <div className="form-group col-md-1">
                <label for="limit">Limit</label>
                <select name="limit" id="limit" className="form-control form-control-sm" onChange={this.getLimit}>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </div>

            </div>

            {this.isEmptyItems()}
            {this.pagination()}
            <AddEditProduct
              formStatus={this.state.formStatus}
              onSubmitHandler={this.onSubmitHandler}
              inputOnChangeHandler={this.inputOnChangeHandler}
              inputFileOnChangeHandler={this.inputFileOnChangeHandler}
              buttonDisabled={this.state.buttonDisabled}
              cancelButtonHandler={this.cancelButtonHandler}
              name={this.state.name}
              description={this.state.description}
              image={this.state.image}
              id_category={this.state.id_category}
              price={this.state.price}
              stock={this.state.stock}
            />
            {this.successModal('', 'Checkout Succesfully')}

          </main>
        </div>

        <div id="cart" className="col-md-4">

          <h1 className="h4 text-center mb-4">
            Cart <span className="badge badge-pill badge-primary">{this.state.cartTotal}</span>
          </h1>

          {this.isEmptyCart()}

        </div>

      </div>
    )
  }
}

export default Checkout
