const RupiahFormat = num => {
	return (
		'Rp. ' +
		num
			.toString()
			.replace('.', ',')
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
	)
}

export default RupiahFormat
