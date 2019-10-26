import React from 'react'
import RupiahFormat from '../../helpers/RupiahFormat'

const imgSrc = 'http://localhost:5000/uploads/'

const cardProduct = props => (
	<div class="col-sm-6 col-md-4 mb-4" key={props.cardProduct.id}>
		<div class="card">
			<img
				src={imgSrc + props.cardProduct.image}
				class="card-img-top"
				alt={props.cardProduct.name}
			/>
			<div class="card-body">
				<h5 class="card-title">{props.cardProduct.name}</h5>
				<p class="card-text">{RupiahFormat(props.cardProduct.price)}</p>
				<div className="tools">
					<button
						className="btn btn-warning"
						onClick={() => props.editButtonClick(props.cardProduct)}
					>
						<i class="far fa-edit"></i>
					</button>
					<button
						className="btn btn-danger"
						onClick={() => props.deleteButtonClick(props.cardProduct.id)}
					>
						<i class="far fa-trash-alt"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
)

export default cardProduct
