async function process(elemId) {
    // https://ip-api.com/docs/api:json
    const locationUrl = 'http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,lat,lon';

    async function getJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    
    // https://open-meteo.com/
    function getWeatherUrl(lat, lon) {
        return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m`
    }

    function formatLocation(d) {
        return `${d.country} (${d.regionName}), ${d.city}`;
    }

    function formatWeather(d) {
        return `Temp ${d.current.temperature_2m} ${d.current_units.temperature_2m}, wind ${d.current.wind_speed_10m} ${d.current_units.wind_speed_10m}`;
    }

    let elem = document.getElementById(elemId);
    elem.innerHTML += '<hr/>' + new Date().toLocaleString();

    getJson(locationUrl)
        .then(loc => {
            elem.innerHTML += '<br/>' + formatLocation(loc)
            return getJson(getWeatherUrl(loc.lat, loc.lon))})
        .then(weather => elem.innerHTML += '<br/>' + formatWeather(weather));

    return false;
}