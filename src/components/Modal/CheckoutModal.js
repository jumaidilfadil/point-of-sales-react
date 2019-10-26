import React from 'react'
import RupiahFormat from '../../helpers/RupiahFormat'

const CheckoutModal = props => (
	<div
		class="modal fade"
		id="modalCheckout"
		tabindex="-1"
		role="dialog"
		aria-labelledby="modalCheckoutLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalCheckoutLabel">
						Checkout
					</h5>
					<button
						type="button"
						id="closeModalCheckout"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<p className="font-weight-bold">
						Date: {props.orderDate}
						<br />
						Cashier: {props.username}
						<br />
						Receipt no.: #{props.invoice}
					</p>
					<table className="table table-sm table-borderless">
						{props.cart.map(item => (
							<tr>
								<td>
									{item.name} {item.quantity}x
								</td>
								<td className="text-right">
									{RupiahFormat(item.price * item.quantity)}
								</td>
							</tr>
						))}
						<tr className="text-right" style={{ borderTop: '1px solid' }}>
							<th>Total</th>
							<th>{RupiahFormat(props.total)}</th>
						</tr>
						<tr className="text-right">
							<th>PPN 10%</th>
							<th>{RupiahFormat(props.ppn)}</th>
						</tr>
						<tr className="text-right">
							<th>Total All</th>
							<th>{RupiahFormat(props.totalAll)}</th>
						</tr>
					</table>

					<button
						type="button"
						class="btn btn-danger btn-block"
						onClick={props.onClickHandler}
					>
						Checkout Now
					</button>
				</div>
			</div>
		</div>
	</div>
)

export default CheckoutModal
