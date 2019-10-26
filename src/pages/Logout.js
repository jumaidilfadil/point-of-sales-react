import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ls from 'local-storage'

class Logout extends Component {
	render() {
		ls.remove('username')
		ls.remove('token')
		return (
			<>
				<Redirect to="/" />
			</>
		)
	}
}

export default Logout
