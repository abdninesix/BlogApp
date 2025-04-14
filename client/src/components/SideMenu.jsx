import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Search from './Search'

const SideMenu = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      })
    }
  }

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      })
    }
  }

  return (
    <div className="px-4 h-max sticky top-20">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className='w-fit flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='newest' onChange={handleFilterChange} className='appearance-none w-4 h-4 border-2 bg-white border-myblue checked:bg-myblue cursor-pointer' />
          Newest
        </label>
        <label className='w-fit flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='popular' onChange={handleFilterChange} className='appearance-none w-4 h-4 border-2 bg-white border-myblue checked:bg-myblue cursor-pointer' />
          Most popular
        </label>
        <label className='w-fit flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='trending' onChange={handleFilterChange} className='appearance-none w-4 h-4 border-2 bg-white border-myblue checked:bg-myblue cursor-pointer' />
          Trending
        </label>
        <label className='w-fit flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='oldest' onChange={handleFilterChange} className='appearance-none w-4 h-4 border-2 bg-white border-myblue checked:bg-myblue cursor-pointer' />
          Oldest
        </label>
      </div>

      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("")}>All</span>
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("web-design")}>Web Design</span>
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("development")}>Development</span>
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("databases")}>Databases</span>
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("search-engine")}>Search Engines</span>
        <span className="w-fit underline cursor-pointer" onClick={()=>handleCategoryChange("marketing")}>Marketing</span>
      </div>
    </div>
  )
}

export default SideMenu