import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const query = e.target.value
            if (location.pathname === "posts") {
                setSearchParams({ ...Object.fromEntries(searchParams), search: query })
            } else {
                navigate(`/posts?search=${query}`)
            }
        }
    }

    return (
        <div className='bg-white rounded-full flex items-center gap-2 px-2'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                <path d="M 10 2 C 5.590603 2 2 5.5906063 2 10 C 2 14.409394 5.590603 18 10 18 C 11.929744 18 13.635779 17.22512 15.019531 16.082031 L 20.71875 21.78125 A 0.75130096 0.75130096 0 1 0 21.78125 20.71875 L 16.082031 15.019531 C 17.225119 13.635778 18 11.929742 18 10 C 18 5.5906063 14.409397 2 10 2 z M 10 3.5 C 13.598737 3.5 16.5 6.401265 16.5 10 C 16.5 13.598735 13.598737 16.5 10 16.5 C 6.4012627 16.5 3.5 13.598735 3.5 10 C 3.5 6.401265 6.4012627 3.5 10 3.5 z"></path>
            </svg>
            <input onKeyDown={handleKeyPress} type='text' placeholder='Search posts' className='bg-transparent p-2 rounded-full outline-none' />
        </div>
    )
}

export default Search