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

const cardCartItem = (props) => (
  props.menu.map((item) => {
    return (
      <div className="media mb-4" key={item.id}>
        <img src={item.image_src} className="mr-3" alt={item.name} style={{width: '100%', maxWidth: '100px'}} />
        <div className="media-body">
          <h5 className="mt-0">{item.name}</h5>

          <div className="input-group">
            <div className="input-group-prepend">
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={() => props.onClickMinus(item.id)}
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
            <input type="text" name="quantities[]" id="quantities" className="form-control form-control-sm" value={item.quantity} min="1" style={{maxWidth: '40px', borderColor: 'green', textAlign: 'center'}} required />
            <div className="input-group-prepend">
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={() => props.onClickPlus(item.id)}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <span className="ml-2 font-weight-bold">{rupiahFormat(item.price*item.quantity)}</span>
          </div>

        </div>
      </div>
    )
  })
)

export default cardCartItem
