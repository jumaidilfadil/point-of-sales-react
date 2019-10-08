import React from 'react'

const rupiahFormat = (num) => {
  return (
    'Rp. ' +
    num
      .toString()
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  )
}

const cardMenu = (props) => (
  props.menu.map((item) => {
    return (
      <div
        className="col-sm-6 col-md-4 mb-4 d-flex"
        key={item.id}
      >
        <div
          className={`flex-fill card menu${props.selected.includes(item.id) ? ' menu-selected' : ''}`}
          id={item.id}
        >
          <img
            src={item.image_src}
            className="card-img-top"
            alt={item.name}
          />
          <div className="card-body">
            <h2 className="h5 card-title mb-2">{item.name}</h2>
            <p className="card-text font-weight-bold">{rupiahFormat(item.price)}</p>
            <div class="btn-group">
              <button class="btn btn-primary btn-raised btn-sm ripple" type="button" onClick={() => props.menuClick(item.id)}>
                Add to Cart
              </button>
              <button type="button" class="btn btn-sm btn-secondary btn-raised dropdown-toggle dropdown-toggle-split ripple" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu">
                <a
                  data-toggle="modal"
                  data-target="#modalFormProduct"
                  class="dropdown-item text-warning"
                  style={{cursor: 'pointer'}}
                  onClick={() => props.editButtonClick(item)}
                >
                  Edit
                </a>
                <a
                  class="dropdown-item text-danger"
                  style={{cursor: 'pointer'}}
                  onClick={() => props.deleteButtonClick(item.id)}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
)

export default cardMenu
