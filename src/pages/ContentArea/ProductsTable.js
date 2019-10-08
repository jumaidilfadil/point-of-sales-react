import React from 'react'

const productsTable = (props) => (
  <table className="table table-bordered table-hover table-sm" style={{minWidth: '500px', width: 'auto', margin: '0 auto'}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Image</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        props.productsTable.map((item, index) => (
          <tr key={item.id}>
            <td className="text-right">{index}</td>
            <td>{item.name}</td>
            <td className="text-right">{item.price}</td>
            <td className="text-right">{item.stock}</td>
            <td className="text-center">
              <button className="btn btn-warning btn-sm" onClick={(product) => props.editButtonClick(product)}>
                <i className="fas fa-edit fa-xs"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={(id) => props.deleteButtonClick(item.id)}>
                <i className="fas fa-trash-alt fa-xs"></i>
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default productsTable
