import React from 'react'
import { Link } from 'react-router-dom'
import MainCategories from '../components/MainCategories'
import FeaturedPosts from '../components/FeaturedPosts'
import PostList from '../components/PostList'

const Homepage = () => {
  return (
    <div className='mt-4 flex flex-col gap-5 duration-200'>
      {/*Breadcrumb*/}
      <div className='flex gap-4'>
        <Link to='/'>Home</Link>
        <span>{'>'}</span>
        <span className='text-myblue'>Blogs & Articles</span>
      </div>
      {/*Intro*/}
      <div className='flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between'>
        <div className='xl:w-5/6 flex flex-col gap-6 mt-6 mb-6'>
          <h1 className='font-bold text-myblue drop-shadow-md text-2xl md:text-5xl lg:text-6xl'>A Place Where Stories Come Alive and Ideas Take Flight</h1>
          <p className='font-medium text-gray-500 dark:text-gray-400 text-md md:text-xl'>Dive into a world of inspiration, creativity, and endless curiosity.</p>
        </div>
        <Link to="write" className=' bg-myblue text-white font-medium rounded-full px-4 py-2'>✎ Write your story</Link>
      </div>

      <h1 className=' text-2xl'>Featured posts</h1>

      <FeaturedPosts />

      <h1 className='mt-8 text-2xl'>Recent posts</h1>

      <MainCategories />

      <PostList />
    </div>
  )
}

export default Homepage