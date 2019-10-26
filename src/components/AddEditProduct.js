import React from 'react'

const AddEditProduct = props => (
	<div
		class="modal fade"
		id="modalFormProduct"
		tabindex="-1"
		role="dialog"
		aria-labelledby="modalFormProductLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalFormProductLabel">
						{props.formStatus} Product Item
					</h5>
					<button
						type="button"
						id="closeModalForm"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form onSubmit={props.onSubmitHandler}>
					<div class="modal-body">
						<div className="form-group">
							<label for="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								className="form-control"
								value={props.name}
								onChange={props.inputOnChangeHandler}
							/>
						</div>

						<div className="form-group">
							<label for="description">Description</label>
							<input
								type="text"
								name="description"
								id="description"
								className="form-control"
								value={props.description}
								onChange={props.inputOnChangeHandler}
							/>
						</div>

						<div class="form-group">
							<label for="image_file">Image</label>
							<input
								type="file"
								class="form-control-file"
								name="image_file"
								id="image_file"
								onChange={props.inputFileOnChangeHandler}
							/>
							<small class="text-muted">
								The file must be an image in jpg, jpeg, png, or gif format.
							</small>
						</div>

						<div className="form-group">
							<label for="id_category">Category</label>
							<select
								name="id_category"
								id="id_category"
								className="form-control"
								onChange={props.inputOnChangeHandler}
								value={props.id_category}
							>
								<option value="1">Food</option>
								<option value="2">Beverage</option>
							</select>
						</div>

						<div className="form-group">
							<label for="price">Price</label>
							<input
								type="number"
								name="price"
								id="price"
								className="form-control"
								value={props.price}
								onChange={props.inputOnChangeHandler}
							/>
						</div>

						<div className="form-group">
							<label for="stock">Stock</label>
							<input
								type="number"
								name="stock"
								id="stock"
								className="form-control"
								value={props.stock}
								onChange={props.inputOnChangeHandler}
							/>
						</div>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-danger btn-raised"
							data-dismiss="modal"
							onClick={props.cancelButtonHandler}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="btn btn-primary btn-raised ml-2"
							disabled={props.buttonDisabled}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
)

export default AddEditProduct
