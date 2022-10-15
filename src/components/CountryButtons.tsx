
interface CountryButtons {
    onSwitchLocation: (cityId: string) => void
}

const cities = [
    {
        id: 1,
        name: 'Minsk',
        cityId: 'Minsk'
    },
    {
        id: 2,
        name: 'Moscow',
        cityId: 'Moscow'
    },
    {
        id: 3,
        name: 'Bratislava',
        cityId: 'Bratislava'
    }
]

const CountryButtons = ({ onSwitchLocation }: CountryButtons) => {
    return (
        <div className='w-full '>
            {cities.map(city => (
                <button
                    key={city.id}
                    onClick={() => onSwitchLocation(city.cityId)}
                    type="button"
                    className='text-2xl underline decoration-4 underline-offset-8 mr-4'
                    style={{
                        marginRight: 15
                    }}
                >
                    {city.name}
                </button>))}
        </div>)
}

export default CountryButtons