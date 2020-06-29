class Weather {
    constructor(city, state) {
        this.apiKey = 'YOUR_API_KEY HERE';
        this.city = city;
        this.state = state;
    }

    async getWeather() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}&units=metric&lang=se`
        );

        const weather = await response.json();

        return {
            weather
        };
    }

    async getExtendedWeather(lat, lon) {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=se`
        );

        const extendedWeather = await response.json();

        return {
            extendedWeather
        };
    }

    changeLocation(city, state) {
        this.city = city;
        this.state = state;
    }
}
