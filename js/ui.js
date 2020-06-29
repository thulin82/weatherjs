class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.pressure = document.getElementById('w-pressure');
        this.wind = document.getElementById('w-wind');
        this.sunrise = document.getElementById('w-sunrise');
        this.sunset = document.getElementById('w-sunset');
        this.lat = document.getElementById('w-lat');
        this.lon = document.getElementById('w-lon');
    }

    populate(weather) {
        this.location.textContent = weather.weather.name;
        this.desc.textContent = weather.weather.weather["0"].description;
        this.string.textContent = `${weather.weather.main.temp} ℃`;
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather.weather["0"].icon}@2x.png`)
        this.humidity.textContent = `Relative Humitidy: ${weather.weather.main.humidity} %`;
        this.feelsLike.textContent = `Feels Like: ${weather.weather.main.feels_like} ℃`;
        this.pressure.textContent = `Pressure: ${weather.weather.main.pressure} hPa`;
        this.wind.textContent = `Wind: ${weather.weather.wind.speed} m/s ${this.windDirectionHelper(weather.weather.wind.deg)}`;
        this.sunrise.textContent = `Sunrise: ${new Date(weather.weather.sys.sunrise * 1000).toLocaleTimeString("sv-SE")}`;
        this.sunset.textContent = `Sunset: ${new Date(weather.weather.sys.sunset * 1000).toLocaleTimeString("sv-SE")}`;
        this.lat.textContent = weather.weather.coord.lat;
        this.lon.textContent = weather.weather.coord.lon;
    }

    populateExtended(weather) {
        console.log('Populating.....');
        const table = document.querySelector("table");
        let thead = table.createTHead();
        let row = thead.insertRow();
        let onlyFourEntries = weather.extendedWeather.daily.slice(0, 4);

        for (let key of onlyFourEntries) {
            let th = document.createElement("th");
            console.log(key);
            var options = { weekday: "long"}; 
            let text = document.createTextNode(new Date(key.dt * 1000).toLocaleDateString("sv-SE", options));
            th.appendChild(text);
            row.appendChild(th);
        }

        for (let element of onlyFourEntries) {
            let row = table.insertRow();
            for (let key in element) {
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
        }
    }

    windDirectionHelper(windDirection) {
        let val = Math.trunc((windDirection/22.5)+.5);
        let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
        return arr[(val % 16)];
    }
}