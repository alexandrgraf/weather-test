
import Link from 'next/link'

interface HeaderProps {
    locationName?: string
}

const Header = ({ locationName }: HeaderProps) => {
    return <header className='p-4 container mx-auto'>
        <nav className='flex space-x-2 justify-end w-full'>
            <Link href="/">
                <a className="inline-block text-white px-3 py-4 mr-2 rounded-md text-lg font-medium bg-blue-700">Main page</a>
            </Link>
            <Link href="/details/[city]" as={`/details/${locationName}`}>
                <a className="inline-block text-white px-3 py-4 mr-2 rounded-md text-lg font-medium bg-blue-700">Detailed page</a>
            </Link>
        </nav>
    </header>
}

export default Header