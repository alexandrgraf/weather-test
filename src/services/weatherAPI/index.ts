const API_KEY = "234039565b4d4983ab4105335221210"

export const getWeather = (cityCode: string, days: number = 4) =>
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityCode}&days=${days}`)
        .then(response => response.json())
        .catch(err => {
            console.error('API error:', err);
        })
