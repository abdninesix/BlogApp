import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../components/Image'
import Search from '../components/Search'
import Comments from '../components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {format} from 'timeago.js'
import PostMenuActions from '../components/PostMenuActions'

const fetchPost = async(slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data;
}

const SinglePostPage = () => {

  const {slug} = useParams()
  
  const {isPending, error, data} = useQuery({
      queryKey: ["post", slug],
      queryFn: () => fetchPost(slug)    
  })

  if (isPending) return "Loading..."
  if (error) return "Something went wrong: " + error.message
  if (!data) return "No post found"

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex mt-5 gap-6 p-4 rounded-3xl shadow-md">
        <div className="lg:w-3/5 flex flex-col gap-5">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{data.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Written by</span>
            <Link to={`/posts?author=${data.user.username}`} className="text-myblue">{data.user.username}</Link>
            <span>on</span>
            <Link to={`/posts?cat=${data.category}`} className="text-myblue">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {data.img && (<div className="hidden lg:block w-2/5">
          <Image src={data.img} w="600" className="rounded-2xl" />
        </div>)}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div dangerouslySetInnerHTML={{ __html: data.content }} className="lg:text-lg flex flex-col gap-6 text-justify"/>
        {/* menu */}
        <div className="px-4 h-max sticky top-20">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img ? (<img src={data.user.img} className="w-12 h-12 rounded-full object-cover" w="48" h="48"/>) : <div className='w-12 h-12 rounded-full shadow-lg'/>}
              <Link className="text-myblue">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">The user bio or description will show here</p>
            <div className="flex gap-2">
              <Link><Image src="facebook.svg" /></Link>
              <Link><Image src="instagram.svg" /></Link>
            </div>
          </div>

          <PostMenuActions post={data}/>

          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="posts">All</Link>
            <Link className="underline" to="posts?cat=web-design">Web Design</Link>
            <Link className="underline" to="posts?cat=development">Development</Link>
            <Link className="underline" to="posts?cat=database">Databases</Link>
            <Link className="underline" to="posts?cat=search-engine">Search Engines</Link>
            <Link className="underline" to="posts?cat=marketing">Marketing</Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  )
}

export default SinglePostPage