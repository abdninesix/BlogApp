import React, { useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'

const PostListPage = () => {

  const [open ,setOpen] = useState(false)

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='flex justify-center text-2xl text-gray-600'>Blogs List</h1>
      <button onClick={() => setOpen((prev) =>!prev)} className='md:hidden w-fit bg-myblue text-white font-medium rounded-full px-4 py-2'>{open ? "Close" : "Search or filter posts"}</button>
      <div className='flex flex-col-reverse md:flex-row justify-between gap-8'>
        <div>
          <PostList />
        </div>

        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

export default PostListPage