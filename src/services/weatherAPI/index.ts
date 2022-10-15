const API_KEY = "0ae63dec94f54a2aac4104407221210"

export const getWeather = (cityCode: string, days: number = 4) =>
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=234039565b4d4983ab4105335221210&q=${cityCode}&days=${days}`)
        .then(response => response.json())
        .catch(err => {
            console.error('Some error:', err);
        });
