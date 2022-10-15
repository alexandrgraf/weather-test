export interface ForecastDay {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    condition: {
      text: string
    }
  }
  hour: {
    time: string
    temp_c: number
  }[]
}

export interface WeatherData {
  current: {
    temp_c: number
    last_updated: string
    condition: {
      code: number
    }
  }
  location: {
    name: string
    country: string

  }
  forecast: {
    forecastday: ForecastDay[]
  }
  error: {
    code: number
    message: string
  }
}