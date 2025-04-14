import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';

const MainCategories = () => {
    // Get the current location (URL)
    const location = useLocation();

    // Function to check if a link is active (i.e., matches the current path)
    const isActive = (path) => {
        return location.pathname === path || location.search === path;
    };

    return (
        <div className='hidden lg:flex items-center justify-between bg-slate-100 rounded-full p-3 gap-8'>
            {/*Links*/}
            <div className='flex flex-wrap w-full items-center justify-between'>
                <Link
                    to="/"
                    className={`rounded-full px-4 py-2 ${isActive('') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    All posts
                </Link>
                <Link
                    to="?cat=web-design"
                    className={`rounded-full px-4 py-2 ${isActive('?cat=web-design') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    Web design
                </Link>
                <Link
                    to="?cat=development"
                    className={`rounded-full px-4 py-2 ${isActive('?cat=development') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    Development
                </Link>
                <Link
                    to="?cat=databases"
                    className={`rounded-full px-4 py-2 ${isActive('?cat=databases') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    Database
                </Link>
                <Link
                    to="?cat=search-engine"
                    className={`rounded-full px-4 py-2 ${isActive('?cat=search-engine') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    Search engine
                </Link>
                <Link
                    to="?cat=marketing"
                    className={`rounded-full px-4 py-2 ${isActive('?cat=marketing') ? 'bg-myblue text-white' : 'hover:bg-slate-50'}`}
                >
                    Marketing
                </Link>
            </div>

            <span className='text-xl font-medium'>|</span>

            {/*Searchbar*/}
            <Search />
        </div>
    );
};

export default MainCategories;
