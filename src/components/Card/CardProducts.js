import React from 'react'
import CardProduct from './CardProduct'

const cardProducts = (props) => (
  props.cardProducts.map((cardProduct) => (
    <CardProduct
      cardProduct={cardProduct}
      editButtonClick={(member) => props.editButtonClick(member)}
      deleteButtonClick={(id) => props.deleteButtonClick(id)}
    />
  ))
)

export default cardProducts
