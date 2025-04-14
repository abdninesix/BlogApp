import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'

const PostListItem = ({post}) => {

    return (
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
            {/*Image*/}
            {post.img ? (<div className='block'>
                <Image src={post.img} alt="cover photo" className='rounded-2xl w-96 h-60 object-cover' w='735' />
            </div>) : (<div className='block rounded-2xl w-96 h-60 shadow-md'/>)}
            {/*Details*/}
            <div className='flex flex-col gap-4 lg:w-2/3'>
                <Link to={`/${post.slug}`} className='text-2xl w-fit md:text-4xl font-semibold'>{post.title}</Link>
                <div className='flex items-center gap-2 text-gray-400 text-sm'>
                    <span>Written by</span>
                    <Link to={`/posts?author=${post.user.username}`} className='text-myblue'>{post.user.username}</Link>
                    <span>on</span>
                    <Link to={`/posts?cat=${post.category}`} className='text-myblue'>{post.category}</Link>
                    <span className='text-gray-500'>{format(post.createdAt)}</span>
                </div>
                <p className=''>{post.desc}</p>
                <Link to={`/${post.slug}`} className='text-myblue text-sm'>Read more</Link>
            </div>
        </div>
    )
}

export default PostListItem