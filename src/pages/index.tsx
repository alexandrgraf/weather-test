import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { getWeather } from '../services/weatherAPI'
import Header from '../components/Header'
import CountryButtons from '../components/CountryButtons'
import useLocalStorage from '../hooks/LocalStorageHook'
import { WeatherData } from '../types/WeatherTypes'
import IconWeather from '../components/IconWeather'


const Home: NextPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [, setLocalStorageName] = useLocalStorage<string>('currentCity', 'Minsk')

  useEffect(() => {
    const setWeatherByLocation = async (location: string) => await getWeather(location).then(res => setWeatherData(res))

    setWeatherByLocation(localStorage.currentCity ?? 'Minsk')

    // NOTE: Geodata doesnt't work correctly for me
    if (navigator.geolocation && !localStorage.currentCity) {
      navigator.geolocation.getCurrentPosition(position => {
        setWeatherByLocation(`${position.coords.latitude},${position.coords.longitude}`)
      })
    }
  }, [])

  const onSwitchLocation = useCallback((cityId: string) => {
    getWeather(cityId).then(res => setWeatherData(res))
    setLocalStorageName(cityId)
  }, [])

  if (!weatherData?.location) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header locationName={weatherData.location.name} />
      <main className="p-4 container mx-auto flex flex-col">
        <section className='w-full shadow-md p-6 mb-8 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded'>
          <CountryButtons onSwitchLocation={onSwitchLocation} />
          <div className='flex items-stretch self-center h-80'>
            <div className='basis-1/2 self-center'>
              <h1 className='text-3xl font-bold underline mb-2'>{weatherData.location.name}</h1>
              <div className='text-lg'>{weatherData.current.last_updated}</div>
            </div>
            <div className='basis-1/2 self-center'>
              <div className='basis-1/4 text-2xl mb-4'>Current weather</div>
              <div className='basis-1/4 text-5xl'><IconWeather code={weatherData.current.condition.code} />{weatherData.current.temp_c}<span>&#8451;</span></div>
            </div>
          </div>
        </section>
        <h2 className='text-3xl'>The next 3 days</h2>
        {weatherData.forecast.forecastday.slice(1).map((forecastDay) => (
          <section className='flex flex-row w-full shadow-md p-3 mb-8' key={forecastDay.date_epoch}>
            <div className='basis-1/2'>
              <div className='uppercase text-slate-700 mb-3'>{forecastDay.date}</div>
              <div className='text-3xl'>{forecastDay.day.maxtemp_c} <span>&#8451;</span></div>
            </div>
            <div className='basis-1/2'>
              {forecastDay.day.condition.text}
            </div>
          </section>)
        )}

      </main>
    </>
  )
}

export default Home
