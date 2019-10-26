import React from 'react'

const SuccessModal = props => (
	<>
		<button
			type="button"
			class="btn btn-primary"
			id="successModalButton"
			data-toggle="modal"
			data-target="#successModal"
			style={{ display: 'none' }}
		>
			I
		</button>

		<div
			class="modal fade"
			id="successModal"
			tabindex="-1"
			role="dialog"
			aria-labelledby="successModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="successModalLabel">
							{props.title}
						</h5>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body text-center">
						<i class="fas fa-check-circle fa-5x text-success"></i>
						<br />
						<p class="mt-3">{props.message}</p>

						<button
							type="button"
							class="btn btn-primary btn-block"
							data-dismiss="modal"
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
	</>
)

export default SuccessModal
