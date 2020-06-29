const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('more-data').addEventListener('click', (e) => {
    const lat = parseFloat(document.getElementById('w-lat').innerText);
    const lon = parseFloat(document.getElementById('w-lon').innerText);

    getExtendedWeather(lat, lon);
    
    document.getElementById('extended-table').style.display = 'block';
})

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    weather.changeLocation(city, state);

    storage.setLocationData(city, state);
    
    getWeather();

    $('#locationModal').modal('hide');
});

function getWeather(){
    weather.getWeather()
        .then(results => {
            console.log(results);
            ui.populate(results);
        })
        .catch(err => console.log(err));
}

function getExtendedWeather(lat, lon){
    weather.getExtendedWeather(lat, lon)
        .then(results => {
            console.log(results);
            ui.populateExtended(results);
        })
        .catch(err => console.log(err));
}