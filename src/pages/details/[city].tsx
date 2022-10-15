import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import IconWeather from '../../components/IconWeather'
import { getWeather } from '../../services/weatherAPI'
import { WeatherData } from '../../types/WeatherTypes'


const DetailPage = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [cityName, setCityName] = useState<string>('')
    const [inputCityName, setInputCityName] = useState<string>('')
    const { city } = useRouter().query

    const setWeatherByLocation = async (location: string) => await getWeather(location, 11).then(res => setWeatherData(res))

    useEffect(() => {
        if (city) {
            setWeatherByLocation(city as string)
            setCityName(city as string)
        }
    }, [city])

    const onSubmitCity = (event: React.FormEvent<HTMLFormElement>) => {
        setWeatherByLocation(inputCityName as string)
        setCityName(inputCityName)
        event.preventDefault()
    }

    return (
        <>
            <Header locationName={city as string} />
            <main className="p-4 container mx-auto shadow-md">
                <div className='bg-gradient-to-r to-green-400 from-blue-500 text-white rounded p-5'>
                    <div className='text-3xl font-bold underline divide-y'>
                        {cityName} - {weatherData?.location?.country}
                    </div>
                    <IconWeather code={weatherData?.current?.condition.code} />
                </div>
                <div className='mb-4 mt-4'>
                    <form onSubmit={onSubmitCity}>
                        <div><label htmlFor="input_city">Enter the name of the city</label></div>
                        <input
                            onChange={(e) => setInputCityName(e.target.value)}
                            id='input_city'
                            type='text'
                            className='
                                form-control
                                block
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        />
                    </form>
                </div>
                {weatherData?.error ? <div className='mt-4 bg-red-700 text-white p-5 rounded-md'>{weatherData.error.message}</div> :
                    <>
                        <div className="flex flex-row justify-items-center items-center flex-wrap">
                            {weatherData?.forecast?.forecastday[0].hour.map(dayByHour => {
                                return <div key={dayByHour.time} className="p-6 shadow-lg text-gray-700">
                                    <div className='text-xs mb-3 text-gray-500'>{dayByHour.time}</div>
                                    <div>{dayByHour.temp_c}<span>&#8451;</span></div>
                                </div>
                            })
                            }
                        </div>
                        <div className='divide-y divide-blue-200'>
                            <div className='text-slate-800 text-2xl mt-5 mb-5 font-bold'>
                                The next 10 days
                            </div>
                            {weatherData?.forecast?.forecastday.slice(1).map(forecast => {
                                return <div key={forecast.date} className='p-2 flex flex-row items-center'>
                                    <div className='basis-1/2 '>
                                        <div className='text-slate-400'>{forecast.date}</div>
                                        <div className='basis-1/2 text-2xl text-slate-700'>{forecast.day.maxtemp_c}<span>&#8451;</span></div>
                                    </div>
                                    <div className='basis-1/2 text-slate-600'>{forecast.day.condition.text}</div>
                                </div>
                            })}
                        </div>
                    </>
                }
            </main>

        </>
    )
}


export default DetailPage