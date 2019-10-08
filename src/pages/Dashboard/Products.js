import React, { Component } from 'react'
import axios from 'axios'
import ls from 'local-storage'

import CardProducts from '../../components/Card/CardProducts'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      name: '',
      description: '',
      image: '',
      id_category: '',
      price: '',
      stock: '',
      buttonDisabled: false,
      formStatus: 'Add',
      productIdSelected: null
    }
  }
  
  componentDidMount() {
    this.getProducts()
  }

  getProducts = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`
      }
    }
    axios.get('http://localhost:5000/api/v1/product?sort=id&order=ASC', header)
      .then(result => {
        this.setState({ products: result.data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  inputOnChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmitHandler = (e) => {
    e.preventDefault()
    this.setState({ buttonDisabled: true })

    var url
    var payload = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      id_category: this.state.id_category,
      price: this.state.price,
      stock: this.state.stock
    }
    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`
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
    });
  }

  addProduct = (url, payload, header) => {
    axios.post(url, payload, header)
      .then(response => {
        var products = [...this.state.products]
        products.push(response.data.data)
        this.setState({
          products,
          name: '',
          description: '',
          image: '',
          id_category: '',
          price: '',
          stock: '',
          buttonDisabled: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editProduct = (url, payload, header) => {
    axios.put(url, payload, header)
      .then(response => {
        var products = [...this.state.products];
        var indexProduct = products.findIndex(product => product.id === this.state.productIdSelected);
        var res = response.data.data

        products[indexProduct].name = res.name;
        products[indexProduct].description = res.description;
        products[indexProduct].image = res.image;
        products[indexProduct].id_category = res.id_category;
        products[indexProduct].price = res.price;
        products[indexProduct].stock = res.stock;

        this.setState({
          products,
          buttonDisabled: false,
          name: '',
          description: '',
          image: '',
          id_category: '',
          price: '',
          stock: '',
          formStatus: 'Create'
        });
      })
      .catch(error => {
        console.log(error);
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
          var products = [...this.state.products]
          var index = products.findIndex(product => product.id === id)
          products.splice(index, 1)
          this.setState({ products })
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
      formStatus: 'Add'
    })
  }

  render() {
    return (
      <div className="row">

        <div className="col-md-8">
          <main role="main">
            <h1 className="h4 text-center mb-4">Products</h1>
            <div class="row">
              <CardProducts
                cardProducts={this.state.products}
                editButtonClick={(product) => this.editButtonHandler(product)}
                deleteButtonClick={(id) => this.deleteButtonHandler(id)}
              />
            </div>

          </main>
        </div>
        
        <div id="cart" className="col-md-4">
          <h1 className="h4 text-center mb-4">Form {this.state.formStatus}</h1>
          <form onSubmit={this.onSubmitHandler}>

            <div className="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                name="name"
                id="name"
                className="form-control"
                value={this.state.name}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <div className="form-group">
              <label for="description">Description</label>
              <input 
                type="text" 
                name="description"
                id="description"
                className="form-control"
                value={this.state.description}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <div className="form-group">
              <label for="image">Image</label>
              <input 
                type="text" 
                name="image"
                id="image"
                className="form-control"
                value={this.state.image}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <div className="form-group">
              <label for="id_category">ID Category</label>
              <input 
                type="text" 
                name="id_category"
                id="id_category"
                className="form-control"
                value={this.state.id_category}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <div className="form-group">
              <label for="price">Price</label>
              <input 
                type="number" 
                name="price"
                id="price"
                className="form-control"
                value={this.state.price}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <div className="form-group">
              <label for="stock">Stock</label>
              <input 
                type="number" 
                name="stock"
                id="stock"
                className="form-control"
                value={this.state.stock}
                onChange={this.inputOnChangeHandler}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={this.state.buttonDisabled}>Submit</button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={this.cancelButtonHandler}
            >
              Cancel
            </button>
          </form>
        </div>

      </div>
    )
  }
}

export default Products
