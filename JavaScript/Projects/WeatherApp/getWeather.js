const getWeather = () => {
	const city = input.value || 'Warsaw'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios.get(URL).then(res => {
		// console.log(res.data)
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		// console.log(res.data.weather[0])
		const status = Object.assign({}, ...res.data.weather)
		// console.log(status.main)
		checkWeatherIcon(status.main)
		cityName.textContent = res.data.name

		temperature.textContent = Math.floor(temp) + '°C'
		humidity.textContent = hum + '%'
		weather.textContent = status.main
		document.querySelector('.photo')
	})
}
