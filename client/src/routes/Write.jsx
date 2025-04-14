import { useAuth, useUser } from '@clerk/clerk-react'
import LoginPage from './LoginPage'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Upload from '../components/Upload'

const Write = () => {

  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState('')
  const [cover, setCover] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => { image && setValue(prev => prev + `<p><image src="${image.url}"/></p>`) }, [image])
  useEffect(() => { video && setValue(prev => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`) }, [video])

  const { getToken } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, { headers: { Authorization: `Bearer ${token}` } })
    },
    onSuccess: (res) => {
      toast.success("Posted successfully")
      navigate(`/${res.data.slug}`)
    }
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (isLoaded && !isSignedIn) {
    return <LoginPage />
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      img:cover.filePath || "",
      title: formData.get("title"),
      desc: formData.get("desc"),
      category: formData.get("category"),
      content: value,
    }
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-2xl flex justify-center text-gray-600'>Create a new post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col flex-1 mb-8 gap-6'>
        <input name='title' type="text" placeholder='Write your post title here...' className='bg-transparent text-4xl p-2 outline-none font-semibold' />
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <div className='w-fit bg-myblue disabled:bg-blue-300 text-white font-medium rounded-full px-4 py-2'>
            Cover photo
          </div>
        </Upload>
        <div className='flex items-center gap-2'>
          <label>Choose a category:</label>
          <select name="category" id="" className='p-1 outline-none rounded-xl'>
            <option value='general'>General</option>
            <option value='web-design'>Web Design</option>
            <option value='development'>Development</option>
            <option value='databases'>Databases</option>
            <option value='seo'>Search Engines</option>
            <option value='marketing'>Marketing</option>
          </select>
        </div>
        <textarea rows={3} name='desc' placeholder='Write a short description...' className='p-2 rounded-xl outline-none resize-none' />
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex gap-2'>
            <Upload type="image" setProgress={setProgress} setData={setImage}>🖼️</Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>🎞️</Upload>
          </div>
          <ReactQuill value={value} onChange={setValue} theme="snow" readOnly={(progress > 0 && progress < 100)} className='flex-1 bg-white rounded-xl' />
        </div>
        <button disabled={mutation.isPending || (progress > 0 && progress < 100)} className='w-fit bg-myblue disabled:bg-blue-300 text-white font-medium rounded-full px-4 py-2'>
          {/*{mutation.isPending ? 'Posting' : 'Post'}*/}
          Post {(progress === 0 || progress === 100) ? ("") : (progress + "%")}
        </button>
        {/*{mutation.isError ? (
          <span>{mutation.error.message}</span>
        ) : null}*/}
      </form>
    </div>
  )
}

export default Write