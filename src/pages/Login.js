import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import ls from 'local-storage'
import { API } from '../configs/api'
import backgroundImage from './4.svg'
import '../login.css'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			buttonDisabled: false,
			message: ''
		}
	}

	loginInvalidMessage = () => {
		if (this.state.message === 'loginFailed') {
			return (
				<div class="alert alert-danger mt-3" role="alert">
					Invalid username/password.
				</div>
			)
		} else if (this.state.message === 'loginSuccess') {
			return (
				<>
					<div class="alert alert-success mt-3" role="alert">
						Login success.
					</div>
					<Redirect to="/dashboard" />
				</>
			)
		}
	}

	inputOnChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmitHandler = e => {
		e.preventDefault()
		this.setState({ buttonDisabled: true })

		const url = `${API.baseUrl}/user/login`
		const payload = {
			username: this.state.username,
			password: this.state.password
		}

		axios
			.post(url, payload)
			.then(response => {
				let status = response.data.status
				if (status === 200) {
					ls.set('username', response.data.data.username)
					ls.set('token', response.data.data.token)
					this.setState({
						buttonDisabled: true,
						message: 'loginSuccess'
					})
				} else {
					this.setState({
						buttonDisabled: false,
						message: 'loginFailed'
					})
				}
			})
			.catch(error => {
				console.log(error)
				this.setState({
					buttonDisabled: false,
					message: 'loginFailed'
				})
			})
	}

	render() {
		return (
			<section className="fdb-block py-0">
				<div
					className="container py-5 my-5"
					style={{ backgroundImage: `url(${backgroundImage})` }}
				>
					<div className=" row justify-content-end">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5 text-left">
							<div className="fdb-box">
								<div className="row">
									<div className="col">
										<h1>Log In</h1>
									</div>
								</div>
								<form onSubmit={this.onSubmitHandler}>
									<div className="row">
										<div className="col mt-4">
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
									<div className="row mt-2">
										<div className="col">
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
									<div className="row mt-3">
										<div className="col">
											<button
												className="btn btn-primary btn-raised"
												type="submit"
												disabled={this.state.buttonDisabled}
											>
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
									Don't have an account?{' '}
									<Link
										className="btn btn-link pl-1 text-capitalize"
										to="/register"
									>
										Register here.
									</Link>
								</p>
								{this.loginInvalidMessage()}
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Login
