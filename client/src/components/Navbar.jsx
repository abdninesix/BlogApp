import React, { useEffect, useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react'
import ThemeButton from './ThemeButton';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/posts?sort=trending' },
    { name: 'Most popular', path: '/posts?sort=popular' },
    { name: 'About', path: '/about' },
];

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const { getToken } = useAuth()

    useEffect(() => {
        getToken().then(token => console.log(token))
    }, [])

    return (
        <div className='w-full h-16 md:h-20 px-2 flex sticky top-0 z-10 backdrop-blur-md items-center justify-between select-none'>
            {/*Logo*/}
            <Link to='/' className='flex items-center gap-4 text-2xl font-bold group'>
                <Image src='/favicon.svg' alt='logo' w={32} h={32} />
                <span className='flex flex-row text-gray-600 dark:text-gray-200'>BLOG</span>
            </Link>
            {/*Mobile menu*/}
            <div className='md:hidden'>
                <div className={`relative cursor-pointer text-4xl z-20 ${open ? "text-white" : ""}`} onClick={() => setOpen((prev) => (!prev))}>{open ? "X" : "☰"}</div>
            </div>

            {open && (
                <div className='z-10 absolute overflow-hidden top-0 -left-4 h-screen w-screen p-10 bg-myblue dark:bg-slate-900 text-white flex flex-col gap-10 font-medium text-4xl items-center justify-center'>
                    <ThemeButton />
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} onClick={() => setOpen(false)}>{link.name}</Link>
                    ))}
                    <SignedOut>
                        <Link to='login' onClick={() => setOpen(false)} className='bg-myblue text-white rounded-full px-4 py-2'>Login</Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            )}

            {/*Desktop menu*/}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium text-gray-600 dark:text-gray-200'>
                <ThemeButton />
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setOpen(false)}>{link.name}</Link>
                ))}

                <SignedOut>
                    <Link to='login' onClick={() => setOpen(false)} className='bg-myblue text-white rounded-full px-4 py-2'>Login</Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar