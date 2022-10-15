import { SunnyIcon } from '../../public/icons/sunny'
import { PartyCloudyIcon } from '../../public/icons/party-cloudy'
import { CloudyIcon } from '../../public/icons/cloudy'

interface IconWeather {
    code: number | undefined
}

const IconWeather = ({ code }: IconWeather) => {
    if (!code) {
        return null
    }

    const getIcon = (code: number) => {
        switch (code) {
            case 1000: return <SunnyIcon classname='fill-yellow-300' />
            case 1003: return <PartyCloudyIcon classname='fill-gray-300 stroke-2 w-32 h32' />
            case 1006: return <CloudyIcon classname={'fill-blue-500'} />
            default: return <SunnyIcon classname='fill-yellow-300' />
        }
    }

    return <div className='w-36 h-36 mb-4 mt-4'>{getIcon(code)}</div>
}

export default IconWeather