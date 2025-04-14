import React from 'react'
import PostListItem from './PostListItem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, { params: { page: pageParam, limit: 4, ...searchParamsObj }, })
  return res.data
}

const PostList = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  /*const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchPosts(),
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message*/

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })

  if (status === 'loading') return 'Loading...'
  if (status === 'error') return 'Something went wrong'

  const allPosts = data?.pages?.flatMap((page) => page.posts) || []

  console.log(data)

  return (
    <div>
      <InfiniteScroll
        dataLength={allPosts.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading posts...</h4>}
        endMessage={
          <p className='mb-8'>
            <b>No more posts</b>
          </p>
        }
      >
        {allPosts.map(post => (
          <PostListItem key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default PostList