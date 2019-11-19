import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { API } from '../configs/api'

import backgroundImage from './6.svg'
import '../login.css'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			buttonDisabled: false,
			message: ''
		}
	}

	registerResult = () => {
		if (this.state.message === 'Register succesfull.') {
			return (
				<>
					<div class="alert alert-success mt-4" role="alert">
						{this.state.message}
					</div>
					<Redirect to="/" />
				</>
			)
		} else if (
			this.state.message === 'Username already exist.' ||
			this.state.message === 'Register failed.'
		) {
			return (
				<div class="alert alert-danger mt-4" role="alert">
					{this.state.message}
				</div>
			)
		}
	}

	inputOnChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmitHandler = e => {
		e.preventDefault()
		this.setState({ buttonDisabled: true })

		var url = `${API.baseUrl}/user/register`
		var payload = {
			username: this.state.username,
			password: this.state.password
		}

		axios
			.post(url, payload)
			.then(response => {
				let message = response.data.message
				if (message === 'Register succesfull.') {
					this.setState({
						buttonDisabled: true,
						message
					})
				} else {
					this.setState({
						buttonDisabled: false,
						message: 'Register failed.'
					})
				}
			})
			.catch(error => {
				console.log(error)
				let message = error.response.data.message
				if (message === 'Username already exist.') {
					this.setState({
						buttonDisabled: false,
						message
					})
				} else {
					this.setState({
						buttonDisabled: false,
						message: 'Register failed.'
					})
				}
			})
	}

	render() {
		return (
			<section class="fdb-block py-0">
				<div
					class="container py-5 my-5"
					style={{ backgroundImage: `url(${backgroundImage})` }}
				>
					<div class="row">
						<div class="col-12 col-md-8 col-lg-7 col-xl-5 text-left fdb-box">
							<form onSubmit={this.onSubmitHandler}>
								<div class="row">
									<div class="col">
										<h1>Register</h1>
									</div>
								</div>
								<div class="row">
									<div class="col mt-4">
										<input
											type="text"
											name="username"
											id="username"
											className="form-control"
											placeholder="Username"
											value={this.state.username}
											onChange={this.inputOnChangeHandler}
										/>
									</div>
								</div>
								<div class="row mt-2">
									<div class="col">
										<input
											type="password"
											name="password"
											id="password"
											className="form-control"
											placeholder="Password"
											value={this.state.password}
											onChange={this.inputOnChangeHandler}
										/>
									</div>
								</div>
								<div class="row mt-3">
									<div class="col">
										<button class="btn btn-primary btn-raised" type="submit" disabled={this.state.buttonDisabled}>
											{this.state.buttonDisabled === true ? (
												<div
													class="spinner-border text-light spinner-border-sm"
													role="status"
												>
													<span class="sr-only">Loading...</span>
												</div>
											) : (
												<>Login</>
											)}
										</button>
									</div>
								</div>
							</form>
							<p className="mt-4">
								Already have an account?{' '}
								<Link
									className="btn btn-link pl-1 text-capitalize"
									to="/"
									exact
								>
									Login here.
								</Link>
							</p>
							{this.registerResult()}
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Register
