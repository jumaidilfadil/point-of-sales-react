import React, { Component } from 'react'
import '../../App.css'
import RupiahFormat from '../../helpers/RupiahFormat'
import PercentFormat from '../../helpers/PercentFormat'
import NumberFormat from '../../helpers/NumberFormat'
import { Line } from 'react-chartjs-2'
import { API } from '../../configs/api'
import axios from 'axios'
import ls from 'local-storage'
import Loading from '../../components/Loading'
import dateFormat from 'dateformat'

class Wrapper extends Component {
	constructor() {
		super()
		this.state = {
			token: '',
			recentOrders: null,
			todayIncome: null,
			percentFromYesterday: null,
			ordersThisWeek: null,
			percentOrdersLastWeek: null,
			thisYearIncome: null,
			percentLastYearIncome: null,

			thisYearMonth1Income: 0,
			thisYearMonth2Income: 0,
			thisYearMonth3Income: 0,
			thisYearMonth4Income: 0,
			thisYearMonth5Income: 0,
			thisYearMonth6Income: 0,
			thisYearMonth7Income: 0,
			thisYearMonth8Income: 0,
			thisYearMonth9Income: 0,
			thisYearMonth10Income: 0,
			thisYearMonth11Income: 0,
			thisYearMonth12Income: 0,

			lastYearMonth1Income: 0,
			lastYearMonth2Income: 0,
			lastYearMonth3Income: 0,
			lastYearMonth4Income: 0,
			lastYearMonth5Income: 0,
			lastYearMonth6Income: 0,
			lastYearMonth7Income: 0,
			lastYearMonth8Income: 0,
			lastYearMonth9Income: 0,
			lastYearMonth10Income: 0,
			lastYearMonth11Income: 0,
			lastYearMonth12Income: 0
		}
	}

	getRecentOrders = () => {
		let url = `${API.baseUrl}/history/recent-orders`
		const header = {
			headers: {
				Authorization: `Bearer ${this.state.token}`
			}
		}
		axios
			.get(url, header)
			.then(result => {
				const recentOrders = result.data.data ? result.data.data : []
				this.setState({
					recentOrders,
					refreshing: false
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	getIncome = () => {
		const url = `${API.baseUrl}/history/income`
		const header = {
			headers: {
				Authorization: `Bearer ${this.state.token}`
			}
		}
		axios
			.get(url, header)
			.then(result => {
				let todayIncome
				result.data.data[0].today_income
					? (todayIncome = RupiahFormat(result.data.data[0].today_income))
					: (todayIncome = RupiahFormat(0))

				let percentFromYesterday
				result.data.data[0].percent_from_yesterday
					? (percentFromYesterday = PercentFormat(
							result.data.data[0].percent_from_yesterday
					  ))
					: (percentFromYesterday = 'Nothing Order in ')

				let percentOrdersLastWeek
				result.data.data[0].percent_orders_last_week
					? (percentOrdersLastWeek = PercentFormat(
							result.data.data[0].percent_orders_last_week
					  ))
					: (percentOrdersLastWeek = 'Nothing Order in ')

				let percentLastYearIncome
				result.data.data[0].percent_last_year_income
					? (percentLastYearIncome = PercentFormat(
							result.data.data[0].percent_last_year_income
					  ))
					: (percentLastYearIncome = 'Nothing Income in ')

				this.setState({
					todayIncome,
					percentFromYesterday,
					ordersThisWeek: result.data.data[0].orders_this_week,
					percentOrdersLastWeek,
					thisYearIncome: result.data.data[0].this_year_income,
					percentLastYearIncome,

					thisYearMonth1Income: result.data.data[0].this_year_month_1_income,
					thisYearMonth2Income: result.data.data[0].this_year_month_2_income,
					thisYearMonth3Income: result.data.data[0].this_year_month_3_income,
					thisYearMonth4Income: result.data.data[0].this_year_month_4_income,
					thisYearMonth5Income: result.data.data[0].this_year_month_5_income,
					thisYearMonth6Income: result.data.data[0].this_year_month_6_income,
					thisYearMonth7Income: result.data.data[0].this_year_month_7_income,
					thisYearMonth8Income: result.data.data[0].this_year_month_8_income,
					thisYearMonth9Income: result.data.data[0].this_year_month_9_income,
					thisYearMonth10Income: result.data.data[0].this_year_month_10_income,
					thisYearMonth11Income: result.data.data[0].this_year_month_11_income,
					thisYearMonth12Income: result.data.data[0].this_year_month_12_income,

					lastYearMonth1Income: result.data.data[0].last_year_month_1_income,
					lastYearMonth2Income: result.data.data[0].last_year_month_2_income,
					lastYearMonth3Income: result.data.data[0].last_year_month_3_income,
					lastYearMonth4Income: result.data.data[0].last_year_month_4_income,
					lastYearMonth5Income: result.data.data[0].last_year_month_5_income,
					lastYearMonth6Income: result.data.data[0].last_year_month_6_income,
					lastYearMonth7Income: result.data.data[0].last_year_month_7_income,
					lastYearMonth8Income: result.data.data[0].last_year_month_8_income,
					lastYearMonth9Income: result.data.data[0].last_year_month_9_income,
					lastYearMonth10Income: result.data.data[0].last_year_month_10_income,
					lastYearMonth11Income: result.data.data[0].last_year_month_11_income,
					lastYearMonth12Income: result.data.data[0].last_year_month_12_income
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	async componentDidMount() {
		await this.setState({
			token: ls.get('token')
		})
		await this.getRecentOrders()
		this.getIncome()
	}

	render() {
		const data = {
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			datasets: [
				{
					label: 'This Year',
					borderColor: '#2196f3',
					data: [
						this.state.thisYearMonth1Income || 0,
						this.state.thisYearMonth2Income || 0,
						this.state.thisYearMonth3Income || 0,
						this.state.thisYearMonth4Income || 0,
						this.state.thisYearMonth5Income || 0,
						this.state.thisYearMonth6Income || 0,
						this.state.thisYearMonth7Income || 0,
						this.state.thisYearMonth8Income || 0,
						this.state.thisYearMonth9Income || 0,
						this.state.thisYearMonth10Income || 0,
						this.state.thisYearMonth11Income || 0,
						this.state.thisYearMonth12Income || 0
					]
				},
				{
					label: 'Last Year',
					borderColor: '#e51c23',
					data: [
						this.state.lastYearMonth1Income || 0,
						this.state.lastYearMonth2Income || 0,
						this.state.lastYearMonth3Income || 0,
						this.state.lastYearMonth4Income || 0,
						this.state.lastYearMonth5Income || 0,
						this.state.lastYearMonth6Income || 0,
						this.state.lastYearMonth7Income || 0,
						this.state.lastYearMonth8Income || 0,
						this.state.lastYearMonth9Income || 0,
						this.state.lastYearMonth10Income || 0,
						this.state.lastYearMonth11Income || 0,
						this.state.lastYearMonth12Income || 0
					]
				}
			]
		}

		const options = {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}

		return (
			<>
				<h1 className="h2 text-center mb-4 title">History</h1>

				<div class="row mb-4">
					<div class="col-md-4">
						<div class="card bg-warning text-white">
							<div class="card-body">
								<p class="card-text">Today's Income</p>
								<h5 class="card-title">
									{this.state.todayIncome == null ? (
										<Loading />
									) : (
										this.state.todayIncome
									)}
								</h5>
								<p class="card-text">
									{this.state.percentFromYesterday == null ? (
										<Loading />
									) : (
										this.state.percentFromYesterday
									)}{' '}
									Yesterday
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card bg-success text-white">
							<div class="card-body">
								<p class="card-text">Orders</p>
								<h5 class="card-title">
									{this.state.ordersThisWeek == null ? (
										<Loading />
									) : (
										NumberFormat(this.state.ordersThisWeek)
									)}
								</h5>
								<p class="card-text">
									{this.state.percentOrdersLastWeek == null ? (
										<Loading />
									) : (
										this.state.percentOrdersLastWeek
									)}{' '}
									Last Week
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card bg-info text-white">
							<div class="card-body">
								<p class="card-text">This Year's Income</p>
								<h5 class="card-title">
									{this.state.thisYearIncome == null ? (
										<Loading />
									) : (
										RupiahFormat(this.state.thisYearIncome)
									)}
								</h5>
								<p class="card-text">
									{this.state.percentLastYearIncome == null ? (
										<Loading />
									) : (
										this.state.percentLastYearIncome
									)}{' '}
									Last Year
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="card mb-4">
					<div class="card-body">
						<h2 class="h3 card-title">Revenue</h2>
						<Line height={60} data={data} options={options} />
					</div>
				</div>

				<div class="card mb-2">
					<div class="card-body">
						<h2 class="h3 card-title">Today Recent Orders</h2>
						{this.state.recentOrders === null ? (
							<Loading />
						) : (
							<table class="table">
								<thead>
									<tr>
										<th>Invoices</th>
										<th>Date</th>
										<th className="text-right">Amount</th>
									</tr>
								</thead>
								<tbody>
									{this.state.recentOrders.map(item => (
										<tr>
											<th>#{item.invoice}</th>
											<td>{dateFormat(item.date, 'yyyy-mm-dd')}</td>
											<td className="text-right">
												{RupiahFormat(item.amount)}
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr className="text-right">
										<th colSpan="2">Total</th>
										<th>{this.state.todayIncome}</th>
									</tr>
								</tfoot>
							</table>
						)}
					</div>
				</div>
			</>
		)
	}
}

export default Wrapper
